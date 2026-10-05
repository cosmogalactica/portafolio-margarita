/**
 * @file AudiografemasSection.tsx
 * @description Sección "AUDIOGRAFEMAS" con cuadrícula de 15 videos de YouTube.
 * Historias sono-digitales, poesía análoga, síntesis visual y literatura expandida.
 * Rendimiento optimizado mediante reproducción bajo demanda y modal de edición de URL.
 */

import React, { useState } from 'react';
import {
  Volume2,
  Play,
  Edit3,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Tv,
  Check
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface AudiografemaItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  year: string;
  youtubeUrl: string;
}

const DEFAULT_AUDIOGRAFEMAS: AudiografemaItem[] = [
  {
    id: 'ag-01',
    num: '01',
    title: 'Frecuencias Primarias',
    subtitle: 'Síntesis análoga y caligrafía visual',
    year: '2017',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-02',
    num: '02',
    title: 'Ondas Inaudibles & Hipoacusia',
    subtitle: 'Paisaje sonoro y percepción corporal',
    year: '2018',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-03',
    num: '03',
    title: 'Glitch Fonético',
    subtitle: 'Deconstrucción de grafemas y ruido',
    year: '2018',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-04',
    num: '04',
    title: 'Poesía Análoga & Modulares',
    subtitle: 'Historias sono-digitales en cinta magnética',
    year: '2019',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-05',
    num: '05',
    title: 'Paisaje Sono-Digital',
    subtitle: 'Resonancias electromagnéticas urbanas',
    year: '2019',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-06',
    num: '06',
    title: 'E-Literatura & Ruido Blanco',
    subtitle: 'Algoritmos generativos de texto y sonido',
    year: '2020',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-07',
    num: '07',
    title: 'Pulso Resonante',
    subtitle: 'Baja frecuencia y vibración háptica',
    year: '2021',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-08',
    num: '08',
    title: 'Micro-Texturas Electrónicas',
    subtitle: 'Síntesis substractiva y microfonía DIY',
    year: '2021',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-09',
    num: '09',
    title: 'Oscilaciones Líricas',
    subtitle: 'Poesía experimental e hipertexto vocal',
    year: '2022',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-10',
    num: '10',
    title: 'Feedback & Desvío',
    subtitle: 'Circuit bending y saturación analógica',
    year: '2022',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-11',
    num: '11',
    title: 'Señales Transmedia',
    subtitle: 'Cruce entre fanzine, video y código',
    year: '2023',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-12',
    num: '12',
    title: 'Arquitectura del Silencio',
    subtitle: 'Composición espacial para audición diferencial',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-13',
    num: '13',
    title: 'Cine & Arqueología de Medios',
    subtitle: 'Emulsiones analógicas convertidas en síntesis',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-14',
    num: '14',
    title: 'Fonocartografías',
    subtitle: 'Mapas sonoros y literatura expandida',
    year: '2025',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'ag-15',
    num: '15',
    title: 'Manifiesto Audiográfe',
    subtitle: 'Simbiosis humana, código y memoria sonora',
    year: '2026',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
];

const extractYouTubeId = (url: string): string => {
  if (!url) return '';
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match && match[1] ? match[1] : '';
};

export const AudiografemasSection: React.FC = () => {
  const [items, setItems] = useState<AudiografemaItem[]>(() => {
    try {
      const saved = localStorage.getItem('margarita_audiografemas_grid_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_AUDIOGRAFEMAS;
  });

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<AudiografemaItem | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const handleOpenEdit = (item: AudiografemaItem) => {
    setEditingItem(item);
    setEditUrl(item.youtubeUrl);
    setEditTitle(item.title);
    setEditSubtitle(item.subtitle);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    const updated = items.map((it) =>
      it.id === editingItem.id
        ? {
            ...it,
            youtubeUrl: editUrl.trim() || it.youtubeUrl,
            title: editTitle.trim() || it.title,
            subtitle: editSubtitle.trim() || it.subtitle,
          }
        : it
    );
    setItems(updated);
    localStorage.setItem('margarita_audiografemas_grid_items', JSON.stringify(updated));
    setEditingItem(null);
  };

  const handleResetDefaults = () => {
    setItems(DEFAULT_AUDIOGRAFEMAS);
    localStorage.removeItem('margarita_audiografemas_grid_items');
    setActiveVideoId(null);
  };

  return (
    <section
      id="audiografemas"
      role="region"
      aria-label="Audiografemas - Poesía Sonora & Síntesis Visual"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <ScrollReveal direction="up" distance="sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest mb-3">
                <Volume2 className="w-4 h-4 text-[#00f0ff]" />
                <span>AUDIOGRAFEMAS</span>
              </div>
              <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase">
                Poesía Sonora & Síntesis Visual
              </h2>
              <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
                Catálogo de 15 piezas de experimentación audiovisual: fonopoética, desvíos analógicos,
                grabaciones de campo y literatura expandida.
              </p>
            </div>

            {/* BOTÓN RESTABLECER */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono-code text-xs text-[#00f0ff] px-3 py-1.5 rounded-lg bg-[#141420] border border-[#262638]">
                15 VIDEOS TRANSMITIDOS
              </span>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141420] hover:bg-[#1E1E2E] border border-[#27273C] text-[13px] font-mono-code text-[#8E8EA8] hover:text-white transition-colors cursor-pointer"
                title="Restablecer los 15 videos a sus valores iniciales"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RESTABLECER</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* GRID DE 15 VIDEOS DE YOUTUBE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {items.map((item, idx) => {
            const ytId = extractYouTubeId(item.youtubeUrl);
            const isPlaying = activeVideoId === item.id;
            const thumbnailUrl = ytId
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop';

            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                distance="md"
                delay={(idx % 3) * 100}
                className="w-full flex"
              >
                <div className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#00f0ff]/50 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between overflow-hidden group/card">
                  {/* CABECERA DE LA TARJETA */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E0E16]/90 border-b border-[#202030] font-mono-code text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
                      <span className="text-[#FF007F] font-bold">PIEZA #{item.num}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[#7A7A96]">{item.year}</span>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="p-1 rounded text-[#8E8EA8] hover:text-[#00f0ff] hover:bg-[#1B1B28] transition-colors cursor-pointer"
                        title={`Editar enlace de Pieza #${item.num}`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* REPRODUCTOR DE VIDEO O MINIATURA INTERACTIVA (CLICK TO PLAY) */}
                  <div className="relative w-full aspect-video bg-[#0A0A10] overflow-hidden">
                    {/* Textura glitch retro */}
                    <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                        title={item.title}
                        className="w-full h-full border-0 relative z-20"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveVideoId(item.id)}
                        className="w-full h-full relative cursor-pointer group/thumb text-left focus:outline-none"
                        aria-label={`Reproducir video ${item.title}`}
                      >
                        <img
                          src={thumbnailUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105 opacity-85 group-hover/thumb:opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors" />

                        {/* Botón Central de Play */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-12 h-12 rounded-full bg-black/75 border border-[#00f0ff]/60 group-hover/thumb:border-[#00f0ff] group-hover/thumb:bg-[#00f0ff] text-[#00f0ff] group-hover/thumb:text-black flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover/thumb:scale-110">
                            <Play className="w-5 h-5 ml-0.5" />
                          </div>
                        </div>

                        {/* Badge indicador de video */}
                        <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-black/80 font-mono-code text-[10px] text-white/90 border border-white/10">
                          YOUTUBE HD
                        </div>
                      </button>
                    )}
                  </div>

                  {/* PIE DE LA TARJETA: TÍTULO Y DESCRIPCIÓN */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bahnschrift-condensed font-bold text-base sm:text-lg text-white group-hover/card:text-[#00f0ff] tracking-wide uppercase transition-colors mb-1">
                        {item.title}
                      </h3>
                      <p className="font-rajdhani font-semibold text-xs sm:text-sm text-[#9A9AB4] leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1F1F2E] font-mono-code text-[11px] text-[#6E6E88]">
                      <span>FORMATO: AUDIOVISUAL</span>
                      <span className="text-[#FF007F]">CANAL // AUDIOGRAFEMAS</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* MODAL DE EDICIÓN PARA CUALQUIERA DE LOS 15 VIDEOS */}
        {editingItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <div className="relative w-full max-w-md p-6 bg-[#161622] border border-[#2D2D42] rounded-2xl shadow-2xl font-mono-code">
              <div className="flex items-center gap-2 mb-3">
                <LinkIcon className="w-4 h-4 text-[#00f0ff]" />
                <span className="text-xs sm:text-sm text-white uppercase font-bold">
                  Editar Pieza #{editingItem.num} (Audiografemas)
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] text-[#8E8EA8] uppercase mb-1">
                    Enlace de YouTube:
                  </label>
                  <input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8E8EA8] uppercase mb-1">
                    Título de la Pieza:
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8E8EA8] uppercase mb-1">
                    Subtítulo / Exploración:
                  </label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D14] border border-[#3A3A54] text-white text-xs focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-2 text-xs rounded-lg bg-[#222232] hover:bg-[#2C2C3E] text-[#A0A0BA] hover:text-white cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="flex-1 py-2 text-xs rounded-lg bg-[#00f0ff] hover:bg-[#43f3ff] text-black font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
