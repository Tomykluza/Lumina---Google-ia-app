
export enum View {
  READ = 'read',
  PLANS = 'plans',
  AUDIO = 'audio',
  PROFILE = 'profile'
}

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  streak: number;
  lastVisit: string;
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

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  completedDays: number[];
  image: string;
}

export interface Audiobook {
  id: string;
  title: string;
  author: string;
  cover: string;
  chapters: { id: string; title: string; duration: string; url: string }[];
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  cover: string;
  episodes: { id: string; title: string; date: string; url: string }[];
}

export interface BibleVerse {
  id: string;
  number: number;
  text: string;
  chapter: number;
  book: string;
}
