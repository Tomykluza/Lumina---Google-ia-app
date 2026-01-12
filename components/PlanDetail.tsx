
import React, { useState } from 'react';
import { ReadingPlan, UserReflection } from '../types';

interface PlanDetailProps {
  plan: ReadingPlan;
  reflections: UserReflection[];
  onAddReflection: (planId: string, dayNumber: number, text: string) => void;
  onUpdateReflection: (id: string, text: string) => void;
  onDeleteReflection: (id: string) => void;
  onToggleProgress: (planId: string, dayNumber: number, type: 'devotional' | 'passage') => void;
  onBack: () => void;
  t: any;
}

const PlanDetail: React.FC<PlanDetailProps> = ({ 
  plan, reflections, onAddReflection, onUpdateReflection, onDeleteReflection, onToggleProgress, onBack, t 
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [editingRefId, setEditingRefId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const activeDay = plan.days[activeDayIndex];
  const isDevotionalDone = plan.completedDevotionals.includes(activeDay.dayNumber);
  const isPassageDone = plan.completedPassages.includes(activeDay.dayNumber);
  const isDayFullyDone = plan.completedDays.includes(activeDay.dayNumber);

  const getDaysElapsed = () => {
    if (!plan.startDate) return 0;
    const start = new Date(plan.startDate);
    start.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return Math.floor(Math.abs(now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysElapsed = getDaysElapsed();
  const canMarkProgress = activeDay.dayNumber <= daysElapsed + 1;

  const dayReflections = reflections.filter(r => r.planId === plan.id && r.dayNumber === activeDay.dayNumber);

  const handleSave = () => {
    if (!inputText.trim()) return;
    if (editingRefId) {
      onUpdateReflection(editingRefId, inputText);
      setEditingRefId(null);
    } else {
      onAddReflection(plan.id, activeDay.dayNumber, inputText);
      setIsAdding(false);
    }
    setInputText('');
  };

  const startEdit = (ref: UserReflection) => {
    setEditingRefId(ref.id);
    setInputText(ref.text);
    setIsAdding(false);
  };

  return (
    <div className="animate-in slide-in-from-right duration-300 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero Portada */}
      <div className="relative h-64 w-full">
        <img src={plan.image} className="w-full h-full object-cover" alt={plan.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <button onClick={onBack} className="absolute top-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30 shadow-2xl active:scale-90 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="absolute bottom-8 left-8 right-8">
          <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">{plan.title}</h2>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-green-400" style={{ width: `${(plan.completedDays.length / plan.durationDays) * 100}%` }} />
            </div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{plan.completedDays.length}/{plan.durationDays} Días</span>
          </div>
        </div>
      </div>

      {/* Selector de Días */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20 shadow-sm transition-colors">
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-6 px-6 snap-x">
          {plan.days.map((day, idx) => {
            const isCompleted = plan.completedDays.includes(day.dayNumber);
            const isActive = idx === activeDayIndex;
            const isFuture = day.dayNumber > daysElapsed + 1;
            return (
              <button key={day.dayNumber} onClick={() => { setActiveDayIndex(idx); setIsAdding(false); setEditingRefId(null); }} className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all border-2 relative ${isCompleted ? 'bg-green-500 border-green-500 text-white shadow-lg' : isActive ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-xl shadow-blue-500/20' : isFuture ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-blue-400'}`}>
                {isFuture && !isActive && <div className="absolute -top-1 -right-1 bg-slate-400 text-white rounded-full p-0.5"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>}
                <span>{day.dayNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-8 space-y-8 pb-32 bg-slate-50/50 dark:bg-slate-950 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${!canMarkProgress ? 'bg-orange-400' : 'bg-blue-600 animate-pulse'}`} />
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Día {activeDay.dayNumber} {!canMarkProgress && `(Lectura anticipada)`}</h3>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{activeDay.title}</h4>
        </div>

        {/* Cajas de Contenido */}
        {[
          { type: 'devotional', title: 'Devocional', text: activeDay.devotional, isDone: isDevotionalDone },
          { type: 'passage', title: activeDay.bibleReference, text: `"${activeDay.bibleText}"`, isDone: isPassageDone, isBible: true }
        ].map((item, i) => (
          <div key={i} className={`group p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden bg-white dark:bg-slate-900 ${item.isDone ? 'border-green-200 dark:border-green-900 shadow-xl' : 'border-slate-100 dark:border-slate-800 shadow-md'}`}>
            {item.isDone && <div className="absolute top-0 left-0 w-2 h-full bg-green-500" />}
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className={`text-[10px] font-black uppercase tracking-widest ${item.isBible ? 'text-blue-500' : 'text-slate-400'}`}>{item.isBible ? item.title : 'Contenido'}</p>
                <h5 className="text-lg font-bold text-slate-900 dark:text-white">{item.isBible ? 'Palabra de Vida' : item.title}</h5>
              </div>
              <button 
                onClick={() => canMarkProgress ? onToggleProgress(plan.id, activeDay.dayNumber, item.type as any) : alert(t.wait_tomorrow)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${!canMarkProgress ? 'bg-slate-100 dark:bg-slate-800 text-slate-300' : item.isDone ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-600'}`}
              >
                {!canMarkProgress ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
              </button>
            </div>
            <p className={`text-slate-600 dark:text-slate-400 leading-relaxed ${item.isBible ? 'text-xl font-bold bible-text italic' : 'font-medium italic'}`}>{item.text}</p>
          </div>
        ))}

        {/* Mi Diario de Fe - CRUD */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between px-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </div>
              Mi Diario de Fe
            </label>
            {!isAdding && !editingRefId && (
              <button 
                onClick={() => { setIsAdding(true); setInputText(''); }}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                + Nueva Entrada
              </button>
            )}
          </div>

          {/* Formulario de Entrada */}
          {(isAdding || editingRefId) && (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border-2 border-blue-500/30 space-y-4 animate-in zoom-in duration-300 shadow-xl">
              <textarea 
                autoFocus
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Hoy Dios me habló sobre..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-6 text-slate-700 dark:text-slate-200 placeholder-slate-300 min-h-[140px] resize-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => { setIsAdding(false); setEditingRefId(null); setInputText(''); }}
                  className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/10 active:scale-95 transition-all"
                >
                  {editingRefId ? 'Actualizar' : 'Guardar Reflexión'}
                </button>
              </div>
            </div>
          )}

          {/* Lista de Reflexiones */}
          <div className="space-y-4">
            {dayReflections.length > 0 ? dayReflections.map(ref => (
              <div key={ref.id} className="group bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                    {new Date(ref.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(ref)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button onClick={() => onDeleteReflection(ref.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{ref.text}</p>
              </div>
            )) : !isAdding && (
              <div className="text-center py-10 opacity-40">
                <p className="text-xs font-bold italic">No hay reflexiones hoy. Comienza a escribir...</p>
              </div>
            )}
          </div>

          {canMarkProgress && isDayFullyDone && (
            <div className="bg-green-500 text-white p-6 rounded-[2rem] flex items-center gap-4 animate-in zoom-in duration-700 shadow-xl shadow-green-500/10">
              <div className="bg-white/20 p-3 rounded-2xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg></div>
              <div><p className="text-sm font-black uppercase tracking-widest">¡Día Completado!</p><p className="text-xs font-bold opacity-90">Sigue adelante, vas muy bien 🔥</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
