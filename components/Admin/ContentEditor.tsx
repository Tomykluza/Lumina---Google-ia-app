
import React, { useState } from 'react';
import { AppContent, ContentType } from '../../types';

interface ContentEditorProps {
  type: ContentType;
  item?: AppContent;
  onSave: (item: AppContent) => void;
  onClose: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ type, item, onSave, onClose }) => {
  const [formData, setFormData] = useState<any>(item || {
    id: `id-${Date.now()}`,
    type: type,
    title: '',
    description: '',
    durationDays: 7,
    image: 'https://picsum.photos/800/600',
    cover: 'https://picsum.photos/400/400',
    author: '',
    host: '',
    completedDays: [],
    chapters: [],
    episodes: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          {item ? 'Editar' : 'Crear'} {type === 'plan' ? 'Plan' : type === 'audiobook' ? 'Audiolibro' : 'Podcast'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">Título</label>
            <input 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {type === 'plan' ? (
            <>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Descripción</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm h-24"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Duración (Días)</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
                  value={formData.durationDays}
                  onChange={e => setFormData({...formData, durationDays: parseInt(e.target.value)})}
                />
              </div>
            </>
          ) : type === 'audiobook' ? (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Autor</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Host</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
                value={formData.host}
                onChange={e => setFormData({...formData, host: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">URL de Imagen/Portada</label>
            <input 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm"
              value={type === 'plan' ? formData.image : formData.cover}
              onChange={e => setFormData({...formData, [type === 'plan' ? 'image' : 'cover']: e.target.value})}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-slate-500 bg-slate-100 rounded-xl">Cancelar</button>
            <button type="submit" className="flex-1 py-3 font-bold text-white bg-blue-600 rounded-xl">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentEditor;
