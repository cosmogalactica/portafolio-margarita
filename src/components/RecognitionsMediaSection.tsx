/**
 * @file RecognitionsMediaSection.tsx
 * @description Sección de Reconocimientos / Media Player de 2 Columnas.
 * 
 * Columna 1 (Izquierda): Reproductor multimedia interactivo donde el usuario/administrador
 * puede ingresar e incrustar directamente videos (YouTube, Vimeo, MP4) o imágenes/galería,
 * con almacenamiento persistente en localStorage y marco retro-digital protegido.
 * 
 * Columna 2 (Derecha): Listado jerarquizado y curado de los 5 reconocimientos y becas oficiales:
 * 1. MinCultura 2021 - "La Voz Invisible" (Relatos personas con discapacidad)
 * 2. MinCultura 2020 - "Comparte lo que somos"
 * 3. CMMAS México 2016 - "Visiones Sonoras"
 * 4. CIASE 2009 - Mención de Honor "Pegar... no pega"
 * 5. Saludcoop 2007 - 8vo Festival de Talentos (Banda: Black Ska White)
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Award,
  Video,
  Image as ImageIcon,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';
import { UniversesSkillsSection } from './UniversesSkillsSection';
import { ScrollReveal } from './ScrollReveal';

interface RecognitionItem {
  id: string;
  year: string;
  badge: string;
  title: string;
  convocatoria?: string;
  work?: string;
  entity: string;
  location: string;
  category: string;
}

const RECOGNITIONS: RecognitionItem[] = [
  {
    id: 'imct-2026',
    year: '2026',
    badge: 'ESTÍMULO LOCAL',
    title: 'BECARIA GANADORA DE LA CONVOCATORIA CREEE EN TU TALENTO',
    work: 'Texto: Darpana',
    entity: 'IMCT',
    location: 'Bucaramanga, Colombia, 2026',
    category: 'Literatura Expandida & Creación Local',
  },
  {
    id: 'mincultura-2021',
    year: '2021',
    badge: 'ESTÍMULOS NACIONALES',
    title: 'BECARIA GANADORA DEL PROGRAMA NACIONAL DE ESTÍMULOS',
    work: 'Texto: La Voz Invisible',
    entity: 'Ministerio de Cultura',
    location: 'Bogotá, Colombia, 2021',
    category: 'Artes Sonoras & Nuevos Medios',
  },
  {
    id: 'mincultura-2020',
    year: '2020',
    badge: 'BECA NACIONAL',
    title: 'BECARIA GANADORA DEL PROGRAMA COMPARTE LO QUE SOMOS',
    entity: 'Ministerio de Cultura',
    location: 'Bogotá, Colombia, 2020',
    category: 'Cultura, Formación & Creación Digital',
  },
  {
    id: 'cmmas-2016',
    year: '2016',
    badge: 'ENCUENTRO INTERNACIONAL',
    title: 'BECARIA SELECCIONADA PARA EL ENCUENTRO DE COMPOSICIÓN ELECTROACÚSTICA VISIONES SONORAS. FESTIVAL INTERNACIONAL DE MÚSICA Y NUEVAS TECNOLOGÍAS',
    entity: 'CMMAS. Centro Mexicano para la Música y las Artes Sonoras',
    location: 'Morelia, México, 2016',
    category: 'Composición Electroacústica & Nuevas Tecnologías',
  },
  {
    id: 'ciase-2009',
    year: '2009',
    badge: 'MENCIÓN DE HONOR',
    title: 'CONCURSO PARA LA ELABORACIÓN DE UNA PIEZA ARTÍSTICA. CIUDADES SEGURAS: VIOLENCIA CONTRA LA MUJER Y POLÍTICAS PÚBLICAS',
    work: 'Obra: PEGAR… NO PEGA',
    entity: 'CIASE. Corporación de Investigación y Acción Social y Económica',
    location: 'Bogotá, Colombia, 2009',
    category: 'Acción Social, Memoria & Arte Crítico',
  },
  {
    id: 'saludcoop-2007',
    year: '2007',
    badge: 'PREMIO DOCENTE',
    title: 'DOCENTE DE MÚSICA GANADORA. 8VO FESTIVAL DE TALENTOS',
    work: 'Banda: Black Ska White',
    entity: 'Saludcoop Regional Santander',
    location: 'Bogotá, Colombia, 2007',
    category: 'Pedagogía Musical & Performance en Vivo',
  },
];

// URL base de GitHub Raw para la carpeta MAR (usada para la vista previa en el editor)
export const GITHUB_RAW_MAR_BASE_URL = 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/mar/';

/**
 * Combina la URL base de GitHub Raw con el nombre de cada archivo para la vista previa
 */
