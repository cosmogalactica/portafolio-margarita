/**
 * @file WorkshopsSection.tsx
 * @description Sección TALLERES / LABS del portafolio personal de Margarita.
 * Muestra el catálogo formativo y metodologías pedagógicas con diseño limpio
 * retro-digital, tipografías Dosis y Bahnschrift Condensed, y debajo de CADA taller
 * un Slide Glitch interactivo con textura analógica y persistencia en localStorage.
 */

import React, { useState, useCallback } from 'react';
import {
  Cpu,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface WorkshopItem {
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

export const WORKSHOPS_DATA: WorkshopItem[] = [
  {
    id: 'codigo-creatividad-python-2023',
    year: '2023',
    badge: 'LAB',
    badgeColor: '#00f0ff',
    title: 'EL CÓDIGO DE LA CREATIVIDAD: PYTHON MÁS ALLÁ DE LA PROGRAMACIÓN TRADICIONAL',
    highlightKeyword: 'EL CÓDIGO DE LA CREATIVIDAD: PYTHON MÁS ALLÁ DE LA PROGRAMACIÓN TRADICIONAL',
    institution: 'Institución Universitaria Salazar y Herrera | Comfama',
    location: 'Medellín, Colombia 2023',
  },
  {
    id: 'taller-poesiapp-2022',
    year: '2022',
    badge: 'TALLER',
    badgeColor: '#E024C3',
    title: 'POESIAPP',
    highlightKeyword: 'POESIAPP',
    institution: 'Comfama',
    location: 'Medellín, Colombia 2022',
  },
  {
    id: 'lab-feria-sonorarteclab-uraba-2022',
    year: '2022',
    badge: 'LAB',
    badgeColor: '#00f0ff',
    title: 'FERIA SONORARTECLAB',
    highlightKeyword: 'FERIA SONORARTECLAB',
    institution: 'Comfama',
    location: 'Urabá, Antioquia, Colombia 2022',
  },
  {
    id: 'lab-feria-sonorarteclab-santa-rosa-2022',
    year: '2022',
    badge: 'LAB',
    badgeColor: '#FF007F',
    title: 'FERIA SONORARTECLAB',
    highlightKeyword: 'FERIA SONORARTECLAB',
    institution: 'Comfama',
    location: 'Santa Rosa de Osos, Antioquia, Colombia 2022',
  },
  {
    id: 'taller-cinematografo-galaxia-2022',
    year: '2022',
    badge: 'TALLER',
    badgeColor: '#E024C3',
    title: 'CINEMATÓGRAFO GALAXIA',
    highlightKeyword: 'CINEMATÓGRAFO GALAXIA',
    institution: 'Comfama',
    location: 'Medellín, Colombia 2022',
  },
  {
    id: 'laboratorios-poesiapp-dibujosonico-2021',
    year: '2021',
    badge: 'LAB',
    badgeColor: '#00f0ff',
    title: 'POESÍAPP, DIBUJO SÓNICO, LÁPIZ VOLTAJOSO, CINEMATÓGRAFO GALAXIA',
    highlightKeyword: 'POESÍAPP, DIBUJO SÓNICO, LÁPIZ VOLTAJOSO, CINEMATÓGRAFO GALAXIA',
    institution: 'Sistema de Bibliotecas Públicas de Medellín | Biblioteca Pública Piloto',
    location: 'Medellín, Colombia 2021',
  },
  {
    id: 'taller-ideacion-2021',
    year: '2021',
    badge: 'TALLER',
    badgeColor: '#FF007F',
    title: 'TALLER DE IDEACIÓN',
    highlightKeyword: 'TALLER DE IDEACIÓN',
    institution: 'Sistema de Bibliotecas Públicas de Medellín | Biblioteca Pública Piloto',
    location: 'Medellín, Colombia 2021',
  },
  {
    id: 'proyecto-lapiz-voltajoso-2020',
    year: '2020',
    badge: 'LAB',
    badgeColor: '#E024C3',
    title: 'PROYECTO LÁPIZ VOLTAJOSO',
    highlightKeyword: 'PROYECTO LÁPIZ VOLTAJOSO',
    institution: 'Fiesta del Libro y la Cultura',
    location: 'Medellín, Colombia 2020',
  },
  {
    id: 'dibujo-sonico-border-2020',
    year: '2020',
    badge: 'LAB',
    badgeColor: '#00f0ff',
    title: 'DIBUJO SÓNICO',
    highlightKeyword: 'DIBUJO SÓNICO',
    institution: 'Casa Cultural Border',
    location: 'Ciudad de México, México 2020',
  },
  {
    id: 'proyecto-lapiz-voltajoso-citytech-2018-2017',
    year: '2018, 2017',
    badge: 'LAB',
    badgeColor: '#FF007F',
    title: 'PROYECTO LÁPIZ VOLTAJOSO CITY TECH',
    highlightKeyword: 'PROYECTO LÁPIZ VOLTAJOSO CITY TECH',
    institution: 'Piksel Festival',
    location: 'Bergen, Noruega 2018 / 2017',
  },
  {
    id: 'proyecto-lapiz-voltajoso-banrep-2017',
    year: '2017',
    badge: 'LAB',
    badgeColor: '#E024C3',
    title: 'PROYECTO LÁPIZ VOLTAJOSO',
    highlightKeyword: 'PROYECTO LÁPIZ VOLTAJOSO',
    institution: 'Banco de la República',
    location: 'Bucaramanga, Colombia 2017',
  },
  {
    id: 'taller-electronica-creativa-llinas-2016',
    year: '2016',
    badge: 'TALLER',
    badgeColor: '#00f0ff',
    title: 'TALLER ELECTRÓNICA CREATIVA',
    highlightKeyword: 'TALLER ELECTRÓNICA CREATIVA',
    institution: 'Liceo Rodolfo Llinás',
    location: 'Piedecuesta, Colombia 2016',
  },
  {
    id: 'taller-electronica-creativa-unab-2016',
    year: '2016',
    badge: 'TALLER',
    badgeColor: '#FF007F',
    title: 'TALLER ELECTRÓNICA CREATIVA',
    highlightKeyword: 'TALLER ELECTRÓNICA CREATIVA',
    institution: 'UNAB',
    location: 'Bucaramanga, Colombia 2016',
  },
  {
    id: 'taller-electronica-creativa-essa-2014',
    year: '2014',
    badge: 'TALLER',
    badgeColor: '#E024C3',
    title: 'TALLER ELECTRÓNICA CREATIVA',
    highlightKeyword: 'TALLER ELECTRÓNICA CREATIVA',
    institution: 'ESSA Grupo EPM',
    location: 'San Pablo Bolívar, Colombia 2014',
  },
];

// Colecciones por defecto de registros fotográficos adaptadas a la temática de cada taller
const WORKSHOP_DEFAULT_IMAGES: Record<string, string[]> = {
  'codigo-creatividad-python-2023': [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop', // Código cibernético
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900&auto=format&fit=crop', // Terminal de programación
  ],
  'taller-python-creatividad-2023': [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900&auto=format&fit=crop',
  ],
  'laboratorio-poesia-codigo-2023': [
    'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=900&auto=format&fit=crop', // Tipografía y código
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=900&auto=format&fit=crop', // Pantalla creativa
  ],
  'laboratorio-de-creacion-sonora-2022': [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop', // Cables modulares de audio
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900&auto=format&fit=crop', // Creación sónica experimental
  ],
  'taller-poesiapp-2022': [
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop', // Interfaz móvil interactiva
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=900&auto=format&fit=crop', // Prototipado UX poesía
  ],
  'lab-feria-sonorarteclab-uraba-2022': [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900&auto=format&fit=crop', // Experimentación sonora
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop', // Síntesis modular
  ],
  'lab-feria-sonorarteclab-santa-rosa-2022': [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=900&auto=format&fit=crop', // Oscilador y sonido analógico
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop', // Cultura hacker y maker
  ],
  'taller-cinematografo-galaxia-2022': [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop', // Fotogramas y lente analógico
    'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=900&auto=format&fit=crop', // Proyección de luz y sombras
  ],
  'laboratorios-poesiapp-dibujosonico-2021': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop', // Circuitos y grafito
    'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=900&auto=format&fit=crop', // Soldadura y electrónica creativa
  ],
  'taller-ideacion-2021': [
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=900&auto=format&fit=crop', // Proceso de ideación y diseño
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop', // Trabajo colaborativo maker
  ],
  'proyecto-lapiz-voltajoso-2020': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop', // Placas de circuitos y LEDs
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=900&auto=format&fit=crop', // Dibujo conductivo con grafito
  ],
  'dibujo-sonico-border-2020': [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=900&auto=format&fit=crop', // Oscilador y sonido analógico
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop', // Experimentación sonora
  ],
  'proyecto-lapiz-voltajoso-citytech-2018-2017': [
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=900&auto=format&fit=crop', // Festival de código y circuitos
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=900&auto=format&fit=crop', // Hardware hacking internacional
  ],
  'proyecto-lapiz-voltajoso-banrep-2017': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop', // Taller de prototipado
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop', // Electrónica abierta
  ],
  'taller-electronica-creativa-llinas-2016': [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop', // Aula escolar de tecnología
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop', // Jóvenes creando con hardware
  ],
  'taller-electronica-creativa-unab-2016': [
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=900&auto=format&fit=crop', // Laboratorio universitario
    'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=900&auto=format&fit=crop', // Experimentación electrónica
  ],
  'taller-electronica-creativa-essa-2014': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop', // Taller comunitario rural
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop', // Hackeo y cultura maker
  ],
};

