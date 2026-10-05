import React, { useState } from 'react';
import { Layers, Play, Pause } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface OdsItem {
  id: string;
  code: string;
  title: string;
}

const ODS_ITEMS: OdsItem[] = [
  { id: 'ods-5', code: 'ODS 5', title: 'IGUALDAD DE GÉNERO' },
  { id: 'ods-13', code: 'ODS 13', title: 'CLIMA' },
  { id: 'ods-4', code: 'ODS 4', title: 'EDUCACIÓN' },
  { id: 'ods-8', code: 'ODS 8', title: 'TRABAJO DECENTE' },
  { id: 'ods-9', code: 'ODS 9', title: 'I+D' },
  { id: 'ods-10', code: 'ODS 10', title: 'INCLUSIÓN' },
  { id: 'ods-12', code: 'ODS 12', title: 'CONSUMO RESPONSABLE' },
  { id: 'ods-17', code: 'ODS 17', title: 'ALIANZAS' },
];

export const SolutionsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="soluciones"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content"
    >
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO MINIMALISTA: SOLO TÍTULO Y BOTÓN DE REANUDAR */}
        <ScrollReveal direction="up" distance="sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF007F]/10 border border-[#FF007F]/30 text-[#FF007F] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest">
              <Layers className="w-4 h-4 text-[#FF007F]" />
              <span>SOLUCIONES</span>
            </div>

            {/* BOTÓN REANUDAR / PAUSAR */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161622] hover:bg-[#202030] border border-[#2B2B3E] hover:border-[#00f0ff] text-[#A0A0B8] hover:text-white font-mono-code text-[14px] transition-colors cursor-pointer"
              title={isPaused ? 'Reanudar slide' : 'Pausar slide'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#00f0ff]" />
                  <span>REANUDAR</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#FF007F]" />
                  <span>PAUSAR</span>
                </>
              )}
            </button>
          </div>
        </ScrollReveal>

        {/* SLIDE ODS CON FUENTES REDUCIDAS EN 2 PUNTOS */}
        <ScrollReveal direction="up" distance="sm" delay={100}>
          <div className="relative w-full overflow-hidden rounded-xl bg-[#12121A]/80 border border-[#202030] py-3.5 px-2">
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
              {ODS_ITEMS.map((item) => (
                <div key={`ods-1-${item.id}`} className="inline-flex items-center">
                  <div className="inline-flex items-baseline gap-1.5">
                    {/* ODS y número (más pequeño) */}
                    <span className="font-mono-code font-bold text-[9px] sm:text-[10px] text-[#00f0ff] uppercase tracking-wider">
                      {item.code}:
                    </span>

                    {/* Palabra / Nombre (visiblemente mayor que el ODS, con 2 puntos reducidos) */}
                    <span className="font-bahnschrift-condensed font-medium text-[13px] sm:text-[15px] text-[#EAEAF4] tracking-wide uppercase">
                      {item.title}
                    </span>
                  </div>

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
              {ODS_ITEMS.map((item) => (
                <div key={`ods-2-${item.id}`} className="inline-flex items-center">
                  <div className="inline-flex items-baseline gap-1.5">
                    {/* ODS y número (más pequeño) */}
                    <span className="font-mono-code font-bold text-[9px] sm:text-[10px] text-[#00f0ff] uppercase tracking-wider">
                      {item.code}:
                    </span>

                    {/* Palabra / Nombre (visiblemente mayor que el ODS, con 2 puntos reducidos) */}
                    <span className="font-bahnschrift-condensed font-medium text-[13px] sm:text-[15px] text-[#EAEAF4] tracking-wide uppercase">
                      {item.title}
                    </span>
                  </div>

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
        </ScrollReveal>

        {/* 3 COLUMNAS DE SOLUCIONES: LAB | FUNKYNET | TUTOR.I.A (SEGÚN DIAPOSITIVA) */}
        <ScrollReveal direction="up" distance="md" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 sm:mt-10 items-stretch">
            
            {/* TARJETA 1: LAB */}
            <div className="rounded-3xl bg-[#141420]/90 border border-[#252538] hover:border-[#FF007F]/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group">
              <div>
                {/* Cabecera con Icono y Título */}
                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="text-2xl sm:text-3xl select-none" role="img" aria-label="Programador">
                    👨‍💻
                  </span>
                  <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-widest uppercase">
                    LAB
                  </h3>
                </div>

                {/* Subtítulo */}
                <p className="font-rajdhani font-semibold text-sm sm:text-base text-[#D4D4E8] text-center mb-5 pb-3 border-b border-[#232334]">
                  El mundo es diverso, cambiante y complejo.
                </p>

                {/* Contenido */}
                <div className="font-rajdhani text-sm sm:text-[15px] text-[#A6A6C0] leading-relaxed mb-6">
                  <p className="mb-3">
                    Talleres de practicas transversales, conversatorios y consultoría donde relaciono la:
                  </p>
                  <div className="space-y-1.5">
                    <p className="font-bold text-white">Tecnología [ I.A & electrónica aplicada ]</p>
                    <p className="font-bold text-white">+ Literatura</p>
                    <p className="font-bold text-white">+ Música & Sonido</p>
                    <p className="font-bold text-white">+ Ecología del Consumo</p>
                    <p className="font-bold text-white">+ Género.</p>
                  </div>
                </div>
              </div>

              {/* Botón inferior en el color del div (Magenta) */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contacto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FF007F] hover:bg-[#ff1a8c] text-white text-center font-rajdhani font-bold text-[15px] sm:text-base tracking-wide shadow-[0_4px_16px_rgba(255,0,127,0.35)] hover:shadow-[0_6px_22px_rgba(255,0,127,0.55)] transition-all cursor-pointer mt-auto active:scale-[0.98]"
              >
                Ser y hacer una sola cosa es muy aburrido
              </button>
            </div>

            {/* TARJETA 2: FUNKYNET */}
            <div className="rounded-3xl bg-[#141420]/90 border border-[#252538] hover:border-[#00f0ff]/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group">
              <div>
                {/* Cabecera con Icono y Título */}
                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="text-2xl sm:text-3xl select-none" role="img" aria-label="Laptop">
                    💻
                  </span>
                  <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-widest uppercase">
                    FUNKYNET
                  </h3>
                </div>

                {/* Subtítulo */}
                <p className="font-rajdhani font-semibold text-sm sm:text-base text-[#D4D4E8] text-center mb-5 pb-3 border-b border-[#232334]">
                  Del anonimato a una presencia digital con propósito.
                </p>

                {/* Contenido Estructurado */}
                <div className="space-y-3 font-rajdhani text-xs sm:text-sm mb-6">
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-[15px]">
                      Desarrollo Web Jamstack
                    </h4>
                    <p className="text-[#A6A6C0] text-xs sm:text-[13px]">
                      Sitios modernos de carga rápida
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-[15px]">
                      Posicionamiento SEO & GEO
                    </h4>
                    <p className="text-[#A6A6C0] text-xs sm:text-[13px]">
                      Visibilidad en Google, ChatGPT, Gemini y Perplexity
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-[15px]">
                      Marketing y Posicionamiento Digital
                    </h4>
                    <p className="text-[#A6A6C0] text-xs sm:text-[13px]">
                      Visibilidad estratégica de marca
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-[15px]">
                      Embudos de Venta | Micrositios | Tarjeta y Portafolio Digital
                    </h4>
                    <p className="text-[#A6A6C0] text-xs sm:text-[13px]">
                      Páginas pensadas para guiar al visitante a comprar o contactar
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón inferior en el color del div (Cian) */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contacto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00f0ff] hover:bg-[#38f8ff] text-[#0A0A10] text-center font-rajdhani font-bold text-[15px] sm:text-base tracking-wide shadow-[0_4px_16px_rgba(0,240,255,0.35)] hover:shadow-[0_6px_22px_rgba(0,240,255,0.55)] transition-all cursor-pointer mt-auto active:scale-[0.98]"
              >
                Te entrego la brújula para encontrar el camino
              </button>
            </div>

            {/* TARJETA 3: TUTOR.I.A */}
            <div className="rounded-3xl bg-[#141420]/90 border border-[#252538] hover:border-[#E024C3]/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group">
              <div>
                {/* Cabecera con Icono y Título */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl sm:text-3xl select-none flex items-center" role="img" aria-label="Robot y Corazón Violeta">
                    🤖💜
                  </span>
                  <h3 className="font-bahnschrift-condensed font-bold text-xl sm:text-2xl text-white tracking-widest uppercase">
                    TUTOR.I.A
                  </h3>
                </div>

                {/* Subtítulo */}
                <p className="font-rajdhani font-semibold text-sm sm:text-base text-[#D4D4E8] text-center mb-5 pb-3 border-b border-[#232334]">
                  Agentes conversacionales que no suenan a robot.
                </p>

                {/* Contenido */}
                <p className="font-rajdhani font-medium text-sm sm:text-[15px] text-[#A6A6C0] leading-relaxed mb-6">
                  Plataforma y personalización de agentes conversacionales amigables multilingües impulsados por{' '}
                  <span className="text-white font-semibold">Inteligencia Artificial ética</span>, adaptados a sectores empresariales, educación y proyectos culturales.
                </p>
              </div>

              {/* Botón inferior en el color del div (Violeta Eléctrico) */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contacto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E024C3] hover:bg-[#ee3fda] text-white text-center font-rajdhani font-bold text-[15px] sm:text-base tracking-wide shadow-[0_4px_16px_rgba(224,36,195,0.35)] hover:shadow-[0_6px_22px_rgba(224,36,195,0.55)] transition-all cursor-pointer mt-auto active:scale-[0.98]"
              >
                Las conexiones digitales autenticas son posibles
              </button>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
