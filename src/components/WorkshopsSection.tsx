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
  ExternalLink,
  Layers,
  Sparkles,
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
    badge: 'LAB',
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
    title: 'FERIA COLISEO ROSALBA ZAPATA',
    highlightKeyword: 'FERIA COLISEO ROSALBA ZAPATA',
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
    badge: 'LAB',
    badgeColor: '#E024C3',
    title: 'CINEMATÓGRAFO GALAXIA',
    highlightKeyword: 'CINEMATÓGRAFO GALAXIA',
    institution: 'Comfama',
    location: 'Medellín, Colombia 2022',
  },
  {
    id: 'lab-feria-comfama-zungo-2022',
    year: '2022',
    badge: 'LAB',
    badgeColor: '#E024C3',
    title: 'FERIA COMFAMA ZUNGO',
    highlightKeyword: 'FERIA COMFAMA ZUNGO',
    institution: 'Comfama',
    location: 'Zungo, Urabá, Antioquia, Colombia 2022',
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
    badge: 'LAB',
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
    badge: 'LAB',
    badgeColor: '#00f0ff',
    title: 'TALLER ELECTRÓNICA CREATIVA',
    highlightKeyword: 'TALLER ELECTRÓNICA CREATIVA',
    institution: 'Liceo Rodolfo Llinás',
    location: 'Piedecuesta, Colombia 2016',
  },
  {
    id: 'taller-electronica-creativa-unab-2016',
    year: '2016',
    badge: 'LAB',
    badgeColor: '#FF007F',
    title: 'TALLER ELECTRÓNICA CREATIVA',
    highlightKeyword: 'TALLER ELECTRÓNICA CREATIVA',
    institution: 'UNAB',
    location: 'Bucaramanga, Colombia 2016',
  },
  {
    id: 'taller-electronica-creativa-essa-2014',
    year: '2014',
    badge: 'LAB',
    badgeColor: '#E024C3',
    title: 'TALLER ELECTRÓNICA CREATIVA',
    highlightKeyword: 'TALLER ELECTRÓNICA CREATIVA',
    institution: 'ESSA Grupo EPM',
    location: 'San Pablo Bolívar, Colombia 2014',
  },
];

export const POESIAPP_COMFAMA_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfama9.webp',
];

export const POESIAPP_COMFAMA_PROD_IMAGES = [
  '/images/poesiappcomfama/poesiappcomfama1.webp',
  '/images/poesiappcomfama/poesiappcomfama2.webp',
  '/images/poesiappcomfama/poesiappcomfama3.webp',
  '/images/poesiappcomfama/poesiappcomfama4.webp',
  '/images/poesiappcomfama/poesiappcomfama5.webp',
  '/images/poesiappcomfama/poesiappcomfama6.webp',
  '/images/poesiappcomfama/poesiappcomfama7.webp',
  '/images/poesiappcomfama/poesiappcomfama8.webp',
  '/images/poesiappcomfama/poesiappcomfama9.webp',
];

export const FERIA_COMFAMA_URABA_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/feriacomfamauraba8.webp',
];

export const FERIA_COMFAMA_URABA_PROD_IMAGES = [
  '/images/feriacomfamaurabawebp/feriacomfamauraba1.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba2.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba3.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba4.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba5.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba6.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba7.webp',
  '/images/feriacomfamaurabawebp/feriacomfamauraba8.webp',
];

export const FERIA_COMFAMA_ZUNGO_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/feriacomfamazungo1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/feriacomfamazungo2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/feriacomfamazungo3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/feriacomfamazungo4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/feriacomfamazungo5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/feriacomfamazungo6.webp',
];

export const FERIA_COMFAMA_ZUNGO_PROD_IMAGES = [
  '/images/feriacomfamazungo/feriacomfamazungo1.webp',
  '/images/feriacomfamazungo/feriacomfamazungo2.webp',
  '/images/feriacomfamazungo/feriacomfamazungo3.webp',
  '/images/feriacomfamazungo/feriacomfamazungo4.webp',
  '/images/feriacomfamazungo/feriacomfamazungo5.webp',
  '/images/feriacomfamazungo/feriacomfamazungo6.webp',
];

export const TALLER_STAROSADEOSOS_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos11.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/tallerstarosadeosos12.webp',
];

export const TALLER_STAROSADEOSOS_PROD_IMAGES = [
  '/images/tallerstarosadeosos/tallerstarosadeosos1.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos2.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos3.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos4.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos5.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos6.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos7.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos8.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos9.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos10.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos11.webp',
  '/images/tallerstarosadeosos/tallerstarosadeosos12.webp',
];

export const CINEMATOGRAFO_COMFAMA_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/cinematografocomfama11.webp',
];

