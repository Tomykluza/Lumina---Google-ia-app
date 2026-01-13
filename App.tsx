
import React, { useState, useEffect } from 'react';
import { View, User, Highlight, Note, ReadingPlan, Audiobook, Podcast, UserReflection, BibleBook, BibleVersion, AppSettings, AppContent } from './types';
import { INITIAL_PLANS, INITIAL_AUDIOBOOKS, INITIAL_PODCASTS, BIBLE_BOOKS, BIBLE_VERSIONS, TRANSLATIONS } from './constants';
import Home from './components/Home';
import Reader from './components/Reader';
import Plans from './components/Plans';
import PlanDetail from './components/PlanDetail';
import AudioLibrary from './components/AudioLibrary';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import AdminDashboard from './components/Admin/AdminDashboard';
import ContentEditor from './components/Admin/ContentEditor';
import AIAssistant from './components/AIAssistant';

const ADMIN_EMAIL = 'tonyklusacek@gmail.com';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [textSize, setTextSize] = useState(18);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reflections, setReflections] = useState<UserReflection[]>([]);
  
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    language: 'es',
    notificationsEnabled: true
  });

  const [currentBook, setCurrentBook] = useState<BibleBook>(BIBLE_BOOKS.find(b => b.id === 'jhn')!);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [currentVersion, setCurrentVersion] = useState<BibleVersion>(BIBLE_VERSIONS[0]);

  const [plans, setPlans] = useState<ReadingPlan[]>(INITIAL_PLANS);
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>(INITIAL_AUDIOBOOKS);
  const [podcasts, setPodcasts] = useState<Podcast[]>(INITIAL_PODCASTS);

  const [editingItem, setEditingItem] = useState<{ item?: AppContent, type: 'plan' | 'audiobook' | 'podcast' } | null>(null);

  const [followedPlanIds, setFollowedPlanIds] = useState<string[]>([]);
  const [followedAudioIds, setFollowedAudioIds] = useState<string[]>([]);
  const [followedPodcastIds, setFollowedPodcastIds] = useState<string[]>([]);
  const [activePlan, setActivePlan] = useState<ReadingPlan | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('lumina_user');
    const savedSettings = localStorage.getItem('lumina_settings');
    const savedHighlights = localStorage.getItem('lumina_highlights');
    const savedNotes = localStorage.getItem('lumina_notes');
    const savedReflections = localStorage.getItem('lumina_reflections');
    const savedFollowedPlans = localStorage.getItem('lumina_followed_plans');
    const savedFollowedAudio = localStorage.getItem('lumina_followed_audio');
    const savedFollowedPodcasts = localStorage.getItem('lumina_followed_podcasts');
    const savedPlans = localStorage.getItem('lumina_plans');
    const savedAudiobooks = localStorage.getItem('lumina_audiobooks');
    const savedPodcasts = localStorage.getItem('lumina_podcasts');

    if (savedUser) {
      const u = JSON.parse(savedUser) as User;
      // Robust check: trim spaces and lowercase
      if (u.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        u.role = 'admin';
      }
      setUser(u);
    }
    if (savedSettings) {
      const s = JSON.parse(savedSettings);
      setSettings(s);
      if (s.theme === 'dark') document.documentElement.classList.add('dark');
    }
    if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedReflections) setReflections(JSON.parse(savedReflections));
    if (savedFollowedPlans) setFollowedPlanIds(JSON.parse(savedFollowedPlans));
    if (savedFollowedAudio) setFollowedAudioIds(JSON.parse(savedFollowedAudio));
    if (savedFollowedPodcasts) setFollowedPodcastIds(JSON.parse(savedFollowedPodcasts));
    
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    if (savedAudiobooks) setAudiobooks(JSON.parse(savedAudiobooks));
    if (savedPodcasts) setPodcasts(JSON.parse(savedPodcasts));
  }, []);

  useEffect(() => { localStorage.setItem('lumina_plans', JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem('lumina_audiobooks', JSON.stringify(audiobooks)); }, [audiobooks]);
  useEffect(() => { localStorage.setItem('lumina_podcasts', JSON.stringify(podcasts)); }, [podcasts]);
  useEffect(() => { localStorage.setItem('lumina_followed_plans', JSON.stringify(followedPlanIds)); }, [followedPlanIds]);
  useEffect(() => { localStorage.setItem('lumina_highlights', JSON.stringify(highlights)); }, [highlights]);

  const handleLogin = (u: User) => {
    // Robust check on login
    const userWithRole: User = { 
      ...u, 
      role: (u.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) ? 'admin' : 'user' 
    };
    setUser(userWithRole);
    localStorage.setItem('lumina_user', JSON.stringify(userWithRole));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('lumina_settings', JSON.stringify(updated));
    if (newSettings.theme) {
      if (newSettings.theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  };

  const handleFollowItem = (id: string, type: 'plan' | 'audiobook' | 'podcast') => {
    if (type === 'plan') {
      setFollowedPlanIds(prev => !prev.includes(id) ? [...prev, id] : prev);
      setPlans(prev => prev.map(p => p.id === id && !p.startDate ? { ...p, startDate: new Date().toISOString() } : p));
    } else if (type === 'audiobook') {
      setFollowedAudioIds(prev => !prev.includes(id) ? [...prev, id] : prev);
    } else if (type === 'podcast') {
      setFollowedPodcastIds(prev => !prev.includes(id) ? [...prev, id] : prev);
    }
  };

  const handleUnfollowItem = (id: string, type: 'plan' | 'audiobook' | 'podcast') => {
    if (type === 'plan') setFollowedPlanIds(prev => prev.filter(p => p !== id));
    else if (type === 'audiobook') setFollowedAudioIds(prev => prev.filter(p => p !== id));
    else if (type === 'podcast') setFollowedPodcastIds(prev => prev.filter(p => p !== id));
  };

  const saveContent = (item: AppContent) => {
    if (item.type === 'plan') {
      setPlans(prev => prev.some(p => p.id === item.id) ? prev.map(p => p.id === item.id ? (item as ReadingPlan) : p) : [...prev, item as ReadingPlan]);
    } else if (item.type === 'audiobook') {
      setAudiobooks(prev => prev.some(a => a.id === item.id) ? prev.map(a => a.id === item.id ? (item as Audiobook) : a) : [...prev, item as Audiobook]);
    } else if (item.type === 'podcast') {
      setPodcasts(prev => prev.some(p => p.id === item.id) ? prev.map(p => p.id === item.id ? (item as Podcast) : p) : [...prev, item as Podcast]);
    }
    setEditingItem(null);
  };

  const deleteContent = (id: string, type: 'plan' | 'audiobook' | 'podcast') => {
    if (!confirm('¿Estás seguro de que deseas eliminar este contenido?')) return;
    if (type === 'plan') setPlans(prev => prev.filter(p => p.id !== id));
    else if (type === 'audiobook') setAudiobooks(prev => prev.filter(a => a.id !== id));
    else if (type === 'podcast') setPodcasts(prev => prev.filter(p => p.id !== id));
  };

  const t = TRANSLATIONS[settings.language];

  if (!user) {
    return <Auth onLogin={handleLogin} onClose={() => {}} />;
  }

  return (
    <div className={`flex flex-col h-full bg-slate-50 dark:bg-slate-950 max-w-lg mx-auto border-x border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative transition-colors duration-300`}>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center safe-top flex-shrink-0">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(View.HOME)}>
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif italic text-lg shadow-lg shadow-blue-500/20">L</span>
          Lumina
        </h1>
        <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition-all" onClick={() => setCurrentView(View.PROFILE)} />
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        {currentView === View.HOME && (
          <Home 
            t={t} plans={plans} 
            followedPlanIds={followedPlanIds} followedAudioIds={followedAudioIds} followedPodcastIds={followedPodcastIds}
            podcasts={podcasts} audiobooks={audiobooks} 
            onNavigate={setCurrentView} onSelectPlan={(plan) => { setActivePlan(plan); setCurrentView(View.PLAN_DETAIL); }}
            onFollowItem={handleFollowItem} onUnfollowItem={handleUnfollowItem}
          />
        )}

        {currentView === View.READ && (
          <Reader 
            textSize={textSize} highlights={highlights} notes={notes} 
            currentBook={currentBook} currentChapter={currentChapter} currentVersion={currentVersion}
            setCurrentBook={setCurrentBook} setCurrentChapter={setCurrentChapter} setCurrentVersion={setCurrentVersion}
            onHighlight={(id, c) => setHighlights(prev => {
              const others = prev.filter(h => h.verseId !== id);
              return c === 'none' ? others : [...others, { verseId: id, color: c }];
            })} 
            onSaveNote={(id, c) => setNotes(prev => [...prev.filter(n => n.verseId !== id), { verseId: id, content: c, date: new Date().toISOString() }])} 
          />
        )}

        {currentView === View.AI_STUDY && (
          <AIAssistant />
        )}
        
        {currentView === View.PROFILE && (
          <Profile 
            t={t} user={user} textSize={textSize} setTextSize={setTextSize} settings={settings}
            onUpdateSettings={updateSettings} onLogout={() => { setUser(null); localStorage.removeItem('lumina_user'); setCurrentView(View.HOME); }} 
            onLoginClick={() => {}} onOpenDashboard={() => setCurrentView(View.DASHBOARD)}
          />
        )}

        {currentView === View.PLANS && (
          <Plans 
            plans={plans} followedPlanIds={followedPlanIds}
            onSelectPlan={(plan) => { setActivePlan(plan); setCurrentView(View.PLAN_DETAIL); }}
            onFollowPlan={(id) => handleFollowItem(id, 'plan')}
            onUnfollowPlan={(id) => handleUnfollowItem(id, 'plan')}
            onEdit={(p) => setEditingItem({ item: p, type: 'plan' })} 
            onDelete={(id) => deleteContent(id, 'plan')} 
            onCreate={() => setEditingItem({ type: 'plan' })}
            isAdmin={user.role === 'admin'}
          />
        )}

        {currentView === View.AUDIO && (
          <AudioLibrary 
            t={t} audiobooks={audiobooks} podcasts={podcasts} 
            followedAudioIds={followedAudioIds} followedPodcastIds={followedPodcastIds}
            onFollowItem={handleFollowItem} onUnfollowItem={handleUnfollowItem}
          />
        )}

        {currentView === View.PLAN_DETAIL && activePlan && (
          <PlanDetail 
            plan={plans.find(p => p.id === activePlan.id)!} reflections={reflections}
            onAddReflection={(pid, day, txt) => setReflections(prev => [...prev, { id: Date.now().toString(), planId: pid, dayNumber: day, text: txt, date: new Date().toISOString() }])}
            onUpdateReflection={(id, txt) => setReflections(prev => prev.map(r => r.id === id ? { ...r, text: txt } : r))}
            onDeleteReflection={(id) => setReflections(prev => prev.filter(r => r.id !== id))}
            onToggleProgress={(planId, day, type) => {
               setPlans(prev => prev.map(p => {
                 if (p.id !== planId) return p;
                 const list = type === 'devotional' ? [...p.completedDevotionals] : [...p.completedPassages];
                 const newList = list.includes(day) ? list.filter(d => d !== day) : [...list, day];
                 const isDone = type === 'devotional' ? (newList.includes(day) && p.completedPassages.includes(day)) : (newList.includes(day) && p.completedDevotionals.includes(day));
                 return {
                   ...p,
                   [type === 'devotional' ? 'completedDevotionals' : 'completedPassages']: newList,
                   completedDays: isDone ? (p.completedDays.includes(day) ? p.completedDays : [...p.completedDays, day]) : p.completedDays.filter(d => d !== day)
                 };
               }));
            }}
            onBack={() => setCurrentView(View.HOME)} t={t}
          />
        )}

        {currentView === View.DASHBOARD && (
          <AdminDashboard 
            plans={plans} audiobooks={audiobooks} podcasts={podcasts}
            onEdit={(item, type) => setEditingItem({ item, type })}
            onDelete={deleteContent} onCreate={(type) => setEditingItem({ type })}
          />
        )}
      </main>

      {editingItem && (
        <ContentEditor 
          type={editingItem.type} item={editingItem.item} 
          onSave={saveContent} onClose={() => setEditingItem(null)} 
        />
      )}

      <Navigation activeView={currentView} setView={setCurrentView} t={t} />
    </div>
  );
};

export default App;
