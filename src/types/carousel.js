/**
 * @typedef {'hook' | 'content' | 'cta'} SlideType
 * @typedef {'top' | 'upper-center' | 'center' | 'lower-center' | 'bottom'} TextPosition
 * @typedef {'global' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} SlideLogoPosition
 * @typedef {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} GlobalLogoPosition
 * 
 * @typedef {Object} Slide
 * @property {string} id
 * @property {number} index
 * @property {number} totalSlides
 * @property {SlideType} type
 * @property {string} title
 * @property {string} body
 * @property {string} [highlight] - Punchline / Highlight callout
 * @property {string} [visualConcept] - Short description of visual background concept
 * @property {string} [visualPrompt] - Full prompt for Gemini image generation
 * @property {TextPosition} [textPosition] - Vertical alignment for main content
 * @property {SlideLogoPosition} [logoPosition] - Position of logo on this slide
 * @property {string} [rawHeader]
 * @property {string} [tag]
 * @property {string | null} [backgroundImage] - Base64 Data URL or image URL for custom background
 * @property {number} [overlayOpacity] - Dark contrast overlay opacity (0 to 1, default: 0.65)
 * 
 * @typedef {Object} BrandColors
 * @property {string} primary - Background base color (Default: #070d1a)
 * @property {string} accent - Highlight / CTA color (Default: #3b82f6)
 * @property {string} text - Primary text color (Default: #ffffff)
 * 
 * @typedef {'minimal' | 'bold' | 'editorial'} TemplateId
 * 
 * @typedef {Object} CarouselConfig
 * @property {TemplateId} template
 * @property {BrandColors} brandColors
 * @property {string} watermarkText
 * @property {boolean} showWatermark
 * @property {boolean} showSlideNumbers
 * @property {'4:5'} aspectRatio
 * @property {boolean} showLogo
 * @property {string | null} logoImage
 * @property {GlobalLogoPosition} logoPosition
 * @property {number} logoSize
 * @property {number} logoMargin
 */

export const DEFAULT_BRAND_COLORS = {
  primary: '#070d1a',
  accent: '#3b82f6',
  text: '#ffffff',
};

export const COLOR_PRESETS = [
  { name: 'Codex Dark Blue', primary: '#070d1a', accent: '#3b82f6', text: '#ffffff' },
  { name: 'Cyber Neon', primary: '#090a0f', accent: '#06b6d4', text: '#f8fafc' },
  { name: 'Midnight Violet', primary: '#0c0714', accent: '#a855f7', text: '#faf5ff' },
  { name: 'Emerald Tech', primary: '#06110d', accent: '#10b981', text: '#ffffff' },
  { name: 'Sunset Amber', primary: '#140c07', accent: '#f59e0b', text: '#fffbeb' },
  { name: 'Obsidian & Crimson', primary: '#0a0a0a', accent: '#ef4444', text: '#ffffff' },
];

export const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal',
    badge: 'Clean & Tech',
    description: 'Estilo tech suizo con tipografía sans-serif limpia, bordes finos y espaciado amplio.',
    fontHeading: 'font-display font-bold',
    fontBody: 'font-sans font-normal',
  },
  {
    id: 'bold',
    name: 'Bold / Alto Contraste',
    badge: 'High Impact',
    description: 'Tipografía ultra-gruesa, bloques de acento sólidos y máxima captación de atención.',
    fontHeading: 'font-sans font-black tracking-tight',
    fontBody: 'font-sans font-medium',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    badge: 'Sophisticated',
    description: 'Combinación elegante de Serif para títulos y Sans para cuerpo, con detalles refinados.',
    fontHeading: 'font-editorial font-bold italic',
    fontBody: 'font-sans font-light',
  },
];
