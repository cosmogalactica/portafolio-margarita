/**
 * @file ExplorationsButtons.tsx
 * @description Slide continuo tipo ticker de exploraciones, proyectos y obras,
 * con la misma estructura y estética fluida que el slide de ODS de la sección de Soluciones.
 * Sin efectos flotantes ni brillos pesados, con navegación suave y botón para pausar/reanudar.
 */

import React, { useState } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';

export interface ProjectButtonItem {
  id: string;
  label: string;
  subtitle?: string;
  accentColor: string;
  href?: string;
}

export const EXPLORATION_BUTTONS: ProjectButtonItem[] = [
  {
    id: 'darpana',
    label: 'DARPANA',
    accentColor: '#FF007F',
    href: '#publicaciones',
  },
  {
    id: 'audiografemas',
    label: 'AUDIOGRAFEMAS',
    accentColor: '#00f0ff',
    href: '#publicaciones',
  },
  {
    id: 'cine-y-tecnologia',
    label: 'CINE Y TECNOLOGÍA',
    accentColor: '#E024C3',
    href: '#talleres',
  },
  {
    id: 'ovni-fancine',
    label: 'OVNI FANCINE',
    accentColor: '#00f0ff',
    href: '#publicaciones',
  },
  {
    id: 'mi-diario-cinefilo',
    label: 'MI DIARIO CINÉFILO',
    accentColor: '#FF007F',
    href: '#publicaciones',
  },
  {
    id: 'ovni-cinemancia',
    label: 'OVNI CINEMANCIA',
    accentColor: '#E024C3',
    href: '#exposiciones',
  },
  {
    id: 'vibraciones-salvajes',
    label: 'LAS VIBRACIONES SALVAJES',
    subtitle: 'ruido y salud mental',
    accentColor: '#00f0ff',
    href: '#conversatorios',
  },
];

interface ExplorationsButtonsProps {
  onButtonClick?: (buttonId: string) => void;
}

export const ExplorationsButtons: React.FC<ExplorationsButtonsProps> = ({ onButtonClick }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = (e: React.MouseEvent, item: ProjectButtonItem) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick(item.id);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 pt-6 border-t border-[#222234]">
      {/* Barra de control minimalista superior con etiqueta y botón de pausa/reanudación */}
      <div className="flex items-center justify-between gap-4 mb-3 px-1">
        <div className="flex items-center gap-2 font-bahnschrift-condensed text-xs sm:text-sm text-[#00f0ff] uppercase tracking-wider font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>EXPLORACIONES & PROYECTOS</span>
        </div>

        {/* Botón Reanudar / Pausar idéntico al slide de ODS */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#161622] hover:bg-[#202030] border border-[#2B2B3E] hover:border-[#00f0ff] text-[#A0A0B8] hover:text-white font-mono-code text-xs transition-colors cursor-pointer"
          title={isPaused ? 'Reanudar slide' : 'Pausar slide'}
        >
          {isPaused ? (
            <>
              <Play className="w-3 h-3 text-[#00f0ff]" />
              <span>REANUDAR</span>
            </>
          ) : (
            <>
              <Pause className="w-3 h-3 text-[#FF007F]" />
              <span>PAUSAR</span>
            </>
          )}
        </button>
      </div>

      {/* Slide continuo tipo ticker idéntico a Soluciones con ODS */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#12121A]/80 border border-[#202030] py-3 px-2">
        {/* Máscara de desvanecimiento izquierda */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-[#12121A] to-transparent z-10" />

        {/* Máscara de desvanecimiento derecha */}
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-[#12121A] to-transparent z-10" />

        {/* Pista animada continua */}
        <div
          className={`flex items-center whitespace-nowrap ${
            isPaused ? '' : 'animate-ods-slide'
          }`}
        >
          {/* Primer ciclo de items */}
          {EXPLORATION_BUTTONS.map((item) => (
            <div key={`exp-1-${item.id}`} className="inline-flex items-center">
              <a
                href={item.href || `#${item.id}`}
                onClick={(e) => handleClick(e, item)}
                className="inline-flex items-center gap-2 group/item px-2 py-1 rounded transition-colors hover:bg-white/5 cursor-pointer"
              >
                {/* Punto de acento sutil sin resplandor excesivo */}
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.accentColor }}
                />

                {/* Título */}
                <span className="font-bahnschrift-condensed font-medium text-[13px] sm:text-[15px] text-[#EAEAF4] group-hover/item:text-white tracking-wide uppercase transition-colors">
                  {item.label}
                </span>

                {/* Subtítulo si aplica */}
                {item.subtitle && (
                  <span className="font-rajdhani font-semibold text-xs text-[#8E8EA8] tracking-normal lowercase group-hover/item:text-[#B0B0C8]">
                    ({item.subtitle})
                  </span>
                )}
              </a>

              {/* Separador vertical "|" */}
              <span
                className="mx-3 sm:mx-4 text-[#FF007F]/60 font-light text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                |
              </span>
            </div>
          ))}

          {/* Segundo ciclo de items para desplazamiento infinito sin saltos */}
          {EXPLORATION_BUTTONS.map((item) => (
            <div key={`exp-2-${item.id}`} className="inline-flex items-center">
              <a
                href={item.href || `#${item.id}`}
                onClick={(e) => handleClick(e, item)}
                className="inline-flex items-center gap-2 group/item px-2 py-1 rounded transition-colors hover:bg-white/5 cursor-pointer"
              >
                {/* Punto de acento sutil sin resplandor excesivo */}
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.accentColor }}
                />

                {/* Título */}
                <span className="font-bahnschrift-condensed font-medium text-[13px] sm:text-[15px] text-[#EAEAF4] group-hover/item:text-white tracking-wide uppercase transition-colors">
                  {item.label}
                </span>

                {/* Subtítulo si aplica */}
                {item.subtitle && (
                  <span className="font-rajdhani font-semibold text-xs text-[#8E8EA8] tracking-normal lowercase group-hover/item:text-[#B0B0C8]">
                    ({item.subtitle})
                  </span>
                )}
              </a>

              {/* Separador vertical "|" */}
              <span
                className="mx-3 sm:mx-4 text-[#FF007F]/60 font-light text-xs sm:text-sm select-none"
                aria-hidden="true"
              >
                |
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
