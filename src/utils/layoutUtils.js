/**
 * Shared layout utility helpers for Slide composition
 */

/**
 * Maps textWidth ('narrow' | 'medium' | 'wide') to clean Tailwind max-width classes
 * @param {'narrow' | 'medium' | 'wide' | string} [textWidth]
 * @returns {string}
 */
export function getTextWidthClass(textWidth = 'wide') {
  switch (textWidth) {
    case 'narrow':
      return 'max-w-[56%] w-full';
    case 'medium':
      return 'max-w-[72%] w-full';
    case 'wide':
    default:
      return 'max-w-full w-full';
  }
}

/**
 * Maps textPosition ('top' | 'upper-center' | 'center' | 'lower-center' | 'bottom') to layout classes
 * with safe-zone padding when logo or header tags are present.
 * @param {'top' | 'upper-center' | 'center' | 'lower-center' | 'bottom' | string} [textPosition]
 * @param {boolean} [hasLogoTop]
 * @returns {string}
 */
export function getTextPositionClasses(textPosition = 'center', hasLogoTop = false) {
  switch (textPosition) {
    case 'top':
      return hasLogoTop ? 'mt-9 mb-auto justify-start' : 'mt-4 mb-auto justify-start';
    case 'upper-center':
      return hasLogoTop ? 'mt-11 mb-auto justify-start' : 'mt-6 mb-auto justify-start';
    case 'lower-center':
      return 'mt-auto mb-6 justify-end';
    case 'bottom':
      return 'mt-auto mb-2 justify-end';
    case 'center':
    default:
      return 'my-auto justify-center';
  }
}

/**
 * Helper descriptions for visualFocus
 */
export const VISUAL_FOCUS_HINTS = {
  left: 'El sujeto principal de la imagen debería quedar a la izquierda.',
  center: 'El sujeto principal de la imagen debería quedar centrado.',
  right: 'El sujeto principal de la imagen debería quedar a la derecha.',
  full: 'El sujeto de la imagen puede ocupar todo el canvas.',
};
