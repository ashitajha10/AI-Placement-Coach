<div align="center">

# 🚀 AI PLACEMENT COACH
### *Empowering Careers through AI-Driven Insights & Interactive Practice*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com/ashitajha10/AI-Placement-Coach)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-blue?style=for-the-badge)](https://deepmind.google/technologies/gemini/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=for-the-badge)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge)](https://nodejs.org/)

<br />

![AI Placement Coach Hero](C:\Users\ASHITA JHA\.gemini\antigravity\brain\d7b1a937-a97c-4fbe-bf56-2bbbb47d0402\ai_placement_coach_hero_1775987821659.png)

*AI Placement Coach bridges the gap between your resume and your dream career by providing instant validation, role-based analysis, and interactive mock interview practice.*

[Live Demo](#-demo) • [Report Bug](https://github.com/ashitajha10/AI-Placement-Coach/issues) • [Request Feature](https://github.com/ashitajha10/AI-Placement-Coach/issues)

</div>

---

## 📖 Table of Contents

- [📍 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🎮 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [🔮 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [👤 Author](#-author)

---

## 📍 Overview

AI Placement Coach is a comprehensive career preparation tool. It leverages the power of **Google Gemini AI** to provide deep, actionable feedback on resumes and simulate realistic interview scenarios. Whether you're a student or a professional, this tool helps you optimize your profile for ATS (Applicant Tracking Systems) and sharpen your interview skills.

---

## ✨ Key Features

<table width="100%">
  <tr>
    <td width="50%">
      <h4>🛡️ Resume Validation</h4>
      <p>Instantly verify if your document meets professional standards before applying.</p>
    </td>
    <td width="50%">
      <h4>🎯 Role-Based Analysis</h4>
      <p>Tailored evaluation for roles like Frontend, Backend, Data Analyst, and more.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>📊 Intelligent ATS Scoring</h4>
      <p>Get a precise compatibility score based on real-time industry keyword matching.</p>
    </td>
    <td width="50%">
      <h4>💡 AI-Powered Feedback</h4>
      <p>Deep insights into strengths and precise areas for improvement in your resume.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>🎙️ Mock Interviews</h4>
      <p>Engage in AI-moderated interviews with questions tailored to your target role.</p>
    </td>
    <td width="50%">
      <h4>📈 Mastery Dashboard</h4>
      <p>Track your progress and placement readiness with visual analytics.</p>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### Core Technologies
<div align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</div>

### Libraries & Tools
- **UI Components:** Lucide React, Framer Motion (for animations)
- **File Handling:** Multer (server-side PDF processing)
- **Styling:** Custom Modern CSS + Tailwind
- **AI Integration:** Google Generative AI SDK

---

## ⚙️ Installation & Setup

Follow these steps to set up your local development environment.

<details>
<summary>📋 <b>Prerequisites</b></summary>
<br />

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)
</details>

<details>
<summary>🚀 <b>Step 1: Clone the Repository</b></summary>
<br />

```bash
git clone https://github.com/ashitajha10/AI-Placement-Coach.git
cd AI-Placement-Coach
```
</details>

<details>
<summary>🔧 <b>Step 2: Backend Configuration</b></summary>
<br />

1. Navigate to the server directory:
   ```bash
   cd server
   npm install
   ```
2. Create a `.env` file in the `server/` root:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   ```
3. Start the backend server:
   ```bash
   node index.js
   ```
</details>

<details>
<summary>💻 <b>Step 3: Frontend Configuration</b></summary>
<br />

1. Navigate to the client directory:
   ```bash
   cd ../client
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.
</details>

---

## 🎮 Usage

1. **Upload Section**: Drag and drop your resume (PDF). Select the role you are targeting.
2. **Analysis Report**: View your ATS score, missing keywords, and detailed AI feedback.
3. **Interview Room**: Start a mock session. The AI will ask role-specific questions and evaluate your responses.
4. **Dashboard**: Check your history and see how your scores improve over time.

---

## 📂 Project Structure

```text
AI-Placement-Coach/
├── client/                 # React + Vite Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, Footer, Progress)
│   │   ├── pages/          # Home, UploadPage, InterviewRoom, Analytics
│   │   ├── App.jsx         # Routing and Main Layout
│   │   └── main.jsx        # Entry point
│   └── vite.config.js      # App configuration & Proxy
├── server/                 # Node + Express Backend
│   ├── uploads/            # Temporary storage for resume parsing
│   ├── index.js            # Main server and AI logic
│   ├── .env                # API Keys and sensitive config
│   └── package.json        # Dependencies
└── README.md               # Project documentation
```

---

## 🔮 Roadmap

- [ ] **Voice Recognition**: Support for voice-to-text in mock interviews.
- [ ] **Resume Multi-Comparison**: Compare one resume against 3 different job descriptions simultaneously.
- [ ] **LinkedIn Integration**: Auto-pull data from LinkedIn profiles.
- [ ] **PDF Export**: Generate a downloadable PDF report of the analysis.
- [ ] **Dark/Light Mode**: Full theme customization.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Ashita Jha**  
*Full Stack Developer & AI Enthusiast*

<div align="left">
  <a href="mailto:ashitajha691@gmail.com">
    <img src="https://img.shields.io/badge/Email-ashitajha691%40gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/ashitajha">
    <img src="https://img.shields.io/badge/LinkedIn-in/ashitajha-blue?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="https://github.com/ashitajha10">
    <img src="https://img.shields.io/badge/GitHub-ashitajha10-lightgrey?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</div>

<br />

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=ashitajha10&show_icons=true&theme=radical" alt="GitHub Stats" height="150" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=ashitajha10&layout=compact&theme=radical" alt="Top Languages" height="150" />
</div>

<br />

<div align="center">
  <sub>Built with ❤️ for better placements</sub>
</div>
