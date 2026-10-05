/**
 * @file App.tsx
 * @description Punto de entrada principal para el portafolio de Margarita.
 * Monta el Header modular con capas de seguridad de contenido activadas y
 * arquitectura lista para la construcción sección por sección.
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RecognitionsMediaSection } from './components/RecognitionsMediaSection';
import { NewsSection } from './components/NewsSection';
import { SolutionsSection } from './components/SolutionsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { ConversatoriosSection } from './components/ConversatoriosSection';
import { ExposSection } from './components/ExposSection';
import { ArtefactosSection } from './components/ArtefactosSection';
import { AppSection } from './components/AppSection';
import { ProfeSection } from './components/ProfeSection';
import { AudiografemasSection } from './components/AudiografemasSection';
import { PrensaSection } from './components/PrensaSection';
import { YouTubeSection } from './components/YouTubeSection';
import { useContentProtection } from './hooks/useContentProtection';

export default function App() {
  // Activación de la directriz de seguridad: deshabilitar clic derecho, arrastre y selección no autorizada
  useContentProtection({
    disableContextMenu: true,
    disableDrag: true,
    disableInspectShortcuts: true,
    disableSelect: true,
  });

  const [activeSection] = useState<string>('inicio');
  const [modalOpen, setModalOpen] = useState(false);

  const handleCtaClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] text-[#E2E2E8] flex flex-col font-sans selection:bg-[#E024C3] selection:text-white analog-scanline">
      {/* 1. COMPONENTE DE CABECERA Y NAVEGACIÓN MODULAR */}
      <Header onCtaClick={handleCtaClick} activeSection={activeSection} />

      {/* CONTENEDOR PRINCIPAL */}
      <main className="flex-1 w-full">
        {/* Sección HERO: Typewriter en Google Font Dosis + Fondo Osciloscopio con Pausa/Play */}
        <HeroSection onCtaClick={handleCtaClick} />

        {/* Sección 2 Columnas: Ingesta de Video/Imágenes + 5 Reconocimientos Oficiales */}
        <RecognitionsMediaSection />

        {/* Sección NOTICIAS (preparada y vacía para desarrollo progresivo) */}
        <NewsSection />

        {/* Sección SOLUCIONES (preparada para desarrollo progresivo) */}
        <SolutionsSection />

        {/* Sección PUBLICACIONES: Ingesta de Video/Imágenes con Textura Glitch + Catálogo Editorial */}
        <PublicationsSection />

        {/* Sección TALLERES: 2 Slides de Imágenes (sin halo de luz horizontal) + Catálogo Formativo */}
        <WorkshopsSection />

        {/* Sección CONVERSATORIOS: Diálogos, Foros y Simposios */}
        <ConversatoriosSection />

        {/* Sección EXPOS: Exposiciones y Muestras de Arte Electrónico */}
        <ExposSection />

        {/* Sección ARTEFACTOS: Dispositivos y Hardware Maker */}
        <ArtefactosSection />

        {/* Sección APP: Software Creativo y Plataformas Interactivas */}
        <AppSection />

        {/* Sección PROFE: Docencia, Mediación y Pedagogías Disruptivas */}
        <ProfeSection />

        {/* Sección AUDIOGRAFEMAS: Poesía Sonora & Síntesis Visual (Grid de 15 Videos) */}
        <AudiografemasSection />

        {/* Sección PRENSA: Apariciones en Medios, Prensa y Coberturas */}
        <PrensaSection />

        {/* Sección YOUTUBE: Canales Oficiales (@mandarinavozenoff & @sonorarteclab) */}
        <YouTubeSection />
      </main>

      {/* MODAL DE CONTACTO / ACCIÓN (Disponible para acciones de contacto) */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-8 bg-[#12121A] border border-[#2B2B3E] rounded-lg shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#222230] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF007F]" />
                <h3 className="font-mono-code text-sm uppercase tracking-wider text-white">
                  Iniciar un Proyecto / Conversemos
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-[#8888A0] hover:text-white p-1 rounded font-mono-code text-sm cursor-pointer"
              >
                [ ESC / CERRAR ]
              </button>
            </div>

            <p className="text-sm text-[#A0A0BA] mb-6 leading-relaxed">
              ¿Tienes una colaboración, conferencia, taller, artefacto sonoro o proyecto en mente? 
              Conectemos para desplegar ideas analógicas y digitales.
            </p>

            <div className="space-y-3 font-mono-code text-xs mb-6">
              <div className="p-3 bg-[#0D0D12] border border-[#232334] rounded flex items-center justify-between">
                <span className="text-[#73738C]">Contacto directo:</span>
                <span className="text-[#FF007F]">sonorarteclab@gmail.com</span>
              </div>
              <div className="p-3 bg-[#0D0D12] border border-[#232334] rounded flex items-center justify-between">
                <span className="text-[#73738C]">Modalidad:</span>
                <span className="text-white">Proyectos, Talleres & Conferencias</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 font-mono-code text-xs font-semibold text-white bg-gradient-to-r from-[#E024C3] to-[#FF007F] rounded transition-all neon-glow-magenta cursor-pointer"
            >
              CERRAR VENTANA
            </button>
          </div>
        </div>
      )}

      {/* PIE DE PÁGINA MINIMALISTA (PROTEGIDO) */}
      <footer className="border-t border-[#1C1C28] py-6 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono-code text-[#5E5E74] select-none">
        <p>
          © {new Date().getFullYear()} Margarita — Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
