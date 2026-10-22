/**
 * @file ConversatoriosSection.tsx
 * @description Sección CONVERSATORIOS del portafolio personal de Margarita.
 * Reúne charlas, foros, simposios y espacios de diálogo sobre arte electrónico,
 * cultura maker, feminismo y tecnologías expandidas.
 * Presenta el catálogo editorial con diseño limpio retro-digital y un Slide Glitch
 * individual interactivo debajo de CADA título.
 */

import React, { useState, useCallback } from 'react';
import {
  Mic2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ConversatorioItem {
  id: string;
  year: string;
  badge: string;
  badgeColor?: string;
  title: string;
  highlightKeyword?: string;
  institution: string;
  location: string;
  description?: string;
}

export const CONVERSATORIOS_DATA: ConversatorioItem[] = [
  {
    id: 'mas-alla-del-algoritmo-2024',
    year: '2024',
    badge: 'CONVERSATORIO',
    badgeColor: '#00f0ff',
    title: 'MÁS ALLÁ DEL ALGORITMO: MUJERES Y CREATIVIDAD EN LA PROGRAMACIÓN',
    highlightKeyword: 'MÁS ALLÁ DEL ALGORITMO',
    institution: 'Librería Woolf',
    location: 'Bogotá, Colombia 2024',
  },
  {
    id: 'musiforo-unal-2021',
    year: '2021',
    badge: 'FORO',
    badgeColor: '#FF007F',
    title: 'MUSIFORO: "¿LA MÚSICA Y LXS ARTISTAS SON AJENOS A LA VIOLENCIA CONTRA LAS MUJERES?"',
    highlightKeyword: 'MUSIFORO',
    institution: 'Facultad de Minas UNAL',
    location: 'Medellín, Colombia 2021',
  },
  {
    id: 'sonorarteclab-cultura-maker-2021',
    year: '2021',
    badge: 'CHARLA',
    badgeColor: '#E024C3',
    title: 'SONORARTECLAB Y CULTURA MAKER',
    highlightKeyword: 'SONORARTECLAB Y CULTURA MAKER',
    institution: 'Makerspaces del Sistema de Bibliotecas Públicas de Medellín',
    location: 'Medellín, Colombia 2021',
  },
  {
    id: 'movimiento-cultura-maker-untref-2019',
    year: '2019',
    badge: 'SIMPOSIO',
    badgeColor: '#00f0ff',
    title: 'MOVIMIENTO Y CULTURA MAKER',
    highlightKeyword: 'MOVIMIENTO Y CULTURA MAKER',
    institution: 'Simposio Online UNTREF | Universidad Tres de Febrero',
    location: 'Buenos Aires, Argentina 2019',
  },
  {
    id: 'synthetizadores-sonidos-marcianos-2017',
    year: '2017',
    badge: 'CONVERSATORIO',
    badgeColor: '#FF007F',
    title: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS, MECÁNICA DE LA ESCUCHA ESPIRITUAL',
    highlightKeyword: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS',
    institution: 'Casa del Libro Total',
    location: 'Bucaramanga, Colombia 2017',
  },
  {
    id: 'audiografemas-poesia-analoga-2017',
    year: '2017',
    badge: 'CHARLA',
    badgeColor: '#E024C3',
    title: 'AUDIOGRAFEMAS: POESÍA ANÁLOGA SONORA',
    highlightKeyword: 'AUDIOGRAFEMAS: POESÍA ANÁLOGA SONORA',
    institution: 'Casa del Libro Total',
    location: 'Bucaramanga, Colombia 2017',
  },
  {
    id: 'cafe-y-fotogramas-2017',
    year: '2017',
    badge: 'CONVERSATORIO',
    badgeColor: '#00f0ff',
    title: 'CAFÉ Y FOTOGRAMAS',
    highlightKeyword: 'CAFÉ Y FOTOGRAMAS',
    institution: 'Casa del Libro Total',
    location: 'Bucaramanga, Colombia 2017',
  },
];

export const WOLF_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/wolf/wolf1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/wolf/wolf2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/wolf/wolf3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/wolf/wolf4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/wolf/wolf5.webp',
];

