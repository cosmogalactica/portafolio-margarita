/**
 * @file ExposSection.tsx
 * @description Sección EXPOS del portafolio personal de Margarita.
 * Muestra el catálogo de exposiciones, muestras de arte electrónico, bienales,
 * salones e instalaciones interactivas con un slide de imágenes individual debajo de cada título.
 */

import React, { useState, useCallback } from 'react';
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface ExpoItem {
  id: string;
  year: string;
  badge: string;
  badgeColor?: string;
  title: string;
  obra?: string;
  institution: string;
  location: string;
}

export const EXPOS_DATA: ExpoItem[] = [
  {
    id: 'expolab-creativa-mamb-2015',
    year: '2015',
    badge: 'EXPOLAB',
    badgeColor: '#FF007F',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'MAMB',
    location: 'Bucaramanga, 2015',
  },
  {
    id: 'lanzamiento-ovni-fancine-2015',
    year: '2015',
    badge: 'LANZAMIENTO',
    badgeColor: '#00f0ff',
    title: 'LANZAMIENTO DE OVNI FANCINE',
    institution: 'Papel Viajero',
    location: 'Bogotá, Barcelona, 2015',
  },
  {
    id: 'expolab-creativa-festival-en-tiempo-real-2014',
    year: '2014',
    badge: 'FESTIVAL SONORO',
    badgeColor: '#E024C3',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'Festival En Tiempo Real Nuevos Encuentros Sonoros',
    location: 'Bogotá, 2014',
  },
  {
    id: 'expolab-creativa-cumbre-medio-ambiente-2014',
    year: '2014',
    badge: 'CUMBRE INTERNACIONAL',
    badgeColor: '#00f0ff',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'Cumbre Internacional del Medio Ambiente',
    location: 'Bucaramanga, 2014',
  },
  {
    id: 'bocinche-jam-noix-colectivo-mamb-2014',
    year: '2014',
    badge: 'JAM COLECTIVO',
    badgeColor: '#FF007F',
    title: 'BOCINCHE JAM NOIX COLECTIVO',
    institution: 'MAMB',
    location: 'Bucaramanga, 2014',
  },
  {
    id: 'expolab-creativa-mercadillo-bohemios-2014',
    year: '2014',
    badge: 'MERCADILLO',
    badgeColor: '#E024C3',
    title: 'EXPOLAB CREATIVA SONORARTEC LAB',
    institution: 'Mercadillo Llegaron los Bohemios',
    location: 'Bucaramanga, 2014',
  },
  {
    id: 'poemas-electrodomesticos-artemisia-2011',
    year: '2011',
    badge: 'INSTALACIÓN',
    badgeColor: '#00f0ff',
    title: 'POEMAS ELECTRODOMÉSTICOS',
    obra: 'Máquina de hacer Libélulas',
    institution: 'Artemisia',
    location: 'Bucaramanga, 2011',
  },
  {
    id: 'bienal-arte-suba-2010',
    year: '2010',
    badge: 'BIENAL',
    badgeColor: '#FF007F',
    title: 'VII BIENAL INTERNACIONAL DE ARTE SUBA',
    obra: 'Volver',
    institution: 'CC Boulevard',
    location: 'Bogotá, 2010',
  },
  {
    id: 'salon-regional-artistas-2009',
    year: '2009',
    badge: 'SALÓN REGIONAL',
    badgeColor: '#00f0ff',
    title: 'PRESELECCIÓN XIII SALÓN REGIONAL DE ARTISTAS ZONA ORIENTE',
    obra: 'Póngale Cariño al Monte',
    institution: 'Casa Luis Perú de Lacroix',
    location: 'Bucaramanga, 2009',
  },
];

