
import { BibleVerse, ReadingPlan, Audiobook, Podcast, BibleBook, BibleVersion } from './types';

export const TRANSLATIONS = {
  es: {
    nav_home: 'Inicio',
    nav_bible: 'Biblia',
    nav_plans: 'Planes',
    nav_audio: 'Audio',
    nav_more: 'Más',
    verse_of_the_day: 'Versículo del día',
    my_plans: 'Mis Planes',
    explore_plans: 'Explorar Planes',
    continue_listening: 'Continuar Escuchando',
    settings_title: 'Configuración',
    settings_theme: 'Modo de Apariencia',
    settings_lang: 'Idioma de la App',
    settings_notifs: 'Notificaciones Diarias',
    settings_text_size: 'Tamaño del texto',
    logout: 'Cerrar Sesión',
    login_google: 'Iniciar Sesión con Google',
    sync_progress: 'Sincroniza tu progreso',
    days_left: 'días restantes',
    add_to_library: 'Añadir a biblioteca',
    follow_plan: 'Seguir Plan',
    theme_light: 'Claro',
    theme_dark: 'Oscuro',
    empty_audiobooks: 'Todavía no escuchaste ningún audiolibro',
    empty_podcasts: 'Todavía no escuchaste ningún podcast',
    my_library: 'Mi Biblioteca',
    explore_more: 'Explorar más',
    wait_tomorrow: 'Vuelve mañana para el próximo día',
    locked_day: 'Día bloqueado',
  },
  en: {
    nav_home: 'Home',
    nav_bible: 'Bible',
    nav_plans: 'Plans',
    nav_audio: 'Audio',
    nav_more: 'More',
    verse_of_the_day: 'Verse of the Day',
    my_plans: 'My Plans',
    explore_plans: 'Explore Plans',
    continue_listening: 'Continue Listening',
    settings_title: 'Settings',
    settings_theme: 'Appearance Mode',
    settings_lang: 'App Language',
    settings_notifs: 'Daily Notifications',
    settings_text_size: 'Text size',
    logout: 'Log Out',
    login_google: 'Sign in with Google',
    sync_progress: 'Sync your progress',
    days_left: 'days left',
    add_to_library: 'Add to library',
    follow_plan: 'Follow Plan',
    theme_light: 'Light',
    theme_dark: 'Dark',
    empty_audiobooks: "You haven't listened to any audiobooks yet",
    empty_podcasts: "You haven't listened to any podcasts yet",
    my_library: 'My Library',
    explore_more: 'Explore more',
    wait_tomorrow: 'Come back tomorrow for the next day',
    locked_day: 'Day locked',
  }
};

export const COLORS = [
  { id: 'none', bg: 'bg-transparent', border: 'border-gray-200' },
  { id: 'yellow', bg: 'bg-yellow-200', border: 'border-yellow-400' },
  { id: 'blue', bg: 'bg-blue-200', border: 'border-blue-400' },
  { id: 'green', bg: 'bg-green-200', border: 'border-green-400' },
  { id: 'pink', bg: 'bg-pink-200', border: 'border-pink-400' },
];

export const BIBLE_VERSIONS: BibleVersion[] = [
  { id: 'rvr1960', name: 'RVR1960', fullName: 'Reina-Valera 1960' },
  { id: 'nvi', name: 'NVI', fullName: 'Nueva Versión Internacional' },
];

export const BIBLE_BOOKS: BibleBook[] = [
  { id: 'gen', name: 'Génesis', chapters: 50, testament: 'AT' },
  { id: 'exo', name: 'Éxodo', chapters: 40, testament: 'AT' },
  { id: 'psa', name: 'Salmos', chapters: 150, testament: 'AT' },
  { id: 'pro', name: 'Proverbios', chapters: 31, testament: 'AT' },
  { id: 'mat', name: 'Mateo', chapters: 28, testament: 'NT' },
  { id: 'mar', name: 'Marcos', chapters: 16, testament: 'NT' },
  { id: 'luk', name: 'Lucas', chapters: 24, testament: 'NT' },
  { id: 'jhn', name: 'Juan', chapters: 21, testament: 'NT' },
  { id: 'act', name: 'Hechos', chapters: 28, testament: 'NT' },
  { id: 'rom', name: 'Romanos', chapters: 16, testament: 'NT' },
];

