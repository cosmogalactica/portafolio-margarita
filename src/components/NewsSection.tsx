/**
 * @file NewsSection.tsx
 * @description Sección "NOTICIAS" estructurada como cuadrícula.
 * Contiene el proyecto destacado DARPANA con su slide de videos interactivo,
 * y deja los demás divs de la cuadrícula completamente vacíos según lo solicitado.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const GITHUB_RAW_DARPANA_VIDEOS_BASE_URL =
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/videos/';

export const DARPANA_GITHUB_VIDEOS = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/videos/darpanavideo1.mp4',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/videos/darpanavideo2.mp4',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/videos/darpanavideo3.mp4',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/videos/darpanavideo4.mp4',
];

export const DARPANA_PROD_VIDEOS = [
  '/videos/darpanavideo1.mp4',
  '/videos/darpanavideo2.mp4',
  '/videos/darpanavideo3.mp4',
  '/videos/darpanavideo4.mp4',
];

export const GITHUB_RAW_DARPANA_BASE_URL =
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/darpana/';

export const DARPANA_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/darpana/darpana1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/darpana/darpana2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/darpana/darpana3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/darpana/darpana4.webp',
];

export const DARPANA_PROD_IMAGES = [
  '/images/darpana/darpana1.webp',
  '/images/darpana/darpana2.webp',
  '/images/darpana/darpana3.webp',
  '/images/darpana/darpana4.webp',
];

export const resolveDarpanaVideoUrl = (urlOrFilename: string): string => {
  if (!urlOrFilename) return DARPANA_GITHUB_VIDEOS[0];
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

  const filename = urlOrFilename.split('/').pop() || 'darpanavideo1.mp4';
  if (isDevOrPreview) {
    return `${GITHUB_RAW_DARPANA_VIDEOS_BASE_URL}${filename}`;
  }
  return `/videos/${filename}`;
};

export const resolveDarpanaImageUrl = (urlOrFilename: string): string => {
  if (!urlOrFilename) return DARPANA_GITHUB_IMAGES[0];
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

  const filename = urlOrFilename.split('/').pop() || 'darpana1.webp';
  if (isDevOrPreview) {
    return `${GITHUB_RAW_DARPANA_BASE_URL}${filename}`;
  }
  return `/images/darpana/${filename}`;
};

export interface DarpanaSlideProps {
  className?: string;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

/**
 * Componente de galería de videos DARPANA interactivo y protegido.
 * Carga los 4 archivos de video (.mp4) desde GitHub Raw en desarrollo
 * y desde /videos/ en producción (Hostinger).
 */