export const CINEMATOGRAFO_COMFAMA_PROD_IMAGES = [
  '/images/cinematografo%20comfama/cinematografocomfama1.webp',
  '/images/cinematografo%20comfama/cinematografocomfama2.webp',
  '/images/cinematografo%20comfama/cinematografocomfama3.webp',
  '/images/cinematografo%20comfama/cinematografocomfama4.webp',
  '/images/cinematografo%20comfama/cinematografocomfama5.webp',
  '/images/cinematografo%20comfama/cinematografocomfama6.webp',
  '/images/cinematografo%20comfama/cinematografocomfama7.webp',
  '/images/cinematografo%20comfama/cinematografocomfama8.webp',
  '/images/cinematografo%20comfama/cinematografocomfama9.webp',
  '/images/cinematografo%20comfama/cinematografocomfama10.webp',
  '/images/cinematografo%20comfama/cinematografocomfama11.webp',
];

export const CINEMATOGRAFO_BPP_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/cinematografobpp11.webp',
];

export const CINEMATOGRAFO_BPP_PROD_IMAGES = [
  '/images/cinematografobpp/cinematografobpp1.webp',
  '/images/cinematografobpp/cinematografobpp2.webp',
  '/images/cinematografobpp/cinematografobpp3.webp',
  '/images/cinematografobpp/cinematografobpp4.webp',
  '/images/cinematografobpp/cinematografobpp5.webp',
  '/images/cinematografobpp/cinematografobpp6.webp',
  '/images/cinematografobpp/cinematografobpp7.webp',
  '/images/cinematografobpp/cinematografobpp8.webp',
  '/images/cinematografobpp/cinematografobpp9.webp',
  '/images/cinematografobpp/cinematografobpp10.webp',
  '/images/cinematografobpp/cinematografobpp11.webp',
];

export const DIBUJO_SONICO_BPP_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/dibujosonicobpp7.webp',
];

export const DIBUJO_SONICO_BPP_PROD_IMAGES = [
  '/images/dibujosonicobpp/dibujosonicobpp1.webp',
  '/images/dibujosonicobpp/dibujosonicobpp2.webp',
  '/images/dibujosonicobpp/dibujosonicobpp3.webp',
  '/images/dibujosonicobpp/dibujosonicobpp4.webp',
  '/images/dibujosonicobpp/dibujosonicobpp5.webp',
  '/images/dibujosonicobpp/dibujosonicobpp6.webp',
  '/images/dibujosonicobpp/dibujosonicobpp7.webp',
];

export const LAPIZ_VOLTAJOSO_BPP_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/lapizvoltajosobpp/lapizvoltajosobpp1.webp',
];

export const LAPIZ_VOLTAJOSO_BPP_PROD_IMAGES = [
  '/images/lapizvoltajosobpp/lapizvoltajosobpp1.webp',
];

export const BPP_2021_COMBINED_GITHUB_IMAGES = [
  ...LAPIZ_VOLTAJOSO_BPP_GITHUB_IMAGES,
  ...DIBUJO_SONICO_BPP_GITHUB_IMAGES,
  ...CINEMATOGRAFO_BPP_GITHUB_IMAGES,
];

export const BPP_2021_COMBINED_PROD_IMAGES = [
  ...LAPIZ_VOLTAJOSO_BPP_PROD_IMAGES,
  ...DIBUJO_SONICO_BPP_PROD_IMAGES,
  ...CINEMATOGRAFO_BPP_PROD_IMAGES,
];

export const POESIAPP_BP_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp11.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp15.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp16.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp17.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp18.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp19.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp20.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp21.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp22.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp23.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp24.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp25.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp26.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp27.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp28.webp',
];

export const POESIAPP_BP_PROD_IMAGES = [
  '/images/poesiappbp/poesiappbp6.webp',
  '/images/poesiappbp/poesiappbp1.webp',
  '/images/poesiappbp/poesiappbp2.webp',
  '/images/poesiappbp/poesiappbp3.webp',
  '/images/poesiappbp/poesiappbp4.webp',
  '/images/poesiappbp/poesiappbp5.webp',
  '/images/poesiappbp/poesiappbp7.webp',
  '/images/poesiappbp/poesiappbp8.webp',
  '/images/poesiappbp/poesiappbp9.webp',
  '/images/poesiappbp/poesiappbp10.webp',
  '/images/poesiappbp/poesiappbp11.webp',
  '/images/poesiappbp/poesiappbp15.webp',
  '/images/poesiappbp/poesiappbp16.webp',
  '/images/poesiappbp/poesiappbp17.webp',
  '/images/poesiappbp/poesiappbp18.webp',
  '/images/poesiappbp/poesiappbp19.webp',
  '/images/poesiappbp/poesiappbp20.webp',
  '/images/poesiappbp/poesiappbp21.webp',
  '/images/poesiappbp/poesiappbp22.webp',
  '/images/poesiappbp/poesiappbp23.webp',
  '/images/poesiappbp/poesiappbp24.webp',
  '/images/poesiappbp/poesiappbp25.webp',
  '/images/poesiappbp/poesiappbp26.webp',
  '/images/poesiappbp/poesiappbp27.webp',
  '/images/poesiappbp/poesiappbp28.webp',
];

