
import React, { useState } from 'react';
import { Audiobook, Podcast } from '../types';

interface AudioLibraryProps {
  t: any;
  audiobooks: Audiobook[];
  podcasts: Podcast[];
  followedAudioIds: string[];
  followedPodcastIds: string[];
  onFollowItem: (id: string, type: 'audiobook' | 'podcast') => void;
  onUnfollowItem: (id: string, type: 'audiobook' | 'podcast') => void;
}

const AudioLibrary: React.FC<AudioLibraryProps> = ({ 
  t, audiobooks, podcasts, followedAudioIds, followedPodcastIds, onFollowItem, onUnfollowItem 
}) => {
  const [activeTab, setActiveTab] = useState<'audiobooks' | 'podcasts'>('audiobooks');

  const myItems = activeTab === 'audiobooks' 
    ? audiobooks.filter(a => followedAudioIds.includes(a.id))
    : podcasts.filter(p => followedPodcastIds.includes(p.id));

  const exploreItems = activeTab === 'audiobooks'
    ? audiobooks.filter(a => !followedAudioIds.includes(a.id))
    : podcasts.filter(p => !followedPodcastIds.includes(p.id));

  return (
    <div className="px-6 py-8 space-y-10 pb-24 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t.nav_audio}</h2>
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
          <button 
            onClick={() => setActiveTab('audiobooks')} 
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'audiobooks' ? 'bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}
          >
            Audiolibros
          </button>
          <button 
            onClick={() => setActiveTab('podcasts')} 
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'podcasts' ? 'bg-white dark:bg-slate-800 shadow-md text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}
          >
            Podcasts
          </button>
        </div>
      </div>

      {/* Mi Biblioteca */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2">
          {t.my_library}
        </h3>
        
        {myItems.length > 0 ? (
          <div className="space-y-4">
            {myItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 group">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={item.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
                    <div className="h-full bg-blue-500" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                    {'author' in item ? item.author : item.host}
                  </p>
                </div>
                <button 
                  onClick={() => onUnfollowItem(item.id, activeTab === 'audiobooks' ? 'audiobook' : 'podcast')} 
                  className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 text-center bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"/><path d="M12 12v.01"/><path d="M19 12h.01"/></svg>
            </div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 leading-relaxed max-w-[200px] mx-auto">
              {activeTab === 'audiobooks' ? t.empty_audiobooks : t.empty_podcasts}
            </p>
          </div>
        )}
      </section>

      {/* Explorar */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 pb-2">
          {t.explore_more}
        </h3>
        <div className="grid gap-6">
          {exploreItems.map(item => (
            <div key={item.id} className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
              <div className="flex gap-4 items-center">
                <div className="overflow-hidden rounded-2xl shadow-lg w-20 h-20 flex-shrink-0">
                  <img src={item.cover} className={`w-full h-full object-cover group-hover:scale-110 transition-transform ${activeTab === 'audiobooks' ? '' : 'rounded-full'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-white text-lg leading-tight line-clamp-2">{item.title}</h4>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest mt-1">
                    {'author' in item ? item.author : item.host}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic line-clamp-2">"{item.description}"</p>
              <button 
                onClick={() => onFollowItem(item.id, activeTab === 'audiobooks' ? 'audiobook' : 'podcast')}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-200 dark:shadow-none active:scale-95 transition-all"
              >
                {t.add_to_library}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AudioLibrary;
