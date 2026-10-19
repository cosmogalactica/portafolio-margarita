/**
 * @file App.tsx
 * @description Punto de entrada principal para el portafolio de Margarita.
 * Monta el Header modular con capas de seguridad de contenido activadas y
 * arquitectura lista para la construcción sección por sección.
 */

import React, { useState } from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
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

      {/* PIE DE PÁGINA CON REDES SOCIALES Y EMOJIS (PROTEGIDO) */}
      <footer className="border-t border-[#1C1C28] py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono-code text-[#5E5E74] select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Izquierda: Párrafo de derechos de autor */}
          <p className="text-center md:text-left order-2 md:order-1 flex-1 font-dosis text-sm sm:text-[15px] text-[#A6A6C0] font-medium tracking-wide">
            © {new Date().getFullYear()} Margarita A.D. - Todos los derechos reservados.
          </p>

          {/* Centro: Redes sociales */}
          <div className="flex items-center justify-center gap-4 order-1 md:order-2 flex-1">
            <a
              href="https://www.instagram.com/sonorarteclab/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @sonorarteclab"
              className="w-10 h-10 rounded-xl bg-[#14141E] border border-[#2B2B3E] hover:border-[#FF007F] text-[#8E8EA8] hover:text-[#FF007F] hover:bg-[#FF007F]/10 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              title="Instagram (@sonorarteclab)"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Sonorartec Lab"
              className="w-10 h-10 rounded-xl bg-[#14141E] border border-[#2B2B3E] hover:border-[#00f0ff] text-[#8E8EA8] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              title="LinkedIn (Sonorartec Lab)"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@sonorarteclab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube @sonorarteclab"
              className="w-10 h-10 rounded-xl bg-[#14141E] border border-[#2B2B3E] hover:border-[#FF007F] text-[#8E8EA8] hover:text-[#FF007F] hover:bg-[#FF007F]/10 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105"
              title="YouTube (@sonorarteclab)"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          {/* Derecha: Emojis */}
          <div className="flex items-center justify-center md:justify-end gap-3 text-lg sm:text-xl order-3 flex-1 select-none">
            <span title="Japa Mala / Collar de cuentas">📿</span>
            <span title="Ojo turco / Nazar" className="inline-flex items-center justify-center">
              <svg
                viewBox="0 0 36 36"
                className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,180,255,0.45)]"
                aria-label="Ojo Turco"
              >
                <circle cx="18" cy="18" r="18" fill="#0D47A1" />
                <circle cx="18" cy="18" r="13" fill="#38BDF8" />
                <circle cx="18" cy="18" r="8.5" fill="#FFFFFF" />
                <circle cx="18" cy="18" r="4.5" fill="#0B0B14" />
                <circle cx="16" cy="16" r="1.5" fill="#FFFFFF" opacity="0.8" />
              </svg>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
