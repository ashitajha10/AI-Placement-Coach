require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client/dist")));

const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const fallbackRoleSkills = {
  frontend: ["html", "css", "javascript", "react", "tailwind", "next.js", "typescript", "browser developer tools"],
  backend: ["node", "express", "mongodb", "sql", "api", "rest", "graphql", "docker", "aws", "python"],
  "data analyst": ["python", "pandas", "numpy", "sql", "excel", "tableau", "power bi", "statistics"],
  "software engineer": ["java", "python", "c++", "data structures", "algorithms", "git", "system design", "testing"],
};

async function getRoleSkills(role) {
  const normalizedRole = role.toLowerCase();
  try {
    const prompt = `Generate a list of important technical skills required for a ${role}. Return only a clean comma-separated list.`;
    const result = await model.generateContent(prompt);
    const skillsText = result.response.text().trim();
    if (skillsText && !skillsText.includes("failed")) {
      return skillsText.split(",").map(s => s.trim().toLowerCase()).filter(s => s.length > 0);
    }
  } catch (err) {
    console.error("AI skill generation failed, using fallback:", err);
  }

  // Fallback logic
  for (const [key, skills] of Object.entries(fallbackRoleSkills)) {
    if (normalizedRole.includes(key)) {
      return skills;
    }
  }
  return fallbackRoleSkills["software engineer"];
}

async function isResume(text) {
  if (!text || text.length < 150) return false;

  const normalizedText = text.toLowerCase();
  const sections = [
    "education",
    "experience",
    "work experience",
    "skills",
    "projects",
    "certifications",
    "internships",
    "summary",
    "objective",
  ];

  let foundSections = 0;
  sections.forEach((section) => {
    if (normalizedText.includes(section)) foundSections++;
  });

  if (foundSections >= 3) return true;

  // Secondary AI check
  try {
    const prompt = `Determine if the following text is a professional resume. Answer only YES or NO.\n\nText:\n"""${text.substring(0, 2000)}"""`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim().toUpperCase();
    return responseText.includes("YES");
  } catch (err) {
    console.error("AI resume detection failed:", err);
    return false;
  }
}

function extractSkills(resumeText, roleSkills) {
  const normalizedText = resumeText.toLowerCase().replace(/\s+/g, " ");
  const foundSkills = [];
  const missingSkills = [];

  roleSkills.forEach(skill => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape regex chars
    const regex = new RegExp(`(?<![a-zA-Z])${escapedSkill}(?![a-zA-Z])`, "i");
    if (regex.test(normalizedText)) {
      foundSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  return { foundSkills, missingSkills };
}

app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ isResume: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const targetRole = req.body.role || "Software Engineer";

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // Use caching for role skills to save API calls
    const roleSkills = await getRoleSkills(targetRole);
    const { foundSkills, missingSkills } = extractSkills(text, roleSkills);

    let score = Math.round((foundSkills.length / roleSkills.length) * 100);
    let suggestions = [];
    let aiFeedback = "";
    let candidateName = "User";

    try {
      // CONSOLIDATED PROMPT: Combining validation, name extraction and evaluation into one call to save quota
      const combinedResult = await model.generateContent(
        `You are an expert AI Placement Coach. 
Analyze this extracted text for a candidate applying for: "${targetRole}".

TASK:
1. Is this a professional resume? (Answer ONLY with "VALID" or "INVALID")
2. What is the candidate's full name? (If not found, use "User")
3. Provide an ATS compatibility score (0-100) for the role: ${targetRole}.
4. Provide a professional evaluation including Key Strengths and Areas for Improvement.

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS:
VALIDATION: <VALID/INVALID>
NAME: <Full Name>
ATS_SCORE: <Number>
FEEDBACK:
<Your evaluation here, use bullet points for strengths and improvements>` +
        `\n\nResume Text:\n"""${text.substring(0, 6000)}"""`
      );

      const rawResponse = combinedResult.response.text();
      
      // Parse consolidated response
      const isValid = rawResponse.includes("VALIDATION: VALID");
      if (!isValid && rawResponse.includes("VALIDATION: INVALID")) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.json({
          isResume: false,
          message: "Uploaded file does not appear to be a resume. Please upload a valid professional resume.",
        });
      }

      const nameMatch = rawResponse.match(/NAME:\s*(.*)/i);
      if (nameMatch) candidateName = nameMatch[1].trim();

      const atsMatch = rawResponse.match(/ATS_SCORE:\s*(\d+)/i);
      if (atsMatch) score = parseInt(atsMatch[1], 10);

      const feedbackParts = rawResponse.split(/FEEDBACK:/i);
      if (feedbackParts.length > 1) {
        aiFeedback = feedbackParts[1].trim();
        suggestions = aiFeedback.split("\n").filter(l => l.trim() !== "");
      }

    } catch (err) {
      console.error("Consolidated Gemini call failed:", err);
      // Construct a structured fallback feedback string that the frontend parser can handle
      suggestions = missingSkills.map((skill) => `Consider adding **${skill}** to your resume`);
      
      aiFeedback = `**AI Analysis Service (Rate Limited)**\n` +
                  `Detailed AI evaluation is temporarily unavailable due to high traffic. However, based on our heuristic analysis for the ${targetRole} role, here are some immediate suggestions:\n\n` +
                  `**Key Suggestions:**\n` +
                  suggestions.map(s => `- ${s}`).join('\n') + 
                  `\n\n**Note:** Please try again in 60 seconds for a full AI-powered strength evaluation.`;
    }

    res.json({
      isResume: true,
      roleSkills,
      skills: foundSkills,
      missingSkills,
      score,
      suggestions,
      aiFeedback,
      candidateName,
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("Resume processing error:", err);
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send("Error processing resume");
  }
});

app.post("/api/interview", async (req, res) => {
  try {
    const result = await model.generateContent(
      "You are an expert technical recruiter. Generate 5 challenging behavioral and technical interview questions for a software engineering candidate. Output exactly one question per line, with no numbering or bullet points."
    );
    
    const response = result.response;
    const text = response.text();
    const questions = text.split("\n").filter(q => q.trim().length > 0).slice(0, 5);

    res.json({ questions });
  } catch (err) {
    console.error("Gemini interview error:", err);
    const questions = [
      "Tell me about yourself and your background.",
      "Can you explain the architecture of your main project?",
      "What technologies have you used, and why did you choose them?",
      "Describe a challenging bug you faced and how you solved it.",
      "Why should we hire you for this role?",
    ];

    res.json({ questions });
  }
});

app.post("/api/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required" });
  }

  try {
    const prompt = `You are an expert technical interviewer evaluating a candidate's answer.
Question asked: "${question}"
Candidate's answer: "${answer}"
Provide concise, constructive feedback (2-3 sentences), highlighting what they did well and what they missed. Ensure it sounds like a professional recruiter giving advice.`;

    const result = await model.generateContent(prompt);
    const feedback = result.response.text();
    
    res.json({ feedback });
  } catch (err) {
    console.error("Gemini evaluate error:", err);
    // Fallback response if AI is unavailable or blocked
    res.json({ 
      feedback: "Evaluation unavailable at this moment. Ensure your answer follows the STAR method (Situation, Task, Action, Result) and clearly highlights your skills." 
    });
  }
});

// Catch-all to serve index.html for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});