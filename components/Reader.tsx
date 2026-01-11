
import React, { useState, useMemo } from 'react';
import { MOCK_VERSES, COLORS } from '../constants';
import { Highlight, Note, BibleVerse } from '../types';
import VerseActionModal from './VerseActionModal';

interface ReaderProps {
  textSize: number;
  highlights: Highlight[];
  notes: Note[];
  onHighlight: (verseId: string, color: string) => void;
  onSaveNote: (verseId: string, content: string) => void;
}

const Reader: React.FC<ReaderProps> = ({ textSize, highlights, notes, onHighlight, onSaveNote }) => {
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);

  const versesByChapter = useMemo(() => {
    // In a real app, this would be grouped or fetched by chapter
    return MOCK_VERSES;
  }, []);

  const getHighlightColor = (verseId: string) => {
    const h = highlights.find(h => h.verseId === verseId);
    if (!h) return '';
    const colorObj = COLORS.find(c => c.id === h.color);
    return colorObj ? colorObj.bg : '';
  };

  const hasNote = (verseId: string) => {
    return notes.some(n => n.verseId === verseId);
  };

  return (
    <div className="px-6 py-8 pb-24">
      <div className="mb-10 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Nuevo Testamento</h2>
        <h3 className="text-3xl font-serif font-bold text-slate-800">Juan 1</h3>
      </div>

      <div className="bible-text leading-relaxed select-none" style={{ fontSize: `${textSize}px` }}>
        {versesByChapter.map((verse) => (
          <span 
            key={verse.id}
            onClick={() => setSelectedVerse(verse)}
            className={`cursor-pointer transition-colors duration-200 rounded px-0.5 relative group ${getHighlightColor(verse.id)} hover:bg-slate-200/50`}
          >
            <sup className="text-[0.6em] mr-1 text-slate-400 font-sans font-bold">{verse.number}</sup>
            {verse.text}{' '}
            {hasNote(verse.id) && (
              <span className="inline-flex w-2 h-2 rounded-full bg-blue-400 mb-1 ml-0.5" />
            )}
          </span>
        ))}
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
