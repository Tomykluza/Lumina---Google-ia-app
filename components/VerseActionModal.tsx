
import React, { useState } from 'react';
import { BibleVerse } from '../types';
import { COLORS } from '../constants';
import { generateVerseImage } from '../services/geminiService';

interface VerseActionModalProps {
  verse: BibleVerse;
  onClose: () => void;
  onHighlight: (verseId: string, color: string) => void;
  onSaveNote: (verseId: string, content: string) => void;
  onReadContext?: (verse: BibleVerse) => void;
  currentHighlight?: string;
  currentNote?: string;
  isHomeMode?: boolean;
}

const VerseActionModal: React.FC<VerseActionModalProps> = ({ 
  verse, onClose, onHighlight, onSaveNote, onReadContext, currentHighlight, currentNote, isHomeMode 
}) => {
  const [noteText, setNoteText] = useState(currentNote || '');
  const [isSaving, setIsSaving] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleHighlight = (color: string) => {
    onHighlight(verse.id, color);
  };

  const handleSaveNote = () => {
    setIsSaving(true);
    onSaveNote(verse.id, noteText);
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    const img = await generateVerseImage(verse.text);
    if (img) setGeneratedImage(img);
    setIsGenerating(false);
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `Lumina-${verse.book}-${verse.chapter}-${verse.number}.png`;
    link.click();
  };

  const handleReadContextClick = () => {
    if (onReadContext) {
      onReadContext(verse);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full rounded-t-[3rem] max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="h-1.5 w-12 bg-slate-200 rounded-full mx-auto mt-4 mb-4" />
        
        <div className="px-8 pb-10 space-y-6">
          <div className="text-center">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{verse.book} {verse.chapter}:{verse.number}</h4>
            <p className="text-slate-800 font-serif italic text-xl leading-relaxed">"{verse.text}"</p>
          </div>

          {isHomeMode && (
            <button 
              onClick={handleReadContextClick}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-100 text-slate-800 font-bold hover:bg-slate-200 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
              Leer Contexto Completo
            </button>
          )}

          {!isHomeMode && (
            <>
              {/* Highlights */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resaltar</label>
                <div className="flex gap-3">
                  {COLORS.map(color => (
                    <button
                      key={color.id}
                      onClick={() => handleHighlight(color.id)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${color.bg} ${color.border} ${
                        currentHighlight === color.id ? 'ring-2 ring-blue-600 ring-offset-2 scale-110' : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notas</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Añade una reflexión personal..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[80px]"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar Nota'}
                </button>
              </div>
            </>
          )}

          {/* AI Image Generation */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compartir con Arte AI</label>
            {generatedImage ? (
              <div className="relative group rounded-3xl overflow-hidden shadow-xl animate-in zoom-in duration-500">
                <img src={generatedImage} alt="Verse" className="w-full aspect-square object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center">
                  <p className="text-white text-xs font-serif italic text-center mb-4 leading-relaxed">"{verse.text}"</p>
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={downloadImage}
                      className="flex-1 bg-white text-slate-900 text-xs font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                      Descargar Placa
                    </button>
                    <button 
                      onClick={() => setGeneratedImage(null)}
                      className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/30 hover:bg-white hover:text-black transition-colors"
                    >
                      Nueva
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGenerateImage}
                disabled={isGenerating}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Imaginando...</span>
                  </div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                    Crear Placa con IA
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseActionModal;
