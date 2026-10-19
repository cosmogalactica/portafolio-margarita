/**
 * @file UniversesSkillsSection.tsx
 * @description Sección de Universos y Habilidades extraída fielmente del portafolio oficial.
 * Presenta 4 Universos temáticos en formato desplegable (accordion) interactivo:
 * 1. Tecnología Creativa
 * 2. Literatura expandida
 * 3. Educación Disruptiva
 * 4. Estrategia & Liderazgo
 */

import React, { useState } from 'react';
import {
  ChevronDown,
  Terminal,
  Feather,
  Lightbulb,
  Compass,
  Check,
  Layers
} from 'lucide-react';
import { ExplorationsButtons } from './ExplorationsButtons';
import { ScrollReveal } from './ScrollReveal';

export interface UniverseData {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  skills: string[];
}

export const UNIVERSES_DATA: UniverseData[] = [
  {
    id: 'tecnologia-creativa',
    title: 'Tecnología Creativa',
    icon: Terminal,
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.25)',
    badgeBg: 'rgba(0, 240, 255, 0.1)',
    skills: [
      'Desarrollo Web Sostenible',
      'HTML | CSS',
      'Python',
      'I.A Aplicada',
      'Creación De Experiencias Digitales',
      'Electrónica Aplicada Al Arte',
      'App Inventor',
      'DIY | DIWO',
      'Cultura Maker',
    ],
  },
  {
    id: 'literatura-expandida',
    title: 'Literatura Expandida',
    icon: Feather,
    accentColor: '#FF007F',
    glowColor: 'rgba(255, 0, 127, 0.25)',
    badgeBg: 'rgba(255, 0, 127, 0.1)',
    skills: [
      'E-Literatura',
      'Narrativas Transmedia',
      'Escritura Multicanal',
      'Cultura Digital',
    ],
  },
  {
    id: 'educacion-disruptiva',
    title: 'Educación Disruptiva',
    icon: Lightbulb,
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.25)',
    badgeBg: 'rgba(0, 240, 255, 0.1)',
    skills: [
      'Prácticas Transversales',
      'STEAM',
      'Aprendizaje Basado En Proyectos (ABP)',
      'Alfabetización Digital',
      'Diseño De Experiencias Educativas',
      'Mediación Tecnológica Y Creativa',
    ],
  },
  {
    id: 'estrategia-liderazgo',
    title: 'Estrategia & Liderazgo',
    icon: Compass,
    accentColor: '#E024C3',
    glowColor: 'rgba(224, 36, 195, 0.25)',
    badgeBg: 'rgba(224, 36, 195, 0.1)',
    skills: [
      'Innovación',
      'Liderazgo Digital',
      'Gestión De Proyectos',
      'Creación De Soluciones Digitales',
      'Pensamiento Estratégico',
    ],
  },
];

export const UniversesSkillsSection: React.FC = () => {
  // Estado de los desplegables: por defecto todos abiertos para visualización inmediata,
  // permitiendo abrir/cerrar individualmente
  const [openUniverses, setOpenUniverses] = useState<Record<string, boolean>>({
    'tecnologia-creativa': true,
    'literatura-expandida': true,
    'educacion-disruptiva': true,
    'estrategia-liderazgo': true,
  });

  const toggleUniverse = (id: string) => {
    setOpenUniverses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = (expand: boolean) => {
    const newState: Record<string, boolean> = {};
    UNIVERSES_DATA.forEach((u) => {
      newState[u.id] = expand;
    });
    setOpenUniverses(newState);
  };

  const allOpen = Object.values(openUniverses).every(Boolean);

  return (
    <div id="universos-habilidades" className="mt-12 sm:mt-16 pt-8 border-t border-[#222234]">
      {/* Barra de cabecera con estilo idéntico al div de PERFIL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <button
          type="button"
          onClick={() => toggleAll(!allOpen)}
          className="flex items-center gap-2 font-bahnschrift-condensed text-sm text-[#00f0ff] uppercase tracking-widest font-bold hover:text-white transition-colors cursor-pointer group text-left"
          title={allOpen ? 'Contraer todos los universos' : 'Expandir todos los universos'}
        >
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse-slow shadow-[0_0_8px_#00f0ff] group-hover:scale-125 transition-transform" />
          <span>UNIVERSOS Y HABILIDADES</span>
        </button>

        {/* Botón rápido para expandir/colapsar todos */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleAll(!allOpen)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141420] border border-[#27273C] hover:border-[#00f0ff]/50 text-[13px] sm:text-[14px] font-bahnschrift-condensed font-semibold tracking-wider text-[#8E8EA8] hover:text-[#00f0ff] transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{allOpen ? 'Contraer' : 'Expandir'}</span>
          </button>
        </div>
      </div>

      {/* Grid de los 4 Universos en formato desplegable (2 columnas en escritorio) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {UNIVERSES_DATA.map((universe, index) => {
          const isOpen = !!openUniverses[universe.id];
          const Icon = universe.icon;

          return (
            <ScrollReveal
              key={universe.id}
              delay={index * 90}
              direction="up"
              distance="md"
              className="h-full w-full"
            >
              <div
                className={`rounded-2xl bg-[#14141E] border transition-all duration-300 overflow-hidden shadow-lg h-full ${
                  isOpen
                    ? 'border-[#2D2D44] shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                    : 'border-[#222234] hover:border-[#383852]'
                }`}
              >
                {/* Encabezado desplegable (Trigger interactivo) */}
                <button
                  type="button"
                  onClick={() => toggleUniverse(universe.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left bg-gradient-to-r from-[#171724] to-[#12121B] hover:bg-[#1C1C2C] transition-colors cursor-pointer group select-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105"
                      style={{
                        backgroundColor: universe.badgeBg,
                        borderColor: `${universe.accentColor}40`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: universe.accentColor }} />
                    </div>
                    <div className="truncate">
                      <h3 className="font-rajdhani font-semibold text-base sm:text-lg text-white tracking-wide group-hover:text-white flex items-center gap-2 capitalize">
                        <span>{universe.title}</span>
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span
                      className="font-rajdhani font-semibold text-xs tracking-wider px-2.5 py-0.5 rounded-full border hidden xs:inline-block capitalize"
                      style={{
                        backgroundColor: universe.badgeBg,
                        borderColor: `${universe.accentColor}30`,
                        color: universe.accentColor,
                      }}
                    >
                      {universe.skills.length} habilidades
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg bg-[#1F1F2E] border border-[#2E2E44] flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#28283E] text-white' : 'text-[#8E8EA8]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Contenido desplegable con animación suave */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-5 pt-3 border-t border-[#1F1F2E] bg-[#11111A]">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {universe.skills.map((skill, skillIdx) => (
                        <li
                          key={skillIdx}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#161622] border border-[#232336] hover:border-[#383852] hover:bg-[#1A1A2A] transition-all group/item"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform group-hover/item:scale-125"
                            style={{
                              backgroundColor: universe.accentColor,
                              boxShadow: `0 0 6px ${universe.accentColor}`,
                            }}
                          />
                          <span className="font-rajdhani font-semibold text-sm sm:text-base text-[#D4D4E4] group-hover/item:text-white tracking-wide capitalize">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Botones de Exploraciones, Publicaciones y Proyectos (Diapositiva 10) */}
      <ScrollReveal delay={120} direction="up" distance="md" className="w-full">
        <ExplorationsButtons />
      </ScrollReveal>
    </div>
  );
};
