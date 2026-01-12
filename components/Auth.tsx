
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: `u-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        photo: `https://ui-avatars.com/api/?name=${email}&background=2563EB&color=fff`,
        streak: 0,
        lastVisit: new Date().toISOString(),
        role: 'user'
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background Image Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale" 
          alt="Bible bg" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-950" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-8 space-y-12">
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] mx-auto flex items-center justify-center text-white font-serif italic text-5xl shadow-2xl shadow-blue-500/20 mb-6">L</div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Lumina</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xs mx-auto leading-relaxed">
            Tu viaje espiritual comienza aquí. Inicia sesión para guardar tu progreso.
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4">Correo Electrónico</label>
            <input 
              required
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-5 px-6 rounded-3xl text-slate-800 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Entrar con Google
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Lumina Bible App v2.0</p>
      </div>
    </div>
  );
};

export default Auth;
