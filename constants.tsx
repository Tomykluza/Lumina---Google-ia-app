
import React from 'react';
import { BibleVerse, Audiobook, Podcast, ReadingPlan } from './types';

export const COLORS = [
  { id: 'none', bg: 'bg-transparent', border: 'border-gray-200' },
  { id: 'yellow', bg: 'bg-yellow-200', border: 'border-yellow-400' },
  { id: 'blue', bg: 'bg-blue-200', border: 'border-blue-400' },
  { id: 'green', bg: 'bg-green-200', border: 'border-green-400' },
  { id: 'pink', bg: 'bg-pink-200', border: 'border-pink-400' },
];

export const MOCK_VERSES: BibleVerse[] = [
  { id: 'jn-1-1', number: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", chapter: 1, book: "Juan" },
  { id: 'jn-1-2', number: 2, text: "Este era en el principio con Dios.", chapter: 1, book: "Juan" },
  { id: 'jn-1-3', number: 3, text: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho.", chapter: 1, book: "Juan" },
  { id: 'jn-1-4', number: 4, text: "En él estaba la vida, y la vida era la luz de los hombres.", chapter: 1, book: "Juan" },
  { id: 'jn-1-5', number: 5, text: "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella.", chapter: 1, book: "Juan" },
  { id: 'ps-23-1', number: 1, text: "Jehová es mi pastor; nada me faltará.", chapter: 23, book: "Salmos" },
  { id: 'ps-23-2', number: 2, text: "En lugares de delicados pastos me hará descansar; Junto a aguas de reposo me pastoreará.", chapter: 23, book: "Salmos" },
  { id: 'ps-23-3', number: 3, text: "Confortará mi alma; Me guiará por sendas de justicia por amor de su nombre.", chapter: 23, book: "Salmos" },
];

export const READING_PLANS: ReadingPlan[] = [
  {
    id: 'p1',
    title: 'Sabiduría Diaria',
    description: '30 días de Proverbios para transformar tu mente.',
    durationDays: 30,
    completedDays: [1, 2],
    image: 'https://picsum.photos/seed/wisdom/400/300'
  },
  {
    id: 'p2',
    title: 'Paz en la Tormenta',
    description: 'Encuentra consuelo en los Salmos durante tiempos difíciles.',
    durationDays: 7,
    completedDays: [],
    image: 'https://picsum.photos/seed/peace/400/300'
  }
];

export const AUDIOBOOKS: Audiobook[] = [
  {
    id: 'a1',
    title: 'El Progreso del Peregrino',
    author: 'John Bunyan',
    cover: 'https://picsum.photos/seed/pilgrim/400/400',
    chapters: [
      { id: 'c1', title: 'Capítulo 1: La Ciudad de Destrucción', duration: '15:30', url: '#' },
      { id: 'c2', title: 'Capítulo 2: El Pantano de la Desconfianza', duration: '12:45', url: '#' }
    ]
  }
];

export const PODCASTS: Podcast[] = [
  {
    id: 'pod1',
    title: 'Café con Dios',
    host: 'Pastor Andrés',
    cover: 'https://picsum.photos/seed/coffee/400/400',
    episodes: [
      { id: 'e1', title: 'Viviendo con Propósito', date: '22 Mayo 2024', url: '#' },
      { id: 'e2', title: 'La Fuerza del Perdón', date: '15 Mayo 2024', url: '#' }
    ]
  }
];