export const MOCK_VERSES: BibleVerse[] = [
  { id: 'rvr-jn-1-1', versionId: 'rvr1960', number: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", chapter: 1, book: "Juan" },
  { id: 'rvr-jn-1-2', versionId: 'rvr1960', number: 2, text: "Este era en el principio con Dios.", chapter: 1, book: "Juan" },
  { id: 'rvr-jn-1-3', versionId: 'rvr1960', number: 3, text: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho.", chapter: 1, book: "Juan" },
  { id: 'rvr-jn-1-4', versionId: 'rvr1960', number: 4, text: "En él estaba la vida, y la vida era la luz de los hombres.", chapter: 1, book: "Juan" },
  { id: 'rvr-jn-1-5', versionId: 'rvr1960', number: 5, text: "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella.", chapter: 1, book: "Juan" },
  { id: 'nvi-jn-1-1', versionId: 'nvi', number: 1, text: "En el principio ya existía el Verbo, y el Verbo estaba con Dios, y el Verbo era Dios.", chapter: 1, book: "Juan" },
  { id: 'nvi-jn-1-2', versionId: 'nvi', number: 2, text: "Él estaba con Dios en el principio.", chapter: 1, book: "Juan" },
  { id: 'nvi-jn-1-3', versionId: 'nvi', number: 3, text: "Por medio de él todas las cosas fueron creadas; sin él, nada de lo que existe fue creado.", chapter: 1, book: "Juan" },
  { id: 'nvi-jn-1-4', versionId: 'nvi', number: 4, text: "En él estaba la vida, y la vida era la luz de la humanidad.", chapter: 1, book: "Juan" },
  { id: 'nvi-jn-1-5', versionId: 'nvi', number: 5, text: "Esta luz resplandece en las tinieblas, y las tinieblas no han podido extinguirla.", chapter: 1, book: "Juan" },
];

const generateMockDays = (count: number): any[] => {
  return Array.from({ length: count }, (_, i) => ({
    dayNumber: i + 1,
    title: `Día ${i + 1}`,
    devotional: `Reflexión del día ${i + 1}...`,
    bibleReference: "Salmos 119:105",
    bibleText: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
  }));
};

export const INITIAL_PLANS: ReadingPlan[] = [
  {
    id: 'p-7-days',
    type: 'plan',
    title: 'Camino de Gracia',
    description: 'Un viaje de 7 días renovando tu fe.',
    durationDays: 7,
    completedDays: [],
    completedDevotionals: [],
    completedPassages: [],
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80',
    days: generateMockDays(7)
  }
];

export const INITIAL_AUDIOBOOKS: Audiobook[] = [
  {
    id: 'a1',
    type: 'audiobook',
    title: 'El Progreso del Peregrino',
    author: 'John Bunyan',
    description: 'Una alegoría clásica sobre la vida cristiana.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    progress: 35,
    chapters: [{ id: 'c1', title: 'Capítulo 1', duration: '15:30', url: '#' }]
  },
  {
    id: 'a2',
    type: 'audiobook',
    title: 'Mero Cristianismo',
    author: 'C.S. Lewis',
    description: 'Una defensa magistral de la fe cristiana.',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    progress: 0,
    chapters: [{ id: 'c1', title: 'Capítulo 1', duration: '12:45', url: '#' }]
  }
];

export const INITIAL_PODCASTS: Podcast[] = [
  {
    id: 'pod1',
    type: 'podcast',
    title: 'Café con Dios',
    host: 'Andrés Spyker',
    description: 'Reflexiones diarias para alimentar tu espíritu.',
    cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
    progress: 10,
    episodes: [{ id: 'e1', title: 'Nuevos Comienzos', date: '22 May', url: '#' }]
  },
  {
    id: 'pod2',
    type: 'podcast',
    title: 'Liderazgo y Fe',
    host: 'Pastor Cash Luna',
    description: 'Herramientas para liderar con principios bíblicos.',
    cover: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=80',
    progress: 0,
    episodes: [{ id: 'e1', title: 'Visión y Valor', date: '15 May', url: '#' }]
  }
];
