
import React from 'react';
import { AppContent, ReadingPlan, Audiobook, Podcast } from '../../types';

interface AdminDashboardProps {
  plans: ReadingPlan[];
  audiobooks: Audiobook[];
  podcasts: Podcast[];
  onEdit: (item: any, type: any) => void;
  onDelete: (id: string, type: string) => void;
  onCreate: (type: any) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ plans, audiobooks, podcasts, onEdit, onDelete, onCreate }) => {
  return (
    <div className="px-6 py-8 space-y-8 pb-20">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Panel de Control Web</h2>
        <p className="text-sm text-slate-500">Gestión centralizada de contenidos y archivos.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Planes Activos</p>
          <p className="text-2xl font-bold text-blue-900">{plans.length}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Audio Total</p>
          <p className="text-2xl font-bold text-indigo-900">{audiobooks.length + podcasts.length}</p>
        </div>
      </div>

      {/* Management Sections */}
      <div className="space-y-6">
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Gestionar Planes</h3>
            <button 
              onClick={() => onCreate({ type: 'plan' })}
              className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full"
            >
              + Nuevo Plan
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {plans.map(p => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{p.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{p.durationDays} Días</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(p, 'plan')} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button onClick={() => onDelete(p.id, 'plan')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Librería de Audio</h3>
            <div className="flex gap-2">
              <button onClick={() => onCreate({ type: 'audiobook' })} className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Libro</button>
              <button onClick={() => onCreate({ type: 'podcast' })} className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">Podcast</button>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {[...audiobooks, ...podcasts].map((a: any) => (
              <div key={a.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={a.cover} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{a.title}</p>
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${a.type === 'audiobook' ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'}`}>
                      {a.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(a, a.type)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
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
