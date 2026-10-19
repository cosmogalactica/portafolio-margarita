/**
 * @file YouTubeSection.tsx
 * @description Sección "YOUTUBE" basada en la diapositiva de presentación oficial.
 * Presenta los 2 canales oficiales:
 * 1. Canal de Autor: @mandarinavozenoff
 * 2. Laboratorio & I+D: @sonorarteclab
 */

import React, { useCallback, useState, useEffect } from 'react';
import {
  Youtube,
  ExternalLink
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const YOUTUBEMANDARINA_GITHUB_IMAGE =
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/youtubemandarina.webp';
export const YOUTUBEMANDARINA_PROD_IMAGE = '/images/youtubemandarina.webp';

export const YOUTUBESONARTECLAB_GITHUB_IMAGE =
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/youtubesonorarteclab.webp';
export const YOUTUBESONARTECLAB_PROD_IMAGE = '/images/youtubesonorarteclab.webp';

export const YouTubeSection: React.FC = () => {
  const isExternalProduction = typeof window !== 'undefined' && 
    !window.location.hostname.includes('run.app') && 
    !window.location.hostname.includes('localhost') && 
    !window.location.hostname.includes('127.0.0.1');

  const [mandarinaBgUrl, setMandarinaBgUrl] = useState(() =>
    isExternalProduction ? YOUTUBEMANDARINA_PROD_IMAGE : YOUTUBEMANDARINA_GITHUB_IMAGE
  );
  const [sonartecBgUrl, setSonartecBgUrl] = useState(() =>
    isExternalProduction ? YOUTUBESONARTECLAB_PROD_IMAGE : YOUTUBESONARTECLAB_GITHUB_IMAGE
  );

  useEffect(() => {
    if (isExternalProduction) {
      const imgMandarina = new Image();
      imgMandarina.src = YOUTUBEMANDARINA_PROD_IMAGE;
      imgMandarina.onerror = () => {
        setMandarinaBgUrl(YOUTUBEMANDARINA_GITHUB_IMAGE);
      };

      const imgSonartec = new Image();
      imgSonartec.src = YOUTUBESONARTECLAB_PROD_IMAGE;
      imgSonartec.onerror = () => {
        setSonartecBgUrl(YOUTUBESONARTECLAB_GITHUB_IMAGE);
      };
    }
  }, [isExternalProduction]);

  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="youtube"
      role="region"
      aria-label="Canales Oficiales de YouTube"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#07070B] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      {/* Resplandor ambiental */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF007F]/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#00f0ff]/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <div
              role="heading"
              aria-level={2}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 text-[#FF3333] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest"
            >
              <Youtube className="w-5 h-5 text-[#FF0000]" />
              <span>YOUTUBE</span>
            </div>
          </div>
        </ScrollReveal>

        {/* TARJETAS DE LOS DOS CANALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* TARJETA 1: CANAL DE AUTORA (@mandarinavozenoff) */}
          <ScrollReveal direction="up" distance="md" delay={100} className="w-full flex">
            <div className="w-full rounded-2xl bg-[#0F0F17] border border-[#222234] hover:border-[#FF007F]/60 shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col overflow-hidden group select-none">
              {/* DIV 1: IMAGEN DEL CANAL DE YOUTUBE (AJUSTADA AL TAMAÑO REAL EN EJES X E Y) */}
              <div className="relative w-full bg-[#0A0A12] overflow-hidden border-b border-[#222234]">
                <img
                  src={mandarinaBgUrl}
                  alt="Canal de Autora @mandarinavozenoff"
                  draggable={false}
                  onContextMenu={handleProtected}
                  onDragStart={handleProtected}
                  style={
                    {
                      userSelect: 'none',
                      WebkitUserDrag: 'none',
                    } as React.CSSProperties
                  }
                  className="w-full h-auto block select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#FF007F]/15 blur-[45px] rounded-full z-0" aria-hidden="true" />
              </div>

              {/* DIV 2: INFO DEL CANAL (EL DIV COMPLETO ES EL BOTÓN QUE LLEVA A YOUTUBE) */}
              <a
                href="https://www.youtube.com/@mandarinavozenoff"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-[#0F0F17] hover:bg-[#161624] transition-colors duration-300 group/btn cursor-pointer"
                title="Visitar canal de YouTube @mandarinavozenoff"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#26101D] border border-[#FF007F]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,0,127,0.2)] group-hover/btn:scale-105 transition-transform">
                    <Youtube className="w-6 h-6 text-[#FF007F]" />
                  </div>

                  <div>
                    <span className="block font-mono-code text-[11px] sm:text-xs uppercase tracking-widest text-[#00f0ff] font-bold">
                      CANAL DE AUTORA
                    </span>
                    <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-wide group-hover/btn:text-[#FF007F] transition-colors">
                      @mandarinavozenoff
                    </h3>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#171724] border border-[#2E2E42] group-hover/btn:border-[#FF007F] group-hover/btn:bg-[#FF007F] text-[#8E8EA8] group-hover/btn:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* TARJETA 2: LABORATORIO I+D (@sonorarteclab) */}
          <ScrollReveal direction="up" distance="md" delay={200} className="w-full flex">
            <div className="w-full rounded-2xl bg-[#0F0F17] border border-[#222234] hover:border-[#FF007F]/60 shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col overflow-hidden group select-none">
              {/* DIV 1: IMAGEN DEL CANAL DE YOUTUBE (AJUSTADA AL TAMAÑO REAL EN EJES X E Y) */}
              <div className="relative w-full bg-[#0A0A12] overflow-hidden border-b border-[#222234]">
                <img
                  src={sonartecBgUrl}
                  alt="Laboratorio I+D @sonorarteclab"
                  draggable={false}
                  onContextMenu={handleProtected}
                  onDragStart={handleProtected}
                  style={
                    {
                      userSelect: 'none',
                      WebkitUserDrag: 'none',
                    } as React.CSSProperties
                  }
                  className="w-full h-auto block select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#FF007F]/15 blur-[45px] rounded-full z-0" aria-hidden="true" />
              </div>

              {/* DIV 2: INFO DEL CANAL (EL DIV COMPLETO ES EL BOTÓN QUE LLEVA A YOUTUBE) */}
              <a
                href="https://www.youtube.com/@sonorarteclab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-[#0F0F17] hover:bg-[#161624] transition-colors duration-300 group/btn cursor-pointer"
                title="Visitar canal de YouTube @sonorarteclab"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#26101D] border border-[#FF007F]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,0,127,0.2)] group-hover/btn:scale-105 transition-transform">
                    <Youtube className="w-6 h-6 text-[#FF007F]" />
                  </div>

                  <div>
                    <span className="block font-mono-code text-[11px] sm:text-xs uppercase tracking-widest text-[#00f0ff] font-bold">
                      LABORATORIO I+D
                    </span>
                    <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-wide group-hover/btn:text-[#FF007F] transition-colors">
                      @sonorarteclab
                    </h3>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#171724] border border-[#2E2E42] group-hover/btn:border-[#FF007F] group-hover/btn:bg-[#FF007F] text-[#8E8EA8] group-hover/btn:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
