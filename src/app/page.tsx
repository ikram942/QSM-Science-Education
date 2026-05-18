"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '@/data/questions';
import { CheckCircle2, Circle, ChevronRight, Send, RefreshCcw, GraduationCap, Sparkles, Brain, BookOpen } from 'lucide-react';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Floating background effect based on mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setStarted(true);
    }
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Veuillez répondre à toutes les questions avant de soumettre.");
      return;
    }

    setIsSubmitting(true);

    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          score: calculatedScore,
          totalQuestions: questions.length,
          answers,
        }),
      });

      if (response.ok) {
        setScore(calculatedScore);
        setIsFinished(true);
      } else {
        alert("Erreur lors de l'enregistrement des résultats.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement des résultats.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Result Screen
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const isSuccess = percentage >= 50;
    
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 py-12 relative overflow-x-hidden" style={{ backgroundImage: "url('/1.webp')" }}>
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-0 transition-all duration-1000 fixed"></div>
        
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
          className={`absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 ${isSuccess ? 'bg-emerald-500/20' : 'bg-rose-500/20'} rounded-full blur-[100px] pointer-events-none hidden sm:block`}
        />
        <motion.div 
          animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
          className={`absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 ${isSuccess ? 'bg-teal-500/20' : 'bg-orange-500/20'} rounded-full blur-[100px] pointer-events-none hidden sm:block`}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-lg w-full text-center"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
            className={`w-20 h-20 md:w-28 md:h-28 mx-auto mb-6 md:mb-8 rounded-full flex items-center justify-center border-4 shadow-2xl relative ${isSuccess ? 'bg-emerald-500/20 border-emerald-400/50 shadow-emerald-500/30' : 'bg-rose-500/20 border-rose-400/50 shadow-rose-500/30'}`}
          >
            {isSuccess ? <CheckCircle2 className="w-10 h-10 md:w-14 md:h-14 text-emerald-400 drop-shadow-md" /> : <RefreshCcw className="w-10 h-10 md:w-14 md:h-14 text-rose-400 drop-shadow-md" />}
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2 md:mb-3 drop-shadow-lg">
            {isSuccess ? 'Bravo,' : 'Dommage,'} <br/><span className="text-2xl md:text-3xl">{userName}!</span>
          </h2>
          <p className="text-slate-300 mb-8 md:mb-10 text-base md:text-lg font-medium">Votre test est maintenant terminé.</p>
          
          <div className="relative bg-slate-900/60 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 border border-white/5 shadow-inner overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <p className="text-xs md:text-sm text-slate-400 mb-2 md:mb-3 uppercase tracking-[0.2em] font-bold">Score Final</p>
            <div className="text-5xl md:text-7xl font-black text-white flex items-baseline justify-center gap-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2">
              {score} <span className="text-xl md:text-3xl text-slate-500 font-medium">/ {questions.length}</span>
            </div>
            
            <div className="w-full bg-slate-950/80 h-3 md:h-4 rounded-full mt-6 md:mt-8 overflow-hidden shadow-inner p-1 border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 2, delay: 0.8, ease: "circOut" }}
                className={`h-full rounded-full relative ${percentage >= 50 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]'}`}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12"></div>
              </motion.div>
            </div>
            <div className="mt-2 md:mt-3 text-right text-xs md:text-sm font-bold text-slate-400">{percentage}%</div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 md:gap-3 w-full py-4 md:py-5 px-4 md:px-6 bg-white text-slate-900 rounded-xl md:rounded-2xl transition-all font-black text-lg md:text-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-slate-50"
          >
            <RefreshCcw className="w-5 h-5 md:w-6 md:h-6" />
            Recommencer le test
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 py-12 relative overflow-x-hidden" style={{ backgroundImage: "url('/1.webp')" }}>
      {/* Dark overlay with dynamic backdrop blur */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md z-0 transition-all duration-1000 fixed"></div>

      {/* Floating abstract particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none fixed hidden sm:block">
        <motion.div animate={{ x: mousePosition.x * 3, y: mousePosition.y * 3 }} className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <motion.div animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }} className="absolute bottom-1/3 right-1/4 w-64 h-64 md:w-[30rem] md:h-[30rem] bg-cyan-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xl w-full mx-auto text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10 md:opacity-20 group-hover:opacity-40 transition-opacity">
                <Brain className="w-24 h-24 md:w-32 md:h-32 text-indigo-300 rotate-12" />
              </div>

              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-white/20 shadow-[0_0_40px_rgba(99,102,241,0.4)] rotate-3"
              >
                <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-white -rotate-3" />
              </motion.div>
              
              <div className="mb-8 md:mb-12 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-3 md:mb-4 drop-shadow-xl tracking-tight leading-tight">
                  Sciences de <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 animate-pulse">
                    l'Éducation
                  </span>
                </h1>
                <p className="text-slate-300 text-base md:text-xl font-medium px-4 md:px-0">Testez vos connaissances en pédagogie de manière interactive.</p>
              </div>
              
              <form onSubmit={handleStart} className="space-y-6 md:space-y-8 text-left relative z-10">
                <div className="relative">
                  <label htmlFor="name" className="block text-xs md:text-sm font-bold text-indigo-300 mb-2 md:mb-3 ml-2 uppercase tracking-wider">
                    Votre Identité
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                    <input
                      type="text"
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="relative w-full bg-slate-950/80 border border-white/10 text-white rounded-xl md:rounded-2xl px-5 md:px-6 py-4 md:py-5 outline-none transition-all placeholder:text-slate-600 text-lg md:text-xl font-bold focus:border-transparent"
                      placeholder="Saisissez votre nom..."
                      required
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 md:py-5 px-4 md:px-6 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_50px_rgba(79,70,229,0.6)] flex items-center justify-center gap-2 md:gap-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 animate-pulse relative z-10" />
                  <span className="relative z-10">Commencer</span>
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 p-4 sm:p-8 md:p-12 rounded-3xl md:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] w-full relative overflow-hidden"
            >
              {/* Question Progress Header */}
              <div className="relative z-10 flex flex-row justify-between items-center mb-4 md:mb-8 gap-2 border-b border-white/10 pb-4 md:pb-6">
                <div className="flex items-center gap-2 md:gap-4 flex-1">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-500/20 flex-shrink-0 flex items-center justify-center border border-indigo-500/30">
                    <BookOpen className="w-5 h-5 md:w-7 md:h-7 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] leading-none mb-1">Candidat</p>
                    <p className="text-white font-black text-base md:text-2xl tracking-wide leading-tight truncate max-w-[120px] sm:max-w-[200px]">{userName}</p>
                  </div>
                </div>
                <div className="bg-slate-900/80 px-3 md:px-6 py-1.5 md:py-3 rounded-lg md:rounded-2xl text-xs md:text-lg font-black border border-white/5 flex items-center gap-1.5 md:gap-3 shadow-inner">
                  <span className="text-indigo-400 whitespace-nowrap">Q. {currentQuestion + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">{questions.length}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative z-10 w-full bg-slate-900/80 h-1 md:h-2 rounded-full mb-5 md:mb-8 overflow-hidden shadow-inner border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                />
              </div>

              {/* Question Content inside AnimatePresence */}
              <div className="relative z-10 mb-5 md:mb-10 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-lg md:text-3xl font-black text-white mb-5 md:mb-8 leading-snug drop-shadow-md break-words">
                      {questions[currentQuestion].text}
                    </h2>

                    <div className="space-y-2.5 md:space-y-4">
                      {questions[currentQuestion].options.map((option, index) => {
                        const isSelected = answers[questions[currentQuestion].id] === option.id;
                        return (
                          <motion.button
                            key={option.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.015, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectOption(option.id)}
                            className={`w-full flex items-center p-3 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                              isSelected 
                                ? 'bg-indigo-600/20 border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)]' 
                                : 'bg-slate-900/60 border-white/5 hover:border-indigo-400/50 hover:bg-slate-800/80'
                            }`}
                          >
                            {isSelected && (
                              <motion.div 
                                layoutId={`selectedHighlight-${currentQuestion}`} 
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                            <div className="mr-3 md:mr-6 flex-shrink-0 relative z-10">
                              {isSelected ? (
                                <motion.div 
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/50"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 md:w-6 md:h-6 text-white" />
                                </motion.div>
                              ) : (
                                <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border-2 border-slate-600 group-hover:border-indigo-400/50 transition-colors"></div>
                              )}
                            </div>
                            <span className={`flex-1 text-sm md:text-xl relative z-10 transition-colors break-words whitespace-normal ${isSelected ? 'font-bold text-white' : 'font-medium text-slate-300 group-hover:text-white'}`}>
                              {option.text}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="relative z-10 flex justify-end pt-4 md:pt-6 border-t border-white/10">
                {currentQuestion < questions.length - 1 ? (
                  <motion.button
                    whileHover={answers[questions[currentQuestion].id] ? { scale: 1.05 } : {}}
                    whileTap={answers[questions[currentQuestion].id] ? { scale: 0.95 } : {}}
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto py-3 md:py-4 px-6 md:px-10 bg-white text-slate-900 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl md:rounded-2xl font-black text-base md:text-xl transition-all shadow-xl group"
                  >
                    Question Suivante
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={(!isSubmitting && Object.keys(answers).length === questions.length) ? { scale: 1.05 } : {}}
                    whileTap={(!isSubmitting && Object.keys(answers).length === questions.length) ? { scale: 0.95 } : {}}
                    onClick={handleSubmit}
                    disabled={isSubmitting || Object.keys(answers).length < questions.length}
                    className="flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto py-3 md:py-4 px-6 md:px-10 bg-gradient-to-r from-emerald-500 to-teal-400 text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-xl md:rounded-2xl font-black text-base md:text-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] group overflow-hidden relative"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 md:w-7 md:h-7 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10">Valider</span>
                        <Send className="w-4 h-4 md:w-6 md:h-6 relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
