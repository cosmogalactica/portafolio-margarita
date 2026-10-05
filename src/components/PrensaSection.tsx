/**
 * @file PrensaSection.tsx
 * @description Sección "PRENSA" que recopila coberturas periodísticas,
 * entrevistas en radio y televisión, y artículos de prensa escrita.
 * Conserva el diseño y formato editorial de las secciones anteriores,
 * incorporando a cada título su propio slide interactivo de imágenes con estética glitch CRT.
 */

import React, { useState, useCallback } from 'react';
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface PrensaItem {
  id: string;
  year: string;
  badge: string;
  badgeColor: string;
  title: string;
  highlightKeyword?: string;
  outlet: string;
  organization?: string;
  location: string;
  description: string;
}

export const PRENSA_DATA: PrensaItem[] = [
  {
    id: 'prensa-la-cultural-2024',
    year: '2024',
    badge: 'RADIO & MEDIOS',
    badgeColor: '#FF007F',
    title: 'ENTREVISTA SONORARTEC LAB | TUTOR.I.A',
    highlightKeyword: 'ENTREVISTA SONORARTEC LAB | TUTOR.I.A',
    outlet: 'La Cultural',
    location: 'Bucaramanga, 2024',
    description:
      'Diálogo sobre laboratorios de mediación tecnológica, literatura expandida, arte sonoro y pedagogías vivas de TUTOR.I.A.',
  },
  {
    id: 'prensa-vanguardia-femenina-2020',
    year: '2020',
    badge: 'REVISTA IMPRESA',
    badgeColor: '#E024C3',
    title: 'MARKETING DIGITAL PARA TRABAJADORAS ARTÍSTICAS Y CULTURALES DE LA COMUNA 10',
    highlightKeyword: 'MARKETING DIGITAL PARA TRABAJADORAS ARTÍSTICAS Y CULTURALES',
    outlet: 'Revista Vanguardia Femenina | Edición # 12 | Pág 11',
    organization: 'La Artivista - Red de Creadoras, Productoras y Gestoras Culturales',
    location: 'Medellín, 2020',
    description:
      'Artículo editorial sobre autogestión, formación tecnológica y articulación comunitaria para creadoras y gestoras culturales.',
  },
  {
    id: 'prensa-telemedellin-2019',
    year: '2019',
    badge: 'TELEVISIÓN',
    badgeColor: '#00f0ff',
    title: 'ENTREVISTA TELEMEDELLÍN',
    highlightKeyword: 'ENTREVISTA TELEMEDELLÍN',
    outlet: 'Telemedellín',
    location: 'Medellín, 2019',
    description:
      'Emisión televisiva sobre experimentación e investigación sonora, innovación y proyectos comunitarios de tecnología creativa.',
  },
  {
    id: 'prensa-la-u-stereo-2016',
    year: '2016',
    badge: 'RADIO UNIVERSITARIA',
    badgeColor: '#FF007F',
    title: 'ENTREVISTA SONORARTEC LAB',
    highlightKeyword: 'ENTREVISTA SONORARTEC LAB',
    outlet: 'La U Stereo',
    location: 'Floridablanca, 2016',
    description:
      'Diálogo radial sobre experimentación sonora colectiva, cultura libre y el rol de los laboratorios independientes en Santander.',
  },
  {
    id: 'prensa-diario-adn-2015',
    year: '2015',
    badge: 'DIARIO IMPRESO',
    badgeColor: '#00f0ff',
    title: 'CREATIVIDAD INQUIETA: SONORARTEC LAB UN LABORATORIO CREADO PARA DEJAR VOLAR LA IMAGINACIÓN',
    highlightKeyword: 'CREATIVIDAD INQUIETA: SONORARTEC LAB',
    outlet: 'DIARIO ADN',
    location: 'Bucaramanga, 2015',
    description:
      'Reportaje destacado sobre la fundación y visión de Sonorartec Lab como espacio pionero de confluencia entre arte, ciencia y tecnología.',
  },
  {
    id: 'prensa-diario-vanguardia-2013',
    year: '2013',
    badge: 'PRENSA ESCRITA',
    badgeColor: '#00f0ff',
    title: 'CIRCUIT BENDING: ARTE SONORO CON ELEMENTOS REUTILIZABLES',
    highlightKeyword: 'CIRCUIT BENDING: ARTE SONORO CON ELEMENTOS REUTILIZABLES',
    outlet: 'Diario Vanguardia',
    location: 'Bucaramanga, 2013',
    description:
      'Reseña periodística sobre reciclaje tecnológico, modificación de circuitos electrónicos obsoletos y construcción de instrumentos musicales experimentales.',
  },
];

// Colección curada de imágenes por defecto para cada artículo de prensa
const PRENSA_DEFAULT_IMAGES: Record<string, string[]> = {
  'prensa-la-cultural-2024': [
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=900&auto=format&fit=crop', // Cabina de radio micrófono
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=900&auto=format&fit=crop', // Mezcladora de audio
  ],
  'prensa-vanguardia-femenina-2020': [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop', // Revista y publicación impresa
    'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=900&auto=format&fit=crop', // Red de creadoras culturales
  ],
  'prensa-telemedellin-2019': [
    'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=900&auto=format&fit=crop', // Set de televisión y cámara
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=900&auto=format&fit=crop', // Pantalla de transmisión
  ],
  'prensa-la-u-stereo-2016': [
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=900&auto=format&fit=crop', // Estudio radial universitario
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop', // Instrumentos acústicos y sonido
  ],
  'prensa-diario-adn-2015': [
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=900&auto=format&fit=crop', // Periódico impreso
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop', // Laboratorio creativo makerspace
  ],
  'prensa-diario-vanguardia-2013': [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop', // Circuito electrónico intervenido
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop', // Circuitos y componentes sonoros
  ],
};

