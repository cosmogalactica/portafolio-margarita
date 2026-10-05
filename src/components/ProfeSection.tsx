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
  Plus,
  RotateCcw,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ProfeImageItem {
  url: string;
  title: string;
  caption: string;
}

const DEFAULT_PROFE_IMAGES: ProfeImageItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    title: 'Mediación Tecnológica & Creativa',
    caption: 'Talleres colaborativos en STEAM y pensamiento computacional aplicado a las artes.',
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop',
    title: 'Pedagogías Disruptivas & ABP',
    caption: 'Acompañamiento formativo basado en proyectos reales y dinámicas colectivas.',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop',
    title: 'Cultura Maker & Prototipado DIY',
    caption: 'Electrónica creativa, circuitos sonoros y fabricación accesible para jóvenes y adultos.',
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    title: 'Alfabetización Digital & E-Literatura',
    caption: 'Aulas abiertas para la narración transmedia, accesibilidad e inclusión.',
  },
];

export const ProfeSection: React.FC = () => {
  const [images, setImages] = useState<ProfeImageItem[]>(() => {
    try {
      const saved = localStorage.getItem('margarita_profe_slide_images');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROFE_IMAGES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

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

  const handleReset = () => {
    setImages(DEFAULT_PROFE_IMAGES);
    localStorage.removeItem('margarita_profe_slide_images');
    setCurrentIndex(0);
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const updated = [
      ...images,
      {
        url: newImageUrl.trim(),
        title: newImageTitle.trim() || 'Experiencia Pedagógica',
        caption: newImageCaption.trim() || 'Registro fotográfico de sesión formativa.',
      },
    ];
    setImages(updated);
    localStorage.setItem('margarita_profe_slide_images', JSON.stringify(updated));
    setCurrentIndex(updated.length - 1);
    setNewImageUrl('');
    setNewImageTitle('');
    setNewImageCaption('');
    setShowAddModal(false);
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
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest mb-3">
              <GraduationCap className="w-4 h-4 text-[#00f0ff]" />
              <span>PROFE</span>
            </div>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Docencia & Mediación Pedagógica
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Diseño de laboratorios de aprendizaje experiencial, alfabetización digital, STEAM y mediación de cultura contemporánea.
            </p>
          </div>
        </ScrollReveal>

        {/* CONTENEDOR PRINCIPAL: SLIDE DE FOTOS INTERACTIVO CENTRADO */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full max-w-5xl mx-auto">
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

            {/* Barra superior del Slide */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#232334] bg-[#0E0E16]/80 backdrop-blur-md relative z-20">
              <div className="flex items-center gap-2 font-mono-code text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                <span className="text-[#00f0ff] font-bold">SLIDE //</span>
                <span>{`FOTO ${currentIndex + 1} DE ${images.length}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1B1B28] hover:bg-[#00f0ff] hover:text-black border border-[#303046] hover:border-[#00f0ff] font-mono-code text-xs text-[#A0A0B8] transition-colors cursor-pointer"
                  title="Añadir una foto a este slide"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>AÑADIR FOTO</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1B1B28] hover:bg-[#2A2A3C] border border-[#303046] font-mono-code text-xs text-[#8E8EA8] hover:text-white transition-colors cursor-pointer"
                  title="Restablecer fotos iniciales"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">RESTABLECER</span>
                </button>
              </div>
            </div>

            {/* Contenedor de la Imagen con Relación de Aspecto */}
            <div className="relative w-full aspect-[16/10] bg-[#0A0A10] overflow-hidden">
              {/* Capa de textura CRT glitch sutil */}
              <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

              <img
                key={currentItem.url}
                src={currentItem.url}
                alt={currentItem.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/slide:scale-105"
                loading="lazy"
              />

              {/* Flechas de navegación del Slide */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#00f0ff] text-white hover:text-black border border-white/20 hover:border-[#00f0ff] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-[#00f0ff] text-white hover:text-black border border-white/20 hover:border-[#00f0ff] flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Leyenda flotante inferior sobre la imagen */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-[2px]">
                <h3 className="font-bahnschrift-condensed font-bold text-base sm:text-lg text-white uppercase tracking-wider">
                  {currentItem.title}
                </h3>
                <p className="font-rajdhani font-semibold text-xs sm:text-sm text-[#C8C8DC] mt-0.5 line-clamp-2">
                  {currentItem.caption}
                </p>
              </div>
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

        {/* MODAL PARA AGREGAR IMAGEN AL SLIDE */}
        {showAddModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <div className="relative w-full max-w-md p-6 bg-[#161622] border border-[#2D2D42] rounded-2xl shadow-2xl font-mono-code">
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs sm:text-sm text-white uppercase font-bold">
                  Agregar Foto al Slide de Profe
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] text-[#8E8EA8] uppercase mb-1">
                    URL de la Imagen:
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8E8EA8] uppercase mb-1">
                    Título / Taller:
                  </label>
                  <input
                    type="text"
                    value={newImageTitle}
                    onChange={(e) => setNewImageTitle(e.target.value)}
                    placeholder="Ej. Taller de Robótica Creativa"
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8E8EA8] uppercase mb-1">
                    Descripción / Leyenda:
                  </label>
                  <input
                    type="text"
                    value={newImageCaption}
                    onChange={(e) => setNewImageCaption(e.target.value)}
                    placeholder="Ej. Sesión práctica con estudiantes..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 text-xs rounded-lg bg-[#222232] hover:bg-[#2C2C3E] text-[#A0A0BA] hover:text-white cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex-1 py-2 text-xs rounded-lg bg-[#00f0ff] hover:bg-[#43f3ff] text-black font-bold cursor-pointer transition-colors"
                >
                  Guardar en Slide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
