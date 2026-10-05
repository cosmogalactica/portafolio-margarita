/**
 * @file ConversatoriosSection.tsx
 * @description Sección CONVERSATORIOS del portafolio personal de Margarita.
 * Reúne charlas, foros, simposios y espacios de diálogo sobre arte electrónico,
 * cultura maker, feminismo y tecnologías expandidas.
 * Presenta el catálogo editorial con diseño limpio retro-digital y un Slide Glitch
 * individual interactivo debajo de CADA título.
 */

import React, { useState, useCallback } from 'react';
import {
  Mic2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ConversatorioItem {
  id: string;
  year: string;
  badge: string;
  badgeColor?: string;
  title: string;
  highlightKeyword?: string;
  institution: string;
  location: string;
  description?: string;
}

export const CONVERSATORIOS_DATA: ConversatorioItem[] = [
  {
    id: 'mas-alla-del-algoritmo-2024',
    year: '2024',
    badge: 'CONVERSATORIO',
    badgeColor: '#00f0ff',
    title: 'MÁS ALLÁ DEL ALGORITMO: MUJERES Y CREATIVIDAD EN LA PROGRAMACIÓN',
    highlightKeyword: 'MÁS ALLÁ DEL ALGORITMO',
    institution: 'Librería Woolf',
    location: 'Bogotá, Colombia 2024',
  },
  {
    id: 'musiforo-unal-2021',
    year: '2021',
    badge: 'FORO',
    badgeColor: '#FF007F',
    title: 'MUSIFORO: "¿LA MÚSICA Y LXS ARTISTAS SON AJENOS A LA VIOLENCIA CONTRA LAS MUJERES?"',
    highlightKeyword: 'MUSIFORO',
    institution: 'Facultad de Minas UNAL',
    location: 'Medellín, Colombia 2021',
  },
  {
    id: 'sonorarteclab-cultura-maker-2021',
    year: '2021',
    badge: 'CHARLA',
    badgeColor: '#E024C3',
    title: 'SONORARTECLAB Y CULTURA MAKER',
    highlightKeyword: 'SONORARTECLAB Y CULTURA MAKER',
    institution: 'Makerspaces del Sistema de Bibliotecas Públicas de Medellín',
    location: 'Medellín, Colombia 2021',
  },
  {
    id: 'movimiento-cultura-maker-untref-2019',
    year: '2019',
    badge: 'SIMPOSIO',
    badgeColor: '#00f0ff',
    title: 'MOVIMIENTO Y CULTURA MAKER',
    highlightKeyword: 'MOVIMIENTO Y CULTURA MAKER',
    institution: 'Simposio Online UNTREF | Universidad Tres de Febrero',
    location: 'Buenos Aires, Argentina 2019',
  },
  {
    id: 'synthetizadores-sonidos-marcianos-2017',
    year: '2017',
    badge: 'CONVERSATORIO',
    badgeColor: '#FF007F',
    title: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS, MECÁNICA DE LA ESCUCHA ESPIRITUAL',
    highlightKeyword: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS',
    institution: 'Casa del Libro Total',
    location: 'Bucaramanga, Colombia 2017',
  },
  {
    id: 'audiografemas-poesia-analoga-2017',
    year: '2017',
    badge: 'CHARLA',
    badgeColor: '#E024C3',
    title: 'AUDIOGRAFEMAS: POESÍA ANÁLOGA SONORA',
    highlightKeyword: 'AUDIOGRAFEMAS: POESÍA ANÁLOGA SONORA',
    institution: 'Casa del Libro Total',
    location: 'Bucaramanga, Colombia 2017',
  },
  {
    id: 'cafe-y-fotogramas-2017',
    year: '2017',
    badge: 'CONVERSATORIO',
    badgeColor: '#00f0ff',
    title: 'CAFÉ Y FOTOGRAMAS',
    highlightKeyword: 'CAFÉ Y FOTOGRAMAS',
    institution: 'Casa del Libro Total',
    location: 'Bucaramanga, Colombia 2017',
  },
];

// Colecciones por defecto de registros fotográficos adaptadas a cada conversatorio
const CONVERSATORIO_DEFAULT_IMAGES: Record<string, string[]> = {
  'mas-alla-del-algoritmo-2024': [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop', // Conferencia auditorio
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=900&auto=format&fit=crop', // Panel de diálogo y debate
  ],
  'musiforo-unal-2021': [
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop', // Micrófono y estrado
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900&auto=format&fit=crop', // Creación musical y debate
  ],
  'sonorarteclab-cultura-maker-2021': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop', // Makerspaces y circuitos
    'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=900&auto=format&fit=crop', // Cultura maker colaborativa
  ],
  'movimiento-cultura-maker-untref-2019': [
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=900&auto=format&fit=crop', // Simposio tecnológico
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=900&auto=format&fit=crop', // Ponencia abierta
  ],
  'synthetizadores-sonidos-marcianos-2017': [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop', // Sintetizadores modulares analógicos
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=900&auto=format&fit=crop', // Exploración sonora experimental
  ],
  'audiografemas-poesia-analoga-2017': [
    'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=900&auto=format&fit=crop', // Poesía y grafemas visuales
    'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=900&auto=format&fit=crop', // Luz y sombras analógicas
  ],
  'cafe-y-fotogramas-2017': [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop', // Fotogramas y cinematografía
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop', // Diálogo y proyección
  ],
};

