/**
 * @file ProfeSection.tsx
 * @description Sección "PROFE" (Docencia, Mediación y Pedagogías Disruptivas).
 * Incluye un slide de fotos interactivo de experiencias educativas y formativas,
 * controles de navegación de diapositivas, modal para agregar/personalizar imágenes,
 * y resumen de metodologías pedagógicas.
 */

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ProfeImageItem {
  url: string;
  prodUrl?: string;
  title: string;
  caption: string;
}

export const PROFE_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe5.webp',
];

export const PROFE_PROD_IMAGES = [
  '/images/profe/profe1.webp',
  '/images/profe/profe2.webp',
  '/images/profe/profe3.webp',
  '/images/profe/profe4.webp',
  '/images/profe/profe5.webp',
];

export const DEFAULT_PROFE_IMAGES: ProfeImageItem[] = [
  {
    url: 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe1.webp',
    prodUrl: '/images/profe/profe1.webp',
    title: 'Mediación Tecnológica & Creativa',
    caption: 'Talleres colaborativos en STEAM y pensamiento computacional aplicado a las artes.',
  },
  {
    url: 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe2.webp',
    prodUrl: '/images/profe/profe2.webp',
    title: 'Pedagogías Disruptivas & ABP',
    caption: 'Acompañamiento formativo basado en proyectos reales y dinámicas colectivas.',
  },
  {
    url: 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe3.webp',
    prodUrl: '/images/profe/profe3.webp',
    title: 'Cultura Maker & Prototipado DIY',
    caption: 'Electrónica creativa, circuitos sonoros y fabricación accesible para jóvenes y adultos.',
  },
  {
    url: 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe4.webp',
    prodUrl: '/images/profe/profe4.webp',
    title: 'Alfabetización Digital & E-Literatura',
    caption: 'Aulas abiertas para la narración transmedia, accesibilidad e inclusión.',
  },
  {
    url: 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/profe5.webp',
    prodUrl: '/images/profe/profe5.webp',
    title: 'Laboratorios de Creación e Innovación',
    caption: 'Espacios de experimentación sensible, pensamiento crítico y pedagogías vivas.',
  },
];

export const ProfeSection: React.FC = () => {
  const [images, setImages] = useState<ProfeImageItem[]>(() => {
    try {
      const saved = localStorage.getItem('margarita_profe_slide_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasUnsplash = parsed.some(
            (img: any) => typeof img?.url === 'string' && img.url.includes('unsplash.com')
          );
          if (!hasUnsplash) {
            return parsed;
          }
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROFE_IMAGES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);


  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('margarita_profe_slide_images');
      if (saved && saved.includes('unsplash.com')) {
        localStorage.setItem('margarita_profe_slide_images', JSON.stringify(DEFAULT_PROFE_IMAGES));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentItem = images[currentIndex] || DEFAULT_PROFE_IMAGES[0];

  return (
    <section
      id="profe"
      role="region"
      aria-label="Docencia, Mediación y Pedagogías Disruptivas"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0F] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO DE LA SECCIÓN PROFE */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <div
              role="heading"
              aria-level={2}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest"
            >
              <GraduationCap className="w-5 h-5 text-[#00f0ff]" />
              <span>PROFE</span>
            </div>
          </div>
        </ScrollReveal>

        {/* CONTENEDOR PRINCIPAL: SLIDE DE FOTOS INTERACTIVO CENTRADO (Mismo tamaño que los slides anteriores) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full max-w-xl mx-auto">
          <div
            className="relative w-full rounded-2xl bg-[#14141E] border border-[#2B2B3E] shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden group/slide"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Resplandor ambiental de fondo */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-60 h-60 bg-[#00f0ff]/10 blur-[80px] rounded-full"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 w-60 h-60 bg-[#FF007F]/10 blur-[80px] rounded-full"
              aria-hidden="true"
            />



            {/* Contenedor de la Imagen con Relación de Aspecto unificada (16:9 / 16:10) */}
            <div
              className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-[#0A0A10] overflow-hidden select-none"
              onContextMenu={handleProtected}
              onDragStart={handleProtected}
              style={{
                userSelect: 'none',
                WebkitUserDrag: 'none',
              } as React.CSSProperties}
            >
              {/* Capa de textura CRT glitch sutil */}
              <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

              <img
                key={currentItem.url}
                src={currentItem.url}
                alt={currentItem.title}
                draggable={false}
                onContextMenu={handleProtected}
                onDragStart={handleProtected}
                style={{
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                } as React.CSSProperties}
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover/slide:scale-105 pointer-events-auto [user-drag:none] [-webkit-user-drag:none]"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  const currentSrc = target.src;
                  if (currentSrc.includes('profe')) {
                    const match = currentSrc.match(/profe\d+\.webp/);
                    if (match) {
                      const filename = match[0];
                      if (currentSrc.includes('raw.githubusercontent.com')) {
                        target.src = `/images/profe/${filename}`;
                      } else {
                        target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/profe/${filename}`;
                      }
                    }
                  }
                }}
              />

              {/* Flechas de navegación del Slide */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/75 hover:bg-[#00f0ff] text-white hover:text-black border border-white/20 hover:border-[#00f0ff] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/75 hover:bg-[#00f0ff] text-white hover:text-black border border-white/20 hover:border-[#00f0ff] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

            {/* Paginación por puntos (Dots) */}
            <div className="flex items-center justify-center gap-1.5 py-3 bg-[#0E0E16]/90 border-t border-[#232334]">
              {images.map((_, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-[#00f0ff]'
                      : 'w-2 bg-[#333348] hover:bg-[#555570]'
                  }`}
                  aria-label={`Ir a la diapositiva ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>


      </div>
    </section>
  );
};
