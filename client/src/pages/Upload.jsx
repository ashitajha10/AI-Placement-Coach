import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Upload Resume | AI Placement Coach";
  }, []);

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Software Engineer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Machine Learning Engineer",
  ];

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    if (!role) {
      alert("Please select a target role");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("role", role);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      if (data.score) {
        localStorage.setItem("resumeScore", data.score);
      }
      if (data.candidateName) {
        localStorage.setItem("userName", data.candidateName);
      }
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center p-6 pt-28 font-sans">
      
      {/* Background ambient gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="z-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Resume Analyzer
          </h1>
          <p className="text-slate-400">Evaluate your resume against specific role requirements.</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col items-center w-full">
          
          <div className="w-full mb-6">
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Job Role</label>
            <select 
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>Select a role...</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col items-center border-2 border-dashed border-white/20 rounded-xl p-8 mb-6 hover:border-blue-400/50 hover:bg-white/[0.02] transition-colors relative">
            <svg className="w-12 h-12 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <label className="block text-slate-300 font-medium mb-2 cursor-pointer text-center">
              <span className="text-blue-400 hover:text-blue-300">Click to browse</span> or drag and drop
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <p className="text-xs text-slate-500">
              {file ? `Selected: ${file.name}` : "PDF files only (Max 5MB)"}
            </p>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || !role || loading}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${
              !file || !role || loading 
              ? "bg-slate-700/50 cursor-not-allowed text-slate-400" 
              : "bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-500 hover:to-indigo-600 shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 w-full animate-fade-in-up">
            {result.isResume === false ? (
              <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-red-100 mb-2">Invalid Document</h2>
                <p className="text-slate-400 max-w-md">{result.message}</p>
                <button 
                  onClick={() => {setResult(null); setFile(null);}}
                  className="mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4"
                >
                  Try again with a different file
                </button>
              </div>
            ) : (
              <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100 italic">Evaluation for {role}</h2>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Based on dynamic role-specific analysis</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-slate-400">ATS Score</span>
                    <span className={`text-3xl font-extrabold ${result.score > 70 ? 'text-green-400' : result.score > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {result.score}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Detected Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.skills && result.skills.length > 0 ? result.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      )) : <span className="text-slate-500 text-sm">None detected</span>}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Missing Role Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills && result.missingSkills.length > 0 ? result.missingSkills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-red-500/10 text-red-300 ring-1 ring-red-500/30 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      )) : <span className="text-slate-500 text-sm">Perfect match!</span>}
                    </div>
                  </div>
                </div>
                
                {/* AI Feedback Section */}
                <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {result.aiFeedback === "AI detailed feedback unavailable." ? "Feedback" : "AI Feedback"}
                  </h3>
                  
                  {result.aiFeedback && result.aiFeedback !== "AI detailed feedback unavailable." ? (
                    <div className="text-sm text-slate-300 leading-relaxed space-y-5">
                      {result.aiFeedback.split('\n').filter(line => line.trim() !== '').map((line, idx) => {
                        const trimmedLine = line.trim();
                        
                        // Bullet point detection (do this before general label check)
                        if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*') || trimmedLine.startsWith('•')) {
                          const cleanLine = trimmedLine.replace(/^[-*•]\s*/, '');
                          const colonIndex = cleanLine.indexOf(':');
                          
                          if (colonIndex > 0 && colonIndex < 40) {
                            const label = cleanLine.substring(0, colonIndex).replace(/\*\*/g, '').replace(/^["']|["']$/g, '').trim();
                            const content = cleanLine.substring(colonIndex + 1).replace(/\*\*/g, '').replace(/^["']|["']$/g, '').trim();
                            return (
                              <div key={idx} className="flex gap-3 ml-2 group mt-2">
                                <span className="text-blue-500/80 mt-1">•</span>
                                <div>
                                  <span className="font-bold text-blue-300 mr-2">{label}:</span>
                                  <span className="text-slate-300 font-normal">{content}</span>
                                </div>
                              </div>
                            );
                          }

                          const cleanBullet = cleanLine.replace(/\*\*/g, '').replace(/^["']|["']$/g, '').trim();
                          return (
                            <div key={idx} className="flex gap-3 ml-2 group mt-2">
                              <span className="text-blue-500/80 group-hover:text-blue-400 transition-colors mt-1">•</span>
                              <span className="text-slate-300">{cleanBullet}</span>
                            </div>
                          );
                        }

                        // Check if standalone line contains a label-content pair
                        const colonIndex = trimmedLine.indexOf(':');
                        const hasColon = colonIndex > 0 && colonIndex < 40; 
                        
                        if (hasColon) {
                          const label = trimmedLine.substring(0, colonIndex).replace(/\*\*/g, '').replace(/^["']|["']$/g, '').replace(/^\d+\.\s*/, '').trim();
                          const content = trimmedLine.substring(colonIndex + 1).replace(/\*\*/g, '').replace(/^["']|["']$/g, '').trim();
                          
                          if (content.length > 0) {
                            return (
                              <div key={idx} className="mt-4 first:mt-0">
                                <span className="font-bold text-blue-300 mr-2">{label}:</span>
                                <span className="text-slate-400 font-normal">{content}</span>
                              </div>
                            );
                          }
                        }

                        // Improved heading detection for standalone headers
                        const isHeading = 
                          (trimmedLine.includes('**') && !hasColon) || 
                          (trimmedLine.startsWith('"') && trimmedLine.endsWith('"') && trimmedLine.length < 50) ||
                          (trimmedLine.endsWith(':') && trimmedLine.length < 60) ||
                          (/^\d+\./.test(trimmedLine));
                        
                        if (isHeading) {
                          const cleanHeading = trimmedLine
                            .replace(/\*\*/g, '')
                            .replace(/^["']|["']$/g, '')
                            .replace(/^\d+\.\s*/, '')
                            .replace(/:$/, '')
                            .trim();
                          
                          return (
                            <h4 key={idx} className="font-bold text-blue-300 mt-6 first:mt-0 text-base tracking-wide flex items-center gap-2">
                              <span className="w-1.5 h-4 bg-blue-500/50 rounded-full"></span>
                              {cleanHeading}
                            </h4>
                          );
                        }

                        // Normal paragraph
                        return (
                          <p key={idx} className="text-slate-400 font-normal">
                            {trimmedLine.replace(/\*\*/g, '').replace(/^["']|["']$/g, '').trim()}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                      {result.suggestions && result.suggestions.length > 0 ? (
                        result.suggestions.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))
                      ) : (
                        <li>No suggestions available.</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}