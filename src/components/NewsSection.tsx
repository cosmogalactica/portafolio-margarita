import React from 'react';
import { Newspaper } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const NewsSection: React.FC = () => {
  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="noticias"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content"
    >
      {/* Resplandor ambiental de fondo */}
      <div
        className="pointer-events-none absolute top-10 left-10 w-96 h-96 bg-[#00f0ff]/5 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#FF007F]/5 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección Noticias */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest mb-3">
              <Newspaper className="w-4 h-4 text-[#00f0ff]" />
              <span>NOTICIAS</span>
            </div>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Actualidad, Comunicados & Novedades
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Espacio destinado para noticias, lanzamientos, convocatorias y actualizaciones de proyectos.
            </p>
          </div>
        </ScrollReveal>

        {/* Contenedor vacío preparado para el contenido que se agregará */}
        <ScrollReveal direction="up" distance="md" delay={150}>
          <div className="w-full min-h-[180px] sm:min-h-[220px] rounded-2xl bg-[#14141E]/50 border border-dashed border-[#2B2B3F] flex flex-col items-center justify-center p-8 text-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping mb-3" />
            <span className="font-mono-code text-xs text-[#7A7A96] uppercase tracking-widest">
              [ SECCIÓN NOTICIAS // LISTA PARA CONTENIDO ]
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