export const TALLER_IDEACION_BPP_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerdeideacionbpp/tallerdeideacionbpp1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerdeideacionbpp/tallerdeideacionbpp2.webp',
];

export const TALLER_IDEACION_BPP_PROD_IMAGES = [
  '/images/tallerdeideacionbpp/tallerdeideacionbpp1.webp',
  '/images/tallerdeideacionbpp/tallerdeideacionbpp2.webp',
];

export const FIESTA_LIBRO_CULTURA_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/fiestadel%20libroylacultura/fiestadellibrolyacultura1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/fiestadel%20libroylacultura/fiestadellibrolyacultura2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/fiestadel%20libroylacultura/fiestadellibrolyacultura3.webp',
];

export const FIESTA_LIBRO_CULTURA_PROD_IMAGES = [
  '/images/fiestadel%20libroylacultura/fiestadellibrolyacultura1.webp',
  '/images/fiestadel%20libroylacultura/fiestadellibrolyacultura2.webp',
  '/images/fiestadel%20libroylacultura/fiestadellibrolyacultura3.webp',
];

export const BERGEN_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/bergen10.webp',
];

export const BERGEN_PROD_IMAGES = [
  '/images/bergen/bergen3.webp',
  '/images/bergen/bergen1.webp',
  '/images/bergen/bergen2.webp',
  '/images/bergen/bergen4.webp',
  '/images/bergen/bergen5.webp',
  '/images/bergen/bergen6.webp',
  '/images/bergen/bergen7.webp',
  '/images/bergen/bergen8.webp',
  '/images/bergen/bergen9.webp',
  '/images/bergen/bergen10.webp',
];

export const BANCO_DE_LA_REP_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep25.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep11.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep12.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep13.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep14.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep15.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep16.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep17.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep18.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep19.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep20.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep21.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep22.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep23.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep24.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep26.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep27.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep28.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep29.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep30.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/bancodelarep31.webp',
];

export const BANCO_DE_LA_REP_PROD_IMAGES = [
  '/images/bancodelarep/bancodelarep25.webp',
  '/images/bancodelarep/bancodelarep1.webp',
  '/images/bancodelarep/bancodelarep2.webp',
  '/images/bancodelarep/bancodelarep3.webp',
  '/images/bancodelarep/bancodelarep4.webp',
  '/images/bancodelarep/bancodelarep5.webp',
  '/images/bancodelarep/bancodelarep6.webp',
  '/images/bancodelarep/bancodelarep7.webp',
  '/images/bancodelarep/bancodelarep8.webp',
  '/images/bancodelarep/bancodelarep9.webp',
  '/images/bancodelarep/bancodelarep10.webp',
  '/images/bancodelarep/bancodelarep11.webp',
  '/images/bancodelarep/bancodelarep12.webp',
  '/images/bancodelarep/bancodelarep13.webp',
  '/images/bancodelarep/bancodelarep14.webp',
  '/images/bancodelarep/bancodelarep15.webp',
  '/images/bancodelarep/bancodelarep16.webp',
  '/images/bancodelarep/bancodelarep17.webp',
  '/images/bancodelarep/bancodelarep18.webp',
  '/images/bancodelarep/bancodelarep19.webp',
  '/images/bancodelarep/bancodelarep20.webp',
  '/images/bancodelarep/bancodelarep21.webp',
  '/images/bancodelarep/bancodelarep22.webp',
  '/images/bancodelarep/bancodelarep23.webp',
  '/images/bancodelarep/bancodelarep24.webp',
  '/images/bancodelarep/bancodelarep26.webp',
  '/images/bancodelarep/bancodelarep27.webp',
  '/images/bancodelarep/bancodelarep28.webp',
  '/images/bancodelarep/bancodelarep29.webp',
  '/images/bancodelarep/bancodelarep30.webp',
  '/images/bancodelarep/bancodelarep31.webp',
];

export const RODOLFO_LLINAS_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/rodolfollinas6.webp',
];

export const RODOLFO_LLINAS_PROD_IMAGES = [
  '/images/rodolfollinas/rodolfollinas7.webp',
  '/images/rodolfollinas/rodolfollinas1.webp',
  '/images/rodolfollinas/rodolfollinas2.webp',
  '/images/rodolfollinas/rodolfollinas3.webp',
  '/images/rodolfollinas/rodolfollinas4.webp',
  '/images/rodolfollinas/rodolfollinas5.webp',
  '/images/rodolfollinas/rodolfollinas6.webp',
];

export const ASEUNAB_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/aseunab/aseunab1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/aseunab/aseunab2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/aseunab/aseunab3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/aseunab/aseunab4.webp',
];

export const ASEUNAB_PROD_IMAGES = [
  '/images/aseunab/aseunab1.webp',
  '/images/aseunab/aseunab2.webp',
  '/images/aseunab/aseunab3.webp',
  '/images/aseunab/aseunab4.webp',
];

export const SAN_PABLO_BOLIVAR_GITHUB_IMAGES = [
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar1.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar2.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar3.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar4.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar5.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar6.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar7.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar8.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar9.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar10.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar11.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar12.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar13.webp',
  'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/sanpablobolivar14.webp',
];

