import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Interview() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [evaluating, setEvaluating] = useState({});

  useEffect(() => {
    document.title = "Interview Prep | AI Placement Coach";

    fetch("/api/interview", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleAnswerChange = (index, value) => {
    if (value.length <= 1000) {
      setAnswers((prev) => ({ ...prev, [index]: value }));
    }
  };

  const handleEvaluate = async (index, question) => {
    const answer = answers[index];
    if (!answer || answer.trim().length === 0) return;

    setEvaluating((prev) => ({ ...prev, [index]: true }));

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const data = await res.json();
      setEvaluations((prev) => ({ ...prev, [index]: data.feedback }));
      
      const practiced = parseInt(localStorage.getItem("interviewsPracticed") || "0") + 1;
      localStorage.setItem("interviewsPracticed", practiced.toString());
    } catch (err) {
      console.log(err);
      setEvaluations((prev) => ({ 
        ...prev, 
        [index]: "Evaluation unavailable at this moment. Ensure your answer follows the STAR method and clearly highlights your skills."
      }));
    } finally {
      setEvaluating((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="relative overflow-hidden flex flex-col items-center py-16 px-6 pt-28 font-sans">
      
      {/* Background ambient gradients */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none transform -translate-x-1/3 -translate-y-1/3" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none transform translate-x-1/3 translate-y-1/3" />

      <div className="z-10 w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Mock Interview
          </h1>
          <p className="text-slate-400">Practice your responses with these custom-tailored questions and get instant AI feedback.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400">Generating interview questions...</p>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col w-full">
            {questions.map((q, i) => (
              <div 
                key={i} 
                className="group relative bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:bg-white/[0.05] hover:border-indigo-500/50 transition-all duration-300 shadow-xl overflow-hidden w-full flex flex-col"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors" />
                <div className="flex gap-4 items-start pl-2 w-full">
                  <div className="flex-shrink-0 w-8 h-8 flex-none rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm ring-1 ring-indigo-500/30">
                    {i + 1}
                  </div>
                  <div className="flex flex-col w-full">
                    <h3 className="text-lg font-medium text-slate-200 leading-relaxed mb-4">{q}</h3>
                    
                    {!evaluations[i] ? (
                      <div className="flex flex-col space-y-3 w-full">
                        <textarea
                          placeholder="Type your answer here..."
                          className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 resize-y min-h-[120px] transition-colors"
                          value={answers[i] || ""}
                          onChange={(e) => handleAnswerChange(i, e.target.value)}
                        />
                        <div className="flex justify-between items-center w-full">
                          <span className={`text-xs ${answers[i]?.length === 1000 ? "text-yellow-400" : "text-slate-400"}`}>
                            {(answers[i] || "").length} / 1000 chars
                          </span>
                          <button 
                            onClick={() => handleEvaluate(i, q)}
                            disabled={evaluating[i] || !(answers[i]?.trim())}
                            className="text-sm px-5 py-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {evaluating[i] ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Evaluating...
                              </>
                            ) : "Get AI Feedback"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full mt-2">
                        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-4">
                          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Your Answer</span>
                          <p className="mt-2 text-sm text-slate-300 whitespace-pre-wrap">{answers[i]}</p>
                        </div>
                        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                          <h4 className="text-sm font-semibold text-indigo-300 flex items-center gap-2 mb-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            AI Evaluation
                          </h4>
                          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{evaluations[i]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}