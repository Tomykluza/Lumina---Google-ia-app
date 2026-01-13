
import React, { useState } from 'react';
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
  onOpenDashboard?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ t, user, textSize, setTextSize, settings, onUpdateSettings, onLogout, onLoginClick, onOpenDashboard }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;
  
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}&bgcolor=f8fafc&margin=10`;
  const qrUrlDark = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}&bgcolor=0f172a&color=ffffff&margin=10`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{user.email}</p>
          {user.role === 'admin' && (
            <span className="bg-blue-100 text-blue-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest">Administrador</span>
          )}
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

      {/* Share Section with QR */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2">Llevar a mi Celular</h3>
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-inner">
            <img 
              src={settings.theme === 'dark' ? qrUrlDark : qrUrl} 
              alt="App QR Code" 
              className="w-48 h-48"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">¡Escanea y listo!</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Abre la cámara de tu móvil para entrar.</p>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 active:scale-95'}`}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                Enlace Copiado
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copiar Enlace
              </>
            )}
          </button>
        </div>
      </section>

      {/* Admin Panel Access */}
      {user?.role === 'admin' && (
        <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2">Herramientas</h3>
          <button 
            onClick={onOpenDashboard}
            className="w-full flex items-center justify-between p-6 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18"/><path d="M3 9h18"/></svg>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">Panel de Administración</p>
                <p className="text-blue-100 text-xs opacity-80">Gestionar planes, audio y contenido</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </section>
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
