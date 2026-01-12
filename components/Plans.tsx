
import React from 'react';
import { ReadingPlan } from '../types';

interface PlansProps {
  plans: ReadingPlan[];
  followedPlanIds: string[];
  isAdmin?: boolean;
  onEdit: (plan: ReadingPlan) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  onSelectPlan: (plan: ReadingPlan) => void;
  onFollowPlan: (id: string) => void;
  onUnfollowPlan: (id: string) => void;
}

const Plans: React.FC<PlansProps> = ({ 
  plans, followedPlanIds, isAdmin, onEdit, onDelete, onCreate, onSelectPlan, onFollowPlan, onUnfollowPlan 
}) => {
  return (
    <div className="px-6 py-8 space-y-8 relative pb-24">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Planes de Lectura</h2>
          <p className="text-slate-500 text-sm">Crece en tu fe diariamente.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={onCreate}
            className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        )}
      </div>

      <div className="grid gap-8">
        {plans.map(plan => {
          const isFollowed = followedPlanIds.includes(plan.id);
          
          return (
            <div 
              key={plan.id} 
              className="group relative bg-white rounded-[2.5rem] p-3 border border-slate-100 shadow-sm transition-all hover:shadow-xl"
            >
              <div 
                onClick={() => onSelectPlan(plan)}
                className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-4 cursor-pointer"
              >
                <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-white border border-white/20 uppercase tracking-[0.2em]">
                    {plan.durationDays} Días
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(plan); }} className="bg-white/90 backdrop-blur p-2.5 rounded-full text-blue-600 shadow-sm hover:bg-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="px-4 pb-4 space-y-4">
                <div onClick={() => onSelectPlan(plan)} className="cursor-pointer">
                  <h3 className="font-bold text-slate-800 text-xl tracking-tight leading-tight">{plan.title}</h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">{plan.description}</p>
                </div>
                
                {isFollowed ? (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-blue-600">En progreso</span>
                      <span className="text-slate-400">{Math.round((plan.completedDays.length / plan.durationDays) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(plan.completedDays.length / plan.durationDays) * 100}%` }} />
                    </div>
                    <button 
                      onClick={() => onUnfollowPlan(plan.id)}
                      className="w-full py-3 text-red-500 text-xs font-black uppercase tracking-widest border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
                    >
                      Abandonar Plan
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => onFollowPlan(plan.id)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-200 active:scale-95 transition-all"
                  >
                    Seguir Plan
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
