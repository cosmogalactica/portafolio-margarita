/**
 * @file AppSection.tsx
 * @description Sección de Aplicaciones & Software Interactivo del portafolio.
 * Incorpora un reproductor de video de YouTube para demostración interactiva
 * con controles de personalización de URL y estética retro-futurista.
 */

import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const DEFAULT_APP_VIDEO = 'https://www.youtube.com/watch?v=ngAq0Vqo0mQ';

export const AppSection: React.FC = () => {
  const [videoUrl] = useState<string>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('margarita_app_section_video_url') : null;
    if (!saved || saved.includes('ScMzIvxBSi4')) {
      return DEFAULT_APP_VIDEO;
    }
    return saved;
  });

  useEffect(() => {
    const saved = localStorage.getItem('margarita_app_section_video_url');
    if (!saved || saved.includes('ScMzIvxBSi4')) {
      localStorage.setItem('margarita_app_section_video_url', DEFAULT_APP_VIDEO);
    }
  }, []);

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const getEmbedUrl = (raw: string) => {
    if (!raw) return '';
    const match = raw.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return raw;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section
      id="app"
      role="region"
      aria-label="Aplicaciones y Software Interactivo"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO DE LA SECCIÓN APP */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <div
              role="heading"
              aria-level={2}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#E024C3]/10 border border-[#E024C3]/30 text-[#E024C3] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest"
            >
              <Smartphone className="w-5 h-5 text-[#E024C3]" />
              <span>APP</span>
            </div>
          </div>
        </ScrollReveal>

        {/* CONTENEDOR PRINCIPAL: DIV PARA VIDEO DE YOUTUBE */}
        <ScrollReveal direction="up" distance="md" delay={150}>
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl bg-[#14141E] border border-[#2B2B3E] shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Resplandor ambiental de acento */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-[#E024C3]/10 blur-[90px] rounded-full"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 bg-[#00f0ff]/10 blur-[90px] rounded-full"
              aria-hidden="true"
            />

            {/* Marco de video responsivo 16:9 */}
            <div className="relative w-full aspect-video bg-[#0A0A10]">
              {/* Capa de textura CRT glitch sutil */}
              <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

              {/* Iframe del video de YouTube */}
              <iframe
                src={embedUrl}
                title="Demostración de App en YouTube"
                className="w-full h-full border-0 pointer-events-auto"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
