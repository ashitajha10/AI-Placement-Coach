import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.title = "Home | AI Placement Coach";
  }, []);
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center p-6 pt-28 font-sans">
      
      {/* Background ambient gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 translate-y-1/3" />

      {/* Hero Header */}
      <div className="z-10 text-center max-w-3xl mb-16 px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm">
          AI Placement Coach
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
          Supercharge your career prep. Upload your resume to get instant actionable feedback, and ace your next interview with AI-powered mock questions.
        </p>
      </div>

      {/* Feature Cards Container */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        
        {/* Card 1: Resume Analyzer */}
        <Link to="/upload" className="group relative rounded-2xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-md hover:bg-white/[0.05] hover:border-blue-400/50 transition-all duration-300 flex flex-col items-start shadow-xl shadow-black/50 overflow-hidden transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-all duration-300" />
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 ring-1 ring-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Resume Analyzer</h2>
          <p className="text-slate-400 leading-relaxed font-light text-sm">
            Scan your resume against industry standards. Identify missing keywords and get actionable AI feedback to improve your score.
          </p>
        </Link>

        {/* Card 2: Mock Interviews */}
        <Link to="/interview" className="group relative rounded-2xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-md hover:bg-white/[0.05] hover:border-indigo-400/50 transition-all duration-300 flex flex-col items-start shadow-xl shadow-black/50 overflow-hidden transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -z-10 group-hover:bg-indigo-500/20 transition-all duration-300" />
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 ring-1 ring-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Mock Interviews</h2>
          <p className="text-slate-400 leading-relaxed font-light text-sm">
            Practice answering behavioral and technical questions dynamically generated to match your skill profile.
          </p>
        </Link>

        {/* Card 3: Dashboard & Progress */}
        <Link to="/dashboard" className="group relative rounded-2xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-md hover:bg-white/[0.05] hover:border-purple-400/50 transition-all duration-300 flex flex-col items-start shadow-xl shadow-black/50 overflow-hidden transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10 group-hover:bg-purple-500/20 transition-all duration-300" />
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 ring-1 ring-purple-500/30 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3">Your Progress</h2>
          <p className="text-slate-400 leading-relaxed font-light text-sm">
            Keep track of your performance, review past feedback, and continuously monitor your placement readiness.
          </p>
        </Link>
        
      </div>
    </div>
  );
}