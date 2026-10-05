/**
 * @file PublicationsSection.tsx
 * @description Sección de Publicaciones del portafolio personal de Margarita.
 * Presenta el catálogo editorial curado de obras, fanzines, ensayos y literatura expandida
 * con diseño limpio retro-digital, video de YouTube para Audiografemas y slides de imágenes
 * para el resto de títulos.
 */

import React, { useState, useCallback } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Edit3,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface PublicationItem {
  id: string;
  year: string;
  badge: string;
  badgeColor?: string;
  title: string;
  highlightKeyword?: string;
  description: string;
  work?: string;
  publisher: string;
  location: string;
  format?: string;
  link?: string;
  videoUrl?: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    id: 'pub-darpana-2026',
    year: '2026',
    badge: 'LITERATURA EXPANDIDA',
    badgeColor: '#FF007F',
    title: 'DARPANA',
    highlightKeyword: 'DARPANA',
    work: 'Obra ganadora: DARPANA',
    description: 'Beca de creación literaria ganadora para la producción de una obra inédita en formato impreso y digital de cuento para participantes con enfoque diferencial.',
    publisher: 'IMCT',
    location: 'Bucaramanga, Colombia, 2026',
  },
  {
    id: 'pub-ovni-fancine-2023',
    year: '2023',
    badge: 'FANZINE INDEPENDIENTE',
    badgeColor: '#E024C3',
    title: 'OVNI FANCINE',
    highlightKeyword: 'OVNI FANCINE',
    description: `OVNI fanCine es una publicación y espacio virtual de circulación independiente donde amplifico textos y fotogramas de películas que me deslumbraron y quiero compartir.

Concepto donde relaciono la Cinematografía con otras áreas del conocimiento y de la experiencia humana como:

Literatura-Poesía
Sonido-Música
Tecnología
Artes Plásticas
Naturaleza y Ecología del Consumo
Adicciones
Vejez-Enfermedad
Mundo Interior
Feminismo-Género
Afectividad Contemporánea
Diversidad Funcional`,
    publisher: 'Publicación independiente impresa en mi casa',
    location: 'Bucaramanga 2023',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'pub-diario-cinefilo-2022',
    year: '2022',
    badge: 'BITÁCORA CINÉFILA',
    badgeColor: '#FF007F',
    title: 'MI DIARIO CINÉFILO',
    highlightKeyword: 'MI DIARIO CINÉFILO',
    description: `Bitácora cinematográfica física y digital con 6 experiencias diseñadas para recordar y conversar acerca de tus pelis favs.

Dinámicas pensadas para momentos de introspección o para detonar el diálogo con amigos y familia. Cierra la pantalla y activa la conversación !`,
    publisher: 'Publicación Independiente',
    location: 'Bucaramanga 2022',
  },
  {
    id: 'pub-voz-invisible-2021',
    year: '2021',
    badge: 'RELATO',
    badgeColor: '#E024C3',
    title: 'LA VOZ INVISIBLE',
    highlightKeyword: 'LA VOZ INVISIBLE',
    description: `Becaria Ganadora del Programa Nacional de Estímulos Relato de persona con discapacidad auditiva

Texto: La Voz Invisible Ministerio de Cultura   Bogotá, 2021`,
    publisher: 'Ministerio de Cultura',
    location: 'Bogotá, 2021',
  },
  {
    id: 'pub-audiografemas-2017',
    year: '2017',
    badge: 'E-LITERATURA',
    badgeColor: '#00f0ff',
    title: 'AUDIOGRAFEMAS',
    highlightKeyword: 'AUDIOGRAFEMAS',
    description: 'Historias sono-digitales donde utilizo la música como excusa para compartir lo que escribo. Algunas personas le llaman canciones, yo les llame: Audiografemas.',
    publisher: 'YOUTUBE',
    location: 'Bucaramanga, 2017',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  },
  {
    id: 'pub-synthetizadores-sonidos-marcianos-2017',
    year: '2017',
    badge: 'TEXTO SONORO',
    badgeColor: '#FF007F',
    title: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS',
    highlightKeyword: 'HABLEMOS DE SYNTHETIZADORES Y SONIDOS MARCIANOS',
    description: 'Mecánica de la Escucha Espiritual',
    publisher: 'Publicación & Circulación Sonora',
    location: 'Bucaramanga, 2017',
  },
  {
    id: 'pub-bucaramanga-escribe-cuenta-2007',
    year: '2007',
    badge: 'ANTOLOGÍA',
    badgeColor: '#00f0ff',
    title: 'BUCARAMANGA ESCRIBE Y CUENTA',
    highlightKeyword: 'BUCARAMANGA ESCRIBE Y CUENTA',
    description: 'Antología 2006-2007',
    publisher: 'Alcaldía de Bucaramanga / IMCT',
    location: 'Bucaramanga, 2006-2007',
  },
];

// Colecciones por defecto de registros visuales para cada una de las publicaciones
const PUB_DEFAULT_IMAGES: Record<string, string[]> = {
  'pub-darpana-2026': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-ovni-fancine-2023': [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-diario-cinefilo-2022': [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-voz-invisible-2021': [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-synthetizadores-sonidos-marcianos-2017': [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop',
  ],
  'pub-bucaramanga-escribe-cuenta-2007': [
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop',
  ],
};

const GENERIC_PUB_IMAGES = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=900&auto=format&fit=crop',
];

/**
 * Componente de Video de YouTube integrado para Audiografemas u obras audiovisuales.
 */
interface PublicationYouTubeEmbedProps {
  publicationId: string;
  publicationTitle: string;
  defaultUrl: string;
}

