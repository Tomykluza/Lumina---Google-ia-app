
import React, { useState } from 'react';
import { ReadingPlan, Podcast, Audiobook, BibleVerse, View } from '../types';
import { MOCK_VERSES } from '../constants';
import VerseActionModal from './VerseActionModal';

interface HomeProps {
  t: any;
  plans: ReadingPlan[];
  followedPlanIds: string[];
  followedAudioIds: string[];
  followedPodcastIds: string[];
  podcasts: Podcast[];
  audiobooks: Audiobook[];
  onNavigate: (view: View) => void;
  onSelectPlan: (plan: ReadingPlan) => void;
  onFollowItem: (id: string, type: 'plan' | 'audiobook' | 'podcast') => void;
  onUnfollowItem: (id: string, type: 'plan' | 'audiobook' | 'podcast') => void;
}

const Home: React.FC<HomeProps> = ({ 
  t, plans, followedPlanIds, followedAudioIds, followedPodcastIds, podcasts, audiobooks, onNavigate, onSelectPlan, onFollowItem, onUnfollowItem 
}) => {
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const verseOfTheDay = MOCK_VERSES[0];

  const myPlans = plans.filter(p => followedPlanIds.includes(p.id));
  const explorePlans = plans.filter(p => !followedPlanIds.includes(p.id));

  return (
    <div className="px-6 py-6 space-y-10 pb-20 transition-colors">
      {/* Versículo del Día */}
      <section>
        <div 
          onClick={() => setSelectedVerse(verseOfTheDay)}
          className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl dark:shadow-none cursor-pointer active:scale-95 transition-all group"
        >
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[2000ms]" alt="Nature" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="relative p-8 space-y-4">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{t.verse_of_the_day}</span>
            <p className="bible-text text-2xl text-white font-bold leading-tight">"{verseOfTheDay.text}"</p>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-bold text-white/60">{verseOfTheDay.book} {verseOfTheDay.chapter}:{verseOfTheDay.number}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mis Planes */}
      {myPlans.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{t.my_plans}</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            {myPlans.map(plan => (
              <div key={plan.id} className="flex-shrink-0 w-64 space-y-3 group">
                <div onClick={() => onSelectPlan(plan)} className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md dark:shadow-none cursor-pointer">
                  <img src={plan.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${(plan.completedDays.length / plan.durationDays) * 100}%` }} />
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div onClick={() => onSelectPlan(plan)} className="flex-1 min-w-0 cursor-pointer">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1">{plan.title}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{plan.durationDays - plan.completedDays.length} {t.days_left}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Explorar Planes */}
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{t.explore_plans}</h3>
        <div className="grid gap-6">
          {explorePlans.slice(0, 2).map(plan => (
            <div key={plan.id} className="flex gap-5 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all group">
              <div onClick={() => onSelectPlan(plan)} className="relative flex-shrink-0 cursor-pointer">
                <img src={plan.image} className="w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div onClick={() => onSelectPlan(plan)} className="cursor-pointer">
                  <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{plan.title}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 leading-relaxed mt-1">{plan.description}</p>
                </div>
                <button onClick={() => onFollowItem(plan.id, 'plan')} className="mt-3 w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                  {t.follow_plan}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedVerse && <VerseActionModal verse={selectedVerse} onClose={() => setSelectedVerse(null)} onHighlight={() => {}} onSaveNote={() => {}} isHomeMode />}
    </div>
  );
};

export default Home;
