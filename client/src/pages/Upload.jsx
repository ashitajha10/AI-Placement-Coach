import { useState } from "react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);

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
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col items-center justify-center p-6 pt-28 font-sans">
      
      {/* Background ambient gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="z-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Resume Analyzer
          </h1>
          <p className="text-slate-400">Upload your resume in PDF format to get instant AI-driven feedback.</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col items-center w-full">
          
          <div className="w-full flex flex-col items-center border-2 border-dashed border-white/20 rounded-xl p-8 mb-6 hover:border-blue-400/50 hover:bg-white/[0.02] transition-colors">
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
            disabled={!file || loading}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${
              !file || loading 
              ? "bg-slate-700/50 cursor-not-allowed text-slate-400" 
              : "bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-500 hover:to-indigo-600 shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            }`}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 bg-white/[0.03] border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl w-full animate-fade-in-up">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-slate-100">Analysis Results</h2>
              <div className="flex flex-col items-end">
                <span className="text-sm text-slate-400">Match Score</span>
                <span className={`text-3xl font-extrabold ${result.score > 70 ? 'text-green-400' : result.score > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {result.score}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Detected Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.length > 0 ? result.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  )) : <span className="text-slate-500 text-sm">None detected</span>}
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.length > 0 ? result.missingSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-red-500/10 text-red-300 ring-1 ring-red-500/30 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  )) : <span className="text-slate-500 text-sm">None</span>}
                </div>
              </div>
            </div>

            {/* AI Feedback Section */}
            <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {result.aiFeedback === "AI not available" || !result.aiFeedback ? "Feedback" : "AI Feedback"}
              </h3>
              
              {result.aiFeedback && result.aiFeedback !== "AI not available" ? (
                <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {result.aiFeedback}
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
    </div>
  );
}