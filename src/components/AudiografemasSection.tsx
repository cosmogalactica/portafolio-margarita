/**
 * @file AudiografemasSection.tsx
 * @description Sección "AUDIOGRAFEMAS" con cuadrícula de 15 videos de YouTube.
 * Historias sono-digitales, poesía análoga, síntesis visual y literatura expandida.
 * Rendimiento optimizado mediante reproducción bajo demanda y modal de edición de URL.
 */

import React, { useState } from 'react';
import {
  Volume2,
  Play
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
    title: 'CATALINA',
    subtitle: 'Síntesis análoga y caligrafía visual',
    year: '2017',
    youtubeUrl: 'https://www.youtube.com/watch?v=NWrPVqq4E4Y&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=3',
  },
  {
    id: 'ag-02',
    num: '02',
    title: 'MICROBIO Y GASOLINA',
    subtitle: 'Paisaje sonoro y percepción corporal',
    year: '2018',
    youtubeUrl: 'https://www.youtube.com/watch?v=GGMkTWRVC5k&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=3',
  },
  {
    id: 'ag-03',
    num: '03',
    title: 'SÍNDROME DEL MÍNIMO ESFUERZO Y MÁXIMO PLACER',
    subtitle: 'Deconstrucción de grafemas y ruido',
    year: '2018',
    youtubeUrl: 'https://www.youtube.com/watch?v=90TqY9uL-Mo&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=4',
  },
  {
    id: 'ag-04',
    num: '04',
    title: 'VINO EN VENA',
    subtitle: 'Historias sono-digitales en cinta magnética',
    year: '2019',
    youtubeUrl: 'https://www.youtube.com/watch?v=t3bYEPQD8KA&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=5',
  },
  {
    id: 'ag-05',
    num: '05',
    title: 'EL CLUB DE LAS SUPERADAS',
    subtitle: 'Resonancias electromagnéticas urbanas',
    year: '2019',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZMg6RR3y4o4&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=6',
  },
  {
    id: 'ag-06',
    num: '06',
    title: 'LAS AVENTURAS DE FREELANCE',
    subtitle: 'Algoritmos generativos de texto y sonido',
    year: '2020',
    youtubeUrl: 'https://www.youtube.com/watch?v=04nu_7Jg6ZY&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=8',
  },
  {
    id: 'ag-07',
    num: '07',
    title: 'MICROAMORES',
    subtitle: 'Baja frecuencia y vibración háptica',
    year: '2021',
    youtubeUrl: 'https://www.youtube.com/watch?v=tjtMZNsmjts&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=9',
  },
  {
    id: 'ag-08',
    num: '08',
    title: 'REPTILES',
    subtitle: 'Síntesis substractiva y microfonía DIY',
    year: '2021',
    youtubeUrl: 'https://www.youtube.com/watch?v=oU4cG0NYCv0&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=10',
  },
  {
    id: 'ag-09',
    num: '09',
    title: 'Y ESTÁN LOS IDIOTAS QUE SE ENAMORAN DE PERSONAJES DIGITALES EN SUS COMPUTADORAS',
    subtitle: 'Poesía experimental e hipertexto vocal',
    year: '2022',
    youtubeUrl: 'https://www.youtube.com/watch?v=iyWk9DqcH08&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=11',
  },
  {
    id: 'ag-10',
    num: '10',
    title: 'PORNOINSECTA',
    subtitle: 'Circuit bending y saturación analógica',
    year: '2022',
    youtubeUrl: 'https://www.youtube.com/watch?v=MSVpLsiiBEc&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=12',
  },
  {
    id: 'ag-11',
    num: '11',
    title: 'APNEA',
    subtitle: 'Cruce entre fanzine, video y código',
    year: '2023',
    youtubeUrl: 'https://www.youtube.com/watch?v=X8yo_8MYkSo&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=13',
  },
  {
    id: 'ag-12',
    num: '12',
    title: '3 PERROS 2 GATOS [ OPOSICIÓN MARCIANA ]',
    subtitle: 'Composición espacial para audición diferencial',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=Tctv7i6P9nM&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=14',
  },
  {
    id: 'ag-13',
    num: '13',
    title: 'FARSAESTACIONDERADIOBARATO',
    subtitle: 'Emulsiones analógicas convertidas en síntesis',
    year: '2024',
    youtubeUrl: 'https://www.youtube.com/watch?v=7F8woFJPtcg&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=15',
  },
  {
    id: 'ag-14',
    num: '14',
    title: 'NADA',
    subtitle: 'Mapas sonoros y literatura expandida',
    year: '2025',
    youtubeUrl: 'https://www.youtube.com/watch?v=kvDDwIH5iqA&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=16',
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
      const saved = localStorage.getItem('margarita_audiografemas_grid_items_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_AUDIOGRAFEMAS;
  });

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleProtected = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <div
                role="heading"
                aria-level={2}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest"
              >
                <Volume2 className="w-5 h-5 text-[#00f0ff]" />
                <span>AUDIOGRAFEMAS</span>
              </div>
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
                <div className="w-full rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#00f0ff]/50 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col overflow-hidden group/card">
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
                          draggable={false}
                          onContextMenu={handleProtected}
                          onDragStart={handleProtected}
                          style={
                            {
                              userSelect: 'none',
                              WebkitUserDrag: 'none',
                            } as React.CSSProperties
                          }
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105 opacity-85 group-hover/thumb:opacity-100 select-none pointer-events-none"
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

                  {/* ESPACIO PARA EL TÍTULO DEL VIDEO */}
                  <div className="px-3.5 py-3 sm:py-3.5 bg-[#14141E] flex items-center justify-center min-h-[52px] sm:min-h-[56px] border-t border-[#1C1C2B]">
                    <h3 className="font-bahnschrift-condensed font-bold text-sm sm:text-base text-white group-hover/card:text-[#00f0ff] tracking-wide uppercase transition-colors text-center line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
