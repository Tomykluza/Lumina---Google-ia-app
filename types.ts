
export enum View {
  HOME = 'home',
  READ = 'read',
  PLANS = 'plans',
  AUDIO = 'audio',
  PROFILE = 'profile',
  DASHBOARD = 'dashboard',
  PLAN_DETAIL = 'plan_detail'
}

export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  notificationsEnabled: boolean;
}

export interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  testament: 'AT' | 'NT';
}

export interface BibleVersion {
  id: string;
  name: string;
  fullName: string;
}

export type ContentType = 'plan' | 'audiobook' | 'podcast';

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  streak: number;
  lastVisit: string;
  role: 'admin' | 'user';
}

export interface Highlight {
  verseId: string;
  color: string;
}

export interface Note {
  verseId: string;
  content: string;
  date: string;
}

export interface UserReflection {
  id: string;
  planId: string;
  dayNumber: number;
  text: string;
  date: string;
}

export interface DayContent {
  dayNumber: number;
  title: string;
  devotional: string;
  bibleReference: string;
  bibleText: string;
}

export interface ReadingPlan {
  id: string;
  type: 'plan';
  title: string;
  description: string;
  durationDays: number;
  completedDays: number[];
  completedDevotionals: number[];
  completedPassages: number[];
  image: string;
  days: DayContent[];
  startDate?: string;
}

export interface Audiobook {
  id: string;
  type: 'audiobook';
  title: string;
  author: string;
  description: string;
  cover: string;
  progress: number;
  chapters: { id: string; title: string; duration: string; url: string }[];
}

export interface Podcast {
  id: string;
  type: 'podcast';
  title: string;
  host: string;
  description: string;
  cover: string;
  progress: number;
  episodes: { id: string; title: string; date: string; url: string }[];
}

export type AppContent = ReadingPlan | Audiobook | Podcast;

export interface BibleVerse {
  id: string;
  number: number;
  text: string;
  chapter: number;
  book: string;
  versionId: string;
}
