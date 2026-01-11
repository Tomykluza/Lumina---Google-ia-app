
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSimulatedGoogleLogin = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: 'user_123',
        name: 'Mateo González',
        email: 'mateo@ejemplo.com',
        photo: 'https://picsum.photos/seed/user1/200/200',
        streak: 15,
        lastVisit: new Date().toISOString()
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full rounded-[2.5rem] p-8 space-y-8 animate-in zoom-in duration-300 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white font-serif italic text-4xl shadow-xl shadow-blue-200 mb-6">L</div>
          <h2 className="text-3xl font-bold text-slate-900">Bienvenido</h2>
          <p className="text-slate-500 text-sm">Únete a nuestra comunidad de fe.</p>
        </div>

        <div className="space-y-4">
          <button 
            disabled={loading}
            onClick={handleSimulatedGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-4 rounded-2xl shadow-sm hover:bg-slate-50 transition-all active:scale-95 group relative overflow-hidden"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <svg viewBox="0 0 48 48" width="24" height="24" className="flex-shrink-0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="font-bold text-slate-700">Continuar con Google</span>
              </>
            )}
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">O también</span></div>
          </div>

          <button className="w-full py-4 rounded-2xl text-slate-500 font-bold text-sm hover:bg-slate-50 transition-colors">
            Crear cuenta con Email
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-400 px-8">
          Al continuar, aceptas nuestros <span className="underline">Términos de Servicio</span> y <span className="underline">Política de Privacidad</span>.
        </p>
      </div>
    </div>
  );
};

export default Auth;
