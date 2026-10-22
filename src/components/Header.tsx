/**
 * @file Header.tsx
 * @description Componente de Navegación Superior adaptable (Responsive Glassmorphism Header).
 * Estética: Nostalgia Analógica + Despliegue Digital (Dark mode #0D0D12, detalles fosforescentes,
 * acentos fucsia neón #E024C3 / #FF007F y capas de seguridad anti-copia activas).
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export interface HeaderProps {
  onCtaClick?: () => void;
  activeSection?: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'noticias', label: 'NOTICIAS', href: '#noticias' },
  { id: 'soluciones', label: 'SOLUCIONES', href: '#soluciones' },
  { id: 'publicaciones', label: 'PUBLICACIONES', href: '#publicaciones' },
  { id: 'talleres', label: 'LABS', href: '#talleres' },
  { id: 'conversatorios', label: 'CONVERSATORIOS', href: '#conversatorios' },
  { id: 'expos', label: 'EXPOS', href: '#expos' },
  { id: 'artefactos', label: 'ARTEFACTOS', href: '#artefactos' },
  { id: 'app', label: 'APP', href: '#app' },
  { id: 'profe', label: 'PROFE', href: '#profe' },
  { id: 'audiografemas', label: 'AUDIOGRAFEMAS', href: '#audiografemas' },
  { id: 'prensa', label: 'PRENSA', href: '#prensa' },
  { id: 'youtube', label: 'YOUTUBE', href: '#youtube' },
];

export const Header: React.FC<HeaderProps> = ({ onCtaClick, activeSection = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detección de scroll para efecto dinámico de elevación glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierre de menú móvil con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Bloqueo de scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Capa de seguridad anti-copia local para el componente
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCtaAction = () => {
    setIsMobileMenuOpen(false);
    if (onCtaClick) {
      onCtaClick();
    } else {
      const contactSection = document.getElementById('contacto') || document.getElementById('conversemos');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      role="banner"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      className={`sticky top-0 z-50 w-full transition-all duration-300 select-none protected-content ${
        isScrolled
          ? 'bg-[#0D0D12]/92 backdrop-blur-xl border-b border-[#242436]/80 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#0D0D12]/75 backdrop-blur-md border-b border-[#242436]/40'
      }`}
    >
      {/* Línea analógica de escaneo láser en el borde superior */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#E024C3] to-transparent shadow-[0_0_12px_rgba(224,36,195,0.7)]" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
          
          {/* ZONA 1: BRAND IDENTITY [MARGARITA] */}
          <div className="flex items-center shrink-0">
            <a
              href="#inicio"
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E024C3] rounded-sm py-1"
              aria-label="Margarita - Inicio"
            >
              {/* LED analógico / indicador de estado de pulso digital */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E024C3] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
              </span>

              {/* Nombre de marca con tipografía Reprobate */}
              <span className="font-reprobate font-normal text-[21px] sm:text-[23px] tracking-wider text-[#F4F4F8] group-hover:text-white group-hover-glitch transition-colors duration-200 uppercase inline-block">
                MARGARITA
              </span>
            </a>
          </div>

          {/* ZONA 2: MENÚ DE NAVEGACIÓN DESKTOP (Limpio, tipográfico, sin diseño de caja) */}
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="hidden xl:flex items-center space-x-1 font-thorne text-[13px] 2xl:text-[14px] font-normal tracking-wide text-[#A4A4BA]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`group relative px-3 py-1.5 whitespace-nowrap text-[#A4A4BA] hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none ${
                  activeSection === item.id ? 'text-[#FF007F] font-medium' : ''
                }`}
              >
                <span className="relative z-10 group-hover-glitch inline-block">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
                )}
              </a>
            ))}
          </nav>

          {/* MENÚ INTERMEDIO PARA PANTALLAS LAPTOP/TABLET (md & lg) */}
          <nav
            role="navigation"
            aria-label="Navegación horizontal compacta"
            className="hidden md:flex xl:hidden items-center gap-1.5 overflow-x-auto max-w-[70vw] scrollbar-none py-1 px-1 font-thorne text-[13px] text-[#A4A4BA]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`group relative px-2.5 py-1 whitespace-nowrap shrink-0 text-[#A4A4BA] hover:text-white transition-colors cursor-pointer ${
                  activeSection === item.id ? 'text-[#FF007F] font-medium' : ''
                }`}
              >
                <span className="relative z-10 group-hover-glitch inline-block">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
                )}
              </a>
            ))}
          </nav>

          {/* ZONA 3: TOGGLE DE NAVEGACIÓN MÓVIL */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              aria-expanded={isMobileMenuOpen}
              className="xl:hidden p-2 rounded-md text-[#9E9EB2] hover:text-white hover:bg-[#191924] border border-[#242436] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E024C3] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#FF007F]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL / DRAWER RESPONSIVE COMPLETO */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-x-0 top-[66px] bottom-0 bg-[#0D0D12]/98 backdrop-blur-2xl border-t border-[#242436] z-50 lg:hidden overflow-y-auto flex flex-col p-6 animate-in slide-in-from-top-4 duration-200"
        >
          {/* Encabezado del cajón móvil */}
          <div className="flex items-center justify-between pb-4 border-b border-[#20202F] mb-4">
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#73738C]">
              Arquitectura de Navegación
            </span>
            <span className="text-[10px] font-mono-code text-[#E024C3] px-2 py-0.5 rounded border border-[#E024C3]/30 bg-[#E024C3]/10">
              MARGARITA // PORTAFOLIO
            </span>
          </div>

          {/* Enlaces organizados y accesibles */}
          <div className="space-y-1.5 flex-1 font-thorne text-sm">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-[#B6B6CB] hover:text-white hover:bg-[#171722] border border-transparent hover:border-[#262638] transition-all ${
                  activeSection === item.id ? 'text-[#FF007F] bg-[#FF007F]/10 border-[#FF007F]/30' : ''
                }`}
              >
                <span className="text-xs">{item.label}</span>
                <span className="text-[10px] text-[#55556A]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </div>

          {/* CTA inferior en móvil */}
          <div className="pt-5 mt-4 border-t border-[#20202F] flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={handleCtaAction}
              className="w-full py-3 px-4 font-mono-code text-xs font-bold text-white bg-gradient-to-r from-[#E024C3] to-[#FF007F] rounded-md neon-glow-magenta active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>INICIAR UN PROYECTO</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleCtaAction}
              className="text-xs font-mono-code font-semibold tracking-wider text-[#FF007F] hover:text-white py-1 transition-colors uppercase hover:underline"
            >
              // CONVERSEMOS
            </button>
            <p className="text-center text-[10px] font-mono-code text-[#606075] mt-1">
              Contenido protegido. Prohibida la reproducción o extracción no autorizada.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