export const DarpanaSlide: React.FC<DarpanaSlideProps> = ({
  className = '',
  currentIndex: externalIndex,
  onIndexChange,
}) => {
  const [internalIndex, setInternalIndex] = useState<number>(0);
  const selectedIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const updateIndex = (updater: (prev: number) => number) => {
    setHasInteracted(true);
    if (onIndexChange) {
      const nextVal = updater(selectedIndex);
      onIndexChange(nextVal);
    } else {
      setInternalIndex(updater);
    }
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    updateIndex((prev) => (prev === 0 ? DARPANA_GITHUB_VIDEOS.length - 1 : prev - 1));
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    updateIndex((prev) => (prev === DARPANA_GITHUB_VIDEOS.length - 1 ? 0 : prev + 1));
  };

  const isExternalProduction =
    typeof window !== 'undefined' &&
    !window.location.hostname.includes('run.app') &&
    !window.location.hostname.includes('localhost') &&
    !window.location.hostname.includes('127.0.0.1') &&
    !window.location.hostname.includes('webcontainer') &&
    !window.location.hostname.includes('github.dev');

  const videoList = isExternalProduction ? DARPANA_PROD_VIDEOS : DARPANA_GITHUB_VIDEOS;
  const currentVideo = videoList[selectedIndex] || DARPANA_GITHUB_VIDEOS[selectedIndex];

  useEffect(() => {
    if (hasInteracted && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [selectedIndex, currentVideo, hasInteracted]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className={`relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl bg-black border border-[#2B2B3E] overflow-hidden flex flex-col items-center justify-center shadow-inner group select-none ${className}`}
      style={
        {
          userSelect: 'none',
          WebkitUserDrag: 'none',
        } as React.CSSProperties
      }
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
        {/* Capa de textura CRT glitch sutil */}
        <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

        <video
          ref={videoRef}
          key={currentVideo}
          src={resolveDarpanaVideoUrl(currentVideo)}
          controls
          autoPlay={hasInteracted}
          playsInline
          preload="auto"
          controlsList="nodownload"
          onEnded={() => nextSlide()}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
          style={
            {
              objectFit: 'contain',
              userSelect: 'none',
              WebkitUserDrag: 'none',
            } as React.CSSProperties
          }
          className="w-full h-full object-contain select-none bg-black relative z-0"
          onError={(e) => {
            const target = e.currentTarget;
            const currentSrc = target.src;
            if (currentSrc.includes('darpanavideo')) {
              const match = currentSrc.match(/darpanavideo\d+\.mp4/);
              if (match) {
                const filename = match[0];
                if (currentSrc.includes('raw.githubusercontent.com')) {
                  target.src = `/videos/${filename}`;
                } else {
                  target.src = `${GITHUB_RAW_DARPANA_VIDEOS_BASE_URL}${filename}`;
                }
              }
            }
          }}
        />
      </div>

      {/* Contador de video en la esquina superior derecha */}
      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[11px] font-mono-code text-[#E0E0F0] pointer-events-none z-20">
        VIDEO {selectedIndex + 1} / {DARPANA_GITHUB_VIDEOS.length}
      </div>

      {/* Flechas de navegación para alternar videos */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-lg z-20 group/btn"
        aria-label="Video anterior"
      >
        <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-lg z-20 group/btn"
        aria-label="Siguiente video"
      >
        <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
      </button>

      {/* Indicadores de puntos inferiores para selección directa de video */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 pointer-events-auto">
        {DARPANA_GITHUB_VIDEOS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              updateIndex(() => idx);
            }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === selectedIndex ? 'w-4 bg-[#00f0ff]' : 'w-1.5 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Ver video ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Alias para preservar compatibilidad con código existente
export const DarpanaVideoSlide = DarpanaSlide;

/**
 * Componente que ajusta proporcionalmente el iframe de Instagram dentro del contenedor
 * estándar de 16:9 / 16:10 del sitio web, escalando dinámicamente la publicación completa
 * para que no quede cortada en ningún extremo ni dispositivo.
 */
export const InstagramScaledEmbed: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.55);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Medidas estándar de la tarjeta de publicación embebida de Instagram
        const targetWidth = 400;
        const targetHeight = 500;
        if (clientWidth > 0 && clientHeight > 0) {
          const scaleX = clientWidth / targetWidth;
          const scaleY = clientHeight / targetHeight;
          const computedScale = Math.min(scaleX, scaleY, 0.95);
          setScale(Math.max(computedScale, 0.35));
        }
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('resize', updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full flex-1 bg-black flex items-center justify-center overflow-hidden"
    >
      <div
        style={{
          width: '400px',
          height: '500px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
        className="shrink-0 flex items-center justify-center transition-transform duration-100"
      >
        <iframe
          src={url}
          title={title}
          className="w-[400px] h-[500px] border-0 bg-[#0A0A12] rounded-lg shadow-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const NewsSection: React.FC = () => {
  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="noticias"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content scroll-mt-20 overflow-hidden"
    >
      {/* Anchor para navegación directa a DARPANA */}
      <div id="darpana" className="absolute -top-20 left-0" />

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
        {/* ENCABEZADO DE LA SECCIÓN (SOLO NOTICIAS) */}
        <ScrollReveal direction="up" distance="sm">
          <div className="flex items-center justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <div
                role="heading"
                aria-level={2}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest"
              >
                <Newspaper className="w-5 h-5 text-[#00f0ff]" />
                <span>NOTICIAS</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CUADRÍCULA (GRID) DE NOTICIAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* DIV 1: DARPANA (SLIDE CON TODOS LOS VIDEOS) */}
          <ScrollReveal direction="up" distance="md" delay={100} className="w-full flex">
            <article
              onContextMenu={handleProtected}
              onDragStart={handleProtected}
              className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#00f0ff]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none relative"
            >
              {/* Resplandor ambiental de acento en la tarjeta */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#00f0ff]/10 blur-[50px] rounded-full z-0"
                aria-hidden="true"
              />

              {/* CONTENEDOR MULTIMEDIA: VACÍO SEGÚN LO SOLICITADO */}
              <div className="relative w-full bg-[#07070B] overflow-hidden flex items-center justify-center p-3 sm:p-5">
                <div
                  className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl bg-[#0A0A12] border border-dashed border-[#252538] flex items-center justify-center select-none"
                  aria-hidden="true"
                />
              </div>

              {/* DIV 2 DE LA NOTICIA: VACÍO SEGÚN LO SOLICITADO */}
              <div aria-hidden="true" />
            </article>
          </ScrollReveal>

          {/* DIV 2: ESPACIO VACÍO PREPARADO PARA FUTURA NOTICIA */}
          <ScrollReveal
            direction="up"
            distance="md"
            delay={180}
            className="w-full flex"
          >
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
              <div aria-hidden="true" />
            </article>
          </ScrollReveal>

          {/* DIV 3: REGISTRO DE INSTAGRAM (PUBLICACIÓN DEXLKABIBJG) */}
          <ScrollReveal
            direction="up"
            distance="md"
            delay={260}
            className="w-full flex"
          >
            <article
              onContextMenu={handleProtected}
              onDragStart={handleProtected}
              className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#00f0ff]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none relative"
            >
              {/* Resplandor ambiental de acento en la tarjeta */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#00f0ff]/10 blur-[50px] rounded-full z-0"
                aria-hidden="true"
              />

              {/* CONTENEDOR MULTIMEDIA: MISMO TAMAÑO QUE TODOS LOS DIVS DE SLIDE DEL SITIO */}
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
                  className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] shadow-md select-none flex flex-col"
                >
                  {/* Capa de textura CRT glitch sutil */}
                  <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

                  {/* Barra superior de control del iframe */}
                  <div className="relative z-20 flex items-center justify-between px-3.5 py-1.5 bg-[#10101A]/95 border-b border-[#252538] backdrop-blur-sm select-none shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                      <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#00f0ff]">
                        REGISTRO INSTAGRAM
                      </span>
                    </div>

                    <a
                      href="https://www.instagram.com/p/DexLkAbibjg/?xtok=MTkzY2J4b2tiaGx2OQ%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 text-[#A6A6C0] hover:text-[#00f0ff] transition-colors inline-flex items-center gap-1.5 text-xs font-mono-code"
                      title="Abrir publicación completa en Instagram"
                    >
                      <span className="hidden sm:inline text-[11px]">VER EN INSTAGRAM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Publicación completa escalada al 100% sin recortar */}
                  <InstagramScaledEmbed
                    url="https://www.instagram.com/p/DexLkAbibjg/embed/"
                    title="Instagram - Publicación Completa"
                  />
                </div>
              </div>

              {/* DIV 2 DE LA NOTICIA: VACÍO */}
              <div aria-hidden="true" />
            </article>
          </ScrollReveal>

          {/* DIV 4: REGISTRO DE INSTAGRAM IFRAME COMPLETO SIN CORTES */}
          <ScrollReveal
            direction="up"
            distance="md"
            delay={340}
            className="w-full flex"
          >
            <article
              id="darpana-instagram"
              onContextMenu={handleProtected}
              onDragStart={handleProtected}
              className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#FF007F]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none relative scroll-mt-24 sm:scroll-mt-28 target:border-[#FF007F] target:shadow-[0_0_35px_rgba(255,0,127,0.35)]"
            >
              {/* Resplandor ambiental de acento en la tarjeta */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#FF007F]/10 blur-[50px] rounded-full z-0"
                aria-hidden="true"
              />

              {/* CONTENEDOR MULTIMEDIA: MISMO TAMAÑO QUE TODOS LOS DIVS DE SLIDE DEL SITIO */}
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
                  className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] shadow-md select-none flex flex-col"
                >
                  {/* Capa de textura CRT glitch sutil */}
                  <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

                  {/* Barra superior de control del iframe */}
                  <div className="relative z-20 flex items-center justify-between px-3.5 py-1.5 bg-[#10101A]/95 border-b border-[#252538] backdrop-blur-sm select-none shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF007F] animate-pulse" />
                      <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#FF007F]">
                        REGISTRO INSTAGRAM
                      </span>
                    </div>

                    <a
                      href="https://www.instagram.com/p/DeYAQ86GiBm/?img_index=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 text-[#A6A6C0] hover:text-[#00f0ff] transition-colors inline-flex items-center gap-1.5 text-xs font-mono-code"
                      title="Abrir publicación completa en Instagram"
                    >
                      <span className="hidden sm:inline text-[11px]">VER EN INSTAGRAM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Publicación completa escalada al 100% sin recortar */}
                  <InstagramScaledEmbed
                    url="https://www.instagram.com/p/DeYAQ86GiBm/embed/"
                    title="Instagram - Publicación Completa"
                  />
                </div>
              </div>

              {/* DIV 2 DE LA NOTICIA: VACÍO SEGÚN LO SOLICITADO */}
              <div aria-hidden="true" />
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
