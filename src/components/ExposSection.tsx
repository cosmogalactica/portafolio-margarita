/**
 * @file ExposSection.tsx
 * @description Sección EXPOS del portafolio personal de Margarita.
 * Muestra el catálogo de exposiciones, muestras de arte electrónico, bienales,
 * salones e instalaciones interactivas con un slide de imágenes individual debajo de cada título.
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ExpoItem {
  id: string;
  year: string;
  badge: string;
  badgeColor?: string;
  title: string;
  obra?: string;
  institution: string;
  location: string;
}

export const EXPOS_DATA: ExpoItem[] = [
  {
    id: 'expolab-creativa-mamb-2015',
    year: '2015',
    badge: 'EXPOLAB',
    badgeColor: '#FF007F',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'MAMB',
    location: 'Bucaramanga, 2015',
  },
  {
    id: 'lanzamiento-ovni-fancine-2015',
    year: '2015',
    badge: 'LANZAMIENTO',
    badgeColor: '#00f0ff',
    title: 'LANZAMIENTO DE OVNI FANCINE',
    institution: 'Papel Viajero',
    location: 'Bogotá, Barcelona, 2015',
  },
  {
    id: 'expolab-creativa-festival-en-tiempo-real-2014',
    year: '2014',
    badge: 'FESTIVAL SONORO',
    badgeColor: '#E024C3',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'Festival En Tiempo Real Nuevos Encuentros Sonoros',
    location: 'Bogotá, 2014',
  },
  {
    id: 'expolab-creativa-cumbre-medio-ambiente-2014',
    year: '2014',
    badge: 'CUMBRE INTERNACIONAL',
    badgeColor: '#00f0ff',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'Cumbre Internacional del Medio Ambiente',
    location: 'Bucaramanga, 2014',
  },
  {
    id: 'bocinche-jam-noix-colectivo-mamb-2014',
    year: '2014',
    badge: 'JAM COLECTIVO',
    badgeColor: '#FF007F',
    title: 'BOCINCHE JAM NOIX COLECTIVO',
    institution: 'MAMB',
    location: 'Bucaramanga, 2014',
  },
  {
    id: 'expolab-creativa-mercadillo-bohemios-2014',
    year: '2014',
    badge: 'MERCADILLO',
    badgeColor: '#E024C3',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'Mercadillo Llegaron los Bohemios',
    location: 'Bucaramanga, 2014',
  },
  {
    id: 'poemas-electrodomesticos-artemisia-2011',
    year: '2011',
    badge: 'INSTALACIÓN',
    badgeColor: '#00f0ff',
    title: 'POEMAS ELECTRODOMÉSTICOS',
    obra: 'Máquina de hacer Libélulas',
    institution: 'Artemisia',
    location: 'Bucaramanga, 2011',
  },
  {
    id: 'bienal-arte-suba-2010',
    year: '2010',
    badge: 'BIENAL',
    badgeColor: '#FF007F',
    title: 'VII BIENAL INTERNACIONAL DE ARTE SUBA',
    obra: 'Volver',
    institution: 'CC Boulevard',
    location: 'Bogotá, 2010',
  },
  {
    id: 'salon-regional-artistas-2009',
    year: '2009',
    badge: 'SALÓN REGIONAL',
    badgeColor: '#00f0ff',
    title: 'PRESELECCIÓN XIII SALÓN REGIONAL DE ARTISTAS ZONA ORIENTE',
    obra: 'Póngale Cariño al Monte',
    institution: 'Casa Luis Perú de Lacroix',
    location: 'Bucaramanga, 2009',
  },
];

export const EXPOLABMAMB_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/expolabmamb8.webp',
];

export const EXPOLABMAMB_PROD_IMAGES = [
  '/images/expolabmamb/expolabmamb1.webp',
  '/images/expolabmamb/expolabmamb2.webp',
  '/images/expolabmamb/expolabmamb3.webp',
  '/images/expolabmamb/expolabmamb4.webp',
  '/images/expolabmamb/expolabmamb5.webp',
  '/images/expolabmamb/expolabmamb6.webp',
  '/images/expolabmamb/expolabmamb7.webp',
  '/images/expolabmamb/expolabmamb8.webp',
];

export const OVNIPAPELVIAJERO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/ovnipapelviajero/ovnipapelviajero1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/ovnipapelviajero/ovnipapelviajero2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/ovnipapelviajero/ovnipapelviajero3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/ovnipapelviajero/ovnipapelviajero4.webp',
];

export const OVNIPAPELVIAJERO_PROD_IMAGES = [
  '/images/ovnipapeliajero/ovnipapeliajero1.webp',
  '/images/ovnipapeliajero/ovnipapeliajero2.webp',
  '/images/ovnipapeliajero/ovnipapeliajero3.webp',
  '/images/ovnipapeliajero/ovnipapeliajero4.webp',
];

// Aliases para soportar ambas grafías (con y sin 'v')
export const OVNIPAPELIAJERO_GITHUB_IMAGES = OVNIPAPELVIAJERO_GITHUB_IMAGES;
export const OVNIPAPELIAJERO_PROD_IMAGES = OVNIPAPELVIAJERO_PROD_IMAGES;

export const ENTIEMPOREAL_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal11.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal12.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal13.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/entiemporeal14.webp',
];

export const ENTIEMPOREAL_PROD_IMAGES = [
  '/images/entiemporeal/entiemporeal1.webp',
  '/images/entiemporeal/entiemporeal2.webp',
  '/images/entiemporeal/entiemporeal3.webp',
  '/images/entiemporeal/entiemporeal4.webp',
  '/images/entiemporeal/entiemporeal5.webp',
  '/images/entiemporeal/entiemporeal6.webp',
  '/images/entiemporeal/entiemporeal7.webp',
  '/images/entiemporeal/entiemporeal8.webp',
  '/images/entiemporeal/entiemporeal9.webp',
  '/images/entiemporeal/entiemporeal10.webp',
  '/images/entiemporeal/entiemporeal11.webp',
  '/images/entiemporeal/entiemporeal12.webp',
  '/images/entiemporeal/entiemporeal13.webp',
  '/images/entiemporeal/entiemporeal14.webp',
];

export const CIMAKIDS_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/cimakids7.webp',
];

export const CIMAKIDS_PROD_IMAGES = [
  '/images/cimakids/cimakids1.webp',
  '/images/cimakids/cimakids2.webp',
  '/images/cimakids/cimakids3.webp',
  '/images/cimakids/cimakids4.webp',
  '/images/cimakids/cimakids5.webp',
  '/images/cimakids/cimakids6.webp',
  '/images/cimakids/cimakids7.webp',
];

export const BOCHINCHEMAMB_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/bochinchemamb1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/bochinchemamb2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/bochinchemamb3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/bochinchemamb4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/bochinchemamb5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/bochinchemamb6.webp',
];

export const BOCHINCHEMAMB_PROD_IMAGES = [
  '/images/bochinchemamb/bochinchemamb1.webp',
  '/images/bochinchemamb/bochinchemamb2.webp',
  '/images/bochinchemamb/bochinchemamb3.webp',
  '/images/bochinchemamb/bochinchemamb4.webp',
  '/images/bochinchemamb/bochinchemamb5.webp',
  '/images/bochinchemamb/bochinchemamb6.webp',
];

export const MERCADILLO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mercadillo/mercadillo1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mercadillo/mercadillo2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mercadillo/mercadillo3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mercadillo/mercadillo4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mercadillo/mercadillo5.webp',
];

export const MERCADILLO_PROD_IMAGES = [
  '/images/mercadillo/mercadillo1.webp',
  '/images/mercadillo/mercadillo2.webp',
  '/images/mercadillo/mercadillo3.webp',
  '/images/mercadillo/mercadillo4.webp',
  '/images/mercadillo/mercadillo5.webp',
];

export const POEMASELECTRO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/poemaselectro1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/poemaselectro2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/poemaselectro3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/poemaselectro4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/poemaselectro5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/poemaselectro6.webp',
];

export const POEMASELECTRO_PROD_IMAGES = [
  '/images/poemaselectro/poemaselectro1.webp',
  '/images/poemaselectro/poemaselectro2.webp',
  '/images/poemaselectro/poemaselectro3.webp',
  '/images/poemaselectro/poemaselectro4.webp',
  '/images/poemaselectro/poemaselectro5.webp',
  '/images/poemaselectro/poemaselectro6.webp',
];

export const VOLVER_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/volver1.webp',
];

export const VOLVER_PROD_IMAGES = [
  '/images/volver1.webp',
];

export const PONGALECARINO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/pongalecari%C3%B1oalmonte/volverypongalecari%C3%B1oalmonte1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/pongalecari%C3%B1oalmonte/volverypongalecari%C3%B1oalmonte2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/pongalecari%C3%B1oalmonte/volverypongalecari%C3%B1oalmonte3.webp',
];

export const PONGALECARINO_PROD_IMAGES = [
  '/images/pongalecariñoalmonte/volverypongalecariñoalmonte1.webp',
  '/images/pongalecariñoalmonte/volverypongalecariñoalmonte2.webp',
  '/images/pongalecariñoalmonte/volverypongalecariñoalmonte3.webp',
];

// Colecciones por defecto de registros visuales para cada una de las exposiciones
const EXPO_DEFAULT_IMAGES: Record<string, string[]> = {
  'expolab-creativa-mamb-2015': EXPOLABMAMB_GITHUB_IMAGES,
  'lanzamiento-ovni-fancine-2015': OVNIPAPELVIAJERO_GITHUB_IMAGES,
  'expolab-creativa-festival-en-tiempo-real-2014': ENTIEMPOREAL_GITHUB_IMAGES,
  'expolab-creativa-cumbre-medio-ambiente-2014': CIMAKIDS_GITHUB_IMAGES,
  'bocinche-jam-noix-colectivo-mamb-2014': BOCHINCHEMAMB_GITHUB_IMAGES,
  'expolab-creativa-mercadillo-bohemios-2014': MERCADILLO_GITHUB_IMAGES,
  'poemas-electrodomesticos-artemisia-2011': POEMASELECTRO_GITHUB_IMAGES,
  'bienal-arte-suba-2010': VOLVER_GITHUB_IMAGES,
  'salon-regional-artistas-2009': PONGALECARINO_GITHUB_IMAGES,
};

const GENERIC_EXPO_IMAGES = [
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente individual de Slide Glitch para cada exposición.
 */
