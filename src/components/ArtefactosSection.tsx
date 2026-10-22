/**
 * @file ArtefactosSection.tsx
 * @description Sección "ARTEFACTOS" con cuadrícula de 2 columnas:
 * 1. Slide limpio de imágenes con 39 fotografías oficiales de artefactos y dispositivos.
 * 2. Div en blanco preparado para videos con el mismo tamaño y proporción horizontal del sitio.
 * Sin barras de encabezado ni títulos o subtítulos inferiores, manteniendo un diseño minimalista y pulido.
 */

import React, { useState } from 'react';
import {
  Cpu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

// RUTA BASE GITHUB RAW PARA IMÁGENES DE ARTEFACTOS
export const GITHUB_RAW_ARTEFACTOS_BASE_URL =
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/artefactos/';

// Índices ordenados del catálogo de Artefactos con la imagen 38 como portada
export const ARTEFACTOS_ORDER: number[] = [
  38,
  ...Array.from({ length: 39 }, (_, i) => i + 1).filter((num) => num !== 38),
];

// 39 fotografías oficiales del catálogo de Artefactos (con la imagen 38 como portada)
export const ARTEFACTOS_GITHUB_IMAGES: string[] = ARTEFACTOS_ORDER.map(
  (num) => `${GITHUB_RAW_ARTEFACTOS_BASE_URL}artefactos${num}.webp`
);

export const ARTEFACTOS_PROD_IMAGES: string[] = ARTEFACTOS_ORDER.map(
  (num) => `/images/artefactos/artefactos${num}.webp`
);

// RUTA BASE GITHUB RAW PARA IMÁGENES DE CASA TALLER
export const GITHUB_RAW_CASATALLER_BASE_URL =
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/casataller/';

// Índices ordenados del catálogo de Casa Taller con la imagen 8 como portada
export const CASA_TALLER_ORDER: number[] = [
  8,
  ...Array.from({ length: 41 }, (_, i) => i + 1).filter((num) => num !== 8),
];

// 41 fotografías oficiales de Casa Taller (con la imagen 8 como portada)
export const CASA_TALLER_GITHUB_IMAGES: string[] = CASA_TALLER_ORDER.map(
  (num) => `${GITHUB_RAW_CASATALLER_BASE_URL}casataller${num}.webp`
);

export const CASA_TALLER_PROD_IMAGES: string[] = CASA_TALLER_ORDER.map(
  (num) => `/images/casataller/casataller${num}.webp`
);

// Alias para compatibilidad de exportación
export const ESPACIO_TALLER_GITHUB_IMAGES = CASA_TALLER_GITHUB_IMAGES;
export const ESPACIO_TALLER_PROD_IMAGES = CASA_TALLER_PROD_IMAGES;
export const GITHUB_RAW_TALLER_BASE_URL = GITHUB_RAW_CASATALLER_BASE_URL;

export const resolveCasaTallerImageUrl = (urlOrFilename: string): string => {
  if (!urlOrFilename) return CASA_TALLER_GITHUB_IMAGES[0];
  if (urlOrFilename.startsWith('http://') || urlOrFilename.startsWith('https://')) {
    return urlOrFilename;
  }
  const isDevOrPreview =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('run.app') ||
      window.location.hostname.includes('webcontainer') ||
      window.location.hostname.includes('github.dev') ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  const filename = urlOrFilename.split('/').pop() || 'casataller8.webp';
  if (isDevOrPreview) {
    return `${GITHUB_RAW_CASATALLER_BASE_URL}${filename}`;
  }
  return `/images/casataller/${filename}`;
};

export const resolveTallerImageUrl = resolveCasaTallerImageUrl;

export const resolveArtefactoImageUrl = (urlOrFilename: string): string => {
  if (!urlOrFilename) return ARTEFACTOS_GITHUB_IMAGES[0];
  if (urlOrFilename.startsWith('http://') || urlOrFilename.startsWith('https://')) {
    return urlOrFilename;
  }
  const isDevOrPreview =
    typeof window !== 'undefined' &&
    (window.location.hostname.includes('run.app') ||
      window.location.hostname.includes('webcontainer') ||
      window.location.hostname.includes('github.dev') ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  const filename = urlOrFilename.split('/').pop() || 'artefactos38.webp';
  if (isDevOrPreview) {
    return `${GITHUB_RAW_ARTEFACTOS_BASE_URL}${filename}`;
  }
  return `/images/artefactos/${filename}`;
};

export const ArtefactosSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentTallerIndex, setCurrentTallerIndex] = useState<number>(0);

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const isExternalProduction =
    typeof window !== 'undefined' &&
    !window.location.hostname.includes('run.app') &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1') &&
    !window.location.hostname.includes('webcontainer') &&
    !window.location.hostname.includes('github.dev');

  const imageList = isExternalProduction ? ARTEFACTOS_PROD_IMAGES : ARTEFACTOS_GITHUB_IMAGES;
  const currentImage = imageList[currentImageIndex] || ARTEFACTOS_GITHUB_IMAGES[currentImageIndex];

  const tallerImageList = isExternalProduction ? CASA_TALLER_PROD_IMAGES : CASA_TALLER_GITHUB_IMAGES;
  const currentTallerImage = tallerImageList[currentTallerIndex] || CASA_TALLER_GITHUB_IMAGES[currentTallerIndex];

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? ARTEFACTOS_GITHUB_IMAGES.length - 1 : prev - 1));
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === ARTEFACTOS_GITHUB_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const prevTallerImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentTallerIndex((prev) => (prev === 0 ? CASA_TALLER_GITHUB_IMAGES.length - 1 : prev - 1));
  };

  const nextTallerImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentTallerIndex((prev) => (prev === CASA_TALLER_GITHUB_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="artefactos"
      role="region"
      aria-label="Artefactos y Dispositivos Electrónicos"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      {/* Resplandores ambientales de fondo */}
      <div
        className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 bg-[#00f0ff]/5 blur-[130px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-10 w-96 h-96 bg-[#FF007F]/5 blur-[130px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ENCABEZADO DE SECCIÓN */}
        <ScrollReveal direction="up" distance="sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div
                role="heading"
                aria-level={2}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest"
              >
                <Cpu className="w-5 h-5 text-[#00f0ff]" />
                <span>ARTEFACTOS</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* GRID DE 2 COLUMNAS: SLIDE DE IMÁGENES + ESPACIO EN BLANCO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* COLUMNA 1: SLIDE LIMPIO DE IMÁGENES (39 FOTOGRAFÍAS) */}
          <ScrollReveal direction="up" distance="md" delay={100} className="w-full flex">
            <article
              onContextMenu={handleProtected}
              onDragStart={handleProtected}
              className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#00f0ff]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none relative"
            >
              {/* Resplandor ambiental de acento */}
              <div
                className="pointer-events-none absolute -top-12 -left-12 w-32 h-32 bg-[#00f0ff]/10 blur-[50px] rounded-full z-0"
                aria-hidden="true"
              />

              {/* CONTENEDOR MULTIMEDIA: SLIDE HORIZONTAL ESTANDARIZADO */}
              <div className="relative w-full bg-[#07070B] overflow-hidden flex items-center justify-center p-3 sm:p-5">
                <div
                  onContextMenu={handleProtected}
                  onDragStart={handleProtected}
                  style={
                    {
                      userSelect: 'none',
                      WebkitUserDrag: 'none',
                    } as React.CSSProperties
                  }
                  className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black border border-[#26263A] shadow-md select-none flex items-center justify-center group/slide"
                >
                  {/* Capa de textura CRT glitch sutil */}
                  <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

                  {/* Contador de imagen en la esquina superior derecha */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono-code text-[#E0E0F0] pointer-events-none z-20">
                    {currentImageIndex + 1} / {ARTEFACTOS_GITHUB_IMAGES.length}
                  </div>

                  {/* Visualizador de imagen con ajuste completo sin recortes */}
                  <div className="w-full h-full flex items-center justify-center overflow-hidden bg-black">
                    <img
                      key={currentImageIndex}
                      src={resolveArtefactoImageUrl(currentImage)}
                      alt={`Artefacto - Fotografía ${currentImageIndex + 1}`}
                      draggable={false}
                      onContextMenu={handleProtected}
                      onDragStart={handleProtected}
                      className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-500 group-hover/slide:scale-102"
                      style={
                        {
                          objectFit: 'contain',
                          userSelect: 'none',
                          WebkitUserDrag: 'none',
                        } as React.CSSProperties
                      }
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const currentSrc = target.src;
                        if (currentSrc.includes('artefactos')) {
                          const match = currentSrc.match(/artefactos\d+\.webp/);
                          if (match) {
                            const filename = match[0];
                            if (currentSrc.includes('raw.githubusercontent.com')) {
                              target.src = `/images/artefactos/${filename}`;
                            } else {
                              target.src = `${GITHUB_RAW_ARTEFACTOS_BASE_URL}${filename}`;
                            }
                          }
                        }
                      }}
                    />
                  </div>

                  {/* Flechas de navegación */}
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-lg z-20 group/btn"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-lg z-20 group/btn"
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* Espacio inferior limpio sin títulos ni subtítulos */}
              <div aria-hidden="true" />
            </article>
          </ScrollReveal>

          {/* COLUMNA 2: DIV DEL VIDEO EN BLANCO */}
          <ScrollReveal direction="up" distance="md" delay={200} className="w-full flex">
            <article
              onContextMenu={handleProtected}
              onDragStart={handleProtected}
              className="w-full rounded-2xl bg-[#14141E] border border-[#252538] shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden select-none relative"
            >
              <div className="relative w-full bg-[#07070B] overflow-hidden flex items-center justify-center p-3 sm:p-5">
                <div
                  className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl bg-[#0A0A12] border border-dashed border-[#252538] flex items-center justify-center select-none"
                  aria-hidden="true"
                />
              </div>

              {/* Espacio inferior limpio sin títulos ni subtítulos */}
              <div aria-hidden="true" />
            </article>
          </ScrollReveal>
        </div>

        {/* ======================================================= */}
        {/* SUBSECCIÓN: ESPACIO TALLER                              */}
        {/* ======================================================= */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mt-12 sm:mt-16 pt-8 border-t border-[#222234]">
            {/* Barra de cabecera con estilo idéntico a 'UNIVERSOS Y HABILIDADES' */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <div
                  role="heading"
                  aria-level={2}
                  className="flex items-center gap-2 font-bahnschrift-condensed text-sm text-[#00f0ff] uppercase tracking-widest font-bold select-none text-left"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse-slow shadow-[0_0_8px_#00f0ff]" />
                  <span>ESPACIO TALLER</span>
                </div>
              </div>
            </div>

            {/* Div de slide de fotos sin textos ni símbolos */}
            <div id="espacio-taller-contenido" className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                <article
                  onContextMenu={handleProtected}
                  onDragStart={handleProtected}
                  className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#00f0ff]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none relative"
                >
                  {/* Resplandor ambiental de acento */}
                  <div
                    className="pointer-events-none absolute -top-12 -left-12 w-32 h-32 bg-[#00f0ff]/10 blur-[50px] rounded-full z-0"
                    aria-hidden="true"
                  />

                  {/* CONTENEDOR MULTIMEDIA: SLIDE HORIZONTAL ESTANDARIZADO */}
                  <div className="relative w-full bg-[#07070B] overflow-hidden flex items-center justify-center p-3 sm:p-5">
                    <div
                      onContextMenu={handleProtected}
                      onDragStart={handleProtected}
                      style={
                        {
                          userSelect: 'none',
                          WebkitUserDrag: 'none',
                        } as React.CSSProperties
                      }
                      className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black border border-[#26263A] shadow-md select-none flex items-center justify-center group/slide"
                    >
                      {/* Capa de textura CRT glitch sutil */}
                      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

                      {/* Contador de imagen en la esquina superior derecha */}
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono-code text-[#E0E0F0] pointer-events-none z-20">
                        {currentTallerIndex + 1} / {CASA_TALLER_GITHUB_IMAGES.length}
                      </div>

                      {/* Visualizador de imagen con ajuste completo sin recortes y protección obligatoria */}
                      <div
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        style={
                          {
                            userSelect: 'none',
                            WebkitUserDrag: 'none',
                          } as React.CSSProperties
                        }
                        className="w-full h-full flex items-center justify-center overflow-hidden bg-black select-none"
                      >
                        <img
                          key={currentTallerIndex}
                          src={resolveCasaTallerImageUrl(currentTallerImage)}
                          alt={`Casa Taller - Fotografía ${currentTallerIndex + 1}`}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                          className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-500 group-hover/slide:scale-102"
                          style={
                            {
                              objectFit: 'contain',
                              userSelect: 'none',
                              WebkitUserDrag: 'none',
                            } as React.CSSProperties
                          }
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const currentSrc = target.src;
                            if (currentSrc.includes('casataller')) {
                              const match = currentSrc.match(/casataller\d+\.webp/);
                              if (match) {
                                const filename = match[0];
                                if (currentSrc.includes('raw.githubusercontent.com')) {
                                  target.src = `/images/casataller/${filename}`;
                                } else {
                                  target.src = `${GITHUB_RAW_CASATALLER_BASE_URL}${filename}`;
                                }
                              }
                            }
                          }}
                        />
                      </div>

                      {/* Flechas de navegación */}
                      <button
                        type="button"
                        onClick={prevTallerImage}
                        className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-lg z-20 group/btn"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" />
                      </button>

                      <button
                        type="button"
                        onClick={nextTallerImage}
                        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-lg z-20 group/btn"
                        aria-label="Siguiente foto"
                      >
                        <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* Espacio inferior limpio sin textos ni símbolos */}
                  <div aria-hidden="true" />
                </article>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
