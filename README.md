<div align="center">

# 🚀 AI Placement Coach
### *Supercharge your career prep with AI-driven insights and interactive practice.*

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/ashitajha10/AI-Placement-Coach)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-blue)](https://deepmind.google/technologies/gemini/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)](https://nodejs.org/)

[Explore the App](#-features) • [View Demo](#-usage) • [Report Bug](https://github.com/ashitajha10/AI-Placement-Coach/issues)

</div>

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Installation & Setup](#️-installation--setup)
- [📂 Folder Structure](#-folder-structure)
- [🎮 Usage](#-usage)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [👤 Author](#-author)

---

## ✨ Features

AI Placement Coach is designed to bridge the gap between your resume and your dream job.

| Feature | Description |
| :--- | :--- |
| **🛡️ Resume Validation** | Instantly verify if your document is a valid professional resume. |
| **🎯 Role-Based Analysis** | Evaluate your fit against specific roles like Frontend, Backend, or Data Analyst. |
| **📊 Intelligent ATS Scoring** | Get a compatibility percentage score based on real-time keyword matching. |
| **💡 AI-Powered Feedback** | Receive tailored suggestions and strengths even under rate-limit constraints. |
| **🖱️ Drag & Drop Upload** | Premium, interactive file upload experience with PDF validation. |
| **🎙️ Mock Interviews** | Practice with AI-generated technical and behavioral questions. |
| **📈 Mastery Dashboard** | Track your placement readiness at a glance. |

---

## 🛠️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Lucide](https://img.shields.io/badge/Lucide_React-FFB13B?style=for-the-badge&logo=lucide&logoColor=white)

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
- ![Multer](https://img.shields.io/badge/Multer-6B7280?style=for-the-badge&logo=files&logoColor=white)

---

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

<details>
<summary><b>1. Prerequisites</b></summary>
- Node.js (v18+)
- npm or yarn
- Google Gemini API Key
</details>

<details>
<summary><b>2. Clone the Repository</b></summary>

```bash
git clone https://github.com/ashitajha10/AI-Placement-Coach.git
cd AI-Placement-Coach
```
</details>

<details>
<summary><b>3. Backend Configuration</b></summary>

```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory:
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```
Start server:
```bash
node index.js
```
</details>

<details>
<summary><b>4. Frontend Configuration</b></summary>

```bash
cd ../client
npm install
npm run dev
```
</details>

---

## 🎮 Usage

1. **Upload Resume**: Select your target job role and drag-and-drop your PDF resume.
2. **Review Feedback**: The AI consolidates all analysis into one request to save your API quota while providing deep insights.
3. **Practice**: Go to the **Mock Interview** section to test your skills and get immediate AI feedback on your answers.
4. **Dashboard**: Monitor your "Placement Readiness" as you improve your score and practice sessions.

---

## 📂 Folder Structure

```text
AI-Placement-Coach/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Navbar, Footer, etc.)
│   │   ├── pages/          # Home, Upload, Interview, Dashboard
│   │   └── App.jsx         # Routes & Layout
│   └── vite.config.js      # Proxy settings
├── server/                 # Node + Express Backend
│   ├── uploads/            # Multer temporary buffer
│   ├── index.js            # Consolidated AI Logic
│   └── .env                # Environment variables
└── README.md
```

---

## 🔮 Future Enhancements

- [ ] **Resume Optimizer**: Suggesting exact keyword placements within the resume.
- [ ] **Multi-Role Comparison**: Compare your resume against multiple roles simultaneously.
- [ ] **Mock Interview Voice-to-Text**: Voice-enabled practice sessions.
- [ ] **Exportable Reports**: Download your analysis as a PDF report.

---

## 🤝 Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Ashita Jha**
- [![Email](https://img.shields.io/badge/Email-ashitajha691%40gmail.com-red?style=flat-square&logo=gmail)](mailto:ashitajha691@gmail.com)
- [![LinkedIn](https://img.shields.io/badge/LinkedIn-in/ashitajha-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/ashitajha)
- [![GitHub](https://img.shields.io/badge/GitHub-ashitajha10-lightgrey?style=flat-square&logo=github)](https://github.com/ashitajha10)

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by Ashita Jha</sub>
</div>