// Colecciones por defecto de registros visuales para cada una de las exposiciones
const EXPO_DEFAULT_IMAGES: Record<string, string[]> = {
  'expolab-creativa-mamb-2015': [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=900&auto=format&fit=crop',
  ],
  'lanzamiento-ovni-fancine-2015': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop',
  ],
  'expolab-creativa-festival-en-tiempo-real-2014': [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop',
  ],
  'expolab-creativa-cumbre-medio-ambiente-2014': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900&auto=format&fit=crop',
  ],
  'bocinche-jam-noix-colectivo-mamb-2014': [
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop',
  ],
  'expolab-creativa-mercadillo-bohemios-2014': [
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
  ],
  'poemas-electrodomesticos-artemisia-2011': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop',
  ],
  'bienal-arte-suba-2010': [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=900&auto=format&fit=crop',
  ],
  'salon-regional-artistas-2009': [
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop',
  ],
};

const GENERIC_EXPO_IMAGES = [
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente individual de Slide Glitch para cada exposición.
 */
interface ExpoGlitchSlideProps {
  expoId: string;
  expoTitle: string;
}

const ExpoGlitchSlide: React.FC<ExpoGlitchSlideProps> = ({
  expoId,
  expoTitle,
}) => {
  const [images] = useState<string[]>(() => {
    const saved = localStorage.getItem(`margarita_expo_slide_${expoId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return EXPO_DEFAULT_IMAGES[expoId] || GENERIC_EXPO_IMAGES;
      }
    }
    return EXPO_DEFAULT_IMAGES[expoId] || GENERIC_EXPO_IMAGES;
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
            alt={`${expoTitle} (${currentIndex + 1})`}
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
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
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
                        ? 'w-5 bg-[#FF007F]'
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
          <ImageIcon className="w-7 h-7 text-[#FF007F]/40 mb-1.5" />
          <span className="text-xs text-[#7A7A96]">DISPONIBLE PRÓXIMAMENTE</span>
        </div>
      )}
    </div>
  );
};

export const ExposSection: React.FC = () => {
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="expos"
      role="region"
      aria-label="Exposiciones y Muestras de Arte Electrónico"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN EXPOS */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF007F]/10 hover:bg-[#FF007F]/20 border border-[#FF007F]/30 hover:border-[#FF007F] text-[#FF007F] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group mb-3"
            >
              <Eye className="w-4 h-4 text-[#FF007F]" />
              <span>EXPOS</span>
            </button>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Exposiciones, Instalaciones & Muestras
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Circuitos expositivos, bienales, salones de artistas, muestras colectivas e instalaciones de arte sonoro y tecnología expandida.
            </p>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO DE EXPOSICIONES CON SLIDES GLITCH INDIVIDUALES (SIN HALOS) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Encabezado editorial interno */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#232336]">
                <div className="flex items-center gap-2 font-dosis text-sm text-[#FF007F] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF007F]" />
                  <span>EXPOSICIONES & CIRCUITOS REALIZADOS</span>
                </div>
              </div>

              {/* Grid editorial de 2 columnas con sus slides glitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {EXPOS_DATA.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between pb-8 border-b border-[#202030] group"
                  >
                    <div>
                      {/* Fila de metadatos: Año e insignia en Dosis */}
                      <div className="flex items-center gap-2 font-dosis text-sm mb-1.5">
                        <span className="text-[#FF007F] font-bold text-base">
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
                      <h3 className="font-bahnschrift-condensed font-light text-[14px] sm:text-[16px] text-[#F5F5FA] leading-snug tracking-wider uppercase group-hover:text-white transition-colors mb-1.5">
                        {item.title}
                      </h3>

                      {/* Obra destacada (si aplica) */}
                      {item.obra && (
                        <p className="font-rajdhani font-semibold text-xs sm:text-[13px] text-[#00f0ff] uppercase tracking-wide mb-1.5">
                          Obra: {item.obra}
                        </p>
                      )}

                      {/* Institución / Entidad convocante y ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0]">
                        <span className="text-[#E0E0F0] font-semibold">{item.institution}</span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* SLIDE DE IMÁGENES INDIVIDUAL DEBAJO DE CADA EXPOSICIÓN */}
                    <ExpoGlitchSlide
                      expoId={item.id}
                      expoTitle={item.title}
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