export const resolveMarImageUrl = (pathOrFilename: string): string => {
  if (!pathOrFilename) return '';
  if (pathOrFilename.startsWith('http://') || pathOrFilename.startsWith('https://')) {
    return pathOrFilename;
  }
  const filename = pathOrFilename.replace(/^\/?images\/mar\//, '').replace(/^\//, '');
  return `${GITHUB_RAW_MAR_BASE_URL}${filename}`;
};

// Galería de imágenes correspondiente al proyecto MAR con URLs públicas de GitHub Raw
export const MAR_PROJECT_IMAGES: string[] = [
  'marard1.webp', 'marard2.webp', 'marard3.webp', 'marard4.webp', 'marard5.webp',
  'marard6.webp', 'marard7.webp', 'marard8.webp', 'marard9.webp', 'marard10.webp',
  'marard11.webp', 'marard12.webp', 'marard13.webp', 'marard14.webp', 'marard15.webp',
  'marard16.webp', 'marard17.webp', 'marard18.webp', 'marard19.webp', 'marard20.webp',
  'marard21.webp', 'marard22.webp', 'marard23.webp', 'marard24.webp', 'marard25.webp',
  'marard26.webp', 'marard27.webp', 'marard28.webp', 'marard29.webp', 'marard31.webp',
  'marard32.webp', 'marard33.webp', 'marard34.webp', 'marard35.webp', 'marard36.webp',
  'marard37.webp', 'marard39.webp', 'marard40.webp', 'marard41.webp', 'marard42.webp',
  'marard43.webp', 'marard44.webp', 'marard45.webp', 'marard46.webp', 'marard47.webp',
  'marard48.webp', 'marard50.webp', 'marard51.webp', 'marard52.webp', 'marard53.webp',
  'marard54.webp', 'marard55.webp', 'marard56.webp', 'marard57.webp', 'marard58.webp',
  'marard59.webp', 'marard60.webp', 'marard61.webp', 'marard62.webp', 'marard63.webp',
  'marard64.webp', 'marard65.webp', 'marard66.webp', 'marard67.webp', 'marard68.webp',
  'marard70.webp', 'marard71.webp', 'marard72.webp', 'marard73.webp', 'marard74.webp',
  'marard75.webp', 'marard77.webp', 'marard79.webp', 'marard80.webp', 'marard81.webp',
  'marard82.webp', 'marard83.webp', 'marard84.webp', 'marard85.webp', 'marard86.webp',
  'marard87.webp', 'marard88.webp', 'marard89.webp', 'marard90.webp', 'marard91.webp',
  'marard92.webp', 'marard93.webp', 'marard94.webp', 'marard95.webp', 'marard96.webp',
  'marard97.webp', 'marard98.webp', 'marard99.webp', 'marard100.webp', 'marard101.webp',
  'marard102.webp', 'marard104.webp', 'marard105.webp', 'marard106.webp', 'marard107.webp',
  'marard108.webp',
].map((filename) => `${GITHUB_RAW_MAR_BASE_URL}${filename}`);

export const RecognitionsMediaSection: React.FC = () => {
  // Pestaña activa en la columna izquierda: 'video' | 'gallery'
  // Destino del modal de carga: video o galería
  const [modalTarget, setModalTarget] = useState<'video' | 'gallery'>('video');

  const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=g3LGDyNT4PQ&list=PL5CrXSrTboId96fV9uE3dLR8ZltC4iU3B&index=1';

  // URL del video (recuperada desde localStorage o valor inicial)
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    const saved = localStorage.getItem('margarita_portfolio_video_url');
    if (saved && saved.includes('ScMzIvxBSi4')) {
      return DEFAULT_VIDEO_URL;
    }
    return saved || DEFAULT_VIDEO_URL;
  });

  // Lista de imágenes para la galería del Proyecto MAR (URLs públicas de GitHub Raw)
  const [galleryImages, setGalleryImages] = useState<string[]>(MAR_PROJECT_IMAGES);

  useEffect(() => {
    // Actualizar localStorage con la lista de URLs públicas directas de GitHub Raw
    localStorage.setItem('margarita_portfolio_gallery_urls', JSON.stringify(MAR_PROJECT_IMAGES));
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Estados del modal de edición / ingreso de URL
  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [tempInputUrl, setTempInputUrl] = useState<string>('');
  const [inputSavedNotice, setInputSavedNotice] = useState<boolean>(false);

  // Protección anti-descarga y anti-arrastre
  const handleProtected = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
  }, []);

  // Función utilitaria para transformar enlaces de video (YouTube / Vimeo / MP4) en embebidos limpios
  const parseVideoEmbed = (url: string): { type: 'youtube' | 'vimeo' | 'direct' | 'invalid'; embedUrl: string } => {
    if (!url) return { type: 'invalid', embedUrl: '' };

    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    const listMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    const indexMatch = url.match(/[?&]index=(\d+)/);

    if (ytMatch && ytMatch[1]) {
      let embed = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
      if (listMatch && listMatch[1]) {
        embed += `&list=${listMatch[1]}`;
        if (indexMatch && indexMatch[1]) {
          embed += `&index=${indexMatch[1]}`;
        }
      }
      return {
        type: 'youtube',
        embedUrl: embed,
      };
    }

    if (listMatch && listMatch[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?list=${listMatch[1]}&rel=0`,
      };
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[3]) {
      return {
        type: 'vimeo',
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}`,
      };
    }

    // Direct MP4 / WebM
    if (url.match(/\.(mp4|webm|ogg)($|\?)/i) || url.startsWith('blob:')) {
      return { type: 'direct', embedUrl: url };
    }

    // Por defecto asume iframe embed si ya tiene formato embed
    if (url.includes('embed')) {
      return { type: 'youtube', embedUrl: url };
    }

    return { type: 'invalid', embedUrl: url };
  };

  const currentVideoData = parseVideoEmbed(videoUrl);

  // Guardar URL ingresada
  const handleSaveUrl = () => {
    if (!tempInputUrl.trim()) return;

    if (modalTarget === 'video') {
      setVideoUrl(tempInputUrl.trim());
      localStorage.setItem('margarita_portfolio_video_url', tempInputUrl.trim());
    } else {
      const updated = [tempInputUrl.trim(), ...galleryImages];
      setGalleryImages(updated);
      localStorage.setItem('margarita_portfolio_gallery_urls', JSON.stringify(updated));
      setCurrentSlideIndex(0);
    }

    setInputSavedNotice(true);
    setTimeout(() => {
      setInputSavedNotice(false);
      setShowInputModal(false);
      setTempInputUrl('');
    }, 1200);
  };

  const handleResetVideo = () => {
    setVideoUrl(DEFAULT_VIDEO_URL);
    localStorage.setItem('margarita_portfolio_video_url', DEFAULT_VIDEO_URL);
  };

  const handleResetGallery = () => {
    setGalleryImages(MAR_PROJECT_IMAGES);
    localStorage.setItem('margarita_portfolio_gallery_urls', JSON.stringify(MAR_PROJECT_IMAGES));
    setCurrentSlideIndex(0);
  };

  const nextSlide = () => {
    if (galleryImages.length === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    if (galleryImages.length === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section
      id="reconocimientos"
      role="region"
      aria-label="Reconocimientos y Archivo Multimedia"
      onContextMenu={handleProtected}
      onDragStart={handleProtected}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0D0D12] border-t border-[#1C1C28] select-none protected-content"
    >
      {/* Resplandor ambiental de fondo */}
      <div
        className="pointer-events-none absolute top-10 left-10 w-96 h-96 bg-[#FF007F]/6 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 bg-[#00f0ff]/5 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE SECCIÓN CON ESTILO RETRO-TERMINAL */}
        <ScrollReveal direction="up" distance="sm">
          <div className="mb-8 sm:mb-10">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FF007F]/10 hover:bg-[#FF007F]/20 border border-[#FF007F]/30 hover:border-[#FF007F] text-[#FF007F] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,127,0.25)] cursor-pointer group"
            >
              <Award className="w-5 h-5 text-[#FF007F]" />
              <span>TRAYECTORIA</span>
            </button>
          </div>
        </ScrollReveal>

        {/* ESTRUCTURA DE 2 COLUMNAS EN DESKTOP: VIDEO + IMÁGENES AJUSTADOS EXACTAMENTE AL DIV DE RECONOCIMIENTOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ======================================================= */}
          {/* COLUMNA 1 (IZQUIERDA - 6 COLS): 1. VIDEO Y 2. IMÁGENES  */}
          {/* AMBOS APILADOS Y AJUSTADOS AL DIV DE RECONOCIMIENTOS   */}
          {/* ======================================================= */}
          <ScrollReveal direction="up" distance="md" delay={100} className="lg:col-span-6 w-full flex flex-col justify-between gap-5 h-full">
            
            {/* ----------------------------------------------------- */}
            {/* DIV 1: REPRODUCTOR DE VIDEO (SUPERIOR)                 */}
            {/* ----------------------------------------------------- */}
            <div className="flex-1 min-h-0 flex flex-col justify-center p-3 sm:p-4 rounded-2xl bg-[#14141E] border border-[#252538] shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              {/* Marco de video responsivo CRT (adaptado al 50% de la columna) */}
              <div className="relative w-full h-full min-h-[190px] sm:min-h-[220px] rounded-xl bg-black border border-[#28283C] overflow-hidden crt-scanlines flex items-center justify-center aspect-video">
                {currentVideoData.type === 'youtube' || currentVideoData.type === 'vimeo' ? (
                  <iframe
                    src={currentVideoData.embedUrl}
                    title="Video Destacado"
                    className="w-full h-full border-0 pointer-events-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : currentVideoData.type === 'direct' ? (
                  <video
                    src={currentVideoData.embedUrl}
                    controls
                    playsInline
                    className="w-full h-full object-contain pointer-events-auto select-none"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    style={
                      {
                        objectFit: 'contain',
                        userSelect: 'none',
                        WebkitUserDrag: 'none',
                      } as React.CSSProperties
                    }
                  />
                ) : (
                  <div className="text-center p-3 font-mono-code">
                    <Video className="w-6 h-6 text-[#FF007F] mx-auto opacity-60" />
                  </div>
                )}
              </div>
            </div>

            {/* ----------------------------------------------------- */}
            {/* DIV 2: SLIDE DE IMÁGENES (INFERIOR - DEBAJO DEL VIDEO) */}
            {/* ----------------------------------------------------- */}
            <div className="flex-1 min-h-0 flex flex-col justify-center p-3 sm:p-4 rounded-2xl bg-[#14141E] border border-[#252538] hover:border-[#FF007F]/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group">
              {/* Marco responsivo de carrusel / slide con textura Glitch y estilo unificado del sitio */}
              <div
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={
                  {
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                  } as React.CSSProperties
                }
                className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide my-auto shadow-md select-none flex items-center justify-center"
              >
                {/* Capas de textura Glitch y escaneo CRT sutil sin halo */}
                <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

                {galleryImages.length > 0 ? (
                  <>
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        key={currentSlideIndex}
                        src={resolveMarImageUrl(galleryImages[currentSlideIndex] || MAR_PROJECT_IMAGES[0])}
                        alt={`Proyecto MAR - Registro visual ${currentSlideIndex + 1}`}
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105 pointer-events-none select-none"
                        style={
                          {
                            userSelect: 'none',
                            WebkitUserDrag: 'none',
                          } as React.CSSProperties
                        }
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const currentSrc = target.src;
                          if (currentSrc.includes('marard')) {
                            const match = currentSrc.match(/marard\d+\.webp/);
                            if (match) {
                              const filename = match[0];
                              if (currentSrc.includes('raw.githubusercontent.com')) {
                                target.src = `/images/mar/${filename}`;
                              } else {
                                target.src = `${GITHUB_RAW_MAR_BASE_URL}${filename}`;
                              }
                            }
                          }
                        }}
                      />
                    </div>
                    
                    {/* Sombra gradual inferior (estilo estándar del resto del sitio) */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

                    {/* Contador de diapositivas en la esquina superior derecha */}
                    {galleryImages.length > 1 && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[11px] font-mono-code text-[#E0E0F0] pointer-events-none z-20">
                        {currentSlideIndex + 1} / {galleryImages.length}
                      </div>
                    )}

                    {/* Controles de navegación de carrusel */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                          aria-label="Imagen anterior"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 hover:bg-[#FF007F] text-white transition-all backdrop-blur-sm cursor-pointer shadow-lg z-20 opacity-80 group-hover/slide:opacity-100"
                          aria-label="Siguiente imagen"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Indicadores de diapositivas con estilo unificado del sitio */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 max-w-[85%] overflow-x-auto px-1 py-0.5 scrollbar-none">
                          {galleryImages.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentSlideIndex(idx);
                              }}
                              className={`h-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                                idx === currentSlideIndex
                                  ? 'w-5 bg-[#FF007F]'
                                  : 'w-1.5 bg-white/40 hover:bg-white'
                              }`}
                              aria-label={`Ir a la diapositiva ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-3 font-mono-code z-20">
                    <ImageIcon className="w-6 h-6 text-[#FF007F] mb-1.5 opacity-60" />
                    <div className="text-[14px] text-white">GALERÍA VACÍA</div>
                    <button
                      type="button"
                      onClick={() => {
                        setModalTarget('gallery');
                        setShowInputModal(true);
                      }}
                      className="mt-2 px-3 py-1.5 rounded bg-[#FF007F] text-white text-[14px] font-bold"
                    >
                      INGRESAR PRIMERA IMAGEN
                    </button>
                  </div>
                )}
              </div>
            </div>

          </ScrollReveal>

          {/* ======================================================= */}
          {/* COLUMNA 2 (DERECHA - 6 COLS): RECONOCIMIENTOS (EJE Y)    */}
          {/* ======================================================= */}
          <ScrollReveal direction="up" distance="md" delay={200} className="lg:col-span-6 w-full flex flex-col h-full">
            <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#14141E]/90 border border-[#252538] shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md font-dosis relative overflow-hidden">
            {/* Resplandor ambiental gradiente coincidente con el div de abajo */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-[#FF007F]/10 blur-[80px] rounded-full"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-[#00f0ff]/10 blur-[80px] rounded-full"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Flujo editorial continuo sin cajas individuales */}
            <div className="space-y-6">
              {RECOGNITIONS.map((item) => (
                <article
                  key={item.id}
                  className="pb-6 border-b border-[#202030] last:border-b-0 last:pb-0 group"
                >
                  {/* Fila de metadatos: Año e insignia limpia en Dosis (sin corchetes) */}
                  <div className="flex items-center gap-2 font-dosis text-sm mb-1.5">
                    <span className="text-[#FF007F] font-bold text-base">
                      {item.year}
                    </span>
                    <span className="text-[#55556E] font-normal">|</span>
                    <span className="text-[#00f0ff] uppercase text-xs tracking-wider font-bold">
                      {item.badge}
                    </span>
                  </div>

                  {/* Título Principal en tipografía 'Bahnschrift Condensed' (ligero, sin negrita, -2 puntos) */}
                  <h3 className="font-bahnschrift-condensed font-light text-[13px] sm:text-[15px] text-[#F5F5FA] leading-snug tracking-wider uppercase group-hover:text-white transition-colors mb-2">
                    {(() => {
                      const cleanTitle = item.title.replace(/\*/g, '');
                      const matchKeywords = ['CONVOCATORIA', 'PROGRAMA', 'ENCUENTRO', 'VIOLENCIA CONTRA LA MUJER', '8VO'];
                      for (const kw of matchKeywords) {
                        const idx = cleanTitle.indexOf(kw);
                        if (idx !== -1) {
                          return (
                            <>
                              <span>{cleanTitle.slice(0, idx)}</span>
                              <span className="text-[#C084FC] font-normal">{cleanTitle.slice(idx)}</span>
                            </>
                          );
                        }
                      }
                      return cleanTitle;
                    })()}
                  </h3>

                  {/* Texto/pieza en tipografía Dosis */}
                  {item.work && (
                    <div className="font-dosis text-sm text-[#C8C8DE] space-y-1 mb-2.5 pl-3 border-l-2 border-[#FF007F]/40 leading-relaxed">
                      <div className="text-sm font-medium">
                        {item.work.startsWith('Texto:') ? (
                          <>
                            <span className="text-[#8484A0] font-medium">Texto:</span>{' '}
                            <span className="text-[#FF007F] font-semibold">{item.work.replace(/^Texto:\s*/, '')}</span>
                          </>
                        ) : item.work.startsWith('Banda:') ? (
                          <>
                            <span className="text-[#8484A0] font-medium">Banda:</span>{' '}
                            <span className="text-[#FF007F] font-semibold">{item.work.replace(/^Banda:\s*/, '')}</span>
                          </>
                        ) : item.work.startsWith('Obra:') ? (
                          <>
                            <span className="text-[#8484A0] font-medium">Obra:</span>{' '}
                            <span className="text-[#FF007F] font-semibold">{item.work.replace(/^Obra:\s*/, '')}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[#8484A0] font-medium">Obra:</span>{' '}
                            <span className="text-[#FF007F] font-semibold">{item.work}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Entidad convocante y ubicación en tipografía Dosis (sin paréntesis en el año) */}
                  <div className="flex flex-wrap items-center gap-x-2 font-dosis text-sm text-[#9494B0] pt-1">
                    <span className="text-[#E0E0F0] font-semibold">{item.entity}</span>
                    <span className="text-[#55556E] font-normal">|</span>
                    <span>{item.location.replace(/[()[\]]/g, '')}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        </ScrollReveal>

        </div>

        {/* ======================================================= */}
        {/* BLOQUE DE BIOGRAFÍA & MANIFIESTO MULTIPOTENCIAL */}
        {/* ======================================================= */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#14141E]/90 border border-[#252538] shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Resplandor ambiental de fondo */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-[#FF007F]/10 blur-[80px] rounded-full"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-[#00f0ff]/10 blur-[80px] rounded-full"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Header del bloque */}
              <div className="flex items-center gap-2 mb-4 font-bahnschrift-condensed text-sm text-[#00f0ff] uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse-slow shadow-[0_0_8px_#00f0ff]" />
                <span>PERFIL</span>
              </div>

              {/* Párrafo 1: Estratega con discapacidad auditiva */}
              <p className="font-rajdhani font-semibold text-lg sm:text-xl text-[#B8B8CE] leading-relaxed mb-6 animate-subtle-reveal-1">
                Estratega de presencia digital con base entre Bucaramanga y Medellín, Colombia{' '}
                <span className="text-[#FF007F] font-bold">|</span>{' '}
                <span className="text-white">Persona con discapacidad auditiva [ hipoacusia ].</span>
              </p>

              {/* Párrafo 2: SONORARTEC LAB y 3 líneas */}
              <div className="space-y-3 mb-6 animate-subtle-reveal-2">
                <p className="font-rajdhani font-semibold text-base sm:text-lg text-[#9A9AB4] leading-relaxed">
                  Coordino <span className="text-white font-bold tracking-wide font-bahnschrift-condensed text-lg">SONORARTEC LAB</span>, Universo Multipotencial que conecta tres líneas principales:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#0D0D14] border border-[#242436] hover:border-[#FF007F]/60 transition-colors shadow-sm text-center">
                    <span className="w-2 h-2 rounded-full bg-[#FF007F] shadow-[0_0_8px_#FF007F]" />
                    <span className="font-bahnschrift-condensed font-bold text-base tracking-widest text-white">LAB</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#0D0D14] border border-[#242436] hover:border-[#00f0ff]/60 transition-colors shadow-sm text-center">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
                    <span className="font-bahnschrift-condensed font-bold text-base tracking-widest text-white">FUNKYNET</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#0D0D14] border border-[#242436] hover:border-[#E024C3]/60 transition-colors shadow-sm text-center">
                    <span className="w-2 h-2 rounded-full bg-[#E024C3] shadow-[0_0_8px_#E024C3]" />
                    <span className="font-bahnschrift-condensed font-bold text-base tracking-widest text-white">TUTOR.I.A</span>
                  </div>
                </div>
              </div>

              {/* Párrafo 3: Propósito de laboratorios */}
              <p className="font-rajdhani font-semibold text-base sm:text-lg text-[#9A9AB4] leading-relaxed mb-4 animate-subtle-reveal-3">
                Mi propósito es diseñar laboratorios que articulen diversas áreas del conocimiento con la vida misma, conectando del individuo al colectivo desde la empatía, el respeto y el buen vivir.
              </p>

              {/* Párrafo 4: Expresión humana y simbiosis tecnológica */}
              <p className="font-rajdhani font-semibold text-base sm:text-lg text-[#9A9AB4] leading-relaxed animate-subtle-reveal-4">
                Me apasiona la expresión humana y su simbiosis permanente con la tecnología potenciando el bienestar emocional individual y colectivo.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ======================================================= */}
        {/* SECCIÓN / DESPLEGABLES: UNIVERSOS Y HABILIDADES         */}
        {/* ======================================================= */}
        <ScrollReveal direction="up" distance="md" delay={150} className="w-full">
          <UniversesSkillsSection />
        </ScrollReveal>

      </div>

      {/* ========================================================= */}
      {/* MODAL PARA INGRESAR O MODIFICAR LA URL (VIDEO O IMAGEN)  */}
      {/* ========================================================= */}
      {showInputModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div className="relative w-full max-w-lg p-6 sm:p-7 bg-[#14141E] border border-[#2D2D42] rounded-2xl shadow-2xl">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-[#232334] mb-4">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#FF007F]" />
                <h3 className="font-mono-code text-xs uppercase tracking-wider text-white">
                  Ingresar {modalTarget === 'video' ? 'URL de Video' : 'URL de Imagen'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInputModal(false)}
                className="text-[#8484A0] hover:text-white font-mono-code text-xs p-1 cursor-pointer"
              >
                [ CERRAR ]
              </button>
            </div>

            <p className="text-xs text-[#9B9BB2] mb-4 leading-relaxed font-sans">
              {modalTarget === 'video'
                ? 'Ingresa un enlace de YouTube (ej. https://youtube.com/watch?v=...), Vimeo o archivo de video directo .mp4.'
                : 'Ingresa el enlace directo a una imagen (JPG, PNG, WebP) para incorporarla a la galería.'}
            </p>

            <div className="space-y-3 mb-5">
              <label htmlFor="media-url-input" className="block text-[11px] font-mono-code text-[#7A7A96] uppercase">
                URL del Recurso:
              </label>
              <input
                id="media-url-input"
                type="url"
                value={tempInputUrl}
                onChange={(e) => setTempInputUrl(e.target.value)}
                placeholder={
                  modalTarget === 'video'
                    ? 'https://www.youtube.com/watch?v=...'
                    : 'https://images.unsplash.com/...'
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0C0C14] border border-[#2E2E42] text-white font-mono-code text-xs focus:outline-none focus:border-[#FF007F] focus:ring-1 focus:ring-[#FF007F] transition-all"
                autoFocus
              />
            </div>

            {/* Aviso de confirmación */}
            {inputSavedNotice && (
              <div className="mb-4 p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Recurso cargado exitosamente! Actualizando vista...</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowInputModal(false)}
                className="flex-1 py-2.5 font-mono-code text-[15px] font-semibold text-[#A0A0B8] hover:text-white bg-[#1D1D2C] hover:bg-[#252538] rounded-lg transition-colors cursor-pointer"
              >
                CANCELAR
              </button>

              <button
                type="button"
                onClick={handleSaveUrl}
                disabled={!tempInputUrl.trim()}
                className="flex-1 py-2.5 font-mono-code text-[15px] font-bold text-white bg-gradient-to-r from-[#E024C3] to-[#FF007F] hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                CARGAR RECURSO
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
