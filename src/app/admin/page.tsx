"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, User, Calendar, Award, RefreshCcw, Layers, Menu, X, Filter } from 'lucide-react';
import { IQuizResult } from '@/models/QuizResult';
import { chapters } from '@/data/questions';

export default function AdminPage() {
  const [results, setResults] = useState<IQuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    
    // Automatically close sidebar on mobile sizes initially
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const filteredResults = selectedChapterFilter 
    ? results.filter(r => r.chapterId === selectedChapterFilter || (selectedChapterFilter === 'general' && !r.chapterId))
    : results;

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
      
      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-full fixed md:relative z-30 shadow-2xl shrink-0 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-400" />
                Filtres
              </h2>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="md:hidden p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Chapitres</p>
              
              <button
                onClick={() => setSelectedChapterFilter(null)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 ${
                  selectedChapterFilter === null 
                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800/50'
                }`}
              >
                <Database className="w-4 h-4 opacity-70" />
                Tous les résultats
              </button>

              {chapters.map(chapter => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapterFilter(chapter.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 ${
                    selectedChapterFilter === chapter.id 
                      ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800/50'
                  }`}
                >
                  <Layers className="w-4 h-4 opacity-70 flex-shrink-0" />
                  <span className="line-clamp-2">{chapter.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {!isSidebarOpen && (
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-xl transition-all shadow-[0_0_15px_rgba(79,70,229,0.2)]"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
                  Tableau de Bord
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-medium flex items-center gap-2">
                  <span className="text-indigo-400 font-bold">{filteredResults.length}</span> résultats trouvés
                </p>
              </div>
            </div>
            
            <button 
              onClick={fetchResults}
              className="flex items-center gap-2 px-5 py-3 bg-white text-slate-900 font-bold hover:bg-slate-200 rounded-xl transition-all shadow-lg hover:shadow-xl w-full md:w-auto justify-center"
            >
              <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Actualiser les données
            </button>
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Loading Overlay */}
            <AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center"
                >
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 sticky top-0 backdrop-blur-md z-0">
                  <tr>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-400" /> Candidat
                    </th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-400" /> Chapitre
                      </div>
                    </th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-400" /> Score
                      </div>
                    </th>
                    <th className="p-5 font-bold uppercase tracking-wider text-xs">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-400" /> Date
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && filteredResults.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center">
                        <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                          <Database className="w-12 h-12 text-slate-600 mb-3" />
                          <p className="text-slate-400 font-medium">Aucun résultat trouvé pour cette sélection.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredResults.map((result, idx) => {
                      const percentage = Math.round((result.score / result.totalQuestions) * 100);
                      const isSuccess = percentage >= 50;
                      return (
                        <motion.tr 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={String(result._id)} 
                          className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors group"
                        >
                          <td className="p-5 font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {result.userName}
                          </td>
                          <td className="p-5">
                            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap">
                              {result.chapterTitle || "Général"}
                            </span>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="font-black text-white text-lg">
                                {result.score}<span className="text-slate-500 text-sm font-medium">/{result.totalQuestions}</span>
                              </div>
                              <div className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${
                                isSuccess 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              }`}>
                                {percentage}%
                              </div>
                            </div>
                          </td>
                          <td className="p-5 text-slate-400 text-sm font-medium">
                            {new Date(result.createdAt).toLocaleString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