export const WOLF_PROD_IMAGES = [
  '/images/wolf/wolf1.webp',
  '/images/wolf/wolf2.webp',
  '/images/wolf/wolf3.webp',
  '/images/wolf/wolf4.webp',
  '/images/wolf/wolf5.webp',
];

export const MUSIFORO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/musiforo/musiforo2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/musiforo/musiforo1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/musiforo/musiforo3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/musiforo/musiforo4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/musiforo/musiforo5.webp',
];

export const MUSIFORO_PROD_IMAGES = [
  '/images/musiforo/musiforo2.webp',
  '/images/musiforo/musiforo1.webp',
  '/images/musiforo/musiforo3.webp',
  '/images/musiforo/musiforo4.webp',
  '/images/musiforo/musiforo5.webp',
];

export const BIBLIOLABS_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bibliolabs/bibliolabs1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bibliolabs/bibliolabs2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bibliolabs/bibliolabs3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bibliolabs/bibliolabs4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bibliolabs/bibliolabs5.webp',
];

export const BIBLIOLABS_PROD_IMAGES = [
  '/images/bibliolabs/bibliolabs1.webp',
  '/images/bibliolabs/bibliolabs2.webp',
  '/images/bibliolabs/bibliolabs3.webp',
  '/images/bibliolabs/bibliolabs4.webp',
  '/images/bibliolabs/bibliolabs5.webp',
];

export const UNTREF_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/untref/untref3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/untref/untref1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/untref/untref2.webp',
];

export const UNTREF_PROD_IMAGES = [
  '/images/untref/untref3.webp',
  '/images/untref/untref1.webp',
  '/images/untref/untref2.webp',
];

export const AUDIOGRAFEMAS_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/audiografemas9.webp',
];

export const AUDIOGRAFEMAS_PROD_IMAGES = [
  '/images/audiografemas/audiografemas1.webp',
  '/images/audiografemas/audiografemas2.webp',
  '/images/audiografemas/audiografemas3.webp',
  '/images/audiografemas/audiografemas4.webp',
  '/images/audiografemas/audiografemas5.webp',
  '/images/audiografemas/audiografemas6.webp',
  '/images/audiografemas/audiografemas7.webp',
  '/images/audiografemas/audiografemas8.webp',
  '/images/audiografemas/audiografemas9.webp',
];

export const HABLEMOSDESYNTHES_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/hablemosdesynthes/hablemosdesynthes3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/hablemosdesynthes/hablemosdesynthes1.webp',
];

export const HABLEMOSDESYNTHES_PROD_IMAGES = [
  '/images/hablemosdesynthes/hablemosdesynthes3.webp',
  '/images/hablemosdesynthes/hablemosdesynthes1.webp',
];

export const CAFEYFOTOGRAMAS_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cafeyfotogramas1.webp',
];

export const CAFEYFOTOGRAMAS_PROD_IMAGES = [
  '/images/cafeyfotogramas1.webp',
];

// Colecciones por defecto de registros fotográficos adaptadas a cada conversatorio
const CONVERSATORIO_DEFAULT_IMAGES: Record<string, string[]> = {
  'mas-alla-del-algoritmo-2024': WOLF_GITHUB_IMAGES,
  'musiforo-unal-2021': MUSIFORO_GITHUB_IMAGES,
  'sonorarteclab-cultura-maker-2021': BIBLIOLABS_GITHUB_IMAGES,
  'movimiento-cultura-maker-untref-2019': UNTREF_GITHUB_IMAGES,
  'synthetizadores-sonidos-marcianos-2017': HABLEMOSDESYNTHES_GITHUB_IMAGES,
  'audiografemas-poesia-analoga-2017': AUDIOGRAFEMAS_GITHUB_IMAGES,
  'cafe-y-fotogramas-2017': CAFEYFOTOGRAMAS_GITHUB_IMAGES,
};

