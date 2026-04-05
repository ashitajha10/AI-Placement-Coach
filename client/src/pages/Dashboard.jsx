import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [resumeScore, setResumeScore] = useState(0);
  const [interviewsPracticed, setInterviewsPracticed] = useState(0);
  const [readiness, setReadiness] = useState({ text: "Needs Work", color: "text-red-400" });
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const rScore = parseInt(localStorage.getItem("resumeScore") || "0");
    const iPracticed = parseInt(localStorage.getItem("interviewsPracticed") || "0");
    const storedName = localStorage.getItem("userName") || "User";
    
    setResumeScore(rScore);
    setInterviewsPracticed(iPracticed);
    setUserName(storedName);

    if (rScore > 75 && iPracticed >= 2) {
      setReadiness({ text: "Great", color: "text-green-400" });
    } else if (rScore > 50 || iPracticed >= 1) {
      setReadiness({ text: "Good", color: "text-yellow-400" });
    } else {
      setReadiness({ text: "Needs Work", color: "text-red-400" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col p-6 pt-28 md:p-12 md:pt-32 font-sans">
      
      {/* Background ambient gradients */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

      <div className="z-10 w-full max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-slate-100">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{userName}</span>
          </h1>
          <p className="text-slate-400 text-lg">Here is an overview of your placement readiness.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-5">
            <div className="w-14 h-14 flex-none rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center ring-1 ring-blue-500/30">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Resume Score</p>
              <h3 className="text-3xl font-bold text-slate-100">{resumeScore}<span className="text-lg text-slate-500 ml-1">%</span></h3>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-5">
            <div className="w-14 h-14 flex-none rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center ring-1 ring-indigo-500/30">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Interviews Practiced</p>
              <h3 className="text-3xl font-bold text-slate-100">{interviewsPracticed}</h3>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-xl flex items-center gap-5">
            <div className="w-14 h-14 flex-none rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center ring-1 ring-purple-500/30">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Overall Readiness</p>
              <h3 className={`text-3xl font-bold ${readiness.color}`}>{readiness.text}</h3>
            </div>
          </div>

        </div>

        {/* Action Panel */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Ready for your next session?</h2>
            <p className="text-slate-400">Continue practicing mock interviews to refine your technical and behavioral responses.</p>
          </div>
          
          <Link to="/interview" className="whitespace-nowrap px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 hover:from-purple-600 to-indigo-500 hover:to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1">
            Start Mock Interview
          </Link>
        </div>

      </div>
    </div>
  );
}