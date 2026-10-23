/**
 * @file PublicationsSection.tsx
 * @description Sección de Publicaciones del portafolio personal de Margarita.
 * Presenta el catálogo editorial curado de obras, fanzines, ensayos y literatura expandida
 * con diseño limpio retro-digital, video de YouTube para Audiografemas y slides de imágenes
 * para el resto de títulos.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import {
  DarpanaSlide,
  DarpanaVideoSlide,
  DARPANA_GITHUB_IMAGES,
  DARPANA_PROD_IMAGES
} from './NewsSection';

export interface PublicationItem {
  id: string;
  year: string;
  badge: string;
  badgeColor?: string;
  title: string;
  highlightKeyword?: string;
  description: string;
  work?: string;
  publisher: string;
  location: string;
  format?: string;
  link?: string;
  videoUrl?: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 'pub-darpana-2026',
    year: '2026',
    badge: 'LITERATURA EXPANDIDA',
    badgeColor: '#00f0ff',
    title: 'DARPANA',
    highlightKeyword: 'DARPANA',
    work: 'Obra ganadora: DARPANA',
    description: 'Beca ganadora para la creación literaria cuento p con e. d.',
    publisher: 'IMCT',
    location: 'Bucaramanga, Colombia, 2026',
  },
  {
    id: 'pub-ovni-fancine-2023',
    year: '2023',
    badge: 'FANZINE',
    badgeColor: '#E024C3',
    title: 'OVNI FANCINE',
    highlightKeyword: 'OVNI FANCINE',
    description: `OVNI fanCine es una publicación y espacio virtual de circulación independiente donde amplifico textos y fotogramas de películas increíbles que quiero compartir | Concepto donde relaciono la Cinematografía con otras áreas del conocimiento y de la experiencia humana como:

Cine & Literatura-Poesía
Cine & Sonido-Música
Cine & Tecnología
Cine & Artes Plásticas
Cine & Naturaleza y Ecología del Consumo
Cine & Adicciones
Cine & Vejez-Enfermedad
Cine & Mundo Interior
Cine & Feminismo-Género
Cine & Afectividad Contemporánea
Cine & Diversidad Funcional`,
    publisher: 'Publicación independiente impresa en mi casa',
    location: 'Bucaramanga 2023',
    videoUrl: 'https://www.youtube.com/watch?v=4uRBn2mVOAs',
  },
  {
    id: 'pub-diario-cinefilo-2022',
    year: '2022',
    badge: 'BITÁCORA CINÉFILA',
    badgeColor: '#FF007F',
    title: 'MI DIARIO CINÉFILO',
    highlightKeyword: 'MI DIARIO CINÉFILO',
    description: `Bitácora cinéfila en formato digital con 6 experiencias diseñadas para recordar, compartir y conversar sobre tus películas favoritas.

Dinámicas pensadas para momentos de introspección o para detonar el diálogo con amigos y familia. ¡ Cierra la pantalla y activa la conversación !`,
    publisher: 'Publicación Independiente',
    location: 'Bucaramanga 2022',
  },
  {
    id: 'pub-voz-invisible-2021',
    year: '2021',
    badge: 'RELATO',
    badgeColor: '#E024C3',
    title: 'LA VOZ INVISIBLE',
    highlightKeyword: 'LA VOZ INVISIBLE',
    description: 'Relato testimonial y literario reconocido con la beca del Programa Nacional de Estímulos del Ministerio de Cultura (2021). Una propuesta introspectiva que aborda las realidades, sensaciones y formas de habitar el mundo desde la discapacidad auditiva.',
    publisher: 'Ministerio de Cultura',
    location: 'Bogotá, 2021',
  },
  {
    id: 'pub-audiografemas-2017',
    year: '2017',
    badge: 'E-LITERATURA',
    badgeColor: '#00f0ff',
    title: 'AUDIOGRAFEMAS',
    highlightKeyword: 'AUDIOGRAFEMAS',
    description: 'Historias sono-digitales donde utilizo la música como excusa para compartir lo que escribo. Algunas personas le llaman canciones, yo les llame: Audiografemas.',
    publisher: 'YOUTUBE',
    location: 'Bucaramanga, 2017',
    link: 'https://www.youtube.com/watch?v=90TqY9uL-Mo&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=4',
    videoUrl: 'https://www.youtube.com/watch?v=90TqY9uL-Mo&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=4',
  },
  {
    id: 'pub-synthetizadores-sonidos-marcianos-2017',
    year: '2017',
    badge: 'FANZINE',
    badgeColor: '#FF007F',
    title: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS',
    highlightKeyword: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS',
    description: 'Mecánica de la Escucha Espiritual',
    publisher: 'Publicación & Circulación Sonora',
    location: 'Bucaramanga, 2017',
  },
  {
    id: 'pub-bucaramanga-escribe-cuenta-2007',
    year: '2007',
    badge: 'ANTOLOGÍA',
    badgeColor: '#00f0ff',
    title: 'BUCARAMANGA ESCRIBE Y CUENTA',
    highlightKeyword: 'BUCARAMANGA ESCRIBE Y CUENTA',
    description: 'Antología 2006-2007',
    publisher: 'Alcaldía de Bucaramanga / IMCT',
    location: 'Bucaramanga, 2006-2007',
  },
];

export const BMANGA_ESCRIBE_CUENTA_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bmangaescribeycuenta/bmangaescribeycuenta1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bmangaescribeycuenta/bmangaescribeycuenta2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bmangaescribeycuenta/bmangaescribeycuenta3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bmangaescribeycuenta/bmangaescribeycuenta4.webp',
];

export const BMANGA_ESCRIBE_CUENTA_PROD_IMAGES = [
  '/images/bmangaescribeycuenta/bmangaescribeycuenta1.webp',
  '/images/bmangaescribeycuenta/bmangaescribeycuenta2.webp',
  '/images/bmangaescribeycuenta/bmangaescribeycuenta3.webp',
  '/images/bmangaescribeycuenta/bmangaescribeycuenta4.webp',
];

export const MI_DIARIO_CINEFILO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/midiariocinefilo/midiairocinefilo1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/midiariocinefilo/midiairocinefilo2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/midiariocinefilo/midiairocinefilo3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/midiariocinefilo/midiairocinefilo4.webp',
];

export const MI_DIARIO_CINEFILO_PROD_IMAGES = [
  '/images/midiariocinefilo/midiariocinefilo1.webp',
  '/images/midiariocinefilo/midiariocinefilo2.webp',
  '/images/midiariocinefilo/midiariocinefilo3.webp',
  '/images/midiariocinefilo/midiariocinefilo4.webp',
];

// Colecciones por defecto de registros visuales para cada una de las publicaciones
const PUB_DEFAULT_IMAGES: Record<string, string[]> = {
  'pub-darpana-2026': [],
  'pub-darpana-slide-1': [],
  'pub-darpana-slide-2': [],
  'pub-ovni-fancine-2023': [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-diario-cinefilo-2022': MI_DIARIO_CINEFILO_GITHUB_IMAGES,
  'pub-voz-invisible-2021': [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-synthetizadores-sonidos-marcianos-2017': [
    'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/hablemosdesynthes.webp',
  ],
  'pub-bucaramanga-escribe-cuenta-2007': BMANGA_ESCRIBE_CUENTA_GITHUB_IMAGES,
};

const GENERIC_PUB_IMAGES = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente de Video de YouTube integrado para Audiografemas u obras audiovisuales.
 */
