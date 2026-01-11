
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User | null;
  textSize: number;
  setTextSize: (size: number) => void;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, textSize, setTextSize, onLogout, onLoginClick }) => {
  return (
    <div className="px-6 py-8 space-y-10">
      {user ? (
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-xl" />
            <div className="absolute bottom-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-sm">
              🔥 {user.streak} DÍAS
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-slate-500 text-sm">{user.email}</p>
          <button 
            onClick={onLogout}
            className="mt-4 text-xs font-bold text-red-500 uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="bg-slate-100 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Sincroniza tu progreso</h2>
          <p className="text-slate-500 text-sm">Inicia sesión para guardar tus notas, resaltados y planes en todos tus dispositivos.</p>
          <button 
            onClick={onLoginClick}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200"
          >
            Iniciar Sesión con Google
          </button>
        </div>
      )}

      {/* Settings */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Configuración de Lectura</h3>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700">Tamaño del texto</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{textSize}px</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">A</span>
            <input 
              type="range" 
              min="14" 
              max="32" 
              value={textSize} 
              onChange={(e) => setTextSize(parseInt(e.target.value))}
              className="flex-1 accent-blue-600 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer"
            />
            <span className="text-xl text-slate-800">A</span>
          </div>
          <div className="pt-4 border-t border-slate-50">
            <p className="text-[10px] text-slate-400 leading-relaxed italic text-center">
              "Jehová es mi pastor; nada me faltará." (Vista Previa)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">General</h3>
          <div className="grid gap-2">
            {[
              { label: 'Notificaciones Diarias', icon: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>, color: 'text-indigo-500' },
              { label: 'Modo Oscuro', icon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>, color: 'text-slate-800' },
              { label: 'Idioma de la Biblia', icon: <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>, color: 'text-teal-500' },
            ].map((item, idx) => (
              <button key={idx} className="flex items-center gap-4 w-full p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={item.color}>
                  {item.icon}
                </svg>
                <span className="flex-1 text-sm font-semibold text-slate-700 text-left">{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 group-hover:translate-x-1 transition-transform">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
