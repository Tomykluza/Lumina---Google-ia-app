
import React from 'react';
import { READING_PLANS } from '../constants';

const Plans: React.FC = () => {
  return (
    <div className="px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Planes de Lectura</h2>
        <p className="text-slate-500 text-sm">Crece en tu fe con rutinas diarias.</p>
      </div>

      <div className="grid gap-6">
        {READING_PLANS.map(plan => (
          <div key={plan.id} className="group cursor-pointer">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-shadow">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/20">
                  {plan.durationDays} Días
                </div>
              </div>
            </div>
            <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{plan.title}</h3>
            <p className="text-slate-500 text-xs line-clamp-2 mt-1">{plan.description}</p>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <span>Progreso</span>
                <span>{Math.round((plan.completedDays.length / plan.durationDays) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000" 
                  style={{ width: `${(plan.completedDays.length / plan.durationDays) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">¿Buscas algo específico?</h3>
          <p className="text-blue-100 text-sm mb-4">Usa nuestra AI para encontrar un plan que se adapte a tu situación actual.</p>
          <button className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors">
            Chat con Consejero AI
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Plans;
