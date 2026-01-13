
import React from 'react';
import { ReadingPlan, Audiobook, Podcast } from '../../types';

interface AdminDashboardProps {
  plans: ReadingPlan[];
  audiobooks: Audiobook[];
  podcasts: Podcast[];
  onEdit: (item: any, type: any) => void;
  onDelete: (id: string, type: 'plan' | 'audiobook' | 'podcast') => void;
  onCreate: (type: 'plan' | 'audiobook' | 'podcast') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ plans, audiobooks, podcasts, onEdit, onDelete, onCreate }) => {
  return (
    <div className="px-6 py-8 space-y-8 pb-20 animate-in fade-in slide-in-from-right duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Panel Admin</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Gestión de contenidos de Lumina Bible.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-800 shadow-sm">
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Planes</p>
          <p className="text-3xl font-black text-blue-900 dark:text-white">{plans.length}</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800 shadow-sm">
          <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Multimedia</p>
          <p className="text-3xl font-black text-indigo-900 dark:text-white">{audiobooks.length + podcasts.length}</p>
        </div>
      </div>

      {/* Management Sections */}
      <div className="space-y-8">
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-widest">Planes de Lectura</h3>
            <button 
              onClick={() => onCreate('plan')}
              className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 active:scale-95 transition-all"
            >
              + NUEVO
            </button>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {plans.map(p => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={p.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{p.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.durationDays} Días</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onEdit(p, 'plan')} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => onDelete(p.id, 'plan')} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-widest">Multimedia</h3>
            <div className="flex gap-2">
              <button onClick={() => onCreate('audiobook')} className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">LIBRO</button>
              <button onClick={() => onCreate('podcast')} className="text-[9px] font-black text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">PODCAST</button>
            </div>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {[...audiobooks, ...podcasts].map((a: any) => (
              <div key={a.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={a.cover} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{a.title}</p>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${a.type === 'audiobook' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400'}`}>
                      {a.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => onEdit(a, a.type)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => onDelete(a.id, a.type)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