export const SAN_PABLO_BOLIVAR_PROD_IMAGES = [
  '/images/sanpablobolivar/sanpablobolivar1.webp',
  '/images/sanpablobolivar/sanpablobolivar2.webp',
  '/images/sanpablobolivar/sanpablobolivar3.webp',
  '/images/sanpablobolivar/sanpablobolivar4.webp',
  '/images/sanpablobolivar/sanpablobolivar5.webp',
  '/images/sanpablobolivar/sanpablobolivar6.webp',
  '/images/sanpablobolivar/sanpablobolivar7.webp',
  '/images/sanpablobolivar/sanpablobolivar8.webp',
  '/images/sanpablobolivar/sanpablobolivar9.webp',
  '/images/sanpablobolivar/sanpablobolivar10.webp',
  '/images/sanpablobolivar/sanpablobolivar11.webp',
  '/images/sanpablobolivar/sanpablobolivar12.webp',
  '/images/sanpablobolivar/sanpablobolivar13.webp',
  '/images/sanpablobolivar/sanpablobolivar14.webp',
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
  'taller-poesiapp-2022': POESIAPP_COMFAMA_GITHUB_IMAGES,
  'lab-feria-sonorarteclab-uraba-2022': FERIA_COMFAMA_URABA_GITHUB_IMAGES,
  'lab-feria-sonorarteclab-santa-rosa-2022': TALLER_STAROSADEOSOS_GITHUB_IMAGES,
  'taller-cinematografo-galaxia-2022': CINEMATOGRAFO_COMFAMA_GITHUB_IMAGES,
  'lab-feria-comfama-zungo-2022': FERIA_COMFAMA_ZUNGO_GITHUB_IMAGES,
  'laboratorios-poesiapp-dibujosonico-2021': POESIAPP_BP_GITHUB_IMAGES,
  'taller-ideacion-2021': TALLER_IDEACION_BPP_GITHUB_IMAGES,
  'proyecto-lapiz-voltajoso-2020': FIESTA_LIBRO_CULTURA_GITHUB_IMAGES,
  'dibujo-sonico-border-2020': [
    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=900&auto=format&fit=crop', // Oscilador y sonido analógico
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop', // Experimentación sonora
  ],
  'proyecto-lapiz-voltajoso-citytech-2018-2017': BERGEN_GITHUB_IMAGES,
  'proyecto-lapiz-voltajoso-banrep-2017': BANCO_DE_LA_REP_GITHUB_IMAGES,
  'taller-electronica-creativa-llinas-2016': RODOLFO_LLINAS_GITHUB_IMAGES,
  'taller-electronica-creativa-unab-2016': ASEUNAB_GITHUB_IMAGES,
  'taller-electronica-creativa-essa-2014': SAN_PABLO_BOLIVAR_GITHUB_IMAGES,
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
  fitMode?: 'cover' | 'contain';
}

