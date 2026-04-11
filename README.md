# AI Placement Coach

AI Placement Coach is a comprehensive full-stack web application designed to empower job seekers. The platform validates resumes, analyzes technical skills based on specific job roles, detects missing keywords, and provides AI-tailored feedback and interview preparation questions.

## Features

- **Resume Validation**: Automatically detects if the uploaded document is a valid professional resume using keyword heuristics and AI verification.
- **Dynamic Role-Based Analysis**: Generates role-specific skill sets dynamically using AI, moving away from static, hardcoded lists.
- **Skill Gap Detection**: Identifies technical skills present in the resume and highlights missing keywords essential for the targeted role.
- **Intelligent Scoring**: Calculates an ATS compatibility score based on the specific requirements of the selected job role.
- **Mock Interviews**: Generates challenging technical and behavioral interview questions tailored to the candidate's profile.
- **Professional UI**: Features a modern, responsive design built with glassmorphism aesthetics and smooth transitions.
- **Branding & Contact Integration**: Includes a consistent navbar and footer with integrated contact links for portfolio showcase.

## Tech Stack

### Frontend
- **React (Vite)**: For a fast, modern user interface.
- **Tailwind CSS**: For utility-first styling and responsive design.
- **Lucide React**: For clean, consistent iconography.
- **React Router**: For seamless navigation between pages.

### Backend
- **Node.js & Express**: For a robust and scalable server architecture.
- **Google Gemini API**: For dynamic skill generation and resume analysis.
- **Multer**: For handling multipart/form-data (file uploads).
- **PDF-Parse**: For extracting raw text from PDF documents.

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ashitajha10/AI-Placement-Coach.git
   cd AI-Placement-Coach
   ```

2. **Backend Setup**
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` folder and add your Gemini API Key:
     ```env
     GEMINI_API_KEY=your_api_key_here
     PORT=5000
     ```
   - Start the server:
     ```bash
     node index.js
     ```

3. **Frontend Setup**
   - Navigate to the client directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

## Folder Structure

```text
AI-Placement-Coach/
├── client/             # React frontend (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Footer)
│   │   ├── pages/      # Main application views (Home, Upload, Interview, Dashboard)
│   │   └── App.jsx     # Global layout and routing
├── server/             # Express backend
│   ├── uploads/        # Temporary storage for resume PDFs
│   └── index.js        # Server logic and AI integration
└── README.md           # Project documentation
```

## Usage

1. **Upload Resume**: Select your target job role (e.g., Frontend Developer) and upload your resume in PDF format.
2. **Review Analysis**: View your ATS score, detected skills, and missing keywords. Read AI-generated feedback for improvements.
3. **Practice Interview**: Navigate to the Mock Interview section to answer tailored questions and receive feedback on your responses.
4. **Track Progress**: Check your dashboard to monitor your overall placement readiness.

## Future Improvements

- **AI Enhancements**: Implement more granular feedback on formatting and section structure.
- **Resume Export**: Allow users to download an optimized PDF version of their resume based on AI suggestions.
- **Advanced Scoring**: Integrate role-specific weighting for skills (e.g., core vs. secondary skills).
- **Multi-document Support**: Expand support to DOCX and other text formats.

## Author

**Ashita Jha**
- **Email**: [ashitajha691@gmail.com](mailto:ashitajha691@gmail.com)
- **LinkedIn**: [in/ashitajha](https://www.linkedin.com/in/ashitajha)
- **GitHub**: [ashitajha10](https://github.com/ashitajha10)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
