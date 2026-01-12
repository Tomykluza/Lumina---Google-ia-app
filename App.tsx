
import React, { useState, useEffect } from 'react';
import { View, User, Highlight, Note, ReadingPlan, Audiobook, Podcast, UserReflection, BibleBook, BibleVersion, AppSettings } from './types';
import { INITIAL_PLANS, INITIAL_AUDIOBOOKS, INITIAL_PODCASTS, BIBLE_BOOKS, BIBLE_VERSIONS, TRANSLATIONS } from './constants';
import Home from './components/Home';
import Reader from './components/Reader';
import Plans from './components/Plans';
import PlanDetail from './components/PlanDetail';
import AudioLibrary from './components/AudioLibrary';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Navigation from './components/Navigation';

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
    const savedPlansProgress = localStorage.getItem('lumina_plans_progress');

    if (savedUser) setUser(JSON.parse(savedUser));
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
    if (savedPlansProgress) setPlans(JSON.parse(savedPlansProgress));
  }, []);

  // Persistencia
  useEffect(() => { localStorage.setItem('lumina_followed_plans', JSON.stringify(followedPlanIds)); }, [followedPlanIds]);
  useEffect(() => { localStorage.setItem('lumina_followed_audio', JSON.stringify(followedAudioIds)); }, [followedAudioIds]);
  useEffect(() => { localStorage.setItem('lumina_followed_podcasts', JSON.stringify(followedPodcastIds)); }, [followedPodcastIds]);
  useEffect(() => { localStorage.setItem('lumina_plans_progress', JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem('lumina_reflections', JSON.stringify(reflections)); }, [reflections]);

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

  const handlePlanProgress = (planId: string, dayNumber: number, type: 'devotional' | 'passage') => {
    const targetPlan = plans.find(p => p.id === planId);
    if (!targetPlan) return;

    if (targetPlan.startDate) {
      const start = new Date(targetPlan.startDate);
      start.setHours(0, 0, 0, 0);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const diffDays = Math.floor(Math.abs(now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      if (dayNumber > diffDays + 1) {
        alert(TRANSLATIONS[settings.language].wait_tomorrow);
        return;
      }
    }

    setPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      let newDev = [...p.completedDevotionals];
      let newPass = [...p.completedPassages];
      if (type === 'devotional') {
        newDev = newDev.includes(dayNumber) ? newDev.filter(d => d !== dayNumber) : [...newDev, dayNumber];
      } else {
        newPass = newPass.includes(dayNumber) ? newPass.filter(d => d !== dayNumber) : [...newPass, dayNumber];
      }
      let newCompletedDays = [...p.completedDays];
      const isBothDone = newDev.includes(dayNumber) && newPass.includes(dayNumber);
      if (isBothDone) {
        if (!newCompletedDays.includes(dayNumber)) {
          newCompletedDays.push(dayNumber);
          if (user) setUser({ ...user, streak: user.streak + 1 });
        }
      } else {
        newCompletedDays = newCompletedDays.filter(d => d !== dayNumber);
      }
      return { ...p, completedDevotionals: newDev, completedPassages: newPass, completedDays: newCompletedDays };
    }));
  };

  const onAddReflection = (planId: string, day: number, text: string) => {
    const newRef: UserReflection = {
      id: `ref-${Date.now()}`,
      planId,
      dayNumber: day,
      text,
      date: new Date().toISOString()
    };
    setReflections(prev => [...prev, newRef]);
  };

  const onUpdateReflection = (id: string, text: string) => {
    setReflections(prev => prev.map(r => r.id === id ? { ...r, text, date: new Date().toISOString() } : r));
  };

  const onDeleteReflection = (id: string) => {
    setReflections(prev => prev.filter(r => r.id !== id));
  };

  const t = TRANSLATIONS[settings.language];

  // Si no hay usuario, mostrar el muro de login
  if (!user) {
    return <Auth onLogin={(u) => { setUser(u); localStorage.setItem('lumina_user', JSON.stringify(u)); }} onClose={() => {}} />;
  }

  return (
    <div className={`flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 max-w-lg mx-auto border-x border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden relative transition-colors duration-300`}>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center transition-colors">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(View.HOME)}>
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif italic text-lg">L</span>
          Lumina
        </h1>
        <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover cursor-pointer" onClick={() => setCurrentView(View.PROFILE)} />
      </header>

      <main className="flex-1 overflow-y-auto">
        {currentView === View.HOME && (
          <Home 
            t={t}
            plans={plans} 
            followedPlanIds={followedPlanIds}
            followedAudioIds={followedAudioIds}
            followedPodcastIds={followedPodcastIds}
            podcasts={podcasts} 
            audiobooks={audiobooks} 
            onNavigate={setCurrentView}
            onSelectPlan={(plan) => { setActivePlan(plan); setCurrentView(View.PLAN_DETAIL); }}
            onFollowItem={handleFollowItem}
            onUnfollowItem={handleUnfollowItem}
          />
        )}

        {currentView === View.READ && (
          <Reader 
            textSize={textSize} 
            highlights={highlights} 
            notes={notes} 
            currentBook={currentBook}
            currentChapter={currentChapter}
            currentVersion={currentVersion}
            setCurrentBook={setCurrentBook}
            setCurrentChapter={setCurrentChapter}
            setCurrentVersion={setCurrentVersion}
            onHighlight={(id, c) => setHighlights(prev => [...prev.filter(h => h.verseId !== id), { verseId: id, color: c }])} 
            onSaveNote={(id, c) => setNotes(prev => [...prev.filter(n => n.verseId !== id), { verseId: id, content: c, date: new Date().toISOString() }])} 
          />
        )}
        
        {currentView === View.PROFILE && (
          <Profile 
            t={t}
            user={user} 
            textSize={textSize} 
            setTextSize={setTextSize} 
            settings={settings}
            onUpdateSettings={updateSettings}
            onLogout={() => { setUser(null); localStorage.removeItem('lumina_user'); }} 
            onLoginClick={() => {}} 
          />
        )}

        {currentView === View.PLANS && (
          <Plans 
            plans={plans} 
            followedPlanIds={followedPlanIds}
            onSelectPlan={(plan) => { setActivePlan(plan); setCurrentView(View.PLAN_DETAIL); }}
            onFollowPlan={(id) => handleFollowItem(id, 'plan')}
            onUnfollowPlan={(id) => handleUnfollowItem(id, 'plan')}
            onEdit={() => {}} onDelete={() => {}} onCreate={() => {}}
          />
        )}

        {currentView === View.AUDIO && (
          <AudioLibrary 
            t={t}
            audiobooks={audiobooks} 
            podcasts={podcasts} 
            followedAudioIds={followedAudioIds}
            followedPodcastIds={followedPodcastIds}
            onFollowItem={handleFollowItem}
            onUnfollowItem={handleUnfollowItem}
          />
        )}

        {currentView === View.PLAN_DETAIL && activePlan && (
          <PlanDetail 
            plan={plans.find(p => p.id === activePlan.id)!}
            reflections={reflections}
            onAddReflection={onAddReflection}
            onUpdateReflection={onUpdateReflection}
            onDeleteReflection={onDeleteReflection}
            onToggleProgress={handlePlanProgress}
            onBack={() => setCurrentView(View.HOME)}
            t={t}
          />
        )}
      </main>

      <Navigation activeView={currentView} setView={setCurrentView} t={t} />
    </div>
  );
};

export default App;
