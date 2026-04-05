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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const skillsList = [
  "html",
  "css",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "java",
  "python",
];

app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase().replace(/\s+/g, " ");

    const foundSkills = skillsList.filter((skill) => {
      const regex = new RegExp(`\\b${skill}\\b`, "i");
      return regex.test(text);
    });

    const missingSkills = skillsList.filter(
      (skill) => !foundSkills.includes(skill)
    );

    const score = Math.round(
      (foundSkills.length / skillsList.length) * 100
    );

    let suggestions = [];
    let aiFeedback = "";
    let candidateName = "User";

    try {
      const result = await model.generateContent(
        `You are an expert AI Placement Coach and Recruiter.
Analyze the following resume text extracted from a PDF. Provide a concise, professional evaluation.
Include:
1. Overall Impression (1-2 sentences)
2. Key Strengths (bullet points)
3. Areas for Improvement (bullet points)

Resume Text:
"""
${text.substring(0, 5000)}
"""`
      );

      const response = result.response;
      aiFeedback = response.text();

      suggestions = aiFeedback
        .split("\n")
        .filter((line) => line.trim() !== "");

      // Extract Name
      const nameResult = await model.generateContent(
        `Extract the full name of the candidate from the following text. Respond with ONLY the candidate's name, nothing else. If no name is found or it's unclear, respond with "User".\n\nText:\n"""${text.substring(0, 1000)}"""`
      );
      candidateName = nameResult.response.text().trim();

    } catch (err) {
      console.error("Gemini failed during analysis:", err);
      suggestions = missingSkills.map(
        (skill) => `Try adding ${skill} to your resume`
      );
      aiFeedback = "AI not available";
      candidateName = "User";
    }

    res.json({
      skills: foundSkills,
      score,
      missingSkills,
      suggestions,
      aiFeedback,
      resumeText: text,
      candidateName,
    });

    // Cleanup the uploaded file
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