const GENERIC_CONVERSATORIOS_IMAGES = [
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente individual de Slide Glitch para cada conversatorio.
 */
interface ConversatorioGlitchSlideProps {
  conversatorioId: string;
  conversatorioTitle: string;
}

const ConversatorioGlitchSlide: React.FC<ConversatorioGlitchSlideProps> = ({
  conversatorioId,
  conversatorioTitle,
}) => {
  const [images] = useState<string[]>(() => {
    const saved = localStorage.getItem(`margarita_conversatorio_slide_${conversatorioId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return CONVERSATORIO_DEFAULT_IMAGES[conversatorioId] || GENERIC_CONVERSATORIOS_IMAGES;
      }
    }
    return CONVERSATORIO_DEFAULT_IMAGES[conversatorioId] || GENERIC_CONVERSATORIOS_IMAGES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide my-3.5 shadow-md">
      {/* Capas de textura Glitch y escaneo CRT sutil sin halo */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {/* Imagen actual */}
      {images.length > 0 ? (
        <>
          <img
            src={images[currentIndex]}
            alt={`${conversatorioTitle} (${currentIndex + 1})`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105 pointer-events-none select-none"
            loading="lazy"
            draggable={false}
          />

          {/* Sombra gradual inferior */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#00f0ff] hover:text-black text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Indicadores de diapositivas */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? 'w-5 bg-[#00f0ff]'
                        : 'w-1.5 bg-white/40 hover:bg-white'
                    }`}
                    aria-label={`Diapositiva ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 font-mono-code text-[#7A7A96]">
          <ImageIcon className="w-7 h-7 text-[#00f0ff]/40 mb-1.5" />
          <span className="text-xs text-[#7A7A96]">DISPONIBLE PRÓXIMAMENTE</span>
        </div>
      )}
    </div>
  );
};

export const ConversatoriosSection: React.FC = () => {
  // Content protection
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="conversatorios"
      role="region"
      aria-label="Conversatorios y Encuentros Dialógicos"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN CON ESTILO RETRO-TERMINAL */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#00f0ff] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group mb-3"
            >
              <Mic2 className="w-4 h-4 text-[#00f0ff]" />
              <span>CONVERSATORIOS</span>
            </button>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Diálogos, Foros, Simposios & Cultura Libre
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Paneles, foros y ponencias sobre cultura maker, creación sonora experimental, perspectiva de género en tecnología y pedagogías abiertas.
            </p>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO DE CONVERSATORIOS CON SLIDES GLITCH INDIVIDUALES (SIN HALOS) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Encabezado editorial interno */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#232336]">
                <div className="flex items-center gap-2 font-dosis text-sm text-[#00f0ff] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                  <span>CONVERSATORIOS & PANELES IMPARTIDOS</span>
                </div>
              </div>

              {/* Grid editorial de 2 columnas de conversatorios con sus slides glitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {CONVERSATORIOS_DATA.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between pb-8 border-b border-[#202030] group"
                  >
                    <div>
                      {/* Fila de metadatos: Año e insignia limpia en Dosis */}
                      <div className="flex items-center gap-2 font-dosis text-sm mb-1.5">
                        <span className="text-[#00f0ff] font-bold text-base">
                          {item.year}
                        </span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span
                          className="uppercase text-xs tracking-wider font-bold"
                          style={{ color: item.badgeColor || '#00f0ff' }}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Título Principal en Bahnschrift Condensed */}
                      <h3 className="font-bahnschrift-condensed font-light text-[14px] sm:text-[16px] text-[#F5F5FA] leading-snug tracking-wider uppercase group-hover:text-white transition-colors mb-2">
                        {(() => {
                          const cleanTitle = item.title;
                          if (item.highlightKeyword && cleanTitle.includes(item.highlightKeyword)) {
                            const idx = cleanTitle.indexOf(item.highlightKeyword);
                            return (
                              <>
                                <span className="font-semibold text-white">
                                  {cleanTitle.slice(0, idx + item.highlightKeyword.length)}
                                </span>
                                <span className="text-[#00f0ff] font-normal">
                                  {cleanTitle.slice(idx + item.highlightKeyword.length)}
                                </span>
                              </>
                            );
                          }
                          return cleanTitle;
                        })()}
                      </h3>

                      {/* Descripción pedagógica (si existe) */}
                      {item.description && (
                        <p className="font-rajdhani font-medium text-xs sm:text-[14px] text-[#A6A6C0] leading-relaxed mb-2.5 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}

                      {/* Institución / Entidad convocante y ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0]">
                        <span className="text-[#E0E0F0] font-semibold">{item.institution}</span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* SLIDE DE IMÁGENES INDIVIDUAL DEBAJO DE CADA CONVERSATORIO */}
                    <ConversatorioGlitchSlide
                      conversatorioId={item.id}
                      conversatorioTitle={item.title}
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
