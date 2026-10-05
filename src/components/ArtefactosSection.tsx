import React from 'react';
import { Cpu } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ArtefactosSection: React.FC = () => {
  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest mb-3">
              <Cpu className="w-4 h-4 text-[#00f0ff]" />
              <span>ARTEFACTOS</span>
            </div>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Artefactos, Dispositivos & Hardware Maker
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Instrumentos electroacústicos, sintetizadores analógicos DIY, prototipos interactivos y tecnología expandida.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance="md" delay={150}>
          <div className="w-full min-h-[180px] sm:min-h-[220px] rounded-2xl bg-[#14141E]/50 border border-dashed border-[#2B2B3F] flex flex-col items-center justify-center p-8 text-center font-mono-code">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping mb-3" />
            <span className="text-xs text-[#7A7A96] uppercase tracking-widest">
              [ SECCIÓN ARTEFACTOS // LISTA PARA CONTENIDO ]
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
