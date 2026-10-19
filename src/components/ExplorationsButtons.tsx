/**
 * @file ExplorationsButtons.tsx
 * @description Slide continuo tipo ticker de exploraciones, proyectos y obras,
 * con la misma estructura y estética fluida que el slide de ODS de la sección de Soluciones.
 * Enlaces directos a las plataformas y obras oficiales (YouTube y Sonorartec Lab).
 */

import React, { useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';

export interface ProjectButtonItem {
  id: string;
  label: string;
  subtitle?: string;
  accentColor: string;
  href: string;
}

export const EXPLORATION_BUTTONS: ProjectButtonItem[] = [
  {
    id: 'audiografemas',
    label: 'AUDIOGRAFEMAS',
    accentColor: '#00f0ff',
    href: 'https://www.youtube.com/playlist?list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B',
  },
  {
    id: 'darpana',
    label: 'DARPANA',
    accentColor: '#FF007F',
    href: 'https://sonorarteclab.com/darpana/',
  },
  {
    id: 'mi-diario-cinefilo',
    label: 'MI DIARIO CINÉFILO',
    accentColor: '#FF007F',
    href: 'https://sonorarteclab.com/mi-diario-cinefilo/',
  },
  {
    id: 'cine-y-tecnologia',
    label: 'CINE Y TECNOLOGÍA',
    accentColor: '#E024C3',
    href: 'https://www.youtube.com/playlist?list=PLe85FU8Lv9rAwRTZ02pjK_pORLSEK4X0f',
  },
  {
    id: 'ovni-fancine',
    label: 'OVNI FANCINE',
    accentColor: '#00f0ff',
    href: 'https://sonorarteclab.com/ovni-fancine/',
  },
  {
    id: 'ovni-cinemancia',
    label: 'OVNI CINEMANCIA',
    accentColor: '#E024C3',
    href: 'https://sonorarteclab.com/ovni-cinemancia/',
  },
];

interface ExplorationsButtonsProps {
  onButtonClick?: (buttonId: string) => void;
}

export const ExplorationsButtons: React.FC<ExplorationsButtonsProps> = ({ onButtonClick }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = (e: React.MouseEvent, item: ProjectButtonItem) => {
    if (onButtonClick) {
      onButtonClick(item.id);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 pt-6 border-t border-[#222234]">
      {/* Barra de control superior idéntica al div de PERFIL */}
      <div className="flex items-center justify-between gap-4 mb-4 px-1">
        <div className="flex items-center gap-2 font-bahnschrift-condensed text-sm text-[#00f0ff] uppercase tracking-widest font-bold">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse-slow shadow-[0_0_8px_#00f0ff]" />
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
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleClick(e, item)}
                className="inline-flex items-center gap-2 group/item px-2.5 py-1 rounded transition-colors hover:bg-white/5 cursor-pointer"
                title={`Abrir ${item.label}`}
              >
                {/* Punto de acento sutil */}
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.accentColor }}
                />

                {/* Título */}
                <span className="font-bahnschrift-condensed font-medium text-[16px] sm:text-[18px] text-[#EAEAF4] group-hover/item:text-[#00f0ff] tracking-wide uppercase transition-colors">
                  {item.label}
                </span>

                <ExternalLink className="w-3 h-3 text-[#7E7E98] group-hover/item:text-white transition-colors" />
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
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleClick(e, item)}
                className="inline-flex items-center gap-2 group/item px-2.5 py-1 rounded transition-colors hover:bg-white/5 cursor-pointer"
                title={`Abrir ${item.label}`}
              >
                {/* Punto de acento sutil */}
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.accentColor }}
                />

                {/* Título */}
                <span className="font-bahnschrift-condensed font-medium text-[16px] sm:text-[18px] text-[#EAEAF4] group-hover/item:text-[#00f0ff] tracking-wide uppercase transition-colors">
                  {item.label}
                </span>

                <ExternalLink className="w-3 h-3 text-[#7E7E98] group-hover/item:text-white transition-colors" />
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
