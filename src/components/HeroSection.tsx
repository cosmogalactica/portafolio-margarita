/**
 * @file HeroSection.tsx
 * @description Sección HERO (Pantalla Principal) del portafolio personal de Margarita.
 * 
 * Incluye:
 * 1. Fondo completo de la sección: Osciloscopio analógico CRT de alta visibilidad
 *    con ondas sonoras en magenta neón (#FF007F), armónicos cian (#00f0ff) y partículas de frecuencia.
 * 2. Control interactivo en esquina: Botón flotante para pausar y reanudar la animación del fondo.
 * 3. Primer plano: Efecto dinámico de máquina de escribir (Typewriter Effect) con Google Font 'Dosis'
 *    y cursor terminal parpadeante en magenta neón.
 * 4. Capas de seguridad CSS (user-select: none, disable context menu y drag).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

// Lista exacta de 11 términos para el Typewriter en bucle
const TYPEWRITER_TERMS: string[] = [
  'Multipotencial',
  'Maker',
  'Cinéfila',
  'Lectora Multidispositivo',
  'Escritora Híbrida Multicanal en zapping continuo',
  'Coleccionista',
  'Curiosa',
  'Disléxica',
  'Neurodivergente',
  'Adictaparlante',
  'Pólvora y Azúcar',
];

export const HeroSection: React.FC<HeroSectionProps> = () => {
  // Estados para el efecto Typewriter
  const [termIndex, setTermIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Estado para pausar y reproducir la animación del fondo
  const [isWavePlaying, setIsWavePlaying] = useState<boolean>(true);
  const isPlayingRef = useRef<boolean>(true);

  // Mantener la referencia sincronizada con el estado
  useEffect(() => {
    isPlayingRef.current = isWavePlaying;
  }, [isWavePlaying]);

  // Referencias para el Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  // Protección anti-copia
  const handleProtectedAction = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  // Lógica del Typewriter Effect
  useEffect(() => {
    const fullTerm = TYPEWRITER_TERMS[termIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullTerm.length) {
        timer = setTimeout(() => {
          setCurrentText(fullTerm.slice(0, currentText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullTerm.slice(0, currentText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setTermIndex((prev) => (prev + 1) % TYPEWRITER_TERMS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, termIndex]);

  // Renderizado del osciloscopio analógico en el fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Redimensionar el canvas al tamaño exacto de la sección
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth || window.innerWidth;
      const height = parent.clientHeight || window.innerHeight;

      // Escala de píxeles para pantallas retina
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      if (width <= 0 || height <= 0) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Fondo base oscuro
      ctx.fillStyle = '#0D0D12';
      ctx.fillRect(0, 0, width, height);

      // 1. Cuadrícula retro de osciloscopio / laboratorio
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.07)';
      const step = 48;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Línea horizontal del centro (eje 0V)
      const centerY = height / 2;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      const phase = phaseRef.current;

      // 2. Espectro de barras de frecuencia sonoras en el fondo
      const barCount = Math.floor(width / 16);
      for (let i = 0; i < barCount; i++) {
        const barX = i * 16 + 8;
        const distFromCenter = Math.abs(barX - width / 2) / (width / 2);
        const factor = Math.max(0, 1 - distFromCenter * 0.8);
        const barHeight =
          Math.abs(Math.sin(i * 0.18 + phase * 1.5)) * (height * 0.18) * factor + 6;

        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 0, 127, 0.14)' : 'rgba(0, 240, 255, 0.1)';
        ctx.fillRect(barX - 2, centerY - barHeight / 2, 4, barHeight);
      }

      // 3. Onda Secundaria (Cian Neón #00f0ff - Resonancia armónica)
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 14;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const wave1 = Math.cos((x * 0.007) - (phase * 0.8)) * (height * 0.13);
        const wave2 = Math.sin((x * 0.016) + (phase * 1.2)) * (height * 0.06);
        const y = centerY + wave1 + wave2;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 4. Onda Primaria (Magenta Neón #FF007F - Señal principal de alta energía)
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#FF007F';
      ctx.shadowColor = '#FF007F';
      ctx.shadowBlur = 22;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 3) {
        const wave1 = Math.sin((x * 0.008) + phase) * (height * 0.18);
        const wave2 = Math.sin((x * 0.02) - (phase * 1.4)) * (height * 0.08);
        const wave3 = Math.cos((x * 0.003) + (phase * 0.5)) * (height * 0.05);
        const y = centerY + wave1 + wave2 + wave3;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 5. Partículas luminosas viajando sobre las crestas de la señal
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FF007F';
      ctx.shadowBlur = 12;
      for (let i = 0; i < 5; i++) {
        const particleX = ((phase * 120 + i * (width / 5)) % width);
        const wave1 = Math.sin((particleX * 0.008) + phase) * (height * 0.18);
        const wave2 = Math.sin((particleX * 0.02) - (phase * 1.4)) * (height * 0.08);
        const wave3 = Math.cos((particleX * 0.003) + (phase * 0.5)) * (height * 0.05);
        const particleY = centerY + wave1 + wave2 + wave3;

        ctx.beginPath();
        ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Restablecer sombras para optimización
      ctx.shadowBlur = 0;

      // Avanzar fase únicamente si la animación está en modo reproducción
      if (isPlayingRef.current) {
        phaseRef.current += 0.035;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="inicio"
      role="region"
      aria-label="Presentación principal"
      onContextMenu={handleProtectedAction}
      onDragStart={handleProtectedAction}
      className="relative isolate min-h-[calc(100vh-4.5rem)] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden select-none protected-content bg-[#0D0D12]"
    >
      {/* ========================================================= */}
      {/* FONDO INTERACTIVO: CANVAS DE OSCILOSCOPIO ANALÓGICO       */}
      {/* ========================================================= */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Capa sutil de scanlines CRT sobre el fondo para textura analógica */}
      <div
        className="pointer-events-none absolute inset-0 z-1 opacity-25 crt-scanlines"
        aria-hidden="true"
      />

      {/* Viñeta sutil en los bordes para centrar el foco visual */}
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_center,transparent_45%,#0D0D12_95%)] opacity-70"
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* PRIMER PLANO: TEXTO ROTATIVO TYPEWRITER (FUENTE 'DOSIS')  */}
      {/* ========================================================= */}
      <ScrollReveal direction="up" distance="sm" delay={150} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="w-full max-w-4xl px-4">
          <div className="relative min-h-[80px] sm:min-h-[96px] md:min-h-[112px] flex items-center justify-center py-2 bg-transparent">
            <h2 className="font-dosis text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-white leading-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)]">
              <span className="text-[#FF007F] font-bold mr-2 sm:mr-3 select-none text-glow-magenta">&gt;</span>
              <span>{currentText}</span>
              {/* Cursor parpadeante estilo retro-terminal en magenta neón */}
              <span
                className="inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-[#FF007F] ml-1.5 align-middle cursor-blink shadow-[0_0_14px_#FF007F]"
                aria-hidden="true"
              />
            </h2>
          </div>
        </div>
      </ScrollReveal>

      {/* ========================================================= */}
      {/* CONTROL DE FONDO: BOTÓN PAUSAR / REPRODUCIR LA SEÑAL     */}
      {/* ========================================================= */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20">
        <button
          type="button"
          onClick={() => setIsWavePlaying((prev) => !prev)}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12121A]/90 hover:bg-[#1A1A26] border border-[#2B2B3E] hover:border-[#FF007F] text-xs font-mono-code text-[#E2E2E8] backdrop-blur-md transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(255,0,127,0.4)] cursor-pointer active:scale-95"
          title={isWavePlaying ? 'Pausar animación del fondo' : 'Reanudar animación del fondo'}
        >
          {isWavePlaying ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF007F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF007F]" />
              </span>
              <Pause className="w-4 h-4 text-[#FF007F]" />
              <span className="text-[14px] uppercase tracking-wider text-[#C0C0D4] group-hover:text-white font-semibold">
                PAUSAR FONDO
              </span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#626278]" />
              <Play className="w-4 h-4 text-[#00f0ff] fill-current" />
              <span className="text-[14px] uppercase tracking-wider text-[#C0C0D4] group-hover:text-white font-semibold">
                REPRODUCIR FONDO
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