const PublicationYouTubeEmbed: React.FC<PublicationYouTubeEmbedProps> = ({
  publicationId,
  publicationTitle,
  defaultUrl,
}) => {
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    return localStorage.getItem(`margarita_pub_video_${publicationId}`) || defaultUrl;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState(videoUrl);

  const getEmbedUrl = (raw: string) => {
    const match = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
    return raw;
  };

  const handleSave = () => {
    if (!tempUrl.trim()) return;
    setVideoUrl(tempUrl.trim());
    localStorage.setItem(`margarita_pub_video_${publicationId}`, tempUrl.trim());
    setIsEditing(false);
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/video my-3.5 shadow-md">
      {/* Capas de textura Glitch y escaneo CRT sutil */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {/* Frame de Video de YouTube Embebido */}
      <iframe
        src={embedUrl}
        title={`Video YouTube ${publicationTitle}`}
        className="w-full h-full border-0 pointer-events-auto"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Insignia superior flotante */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#00f0ff]/30 font-mono-code text-[11px] text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
        <span>YOUTUBE // {publicationTitle}</span>
      </div>

      {/* Botón flotante para editar la URL del video */}
      <div className="absolute top-2 right-2 z-20">
        <button
          type="button"
          onClick={() => {
            setTempUrl(videoUrl);
            setIsEditing(true);
          }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 hover:bg-[#FF007F] text-[#A0A0BA] hover:text-white border border-[#333348] hover:border-[#FF007F] font-mono-code text-[11px] transition-colors cursor-pointer"
          title="Editar enlace de YouTube"
        >
          <Edit3 className="w-3 h-3" />
          <span>EDITAR URL</span>
        </button>
      </div>

      {/* Modal / Overlay para editar el enlace de YouTube */}
      {isEditing && (
        <div className="absolute inset-0 z-30 p-4 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center font-mono-code">
          <div className="w-full max-w-sm p-4 bg-[#14141E] border border-[#2B2B3E] rounded-xl shadow-2xl">
            <span className="text-xs text-white uppercase block mb-2 font-bold">
              Ingresar URL de YouTube
            </span>
            <input
              type="url"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-2.5 py-1.5 rounded bg-[#0A0A12] border border-[#3A3A50] text-white text-xs mb-3 focus:outline-none focus:border-[#00f0ff]"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-1 text-xs rounded bg-[#202030] text-[#A0A0BA] hover:text-white cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 py-1 text-xs rounded bg-[#00f0ff] text-black font-bold hover:bg-[#5cf5ff] cursor-pointer"
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

/**
 * Componente individual de Slide Glitch para cada publicación.
 */
interface PublicationGlitchSlideProps {
  publicationId: string;
  publicationTitle: string;
}

const PublicationGlitchSlide: React.FC<PublicationGlitchSlideProps> = ({
  publicationId,
  publicationTitle,
}) => {
  const [images] = useState<string[]>(() => {
    const saved = localStorage.getItem(`margarita_publication_slide_${publicationId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return PUB_DEFAULT_IMAGES[publicationId] || GENERIC_PUB_IMAGES;
      }
    }
    return PUB_DEFAULT_IMAGES[publicationId] || GENERIC_PUB_IMAGES;
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
            alt={`${publicationTitle} (${currentIndex + 1})`}
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

export const PublicationsSection: React.FC = () => {
  // Protección anti-descarga y anti-arrastre
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  return (
    <section
      id="publicaciones"
      role="region"
      aria-label="Publicaciones y Archivo Glitch"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN PUBLICACIONES */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-10 sm:mb-14">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 hover:border-[#00f0ff] text-[#00f0ff] text-[15px] sm:text-base font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] cursor-pointer group mb-3"
            >
              <BookOpen className="w-4 h-4 text-[#00f0ff]" />
              <span>PUBLICACIONES</span>
            </button>
            <h2 className="font-bahnschrift-condensed font-bold text-2xl sm:text-3xl text-white tracking-wider uppercase">
              Obras, Ensayos, Fanzines & Literatura Expandida
            </h2>
            <p className="text-base sm:text-lg text-[#9A9AB4] mt-2 max-w-3xl font-rajdhani font-semibold tracking-wide">
              Producción editorial independiente, fanzines autogestivos, textos transmedia y escrituras multicanal con textura analógica.
            </p>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO EDITORIAL */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
              
              {/* Encabezado editorial interno */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#232336]">
                <div className="flex items-center gap-2 font-dosis text-sm text-[#00f0ff] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                  <span>CATÁLOGO EDITORIAL</span>
                </div>
                <span className="font-dosis text-xs text-[#8E8EA8] font-medium">
                  2006 | 2026
                </span>
              </div>

              {/* Grid editorial de publicaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {PUBLICATIONS_DATA.map((item) => (
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

                      {/* Título Principal en tipografía Bahnschrift Condensed */}
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

                      {/* Descripción de la obra o fanzine */}
                      <p className="font-rajdhani font-medium text-xs sm:text-[14px] text-[#A6A6C0] leading-relaxed mb-3 whitespace-pre-line">
                        {item.description}
                      </p>

                      {/* Entidad convocante / Editorial y ubicación */}
                      <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0] pt-1">
                        <span className="text-[#E0E0F0] font-semibold">{item.publisher}</span>
                        <span className="text-[#55556E] font-normal">|</span>
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* REPRODUCTOR DE VIDEO DE YOUTUBE (SI TIENE VIDEO) O SLIDE DE IMÁGENES */}
                    {item.videoUrl ? (
                      <PublicationYouTubeEmbed
                        publicationId={item.id}
                        publicationTitle={item.title}
                        defaultUrl={item.videoUrl}
                      />
                    ) : (
                      <PublicationGlitchSlide
                        publicationId={item.id}
                        publicationTitle={item.title}
                      />
                    )}
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