const GENERIC_CONVERSATORIOS_IMAGES = [
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente individual de Slide Glitch para cada conversatorio.
 */
interface ConversatorioGlitchSlideProps {
  conversatorioId: string;
  conversatorioTitle: string;
}

const ConversatorioGlitchSlide: React.FC<ConversatorioGlitchSlideProps> = ({
  conversatorioId,
  conversatorioTitle,
}) => {
  const [images] = useState<string[]>(() => {
    const isExternalProduction = typeof window !== 'undefined' && 
      !window.location.hostname.includes('run.app') && 
      !window.location.hostname.includes('localhost') && 
      !window.location.hostname.includes('127.0.0.1');

    let defaultList = CONVERSATORIO_DEFAULT_IMAGES[conversatorioId] || GENERIC_CONVERSATORIOS_IMAGES;
    if (conversatorioId === 'mas-alla-del-algoritmo-2024') {
      defaultList = isExternalProduction ? WOLF_PROD_IMAGES : WOLF_GITHUB_IMAGES;
    } else if (conversatorioId === 'musiforo-unal-2021') {
      defaultList = isExternalProduction ? MUSIFORO_PROD_IMAGES : MUSIFORO_GITHUB_IMAGES;
    } else if (conversatorioId === 'sonorarteclab-cultura-maker-2021') {
      defaultList = isExternalProduction ? BIBLIOLABS_PROD_IMAGES : BIBLIOLABS_GITHUB_IMAGES;
    } else if (conversatorioId === 'movimiento-cultura-maker-untref-2019') {
      defaultList = isExternalProduction ? UNTREF_PROD_IMAGES : UNTREF_GITHUB_IMAGES;
    } else if (conversatorioId === 'synthetizadores-sonidos-marcianos-2017') {
      defaultList = isExternalProduction ? HABLEMOSDESYNTHES_PROD_IMAGES : HABLEMOSDESYNTHES_GITHUB_IMAGES;
    } else if (conversatorioId === 'audiografemas-poesia-analoga-2017') {
      defaultList = isExternalProduction ? AUDIOGRAFEMAS_PROD_IMAGES : AUDIOGRAFEMAS_GITHUB_IMAGES;
    } else if (conversatorioId === 'cafe-y-fotogramas-2017') {
      defaultList = isExternalProduction ? CAFEYFOTOGRAMAS_PROD_IMAGES : CAFEYFOTOGRAMAS_GITHUB_IMAGES;
    }

    const saved = localStorage.getItem(`margarita_conversatorio_slide_${conversatorioId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Migrar automáticamente si contiene enlaces antiguos de Unsplash o no tiene exactamente 5 imágenes para Wolf
        if (
          conversatorioId === 'mas-alla-del-algoritmo-2024' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length !== 5)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar automáticamente si contiene enlaces antiguos o no tiene musiforo2 como portada para Musiforo
        if (
          conversatorioId === 'musiforo-unal-2021' &&
          Array.isArray(parsed) &&
          (!parsed[0]?.includes('musiforo2') ||
            parsed.some((url: string) => typeof url === 'string' && (url.includes('unsplash.com') || !url.includes('musiforo'))) ||
            parsed.length !== 5)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar automáticamente si contiene enlaces antiguos de Unsplash o no tiene exactamente 5 imágenes para Bibliolabs
        if (
          conversatorioId === 'sonorarteclab-cultura-maker-2021' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && (url.includes('unsplash.com') || !url.includes('bibliolabs'))) || parsed.length !== 5)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar automáticamente si contiene enlaces antiguos o no tiene untref3 como portada para UNTREF
        if (
          conversatorioId === 'movimiento-cultura-maker-untref-2019' &&
          Array.isArray(parsed) &&
          (!parsed[0]?.includes('untref3') ||
            parsed.some((url: string) => typeof url === 'string' && (url.includes('unsplash.com') || !url.includes('untref'))) ||
            parsed.length !== 3)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar automáticamente si contiene enlaces antiguos, contiene hablemosdesynthes2, no tiene hablemosdesynthes3 como portada o no tiene exactamente 2 imágenes para Hablemos de Synthes
        if (
          conversatorioId === 'synthetizadores-sonidos-marcianos-2017' &&
          Array.isArray(parsed) &&
          (!parsed[0]?.includes('hablemosdesynthes3') ||
            parsed.some((url: string) => typeof url === 'string' && (url.includes('unsplash.com') || !url.includes('hablemosdesynthes') || url.includes('hablemosdesynthes2'))) ||
            parsed.length !== 2)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar automáticamente si contiene enlaces antiguos de Unsplash o no tiene exactamente 9 imágenes para Audiografemas
        if (
          conversatorioId === 'audiografemas-poesia-analoga-2017' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && (url.includes('unsplash.com') || !url.includes('audiografemas'))) || parsed.length !== 9)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar automáticamente si contiene enlaces antiguos de Unsplash o no contiene cafeyfotogramas para Café y Fotogramas
        if (
          conversatorioId === 'cafe-y-fotogramas-2017' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && (url.includes('unsplash.com') || !url.includes('cafeyfotogramas'))) || parsed.length !== 1)
        ) {
          try {
            localStorage.setItem(`margarita_conversatorio_slide_${conversatorioId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
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
      className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide my-3.5 shadow-md select-none flex items-center justify-center"
    >
      {/* Capas de textura Glitch y escaneo CRT sutil sin halo */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {/* Imagen actual */}
      {images.length > 0 ? (
        <>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex]}
              alt={`${conversatorioTitle} (${currentIndex + 1})`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105 pointer-events-none select-none"
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
                if (currentSrc.includes('wolf')) {
                  const match = currentSrc.match(/wolf\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/wolf/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/wolf/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('musiforo')) {
                  const match = currentSrc.match(/musiforo\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/musiforo/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/musiforo/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('bibliolabs')) {
                  const match = currentSrc.match(/bibliolabs\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/bibliolabs/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bibliolabs/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('untref')) {
                  const match = currentSrc.match(/untref\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/untref/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/untref/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('audiografemas')) {
                  const match = currentSrc.match(/audiografemas\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/audiografemas/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/audiografemas/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('hablemosdesynthes')) {
                  const match = currentSrc.match(/hablemosdesynthes\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/hablemosdesynthes/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/hablemosdesynthes/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('cafeyfotogramas')) {
                  if (currentSrc.includes('raw.githubusercontent.com')) {
                    target.src = '/images/cafeyfotogramas1.webp';
                  } else {
                    target.src = 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cafeyfotogramas1.webp';
                  }
                }
              }}
            />
          </div>

          {/* Sombra gradual inferior */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

          {/* Contador de diapositivas */}
          {images.length > 1 && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[11px] font-mono-code text-[#E0E0F0] pointer-events-none z-20">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Indicadores de diapositivas */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 max-w-[85%] overflow-x-auto scrollbar-none px-2 py-0.5">
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
                        ? 'w-5 bg-[#FF007F]'
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
          <ImageIcon className="w-7 h-7 text-[#FF007F]/40 mb-1.5" />
          <span className="text-xs text-[#7A7A96]">DISPONIBLE PRÓXIMAMENTE</span>
        </div>
      )}
    </div>
  );
};

export const ConversatoriosSection: React.FC = () => {
  // Content protection
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="conversatorios"
      role="region"
      aria-label="Conversatorios y Encuentros Dialógicos"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN CON ESTILO RETRO-TERMINAL */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#00f0ff] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group"
            >
              <Mic2 className="w-5 h-5 text-[#00f0ff]" />
              <span>CONVERSATORIOS</span>
            </button>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO DE CONVERSATORIOS CON SLIDES GLITCH INDIVIDUALES (SIN HALOS) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Grid editorial de 2 columnas de conversatorios con sus slides glitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {CONVERSATORIOS_DATA.map((item) => (
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

                      {/* Título Principal en Bahnschrift Condensed */}
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

                      {/* Descripción pedagógica (si existe) */}
                      {item.description && (
                        <p className="font-rajdhani font-medium text-xs sm:text-[14px] text-[#A6A6C0] leading-relaxed mb-2.5 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}

                      {/* Institución / Entidad convocante y ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0]">
                        <span className="text-[#E0E0F0] font-semibold">{item.institution}</span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* SLIDE DE IMÁGENES INDIVIDUAL DEBAJO DE CADA CONVERSATORIO */}
                    <ConversatorioGlitchSlide
                      conversatorioId={item.id}
                      conversatorioTitle={item.title}
                    />
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