interface ExpoGlitchSlideProps {
  expoId: string;
  expoTitle: string;
}

const ExpoGlitchSlide: React.FC<ExpoGlitchSlideProps> = ({
  expoId,
  expoTitle,
}) => {
  const isExternalProduction = typeof window !== 'undefined' && 
    !window.location.hostname.includes('run.app') && 
    !window.location.hostname.includes('localhost') && 
    !window.location.hostname.includes('127.0.0.1');

  // Obtener la lista canónica de imágenes de forma reactiva e inmediata
  const images = useMemo<string[]>(() => {
    if (expoId === 'expolab-creativa-mamb-2015') {
      return isExternalProduction ? EXPOLABMAMB_PROD_IMAGES : EXPOLABMAMB_GITHUB_IMAGES;
    }
    if (expoId === 'lanzamiento-ovni-fancine-2015') {
      return isExternalProduction ? OVNIPAPELVIAJERO_PROD_IMAGES : OVNIPAPELVIAJERO_GITHUB_IMAGES;
    }
    if (expoId === 'expolab-creativa-festival-en-tiempo-real-2014') {
      return isExternalProduction ? ENTIEMPOREAL_PROD_IMAGES : ENTIEMPOREAL_GITHUB_IMAGES;
    }
    if (expoId === 'expolab-creativa-cumbre-medio-ambiente-2014') {
      return isExternalProduction ? CIMAKIDS_PROD_IMAGES : CIMAKIDS_GITHUB_IMAGES;
    }
    if (expoId === 'bocinche-jam-noix-colectivo-mamb-2014') {
      return isExternalProduction ? BOCHINCHEMAMB_PROD_IMAGES : BOCHINCHEMAMB_GITHUB_IMAGES;
    }
    if (expoId === 'expolab-creativa-mercadillo-bohemios-2014') {
      return isExternalProduction ? MERCADILLO_PROD_IMAGES : MERCADILLO_GITHUB_IMAGES;
    }
    if (expoId === 'poemas-electrodomesticos-artemisia-2011') {
      return isExternalProduction ? POEMASELECTRO_PROD_IMAGES : POEMASELECTRO_GITHUB_IMAGES;
    }
    if (expoId === 'bienal-arte-suba-2010') {
      return isExternalProduction ? VOLVER_PROD_IMAGES : VOLVER_GITHUB_IMAGES;
    }
    if (expoId === 'salon-regional-artistas-2009') {
      return isExternalProduction ? PONGALECARINO_PROD_IMAGES : PONGALECARINO_GITHUB_IMAGES;
    }
    return EXPO_DEFAULT_IMAGES[expoId] || GENERIC_EXPO_IMAGES;
  }, [expoId, isExternalProduction]);

  // Limpiar cualquier residuo obsoleto en localStorage
  useEffect(() => {
    try {
      localStorage.removeItem(`margarita_expo_slide_${expoId}`);
    } catch {
      // ignore
    }
  }, [expoId]);

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
              alt={`${expoTitle} (${currentIndex + 1})`}
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
                if (currentSrc.includes('expolabmamb')) {
                  const match = currentSrc.match(/expolabmamb\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/expolabmamb/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/expolabmamb/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('ovnipapelviajero') || currentSrc.includes('ovnipapeliajero')) {
                  const numMatch = currentSrc.match(/\d+/);
                  const num = numMatch ? numMatch[0] : '1';
                  if (currentSrc.includes('raw.githubusercontent.com')) {
                    target.src = `/images/ovnipapeliajero/ovnipapeliajero${num}.webp`;
                  } else {
                    target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/ovnipapelviajero/ovnipapelviajero${num}.webp`;
                  }
                } else if (currentSrc.includes('entiemporeal')) {
                  const match = currentSrc.match(/entiemporeal\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/entiemporeal/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/entiemporeal/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('cimakids')) {
                  const match = currentSrc.match(/cimakids\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/cimakids/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cimakids/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('bochinchemamb')) {
                  const match = currentSrc.match(/bochinchemamb\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/bochinchemamb/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bochinchemamb/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('mercadillo')) {
                  const match = currentSrc.match(/mercadillo\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/mercadillo/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mercadillo/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('poemaselectro')) {
                  const match = currentSrc.match(/poemaselectro\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/poemaselectro/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poemaselectro/${filename}`;
                    }
                  }
                } else if (currentSrc.includes('pongalecari') || currentSrc.includes('volverypongalecari')) {
                  const numMatch = currentSrc.match(/\d+(?=\.webp)/);
                  const num = numMatch ? numMatch[0] : '1';
                  if (currentSrc.includes('raw.githubusercontent.com')) {
                    target.src = `/images/pongalecariñoalmonte/volverypongalecariñoalmonte${num}.webp`;
                  } else {
                    target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/pongalecari%C3%B1oalmonte/volverypongalecari%C3%B1oalmonte${num}.webp`;
                  }
                } else if (currentSrc.includes('volver')) {
                  const match = currentSrc.match(/volver\d*\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/${filename}`;
                    }
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
                {images.map((_: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
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

export const ExposSection: React.FC = () => {
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="expos"
      role="region"
      aria-label="Exposiciones y Muestras de Arte Electrónico"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN EXPOS */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FF007F]/10 hover:bg-[#FF007F]/20 border border-[#FF007F]/30 hover:border-[#FF007F] text-[#FF007F] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group"
            >
              <Eye className="w-5 h-5 text-[#FF007F]" />
              <span>EXPOS</span>
            </button>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO DE EXPOSICIONES CON SLIDES GLITCH INDIVIDUALES (SIN HALOS) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Grid editorial de 2 columnas con sus slides glitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {EXPOS_DATA.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between pb-8 border-b border-[#202030] group"
                  >
                    <div>
                      {/* Fila de metadatos: Año e insignia en Dosis */}
                      <div className="flex items-center gap-2 font-dosis text-sm mb-1.5">
                        <span className="text-[#FF007F] font-bold text-base">
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
                      <h3 className="font-bahnschrift-condensed font-light text-[14px] sm:text-[16px] text-[#F5F5FA] leading-snug tracking-wider uppercase group-hover:text-white transition-colors mb-1.5">
                        {item.title}
                      </h3>

                      {/* Obra destacada (si aplica) */}
                      {item.obra && (
                        <p className="font-rajdhani font-semibold text-xs sm:text-[13px] text-[#00f0ff] uppercase tracking-wide mb-1.5">
                          Obra: {item.obra}
                        </p>
                      )}

                      {/* Institución / Entidad convocante y ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0]">
                        <span className="text-[#E0E0F0] font-semibold">{item.institution}</span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* SLIDE DE IMÁGENES INDIVIDUAL DEBAJO DE CADA EXPOSICIÓN */}
                    <ExpoGlitchSlide
                      expoId={item.id}
                      expoTitle={item.title}
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
