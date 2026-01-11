
import React, { useState, useEffect, useCallback } from 'react';
import { View, User, Highlight, Note } from './types';
import Reader from './components/Reader';
import Plans from './components/Plans';
import AudioLibrary from './components/AudioLibrary';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.READ);
  const [user, setUser] = useState<User | null>(null);
  const [textSize, setTextSize] = useState(18);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const savedUser = localStorage.getItem('lumina_user');
    const savedHighlights = localStorage.getItem('lumina_highlights');
    const savedNotes = localStorage.getItem('lumina_notes');
    const savedTextSize = localStorage.getItem('lumina_text_size');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedTextSize) setTextSize(parseInt(savedTextSize));
  }, []);

  useEffect(() => {
    localStorage.setItem('lumina_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('lumina_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('lumina_text_size', textSize.toString());
  }, [textSize]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('lumina_user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  const toggleHighlight = (verseId: string, color: string) => {
    setHighlights(prev => {
      const existing = prev.find(h => h.verseId === verseId);
      if (existing && color === 'none') {
        return prev.filter(h => h.verseId !== verseId);
      }
      if (existing) {
        return prev.map(h => h.verseId === verseId ? { ...h, color } : h);
      }
      return [...prev, { verseId, color }];
    });
  };

  const saveNote = (verseId: string, content: string) => {
    setNotes(prev => {
      const existing = prev.find(n => n.verseId === verseId);
      if (existing) {
        return prev.map(n => n.verseId === verseId ? { ...n, content, date: new Date().toISOString() } : n);
      }
      return [...prev, { verseId, content, date: new Date().toISOString() }];
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20 max-w-lg mx-auto border-x border-slate-200 shadow-xl overflow-hidden relative">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif italic text-lg shadow-sm">L</span>
          Lumina
        </h1>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                🔥 {user.streak}
              </span>
            </div>
            <img 
              src={user.photo} 
              alt={user.name} 
              className="w-8 h-8 rounded-full border border-slate-200 object-cover cursor-pointer"
              onClick={() => setCurrentView(View.PROFILE)}
            />
          </div>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="text-sm font-semibold text-blue-600 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            Iniciar Sesión
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto">
        {currentView === View.READ && (
          <Reader 
            textSize={textSize} 
            highlights={highlights}
            notes={notes}
            onHighlight={toggleHighlight}
            onSaveNote={saveNote}
          />
        )}
        {currentView === View.PLANS && <Plans />}
        {currentView === View.AUDIO && <AudioLibrary />}
        {currentView === View.PROFILE && (
          <Profile 
            user={user} 
            textSize={textSize} 
            setTextSize={setTextSize} 
            onLogout={handleLogout}
            onLoginClick={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      <Navigation activeView={currentView} setView={setCurrentView} />

      {isAuthOpen && (
        <Auth onLogin={handleLogin} onClose={() => setIsAuthOpen(false)} />
      )}
    </div>
  );
};

export default App;
