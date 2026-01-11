
import React, { useState } from 'react';
import { AUDIOBOOKS, PODCASTS } from '../constants';
import { Audiobook, Podcast } from '../types';

const AudioLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audiobooks' | 'podcasts'>('audiobooks');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="px-6 py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Librería de Audio</h2>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mt-4">
          <button 
            onClick={() => setActiveTab('audiobooks')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'audiobooks' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
            }`}
          >
            Audiolibros
          </button>
          <button 
            onClick={() => setActiveTab('podcasts')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'podcasts' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'
            }`}
          >
            Podcasts
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'audiobooks' ? (
          AUDIOBOOKS.map(book => (
            <div key={book.id} className="space-y-4">
              <div 
                className="flex gap-4 items-center cursor-pointer group"
                onClick={() => setExpandedItem(expandedItem === book.id ? null : book.id)}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{book.title}</h3>
                  <p className="text-slate-500 text-sm">{book.author}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{book.chapters.length} Capítulos</p>
                </div>
                <div className={`transition-transform ${expandedItem === book.id ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              {expandedItem === book.id && (
                <div className="bg-slate-50 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  {book.chapters.map((chapter, idx) => (
                    <div key={chapter.id} className="flex items-center gap-4 p-4 hover:bg-white transition-colors cursor-pointer group border-b border-slate-100 last:border-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">{chapter.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{chapter.duration}</p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          PODCASTS.map(pod => (
            <div key={pod.id} className="space-y-4">
               <div 
                className="flex gap-4 items-center cursor-pointer group"
                onClick={() => setExpandedItem(expandedItem === pod.id ? null : pod.id)}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={pod.cover} alt={pod.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{pod.title}</h3>
                  <p className="text-slate-500 text-sm">Host: {pod.host}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{pod.episodes.length} Episodios</p>
                </div>
                <div className={`transition-transform ${expandedItem === pod.id ? 'rotate-180' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              {expandedItem === pod.id && (
                <div className="bg-slate-50 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                  {pod.episodes.map(ep => (
                    <div key={ep.id} className="flex items-center gap-4 p-4 hover:bg-white transition-colors cursor-pointer group border-b border-slate-100 last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">{ep.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{ep.date}</p>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-lg shadow-blue-200">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;
