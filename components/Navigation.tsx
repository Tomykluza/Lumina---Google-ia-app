
import React from 'react';
import { View } from '../types';

interface NavigationProps {
  activeView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeView, setView }) => {
  const tabs = [
    { id: View.READ, label: 'Biblia', icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /> },
    { id: View.PLANS, label: 'Planes', icon: <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /> },
    { id: View.AUDIO, label: 'Audio', icon: <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /> },
    { id: View.PROFILE, label: 'Más', icon: <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-slate-200 flex justify-around items-center px-4 py-2 z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setView(tab.id)}
          className={`flex flex-col items-center gap-1 p-2 transition-colors ${
            activeView === tab.id ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            {tab.icon}
          </svg>
          <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
