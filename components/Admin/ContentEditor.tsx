
import React, { useState } from 'react';
import { AppContent, ContentType, ReadingPlan, Audiobook, Podcast, DayContent } from '../../types';

interface ContentEditorProps {
  type: ContentType;
  item?: any;
  onSave: (item: any) => void;
  onClose: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ type, item, onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'content'>('basic');
  
  const [formData, setFormData] = useState<any>(item || {
    id: `id-${Date.now()}`,
    type: type,
    title: '',
    description: '',
    durationDays: 7,
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    author: '',
    host: '',
    completedDays: [],
    completedDevotionals: [],
    completedPassages: [],
    progress: 0,
    chapters: [],
    episodes: [],
    days: Array.from({ length: 7 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Reflexión del Día ${i + 1}`,
      devotional: "Escribe aquí la reflexión...",
      bibleReference: "Referencia Bíblica",
      bibleText: "Texto bíblico..."
    }))
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateDay = (index: number, field: keyof DayContent, value: string) => {
    const newDays = [...formData.days];
    newDays[index] = { ...newDays[index], [field]: value };
    setFormData({ ...formData, days: newDays });
  };

  const addListItem = () => {
    if (type === 'audiobook') {
      setFormData({
        ...formData,
        chapters: [...formData.chapters, { id: `c-${Date.now()}`, title: 'Nuevo Capítulo', duration: '0:00', url: '#' }]
      });
    } else if (type === 'podcast') {
      setFormData({
        ...formData,
        episodes: [...formData.episodes, { id: `e-${Date.now()}`, title: 'Nuevo Episodio', date: new Date().toLocaleDateString(), url: '#' }]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-500 flex flex-col">
        
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {item ? 'Editar' : 'Crear'} {type === 'plan' ? 'Plan' : type === 'audiobook' ? 'Audiolibro' : 'Podcast'}
            </h2>
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => setActiveTab('basic')}
                className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'basic' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent'}`}
              >
                Información Básica
              </button>
              <button 
                onClick={() => setActiveTab('content')}
                className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'content' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent'}`}
              >
                Contenido Detallado
              </button>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-8">
            {activeTab === 'basic' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Título</label>
                  <input 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-sm font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Descripción</label>
                  <textarea 
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-sm font-medium text-slate-600 dark:text-slate-300 h-24 resize-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {type === 'plan' ? (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Días</label>
                      <input 
                        type="number"
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-sm font-bold text-slate-800 dark:text-white"
                        value={formData.durationDays}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 1;
                          setFormData({
                            ...formData, 
                            durationDays: val,
                            days: Array.from({ length: val }, (_, i) => formData.days[i] || {
                              dayNumber: i + 1, title: `Día ${i + 1}`, devotional: "", bibleReference: "", bibleText: ""
                            })
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">{type === 'audiobook' ? 'Autor' : 'Host'}</label>
                      <input 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-sm font-bold text-slate-800 dark:text-white"
                        value={type === 'audiobook' ? formData.author : formData.host}
                        onChange={e => setFormData({...formData, [type === 'audiobook' ? 'author' : 'host']: e.target.value})}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">Imagen (URL)</label>
                    <input 
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 text-sm font-medium text-blue-600 truncate"
                      value={type === 'plan' ? formData.image : formData.cover}
                      onChange={e => setFormData({...formData, [type === 'plan' ? 'image' : 'cover']: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {type === 'plan' && (
                  <div className="space-y-8">
                    {formData.days.map((day: DayContent, idx: number) => (
                      <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <h4 className="font-black text-blue-600 dark:text-blue-400 text-xs uppercase tracking-widest">Día {day.dayNumber}</h4>
                        <input 
                          placeholder="Título del día"
                          className="w-full bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-sm font-bold"
                          value={day.title}
                          onChange={e => updateDay(idx, 'title', e.target.value)}
                        />
                        <textarea 
                          placeholder="Reflexión devocional"
                          className="w-full bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-xs font-medium h-20 resize-none"
                          value={day.devotional}
                          onChange={e => updateDay(idx, 'devotional', e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            placeholder="Cita (Juan 3:16)"
                            className="bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-[10px] font-bold"
                            value={day.bibleReference}
                            onChange={e => updateDay(idx, 'bibleReference', e.target.value)}
                          />
                          <input 
                            placeholder="Texto bíblico"
                            className="bg-white dark:bg-slate-900 border-none rounded-xl p-3 text-[10px] font-medium"
                            value={day.bibleText}
                            onChange={e => updateDay(idx, 'bibleText', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(type === 'audiobook' || type === 'podcast') && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{type === 'audiobook' ? 'Capítulos' : 'Episodios'}</h4>
                      <button type="button" onClick={addListItem} className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">+ AÑADIR</button>
                    </div>
                    {(type === 'audiobook' ? formData.chapters : formData.episodes).map((item: any, idx: number) => (
                      <div key={item.id} className="flex gap-2 items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                        <input 
                          className="flex-1 bg-white dark:bg-slate-900 border-none rounded-xl p-2 text-xs font-bold"
                          value={item.title}
                          onChange={e => {
                            const list = type === 'audiobook' ? [...formData.chapters] : [...formData.episodes];
                            list[idx].title = e.target.value;
                            setFormData({ ...formData, [type === 'audiobook' ? 'chapters' : 'episodes']: list });
                          }}
                        />
                        <input 
                          className="w-20 bg-white dark:bg-slate-900 border-none rounded-xl p-2 text-[10px] font-medium text-center"
                          value={type === 'audiobook' ? item.duration : item.date}
                          onChange={e => {
                            const list = type === 'audiobook' ? [...formData.chapters] : [...formData.episodes];
                            list[idx][type === 'audiobook' ? 'duration' : 'date'] = e.target.value;
                            setFormData({ ...formData, [type === 'audiobook' ? 'chapters' : 'episodes']: list });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 font-black text-[11px] uppercase tracking-widest text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700 active:scale-95 transition-all">Cancelar</button>
          <button type="button" onClick={handleSubmit} className="flex-[2] py-4 font-black text-[11px] uppercase tracking-widest text-white bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Guardar Contenido</button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