const GENERIC_PRENSA_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=900&auto=format&fit=crop',
];

/**
 * Slide interactivo de imágenes individual para cada artículo de prensa.
 */
interface PrensaGlitchSlideProps {
  prensaId: string;
  prensaTitle: string;
}

const PrensaGlitchSlide: React.FC<PrensaGlitchSlideProps> = ({ prensaId, prensaTitle }) => {
  const [images, setImages] = useState<string[]>(() => {
    const saved = localStorage.getItem(`margarita_prensa_slide_${prensaId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PRENSA_DEFAULT_IMAGES[prensaId] || GENERIC_PRENSA_IMAGES;
      }
    }
    return PRENSA_DEFAULT_IMAGES[prensaId] || GENERIC_PRENSA_IMAGES;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');

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

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    const updated = [...images, newUrl.trim()];
    setImages(updated);
    localStorage.setItem(`margarita_prensa_slide_${prensaId}`, JSON.stringify(updated));
    setCurrentIndex(updated.length - 1);
    setNewUrl('');
    setShowAddModal(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaults = PRENSA_DEFAULT_IMAGES[prensaId] || GENERIC_PRENSA_IMAGES;
    setImages(defaults);
    localStorage.removeItem(`margarita_prensa_slide_${prensaId}`);
    setCurrentIndex(0);
  };

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide my-3.5 shadow-md">
      {/* Capas de textura Glitch y escaneo CRT sutil */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {images.length > 0 ? (
        <>
          <img
            src={images[currentIndex]}
            alt={`${prensaTitle} (${currentIndex + 1})`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105 pointer-events-none select-none"
            loading="lazy"
            draggable={false}
          />

          {/* Sombra gradual inferior */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

          {/* Botones de acción en la esquina superior */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20 opacity-0 group-hover/slide:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="p-1.5 rounded-md bg-black/80 hover:bg-[#FF007F] text-white text-[10px] font-mono-code flex items-center gap-1 border border-white/20 transition-colors cursor-pointer"
              title="Añadir foto a este slide"
            >
              <Plus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-md bg-black/80 hover:bg-[#2A2A3C] text-[#8E8EA8] hover:text-white text-[10px] font-mono-code border border-white/20 transition-colors cursor-pointer"
              title="Restablecer fotos"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] hover:text-white text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] hover:text-white text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
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
          <span className="text-xs text-[#7A7A96]">FOTOGRAFÍA DISPONIBLE PRÓXIMAMENTE</span>
        </div>
      )}

      {/* MODAL PARA AGREGAR IMAGEN AL SLIDE */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-sm p-5 bg-[#161622] border border-[#2D2D42] rounded-xl shadow-2xl font-mono-code">
            <h4 className="text-xs text-white uppercase font-bold mb-2">
              Añadir Imagen al Slide
            </h4>
            <p className="text-[11px] text-[#8E8EA8] mb-3">
              Pega la URL de una fotografía o recorte de prensa para este registro.
            </p>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-1.5 rounded bg-[#0D0D14] border border-[#3A3A54] text-white text-xs mb-3 focus:outline-none focus:border-[#FF007F]"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-1.5 text-xs rounded bg-[#222232] text-[#A0A0BA] hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-1.5 text-xs rounded bg-[#FF007F] text-white font-bold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const PrensaSection: React.FC = () => {
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="prensa"
      role="region"
      aria-label="Prensa y Apariciones en Medios"
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
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF007F]/10 hover:bg-[#FF007F]/20 border border-[#FF007F]/30 hover:border-[#FF007F] text-[#FF007F] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group mb-3"
            >
              <Newspaper className="w-4 h-4 text-[#FF007F]" />
              <span>PRENSA</span>
            </button>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Apariciones en Prensa & Medios de Comunicación
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Entrevistas en televisión y radio, reportajes en diarios de circulación y publicaciones
              editoriales sobre la trayectoria de Margarita y Sonorartec Lab.
            </p>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO EDITORIAL DE PRENSA CON SLIDES GLITCH INDIVIDUALES */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              {/* Encabezado editorial interno */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#232336]">
                <div className="flex items-center gap-2 font-dosis text-sm text-[#FF007F] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FF007F]" />
                  <span>REGISTROS DE PRENSA, RADIO & TELEVISIÓN</span>
                </div>
                <span className="font-mono-code text-[11px] text-[#8E8EA8]">
                  6 COBERTURAS ARCHIVADAS
                </span>
              </div>

              {/* Grid editorial de 2 columnas de prensa con sus slides glitch */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {PRENSA_DATA.map((item) => (
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
                          style={{ color: item.badgeColor || '#FF007F' }}
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

                      {/* Descripción de la cobertura */}
                      {item.description && (
                        <p className="font-rajdhani font-medium text-xs sm:text-[14px] text-[#A6A6C0] leading-relaxed mb-2.5 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}

                      {/* Medio, Colectivo / Organización y Ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0]">
                        <span className="text-[#E0E0F0] font-semibold">{item.outlet}</span>
                        {item.organization && (
                          <>
                            <span className="text-[#55556E] font-normal">|</span>
                            <span className="text-[#00f0ff]">{item.organization}</span>
                          </>
                        )}
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* SLIDE DE IMÁGENES INDIVIDUAL DEBAJO DE CADA COBERTURA */}
                    <PrensaGlitchSlide
                      prensaId={item.id}
                      prensaTitle={item.title}
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
