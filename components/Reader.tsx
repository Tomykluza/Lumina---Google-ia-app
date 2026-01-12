
import React, { useState, useMemo } from 'react';
import { MOCK_VERSES, COLORS, BIBLE_BOOKS, BIBLE_VERSIONS } from '../constants';
import { Highlight, Note, BibleVerse, BibleBook, BibleVersion } from '../types';
import VerseActionModal from './VerseActionModal';

interface ReaderProps {
  textSize: number;
  highlights: Highlight[];
  notes: Note[];
  currentBook: BibleBook;
  currentChapter: number;
  currentVersion: BibleVersion;
  setCurrentBook: (book: BibleBook) => void;
  setCurrentChapter: (chapter: number) => void;
  setCurrentVersion: (version: BibleVersion) => void;
  onHighlight: (verseId: string, color: string) => void;
  onSaveNote: (verseId: string, content: string) => void;
}

const Reader: React.FC<ReaderProps> = ({ 
  textSize, highlights, notes, 
  currentBook, currentChapter, currentVersion,
  setCurrentBook, setCurrentChapter, setCurrentVersion,
  onHighlight, onSaveNote 
}) => {
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState<'none' | 'book' | 'version'>('none');
  const [selectorTab, setSelectorTab] = useState<'books' | 'chapters'>('books');

  const versesByChapter = useMemo(() => {
    return MOCK_VERSES.filter(v => 
      v.book === currentBook.name && 
      v.chapter === currentChapter && 
      v.versionId === currentVersion.id
    );
  }, [currentBook, currentChapter, currentVersion]);

  const getHighlightColor = (verseId: string) => {
    const h = highlights.find(h => h.verseId === verseId);
    if (!h) return '';
    const colorObj = COLORS.find(c => c.id === h.color);
    // Ajustar opacidad para dark mode
    return colorObj ? `${colorObj.bg} dark:bg-opacity-40` : '';
  };

  const hasNote = (verseId: string) => notes.some(n => n.verseId === verseId);

  return (
    <div className="min-h-full bg-[#fbfcfd] dark:bg-slate-950 flex flex-col relative transition-colors duration-300">
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm transition-colors">
        <div className="relative">
          <button 
            onClick={() => { setIsSelectorOpen(isSelectorOpen === 'book' ? 'none' : 'book'); setSelectorTab('books'); }}
            className={`flex items-center gap-2 group transition-all px-3 py-1.5 rounded-2xl ${isSelectorOpen === 'book' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'active:scale-95'}`}
          >
            <div className="text-left">
              <h3 className="text-lg font-black leading-none dark:text-white">{currentBook.name} {currentChapter}</h3>
              <span className={`text-[9px] font-bold uppercase tracking-widest ${isSelectorOpen === 'book' ? 'text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                {currentBook.testament === 'AT' ? 'Antiguo' : 'Nuevo'}
              </span>
            </div>
            <svg className={`transition-transform duration-300 dark:text-slate-400 ${isSelectorOpen === 'book' ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          {isSelectorOpen === 'book' && (
            <>
              <div className="fixed inset-0 z-[-1]" onClick={() => setIsSelectorOpen('none')} />
              <div className="absolute top-full left-0 mt-2 w-[85vw] max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-[60vh] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex border-b border-slate-50 dark:border-slate-800 flex-shrink-0">
                  <button onClick={() => setSelectorTab('books')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${selectorTab === 'books' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Libros</button>
                  <button onClick={() => setSelectorTab('chapters')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${selectorTab === 'chapters' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}>Capítulos</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  {selectorTab === 'books' ? (
                    <div className="space-y-6">
                      <section>
                        <h4 className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-3 ml-2">Antiguo</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {BIBLE_BOOKS.filter(b => b.testament === 'AT').map(book => (
                            <button key={book.id} onClick={() => { setCurrentBook(book); setSelectorTab('chapters'); }} className={`p-3 rounded-xl text-left text-xs font-bold transition-all ${currentBook.id === book.id ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>{book.name}</button>
                          ))}
                        </div>
                      </section>
                      <section>
                        <h4 className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-3 ml-2">Nuevo</h4>
                        <div className="grid grid-cols-2 gap-2 pb-4">
                          {BIBLE_BOOKS.filter(b => b.testament === 'NT').map(book => (
                            <button key={book.id} onClick={() => { setCurrentBook(book); setSelectorTab('chapters'); }} className={`p-3 rounded-xl text-left text-xs font-bold transition-all ${currentBook.id === book.id ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>{book.name}</button>
                          ))}
                        </div>
                      </section>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 pb-6">
                      {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(chap => (
                        <button key={chap} onClick={() => { setCurrentChapter(chap); setIsSelectorOpen('none'); }} className={`aspect-square flex items-center justify-center rounded-xl font-black text-xs transition-all ${currentChapter === chap ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>{chap}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <button 
          onClick={() => setIsSelectorOpen(isSelectorOpen === 'version' ? 'none' : 'version')}
          className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${isSelectorOpen === 'version' ? 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-blue-50'}`}
        >
          {currentVersion.name}
        </button>
      </div>

      <div className="flex-1 px-8 py-10 pb-32 max-w-2xl mx-auto w-full relative">
        <div className="bible-text leading-[1.8] select-none text-slate-800 dark:text-slate-200" style={{ fontSize: `${textSize}px` }}>
          {versesByChapter.length > 0 ? versesByChapter.map((verse) => (
            <span 
              key={verse.id}
              onClick={() => setSelectedVerse(verse)}
              className={`cursor-pointer transition-all duration-200 rounded px-1 py-0.5 relative inline ${getHighlightColor(verse.id)} hover:bg-slate-200/50 dark:hover:bg-slate-800/50 active:bg-blue-100 dark:active:bg-blue-900/30`}
            >
              <sup className="text-[0.6em] mr-1.5 text-blue-500 dark:text-blue-400 font-sans font-black">{verse.number}</sup>
              {verse.text}{' '}
              {hasNote(verse.id) && <span className="inline-flex w-1.5 h-1.5 rounded-full bg-blue-400 mb-2 ml-0.5 shadow-sm" />}
            </span>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40 dark:text-slate-500">
              <p className="font-bold text-sm italic">Texto no disponible en este demo.</p>
            </div>
          )}
        </div>
      </div>

      {selectedVerse && (
        <VerseActionModal 
          verse={selectedVerse}
          onClose={() => setSelectedVerse(null)}
          onHighlight={onHighlight}
          onSaveNote={onSaveNote}
          currentHighlight={highlights.find(h => h.verseId === selectedVerse.id)?.color}
          currentNote={notes.find(n => n.verseId === selectedVerse.id)?.content}
        />
      )}
    </div>
  );
};

export default Reader;