const GENERIC_DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente individual de Slide Glitch para cada taller.
 */
interface WorkshopGlitchSlideProps {
  workshopId: string;
  workshopTitle: string;
}

const WorkshopGlitchSlide: React.FC<WorkshopGlitchSlideProps> = ({
  workshopId,
  workshopTitle,
}) => {
  const [images] = useState<string[]>(() => {
    const saved = localStorage.getItem(`margarita_workshop_slide_${workshopId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return WORKSHOP_DEFAULT_IMAGES[workshopId] || GENERIC_DEFAULT_IMAGES;
      }
    }
    return WORKSHOP_DEFAULT_IMAGES[workshopId] || GENERIC_DEFAULT_IMAGES;
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
            alt={`${workshopTitle} (${currentIndex + 1})`}
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

export const WorkshopsSection: React.FC = () => {
  // Content protection
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="talleres"
      role="region"
      aria-label="Talleres y Formación Experimental"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN TALLERES */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF007F]/10 hover:bg-[#FF007F]/20 border border-[#FF007F]/30 hover:border-[#FF007F] text-[#FF007F] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group mb-3"
            >
              <Cpu className="w-4 h-4 text-[#FF007F]" />
              <span>TALLERES</span>
            </button>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Formación Experimental, Laboratorios & Cultura Maker
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Espacios de mediación pedagógica, hackeo de hardware, narrativas transmedia y alfabetización digital crítica.
            </p>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO DE LABS FORMATIVOS CON SLIDES GLITCH INDIVIDUALES (SIN HALOS) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Encabezado editorial interno */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#232336]">
                <div className="flex items-center gap-2 font-dosis text-sm text-[#FF007F] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF007F]" />
                  <span>LABS IMPARTIDOS</span>
                </div>
              </div>

              {/* Grid editorial de 2 columnas de talleres con sus slides glitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {WORKSHOPS_DATA.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between pb-8 border-b border-[#202030] group"
                  >
                    <div>
                      {/* Fila de metadatos: Año e insignia limpia en Dosis */}
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

                    {/* SLIDE GLITCH INDIVIDUAL DEBAJO DE CADA TALLER */}
                    <WorkshopGlitchSlide
                      workshopId={item.id}
                      workshopTitle={item.title}
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
