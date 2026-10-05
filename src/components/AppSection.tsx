/**
 * @file AppSection.tsx
 * @description Sección de Aplicaciones & Software Interactivo del portafolio.
 * Incorpora un reproductor de video de YouTube para demostración interactiva
 * con controles de personalización de URL y estética retro-futurista.
 */

import React, { useState } from 'react';
import { Smartphone, Edit3, Play, Link as LinkIcon, Tv } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const DEFAULT_APP_VIDEO = 'https://www.youtube.com/watch?v=ScMzIvxBSi4';

export const AppSection: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    return localStorage.getItem('margarita_app_section_video_url') || DEFAULT_APP_VIDEO;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(videoUrl);

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const getEmbedUrl = (raw: string) => {
    if (!raw) return '';
    const match = raw.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return raw;
  };

  const handleSave = () => {
    if (!tempUrl.trim()) return;
    setVideoUrl(tempUrl.trim());
    localStorage.setItem('margarita_app_section_video_url', tempUrl.trim());
    setIsEditing(false);
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <section
      id="app"
      role="region"
      aria-label="Aplicaciones y Software Interactivo"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO DE LA SECCIÓN APP */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E024C3]/10 border border-[#E024C3]/30 text-[#E024C3] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest mb-3">
              <Smartphone className="w-4 h-4 text-[#E024C3]" />
              <span>APP</span>
            </div>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Aplicaciones & Software Interactivo
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Desarrollo de herramientas de software, aplicaciones creativas, poesía digital y plataformas experimentales.
            </p>
          </div>
        </ScrollReveal>

        {/* CONTENEDOR PRINCIPAL: DIV PARA VIDEO DE YOUTUBE */}
        <ScrollReveal direction="up" distance="md" delay={150}>
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl bg-[#14141E] border border-[#2B2B3E] shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Resplandor ambiental de acento */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-[#E024C3]/10 blur-[90px] rounded-full"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 bg-[#00f0ff]/10 blur-[90px] rounded-full"
              aria-hidden="true"
            />

            {/* Barra superior de control del reproductor */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#232334] bg-[#0E0E16]/80 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#E024C3] animate-pulse" />
                <Tv className="w-4 h-4 text-[#E024C3]" />
                <span className="font-mono-code text-xs sm:text-[13px] text-white tracking-wider font-semibold uppercase">
                  DEMO INTERACTIVA // APP
                </span>
                <span className="hidden sm:inline-block text-[#55556E] font-normal">|</span>
                <span className="hidden sm:inline-block font-mono-code text-[11px] text-[#8E8EA8]">
                  TRANSMISIÓN YOUTUBE
                </span>
              </div>

              {/* Botón para editar la URL del video */}
              <button
                type="button"
                onClick={() => {
                  setTempUrl(videoUrl);
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1B1B28] hover:bg-[#E024C3] hover:text-white border border-[#303046] hover:border-[#E024C3] font-mono-code text-xs text-[#A0A0B8] transition-colors cursor-pointer"
                title="Editar enlace del video de YouTube"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>EDITAR URL</span>
              </button>
            </div>

            {/* Marco de video responsivo 16:9 */}
            <div className="relative w-full aspect-video bg-[#0A0A10]">
              {/* Capa de textura CRT glitch sutil */}
              <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

              {/* Iframe del video de YouTube */}
              <iframe
                src={embedUrl}
                title="Demostración de App en YouTube"
                className="w-full h-full border-0 pointer-events-auto"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Modal de edición de URL */}
              {isEditing && (
                <div className="absolute inset-0 z-30 p-4 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center font-mono-code">
                  <div className="w-full max-w-md p-6 bg-[#161622] border border-[#2D2D42] rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <LinkIcon className="w-4 h-4 text-[#E024C3]" />
                      <span className="text-xs sm:text-sm text-white uppercase font-bold">
                        Ingresar Enlace de YouTube para APP
                      </span>
                    </div>

                    <p className="text-xs text-[#8E8EA8] mb-4">
                      Pega cualquier enlace (ej. https://www.youtube.com/watch?v=...) o ID de video. Se guardará automáticamente.
                    </p>

                    <input
                      type="url"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs mb-4 focus:outline-none focus:border-[#E024C3]"
                    />

                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-2 text-xs rounded-lg bg-[#222232] hover:bg-[#2C2C3E] text-[#A0A0BA] hover:text-white cursor-pointer transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="flex-1 py-2 text-xs rounded-lg bg-[#E024C3] hover:bg-[#ff36e0] text-white font-bold cursor-pointer transition-colors"
                      >
                        Guardar Video
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pie de marco con metadatos técnicos */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-[#232334] bg-[#0E0E16]/80 text-xs font-mono-code text-[#7A7A96]">
              <div className="flex items-center gap-2">
                <span className="text-[#00f0ff]">● SALIDA:</span>
                <span className="text-white">STREAMING HD 1080P // AUDIO ESTÉREO</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E024C3]">CANAL:</span>
                <span className="text-[#A0A0B8]">DESARROLLO CREATIVO & PROTOTIPOS</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
