/**
 * @file YouTubeSection.tsx
 * @description Sección "YOUTUBE" basada en la diapositiva de presentación oficial.
 * Presenta los 2 canales oficiales:
 * 1. Canal de Autor: @mandarinavozenoff
 * 2. Laboratorio & I+D: @sonorarteclab
 */

import React, { useCallback } from 'react';
import {
  Youtube,
  ExternalLink,
  Radio
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const YouTubeSection: React.FC = () => {
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <ScrollReveal direction="up" distance="sm">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 text-[#FF3333] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest mb-3">
              <Youtube className="w-4 h-4 text-[#FF0000]" />
              <span>YOUTUBE // TRANSMISIÓN</span>
            </div>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase">
              Canales Oficiales en YouTube
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 font-rajdhani font-semibold tracking-wide">
              Archivo audiovisual, ensayos sonoros, conferencias y registro de laboratorios de investigación y desarrollo.
            </p>
          </div>
        </ScrollReveal>

        {/* TARJETAS DE LOS DOS CANALES (DISEÑO FIEL A LA DIAPOSITIVA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* TARJETA 1: CANAL DE AUTOR (@mandarinavozenoff) */}
          <ScrollReveal direction="up" distance="md" delay={100} className="w-full flex">
            <div className="w-full p-7 sm:p-9 rounded-2xl bg-[#0F0F17] border border-[#222234] hover:border-[#FF007F]/60 shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              {/* Brillo de acento magenta en esquina */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#FF007F]/10 blur-[50px] rounded-full"
                aria-hidden="true"
              />

              <div>
                {/* Cabecera del canal: Icono + Categoría + Handle */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#26101D] border border-[#FF007F]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,0,127,0.2)] group-hover:scale-105 transition-transform">
                    <Youtube className="w-6 h-6 text-[#FF007F]" />
                  </div>

                  <div>
                    <span className="block font-mono-code text-[11px] sm:text-xs uppercase tracking-widest text-[#00f0ff] font-bold">
                      CANAL DE AUTOR
                    </span>
                    <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#FF007F] transition-colors">
                      @mandarinavozenoff
                    </h3>
                  </div>
                </div>

                {/* Descripción textual oficial de la diapositiva */}
                <p className="font-rajdhani font-semibold text-sm sm:text-[15px] text-[#A6A6C0] leading-relaxed mb-6">
                  Audiografemas, videoensayos sonoros, lecturas poéticas multidisciplinares y
                  reflexiones sobre el cine, la escucha atenta y la afectividad contemporánea.
                </p>

                {/* Etiquetas / Hashtags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['#Audiografemas', '#VideoEnsayo', '#VozEnOff'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-[#161622] border border-[#2B2B3E] font-mono-code text-xs text-[#C4C4DC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botón de Visita Oficial */}
              <a
                href="https://www.youtube.com/@mandarinavozenoff"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#171724] hover:bg-[#FF007F] text-[#E0E0F0] hover:text-white border border-[#2E2E42] hover:border-[#FF007F] font-mono-code text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(255,0,127,0.3)] cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>VISITAR @MANDARINAVOZENOFF</span>
              </a>
            </div>
          </ScrollReveal>

          {/* TARJETA 2: LABORATORIO & I+D (@sonorarteclab) */}
          <ScrollReveal direction="up" distance="md" delay={200} className="w-full flex">
            <div className="w-full p-7 sm:p-9 rounded-2xl bg-[#0F0F17] border border-[#222234] hover:border-[#00f0ff]/60 shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              {/* Brillo de acento cyan en esquina */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-[#00f0ff]/10 blur-[50px] rounded-full"
                aria-hidden="true"
              />

              <div>
                {/* Cabecera del canal: Icono + Categoría + Handle */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0E1E28] border border-[#00f0ff]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.2)] group-hover:scale-105 transition-transform">
                    <Radio className="w-6 h-6 text-[#00f0ff]" />
                  </div>

                  <div>
                    <span className="block font-mono-code text-[11px] sm:text-xs uppercase tracking-widest text-[#00f0ff] font-bold">
                      LABORATORIO & I+D
                    </span>
                    <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-[#00f0ff] transition-colors">
                      @sonorarteclab
                    </h3>
                  </div>
                </div>

                {/* Descripción textual oficial de la diapositiva */}
                <p className="font-rajdhani font-semibold text-sm sm:text-[15px] text-[#A6A6C0] leading-relaxed mb-6">
                  Documentación técnica de laboratorios, circuit bending en vivo, sintetizadores
                  artesanales, conferencias universitarias y registros de talleres STEAM en Noruega,
                  México y Colombia.
                </p>

                {/* Etiquetas / Hashtags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['#CircuitBending', '#MakerCulture', '#TechLabs'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-md bg-[#161622] border border-[#2B2B3E] font-mono-code text-xs text-[#C4C4DC]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botón de Visita Oficial */}
              <a
                href="https://www.youtube.com/@sonorarteclab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#171724] hover:bg-[#00f0ff] text-[#E0E0F0] hover:text-black border border-[#2E2E42] hover:border-[#00f0ff] font-mono-code text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>VISITAR @SONORARTECLAB</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