const WorkshopGlitchSlide: React.FC<WorkshopGlitchSlideProps> = ({
  workshopId,
  workshopTitle,
  fitMode,
}) => {
  const isContain = fitMode === 'contain' || workshopId === 'taller-poesiapp-2022';

  // Detección de despliegue en Hostinger / producción externa
  const isExternalProduction =
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1') &&
    !window.location.hostname.includes('run.app') &&
    !window.location.hostname.includes('webcontainer') &&
    !window.location.hostname.includes('github.dev');

  const [images] = useState<string[]>(() => {
    let defaultList =
      WORKSHOP_DEFAULT_IMAGES[workshopId] !== undefined
        ? WORKSHOP_DEFAULT_IMAGES[workshopId]
        : GENERIC_DEFAULT_IMAGES;
    if (workshopId === 'taller-poesiapp-2022' && isExternalProduction) {
      defaultList = POESIAPP_COMFAMA_PROD_IMAGES;
    } else if (workshopId === 'lab-feria-sonorarteclab-uraba-2022' && isExternalProduction) {
      defaultList = FERIA_COMFAMA_URABA_PROD_IMAGES;
    } else if (workshopId === 'lab-feria-sonorarteclab-santa-rosa-2022' && isExternalProduction) {
      defaultList = TALLER_STAROSADEOSOS_PROD_IMAGES;
    } else if (workshopId === 'taller-cinematografo-galaxia-2022' && isExternalProduction) {
      defaultList = CINEMATOGRAFO_COMFAMA_PROD_IMAGES;
    } else if (workshopId === 'lab-feria-comfama-zungo-2022' && isExternalProduction) {
      defaultList = FERIA_COMFAMA_ZUNGO_PROD_IMAGES;
    } else if (workshopId === 'laboratorios-poesiapp-dibujosonico-2021' && isExternalProduction) {
      defaultList = POESIAPP_BP_PROD_IMAGES;
    } else if (workshopId === 'taller-ideacion-2021' && isExternalProduction) {
      defaultList = TALLER_IDEACION_BPP_PROD_IMAGES;
    } else if (workshopId === 'proyecto-lapiz-voltajoso-2020' && isExternalProduction) {
      defaultList = FIESTA_LIBRO_CULTURA_PROD_IMAGES;
    } else if (workshopId === 'proyecto-lapiz-voltajoso-citytech-2018-2017' && isExternalProduction) {
      defaultList = BERGEN_PROD_IMAGES;
    } else if (workshopId === 'proyecto-lapiz-voltajoso-banrep-2017' && isExternalProduction) {
      defaultList = BANCO_DE_LA_REP_PROD_IMAGES;
    } else if (workshopId === 'taller-electronica-creativa-llinas-2016' && isExternalProduction) {
      defaultList = RODOLFO_LLINAS_PROD_IMAGES;
    } else if (workshopId === 'taller-electronica-creativa-unab-2016' && isExternalProduction) {
      defaultList = ASEUNAB_PROD_IMAGES;
    } else if (workshopId === 'taller-electronica-creativa-essa-2014' && isExternalProduction) {
      defaultList = SAN_PABLO_BOLIVAR_PROD_IMAGES;
    }

    const saved = localStorage.getItem(`margarita_workshop_slide_${workshopId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migrar si contiene enlaces antiguos de Unsplash o menos de 9 imágenes para Poesía App Comfama
        if (
          workshopId === 'taller-poesiapp-2022' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length < 9)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o menos de 8 imágenes para Feria Comfama Urabá
        if (
          workshopId === 'lab-feria-sonorarteclab-uraba-2022' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length < 8)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene exactamente 6 imágenes para Feria Comfama Zungo
        if (
          workshopId === 'lab-feria-comfama-zungo-2022' &&
          Array.isArray(parsed) &&
          (parsed.length !== 6 || parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')))
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o menos de 12 imágenes para Taller Santa Rosa de Osos
        if (
          workshopId === 'lab-feria-sonorarteclab-santa-rosa-2022' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length < 12)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o menos de 11 imágenes para Cinematógrafo Comfama
        if (
          workshopId === 'taller-cinematografo-galaxia-2022' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length < 11)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash, no tiene 25 imágenes o no tiene imagen 6 de portada para Poesía App BP
        if (
          workshopId === 'laboratorios-poesiapp-dibujosonico-2021' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) ||
            parsed.length !== 25 ||
            !parsed[0]?.includes('6.webp') ||
            parsed.some((url: string) => typeof url === 'string' && (url.includes('12.webp') || url.includes('13.webp') || url.includes('14.webp'))))
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene exactamente 2 imágenes para Taller de Ideación BPP
        if (
          workshopId === 'taller-ideacion-2021' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length !== 2)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene exactamente 3 imágenes para Fiesta del Libro y la Cultura
        if (
          workshopId === 'proyecto-lapiz-voltajoso-2020' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length !== 3)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene bergen3 como portada para Bergen
        if (
          workshopId === 'proyecto-lapiz-voltajoso-citytech-2018-2017' &&
          Array.isArray(parsed) &&
          (parsed.length !== 10 ||
            !parsed[0]?.includes('bergen3') ||
            parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')))
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene bancodelarep25 como portada para Banco de la República
        if (
          workshopId === 'proyecto-lapiz-voltajoso-banrep-2017' &&
          Array.isArray(parsed) &&
          (parsed.length !== 31 ||
            !parsed[0]?.includes('bancodelarep25') ||
            parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')))
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene rodolfollinas7 como portada para Rodolfo Llinás
        if (
          workshopId === 'taller-electronica-creativa-llinas-2016' &&
          Array.isArray(parsed) &&
          (parsed.length !== 7 ||
            !parsed[0]?.includes('rodolfollinas7') ||
            parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')))
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene exactamente 4 imágenes para ASEUNAB
        if (
          workshopId === 'taller-electronica-creativa-unab-2016' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length !== 4)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }

        // Migrar si contiene enlaces antiguos de Unsplash o no tiene exactamente 14 imágenes para San Pablo Bolívar
        if (
          workshopId === 'taller-electronica-creativa-essa-2014' &&
          Array.isArray(parsed) &&
          (parsed.some((url: string) => typeof url === 'string' && url.includes('unsplash.com')) || parsed.length !== 14)
        ) {
          try {
            localStorage.setItem(`margarita_workshop_slide_${workshopId}`, JSON.stringify(defaultList));
          } catch {
            // ignore
          }
          return defaultList;
        }
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultList;
      } catch {
        return defaultList;
      }
    }
    return defaultList;
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
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={
        {
          userSelect: 'none',
          WebkitUserDrag: 'none',
        } as React.CSSProperties
      }
      className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide my-3.5 shadow-md select-none flex items-center justify-center"
    >
      {/* Capas de textura Glitch y escaneo CRT sutil sin halo */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {/* Imagen actual */}
      {images.length > 0 ? (
        <>
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={images[currentIndex] || images[0]}
              alt={`${workshopTitle} (${currentIndex + 1})`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/slide:scale-105 pointer-events-none select-none"
              style={
                {
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                } as React.CSSProperties
              }
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onError={(e) => {
                const target = e.currentTarget;
                const currentSrc = target.src;

                // Fallback para Poesía App Comfama (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('poesiappcomfam')) {
                  const match = currentSrc.match(/poesiappcomfam(a)?\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      // Si falló con poesiappcomfama1, intentar poesiappcomfam1 o ruta local
                      if (filename === 'poesiappcomfama1.webp') {
                        target.src = 'https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/poesiappcomfam1.webp';
                        return;
                      }
                      target.src = `/images/poesiappcomfama/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappcomfama/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Poesía App BP (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('poesiappbp') || currentSrc.includes('poesiappbpp')) {
                  const numMatch = currentSrc.match(/\d+/);
                  const num = numMatch ? numMatch[0] : '1';
                  if (currentSrc.includes('raw.githubusercontent.com')) {
                    target.src = `/images/poesiappbp/poesiappbp${num}.webp`;
                  } else {
                    target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/poesiappbpp/poesiappbpp${num}.webp`;
                  }
                  return;
                }

                // Fallback para Feria Comfama Urabá (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('feriacomfamauraba')) {
                  const match = currentSrc.match(/feriacomfamauraba\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/feriacomfamaurabawebp/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamaurabawebp/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Feria Comfama Zungo (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('feriacomfamazungo')) {
                  const match = currentSrc.match(/feriacomfamazungo\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/feriacomfamazungo/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/feriacomfamazungo/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Taller Starosadeosos (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('tallerstarosadeosos')) {
                  const match = currentSrc.match(/tallerstarosadeosos\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/tallerstarosadeosos/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerstarosadeosos/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Cinematógrafo Comfama (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('cinematografocomfama')) {
                  const match = currentSrc.match(/cinematografocomfama\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/cinematografo%20comfama/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografo%20comfama/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Cinematógrafo BPP (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('cinematografobpp')) {
                  const match = currentSrc.match(/cinematografobpp\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/cinematografobpp/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/cinematografobpp/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Dibujo Sónico BPP (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('dibujosonicobpp')) {
                  const match = currentSrc.match(/dibujosonicobpp\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/dibujosonicobpp/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/dibujosonicobpp/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Lápiz Voltajoso BPP (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('lapizvoltajosobpp')) {
                  const match = currentSrc.match(/lapizvoltajosobpp\d*\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/lapizvoltajosobpp/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/lapizvoltajosobpp/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Taller de Ideación BPP (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('tallerdeideacionbpp')) {
                  const match = currentSrc.match(/tallerdeideacionbpp\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/tallerdeideacionbpp/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/tallerdeideacionbpp/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Fiesta del Libro y la Cultura (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('fiestadel') || currentSrc.includes('fiestadellibro')) {
                  const numMatch = currentSrc.match(/\d+/);
                  const num = numMatch ? numMatch[0] : '1';
                  if (currentSrc.includes('raw.githubusercontent.com')) {
                    target.src = `/images/fiestadel%20libroylacultura/fiestadellibrolyacultura${num}.webp`;
                  } else {
                    target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/fiestadel%20libroylacultura/fiestadellibrolyacultura${num}.webp`;
                  }
                  return;
                }

                // Fallback para Bergen (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('bergen')) {
                  const match = currentSrc.match(/bergen\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/bergen/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bergen/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Banco de la República (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('bancodelarep')) {
                  const match = currentSrc.match(/bancodelarep\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/bancodelarep/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/bancodelarep/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para Rodolfo Llinás (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('rodolfollinas')) {
                  const match = currentSrc.match(/rodolfollinas\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/rodolfollinas/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/rodolfollinas/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para ASEUNAB (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('aseunab')) {
                  const match = currentSrc.match(/aseunab\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/aseunab/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/aseunab/${filename}`;
                    }
                  }
                  return;
                }

                // Fallback para San Pablo Bolívar (intercambio automático GitHub Raw <-> Ruta relativa limpia)
                if (currentSrc.includes('sanpablobolivar')) {
                  const match = currentSrc.match(/sanpablobolivar\d+\.webp/);
                  if (match) {
                    const filename = match[0];
                    if (currentSrc.includes('raw.githubusercontent.com')) {
                      target.src = `/images/sanpablobolivar/${filename}`;
                    } else {
                      target.src = `https://raw.githubusercontent.com/cosmogalactica/portafolio-margarita/main/images/sanpablobolivar/${filename}`;
                    }
                  }
                  return;
                }
              }}
            />
          </div>

          {/* Sombra gradual inferior (solo para imágenes en modo cover) */}
          {!isContain && (
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
          )}

          {/* Contador de diapositivas para colecciones con más de una imagen */}
          {images.length > 1 && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[11px] font-mono-code text-[#E0E0F0] pointer-events-none z-20">
              {currentIndex + 1} / {images.length}
            </div>
          )}

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
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 max-w-[85%] overflow-x-auto px-1 py-0.5 scrollbar-none">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
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
        <div className="flex flex-col items-center justify-center h-full text-center p-6 select-none">
          <div className="w-12 h-12 rounded-xl bg-[#141420] border border-[#2B2B3E] flex items-center justify-center mb-2.5 shadow-inner">
            <ImageIcon className="w-6 h-6 text-[#00f0ff]/70 animate-pulse-slow" />
          </div>
          <span className="font-bahnschrift-condensed text-sm sm:text-base uppercase tracking-widest text-white/90 font-bold">
            SLIDE VACÍO // LAB PENDIENTE
          </span>
          <span className="text-xs text-[#8E8EA8] mt-1 font-dosis">
            Espacio reservado para nuevo registro visual
          </span>
        </div>
      )}
    </div>
  );
};

const formatEmbedUrl = (rawUrl: string): string => {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();
  if (trimmed.includes('instagram.com')) {
    if (trimmed.includes('/embed')) {
      return trimmed;
    }
    const match = trimmed.match(/\/p\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://www.instagram.com/p/${match[1]}/embed/`;
    }
  }
  return trimmed;
};

interface WorkshopDualIframeViewerProps {
  workshopId: string;
  workshopTitle: string;
  initialUrl1: string;
  initialUrl2?: string;
}

const WorkshopDualIframeViewer: React.FC<WorkshopDualIframeViewerProps> = ({
  workshopId,
  workshopTitle,
  initialUrl1,
  initialUrl2 = '',
}) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [url1] = useState<string>(() => {
    const saved = localStorage.getItem(`margarita_workshop_iframe1_${workshopId}`);
    return saved || initialUrl1;
  });
  const [url2, setUrl2] = useState<string>(() => {
    const saved = localStorage.getItem(`margarita_workshop_iframe2_${workshopId}`);
    return (saved && saved.trim()) ? saved : (initialUrl2 || '');
  });
  const [inputUrl2, setInputUrl2] = useState('');
  const [isEditingUrl2, setIsEditingUrl2] = useState(false);

  const handleSaveUrl2 = () => {
    if (!inputUrl2.trim()) return;
    setUrl2(inputUrl2.trim());
    try {
      localStorage.setItem(`margarita_workshop_iframe2_${workshopId}`, inputUrl2.trim());
    } catch {
      // ignore
    }
    setIsEditingUrl2(false);
  };

  const embedUrl1 = formatEmbedUrl(url1);
  const embedUrl2 = formatEmbedUrl(url2);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={
        {
          userSelect: 'none',
          WebkitUserDrag: 'none',
        } as React.CSSProperties
      }
      className="relative w-full aspect-[16/9] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A12] border border-[#26263A] group/slide my-3.5 shadow-md select-none flex flex-col"
    >
      {/* Capas de textura Glitch y escaneo CRT sutil */}
      <div className="absolute inset-0 glitch-texture-overlay z-10 pointer-events-none" />

      {/* Barra superior de control de los dos iframes */}
      <div className="relative z-20 flex items-center justify-between px-3 py-1 bg-[#10101A]/95 border-b border-[#252538] backdrop-blur-sm select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#00f0ff]">
            REGISTROS INSTAGRAM / IFRAMES
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono-code font-bold uppercase tracking-wide transition-all cursor-pointer ${
              activeTab === 0
                ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/60 shadow-[0_0_10px_rgba(0,240,255,0.25)]'
                : 'bg-[#181824] text-[#8E8EA8] hover:text-white border border-transparent'
            }`}
          >
            IFRAME 1
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`px-2.5 py-1 rounded text-[11px] font-mono-code font-bold uppercase tracking-wide transition-all cursor-pointer ${
              activeTab === 1
                ? 'bg-[#FF007F]/20 text-[#FF007F] border border-[#FF007F]/60 shadow-[0_0_10px_rgba(255,0,127,0.25)]'
                : 'bg-[#181824] text-[#8E8EA8] hover:text-white border border-transparent'
            }`}
          >
            IFRAME 2
          </button>

          {activeTab === 0 ? (
            <a
              href="https://www.instagram.com/p/CB3_7mDnaRu/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-1 rounded hover:bg-white/10 text-[#A6A6C0] hover:text-[#00f0ff] transition-colors"
              title="Abrir publicación 1 original en Instagram"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a
              href="https://www.instagram.com/p/CCMdzyvnZBZ/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 p-1 rounded hover:bg-white/10 text-[#A6A6C0] hover:text-[#FF007F] transition-colors"
              title="Abrir publicación 2 original en Instagram"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Contenedor del contenido del iframe activo */}
      <div className="relative z-10 w-full flex-1 bg-black overflow-hidden flex items-center justify-center">
        {activeTab === 0 ? (
          <iframe
            src={embedUrl1}
            title={`${workshopTitle} - Registro 1 (Instagram)`}
            className="w-full h-full border-0 bg-[#0A0A12]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            scrolling="yes"
            loading="lazy"
          />
        ) : embedUrl2 && !isEditingUrl2 ? (
          <div className="relative w-full h-full">
            <iframe
              src={embedUrl2}
              title={`${workshopTitle} - Registro 2`}
              className="w-full h-full border-0 bg-[#0A0A12]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              scrolling="yes"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => setIsEditingUrl2(true)}
              className="absolute top-3 right-3 px-2 py-1 bg-black/80 hover:bg-black text-[10px] font-mono-code text-[#00f0ff] border border-[#00f0ff]/40 rounded backdrop-blur-sm z-30 transition-all cursor-pointer"
            >
              Editar URL 2
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[#FF007F]/10 border border-[#FF007F]/30 flex items-center justify-center mb-3 text-[#FF007F]">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="font-bahnschrift-condensed font-bold text-lg text-white tracking-wider uppercase mb-1">
              SEGUNDO IFRAME RESERVADO
            </h4>
            <p className="font-rajdhani text-xs sm:text-sm text-[#A6A6C0] mb-4">
              Este espacio está listo para cargar el segundo iframe. Puedes ingresar la URL a continuación o enviarla en tu próxima instrucción:
            </p>
            <div className="flex w-full items-center gap-2">
              <input
                type="text"
                placeholder="https://www.instagram.com/p/... o URL de embed"
                value={inputUrl2}
                onChange={(e) => setInputUrl2(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-[#12121D] border border-[#2B2B42] focus:border-[#FF007F] rounded text-[#E0E0F0] font-mono-code outline-none"
              />
              <button
                type="button"
                onClick={handleSaveUrl2}
                className="px-3 py-1.5 text-xs font-mono-code font-bold bg-[#FF007F]/20 hover:bg-[#FF007F]/30 border border-[#FF007F] text-[#FF007F] rounded cursor-pointer transition-all"
              >
                Cargar
              </button>
            </div>
            {url2 && (
              <button
                type="button"
                onClick={() => setIsEditingUrl2(false)}
                className="mt-3 text-[11px] font-mono-code text-[#7A7A96] hover:text-white underline cursor-pointer"
              >
                Cancelar y ver iframe actual
              </button>
            )}
          </div>
        )}
      </div>

      {/* Barra inferior de navegación estilo retro-terminal */}
      <div className="relative z-20 flex items-center justify-between px-3 py-1.5 bg-[#10101A]/95 border-t border-[#252538] text-[11px] font-mono-code text-[#8E8EA8]">
        <button
          type="button"
          onClick={() => setActiveTab(0)}
          className={`flex items-center gap-1 transition-colors cursor-pointer ${
            activeTab === 0 ? 'text-[#00f0ff] font-bold' : 'text-[#8E8EA8] hover:text-white'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Iframe 1</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              activeTab === 0 ? 'bg-[#00f0ff] scale-125' : 'bg-white/30 hover:bg-white'
            }`}
            aria-label="Ver Iframe 1"
          />
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              activeTab === 1 ? 'bg-[#FF007F] scale-125' : 'bg-white/30 hover:bg-white'
            }`}
            aria-label="Ver Iframe 2"
          />
        </div>

        <button
          type="button"
          onClick={() => setActiveTab(1)}
          className={`flex items-center gap-1 transition-colors cursor-pointer ${
            activeTab === 1 ? 'text-[#FF007F] font-bold' : 'text-[#8E8EA8] hover:text-white'
          }`}
        >
          <span>Iframe 2</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
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
          <div className="mb-8 sm:mb-10">
            <button
              type="button"
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FF007F]/10 hover:bg-[#FF007F]/20 border border-[#FF007F]/30 hover:border-[#FF007F] text-[#FF007F] text-[19px] sm:text-[20px] font-bahnschrift-condensed font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group"
            >
              <Cpu className="w-5 h-5 text-[#FF007F]" />
              <span>LABS</span>
            </button>
          </div>
        </ScrollReveal>

        {/* CATÁLOGO DE LABS FORMATIVOS CON SLIDES GLITCH INDIVIDUALES (SIN HALOS) */}
        <ScrollReveal direction="up" distance="md" delay={100} className="w-full">
          <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#14141E] border border-[#252538] font-dosis relative overflow-hidden">
            <div className="relative z-10">
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

                    {/* SLIDE GLITCH O IFRAMES INDIVIDUALES DEBAJO DE CADA TALLER */}
                    {item.id === 'dibujo-sonico-border-2020' ? (
                      <WorkshopDualIframeViewer
                        workshopId={item.id}
                        workshopTitle={item.title}
                        initialUrl1="https://www.instagram.com/p/CB3_7mDnaRu/?utm_source=ig_embed&ig_rid=AxJ7f4gIsfVMyLpghKPJ-sL"
                        initialUrl2="https://www.instagram.com/p/CCMdzyvnZBZ/?utm_source=ig_embed&ig_rid=AdAmAHwignwq63ar-LeRABN"
                      />
                    ) : (
                      <WorkshopGlitchSlide
                        workshopId={item.id}
                        workshopTitle={item.title}
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