interface PublicationYouTubeEmbedProps {
  publicationId: string;
  publicationTitle: string;
  defaultUrl: string;
  isFixed?: boolean;
}

const PublicationYouTubeEmbed: React.FC<PublicationYouTubeEmbedProps> = ({
  publicationId,
  publicationTitle,
  defaultUrl,
  isFixed = false,
}) => {
  const isUrlFixed = isFixed || publicationId === 'pub-ovni-fancine-2023';

  const [videoUrl, setVideoUrl] = useState<string>(() => {
    if (isUrlFixed) {
      try {
        localStorage.setItem(`margarita_pub_video_${publicationId}`, defaultUrl);
      } catch {
        // ignore
      }
      return defaultUrl;
    }
    try {
      const saved = localStorage.getItem(`margarita_pub_video_${publicationId}`);
      if (saved && (saved.includes('ScMzIvxBSi4') || saved.trim() === '')) {
        return defaultUrl;
      }
      return saved || defaultUrl;
    } catch {
      return defaultUrl;
    }
  });

  useEffect(() => {
    if (isUrlFixed) {
      setVideoUrl(defaultUrl);
      try {
        localStorage.setItem(`margarita_pub_video_${publicationId}`, defaultUrl);
      } catch {
        // ignore
      }
    }
  }, [defaultUrl, isUrlFixed, publicationId]);

  const getEmbedUrl = (raw: string) => {
    const videoMatch = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    const listMatch = raw.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    const indexMatch = raw.match(/[?&]index=(\d+)/);

    if (videoMatch && videoMatch[1]) {
      const videoId = videoMatch[1];
      let url = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
      if (listMatch && listMatch[1]) {
        url += `&list=${listMatch[1]}`;
        if (indexMatch && indexMatch[1]) {
          url += `&index=${indexMatch[1]}`;
        }
      }
      return url;
    }

    if (listMatch && listMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${listMatch[1]}&rel=0`;
    }

    return raw;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="my-3.5">
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/video shadow-md">
        {/* Capas de textura Glitch y escaneo CRT sutil */}
        <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

        {/* Reproductor de Video (Directo MP4 o Embebido de YouTube) */}
        {videoUrl.includes('.mp4') ? (
          <video
            src={videoUrl}
            controls
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            playsInline
            className="w-full h-full object-contain pointer-events-auto select-none"
            style={
              {
                userSelect: 'none',
                WebkitUserDrag: 'none',
                pointerEvents: 'auto',
              } as React.CSSProperties
            }
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={`/videos/${videoUrl.split('/').pop()}`} type="video/mp4" />
            Tu navegador no soporta reproducción de video HTML5.
          </video>
        ) : (
          <iframe
            src={embedUrl}
            title={`Video YouTube ${publicationTitle}`}
            className="w-full h-full border-0 pointer-events-auto"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

/**
 * Componente individual de Slide Glitch para cada publicación.
 */
interface PublicationGlitchSlideProps {
  publicationId: string;
  publicationTitle: string;
  fitMode?: 'cover' | 'contain';
  className?: string;
}

const PublicationGlitchSlide: React.FC<PublicationGlitchSlideProps> = ({
  publicationId,
  publicationTitle,
  fitMode,
  className,
}) => {
  const isContain =
    fitMode === 'contain' ||
    publicationId === 'pub-synthetizadores-sonidos-marcianos-2017' ||
    publicationId === 'pub-bucaramanga-escribe-cuenta-2007';

  const [images] = useState<string[]>(() => {
    if (
      publicationId === 'pub-darpana-2026' ||
      publicationId === 'pub-darpana-slide-1' ||
      publicationId === 'pub-darpana-slide-2'
    ) {
      try {
        localStorage.removeItem(`margarita_publication_slide_${publicationId}`);
      } catch {
        // ignore
      }
      return [];
    }

    // Si la publicación es Bucaramanga Escribe y Cuenta y se detecta despliegue en Hostinger / producción externa
    const isExternalProduction =
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      !window.location.hostname.includes('127.0.0.1') &&
      !window.location.hostname.includes('run.app') &&
      !window.location.hostname.includes('webcontainer') &&
      !window.location.hostname.includes('github.dev');

    let defaultList = PUB_DEFAULT_IMAGES[publicationId] || GENERIC_PUB_IMAGES;
    if (publicationId === 'pub-diario-cinefilo-2022' && isExternalProduction) {
      defaultList = MI_DIARIO_CINEFILO_PROD_IMAGES;
    } else if (publicationId === 'pub-bucaramanga-escribe-cuenta-2007' && isExternalProduction) {
      defaultList = BMANGA_ESCRIBE_CUENTA_PROD_IMAGES;
    }

    const saved = localStorage.getItem(`margarita_publication_slide_${publicationId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Si tiene registros antiguos que requieren sincronización, actualizar al recurso oficial
        if (
          (publicationId === 'pub-voz-invisible-2021' && Array.isArray(parsed) && parsed.length > 1) ||
          ((publicationId === 'pub-diario-cinefilo-2022' ||
            publicationId === 'pub-synthetizadores-sonidos-marcianos-2017' ||
            publicationId === 'pub-bucaramanga-escribe-cuenta-2007') &&
            Array.isArray(parsed) &&
            parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')))
        ) {
          try {
            localStorage.setItem(`margarita_publication_slide_${publicationId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultList;
      } catch {
        return defaultList;
      }
    }
    return defaultList;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={
        {
          userSelect: 'none',
          WebkitUserDrag: 'none',
        } as React.CSSProperties
      }
      className={`relative w-full rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide shadow-md select-none flex items-center justify-center ${
        className ? className : 'aspect-[16/9] sm:aspect-[16/10] my-3.5'
      }`}
    >
      {/* Capas de textura Glitch y escaneo CRT sutil sin halo */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {/* Imagen actual */}
      {images.length > 0 ? (
        <>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${publicationTitle} (${currentIndex + 1})`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105 pointer-events-none select-none protected-media"
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={
                {
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                } as React.CSSProperties
              }
              onError={(e) => {
                const target = e.currentTarget;
                const currentSrc = target.src;

                // Fallback para Mi Diario Cinéfilo (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('diariocinefilo') || currentSrc.includes('diairocinefilo')) {
                  const match = currentSrc.match(/midiariocinefilo\d+\.webp/) || currentSrc.match(/midiairocinefilo\d+\.webp/);
                  if (match) {
                    const numMatch = match[0].match(/\d+/);
                    const num = numMatch ? numMatch[0] : '1';
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/midiariocinefilo/midiariocinefilo${num}.webp`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/midiariocinefilo/midiairocinefilo${num}.webp`;
                    }
                  }
                  return;
                }

                // Fallback para Bmanga Escribe y Cuenta (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('bmangaescribeycuenta')) {
                  const match = currentSrc.match(/bmangaescribeycuenta\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/bmangaescribeycuenta/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bmangaescribeycuenta/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Hablemos de Synthes
                if (currentSrc.includes('raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/hablemosdesynthes.webp')) {
                  target.src = '/hablemosdesynthes.webp';
                } else if (currentSrc.endsWith('/hablemosdesynthes.webp')) {
                  target.src = 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/hablemosdesynthes.webp';
                }
              }}
            />
          </div>

          {/* Sombra gradual inferior (solo para imágenes en modo cover) */}
          {!isContain && (
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
          )}

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Indicadores de diapositivas */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? 'w-5 bg-[#00f0ff]'
                        : 'w-1.5 bg-white/40 hover:bg-white'
                    }`}
                    aria-label={`Diapositiva ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 font-mono-code text-[#7A7A96]">
          <ImageIcon className="w-7 h-7 text-[#00f0ff]/40 mb-1.5" />
          <span className="text-xs text-[#7A7A96]">DISPONIBLE PRÓXIMAMENTE</span>
        </div>
      )}
    </div>
  );
};

export const PublicationsSection: React.FC = () => {
  // Protección anti-descarga y anti-arrastre
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="publicaciones"
      role="region"
      aria-label="Publicaciones y Archivo Glitch"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN PUBLICACIONES */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#00f0ff] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer group"
            >
              <BookOpen className="w-5 h-5 text-[#00f0ff]" />
              <span>PUBLICACIONES</span>
            </button>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO EDITORIAL */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Grid editorial de publicaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {PUBLICATIONS_DATA.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between pb-8 border-b border-[#202030] group"
                  >
                    <div>
                      {/* Fila de metadatos: Año e insignia limpia en Dosis */}
                      <div className="flex items-center gap-2 font-dosis text-sm mb-1.5">
                        <span className="text-[#00f0ff] font-bold text-base">
                          {item.year}
                        </span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span
                          className="uppercase text-xs tracking-wider font-bold"
                          style={{ color: item.badgeColor || '#00f0ff' }}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Título Principal en tipografía Bahnschrift Condensed */}
                      <h3 className="font-bahnschrift-condensed font-light text-[14px] sm:text-[16px] text-[#F5F5FA] leading-snug tracking-wider uppercase group-hover:text-white transition-colors mb-2">
                        {(() => {
                          const cleanTitle = item.title;
                          if (item.highlightKeyword && cleanTitle.includes(item.highlightKeyword)) {
                            const idx = cleanTitle.indexOf(item.highlightKeyword);
                            return (
                              <>
                                <span className="font-semibold text-white">
                                  {cleanTitle.slice(0, idx + item.highlightKeyword.length)}
                                </span>
                                <span className="text-[#00f0ff] font-normal">
                                  {cleanTitle.slice(idx + item.highlightKeyword.length)}
                                </span>
                              </>
                            );
                          }
                          return cleanTitle;
                        })()}
                      </h3>

                      {/* Descripción de la obra o fanzine */}
                      <p className="font-rajdhani font-medium text-xs sm:text-[14px] text-[#A6A6C0] leading-relaxed mb-3 whitespace-pre-line">
                        {item.description}
                      </p>

                      {/* Entidad convocante / Editorial y ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0] pt-1">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00f0ff] hover:text-white font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>{item.publisher}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[#E0E0F0] font-semibold">{item.publisher}</span>
                        )}
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* DOS SLIDES DE IMÁGENES VACÍOS PARA DARPANA (UNO DEBAJO DEL OTRO LLENANDO EL EJE Y) */}
                    {item.id === 'pub-darpana-2026' ? (
                      <div className="mt-4 mb-2 w-full flex flex-col gap-4 flex-1 justify-between">
                        <PublicationGlitchSlide
                          publicationId="pub-darpana-slide-1"
                          publicationTitle="DARPANA - Slide 1"
                          className="w-full flex-1 min-h-[170px] sm:min-h-[200px]"
                        />
                        <PublicationGlitchSlide
                          publicationId="pub-darpana-slide-2"
                          publicationTitle="DARPANA - Slide 2"
                          className="w-full flex-1 min-h-[170px] sm:min-h-[200px]"
                        />
                      </div>
                    ) : item.videoUrl ? (
                      <PublicationYouTubeEmbed
                        publicationId={item.id}
                        publicationTitle={item.title}
                        defaultUrl={item.videoUrl}
                        isFixed={item.id === 'pub-ovni-fancine-2023'}
                      />
                    ) : (
                      <PublicationGlitchSlide
                        publicationId={item.id}
                        publicationTitle={item.title}
                        fitMode={
                          item.id === 'pub-synthetizadores-sonidos-marcianos-2017' ||
                          item.id === 'pub-bucaramanga-escribe-cuenta-2007'
                            ? 'contain'
                            : 'cover'
                        }
                      />
                    )}
                  </article>
                ))}
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
