"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, User, Calendar, Award, RefreshCcw } from 'lucide-react';
import { IQuizResult } from '@/models/QuizResult';

export default function AdminPage() {
  const [results, setResults] = useState<IQuizResult[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Database className="w-8 h-8 text-indigo-500" />
              Tableau de Bord - Résultats
            </h1>
            <p className="text-slate-400">Consultez les résultats de tous les candidats ayant passé le QCM.</p>
          </div>
          
          <button 
            onClick={fetchResults}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-300">
              <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" /> Candidat
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" /> Score
                    </div>
                  </th>
                  <th className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-500">
                      Chargement des résultats...
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-500">
                      Aucun résultat trouvé.
                    </td>
                  </tr>
                ) : (
                  results.map((result, idx) => {
                    const percentage = Math.round((result.score / result.totalQuestions) * 100);
                    return (
                      <motion.tr 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={String(result._id)} 
                        className="border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="p-4 font-medium text-white">
                          {result.userName}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="font-bold text-white">
                              {result.score}/{result.totalQuestions}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full font-bold ${
                              percentage >= 50 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              {percentage}%
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-400 text-sm">
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
  );
}
