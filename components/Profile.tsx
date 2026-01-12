
import React from 'react';
import { User, AppSettings } from '../types';

interface ProfileProps {
  t: any;
  user: User | null;
  textSize: number;
  setTextSize: (size: number) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ t, user, textSize, setTextSize, settings, onUpdateSettings, onLogout, onLoginClick }) => {
  return (
    <div className="px-6 py-8 space-y-10 pb-24 transition-colors">
      {user ? (
        <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
          <div className="relative mb-4">
            <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-xl" />
            <div className="absolute bottom-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white dark:border-slate-800 shadow-sm">
              🔥 {user.streak} DÍAS
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email}</p>
          <button 
            onClick={onLogout}
            className="mt-4 text-xs font-bold text-red-500 uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            {t.logout}
          </button>
        </div>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t.sync_progress}</h2>
          <button onClick={onLoginClick} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none">
            {t.login_google}
          </button>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-8">
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2">{t.settings_title}</h3>
          
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm divide-y dark:divide-slate-800 overflow-hidden">
            {/* Tema Switch */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.settings_theme}</span>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                  onClick={() => onUpdateSettings({ theme: 'light' })}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${settings.theme === 'light' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {t.theme_light}
                </button>
                <button 
                  onClick={() => onUpdateSettings({ theme: 'dark' })}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${settings.theme === 'dark' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {t.theme_dark}
                </button>
              </div>
            </div>

            {/* Idioma Select */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.settings_lang}</span>
              </div>
              <select 
                value={settings.language}
                onChange={(e) => onUpdateSettings({ language: e.target.value as 'es' | 'en' })}
                className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-xs font-black text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Notificaciones Toggle */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{t.settings_notifs}</span>
              </div>
              <button 
                onClick={() => onUpdateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                className={`w-12 h-6 rounded-full transition-all relative ${settings.notificationsEnabled ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.notificationsEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Text Size */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2">{t.settings_text_size}</h3>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{textSize}px</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-400 font-bold italic">A</span>
              <input 
                type="range" min="14" max="32" value={textSize} 
                onChange={(e) => setTextSize(parseInt(e.target.value))}
                className="flex-1 accent-blue-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer"
              />
              <span className="text-xl text-slate-800 dark:text-white font-serif">A</span>
            </div>
            <p className="bible-text text-center text-slate-400 dark:text-slate-500 italic opacity-60">"Jehová es mi pastor..."</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
