import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';

/**
 * Renders an array of slide DOM elements to strict 1080x1350 PNGs and packages them into a ZIP file.
 * 
 * @param {HTMLElement[]} slideElements
 * @param {Object} options
 * @param {Function} [options.onProgress] - Callback (current, total)
 * @param {string} [options.zipFileName] - ZIP file name
 * @returns {Promise<boolean>}
 */
export async function exportSlidesToZip(slideElements, options = {}) {
  const { onProgress, zipFileName = 'codex-blue-carousel.zip' } = options;
  const validElements = slideElements.filter(Boolean);

  if (!validElements || validElements.length === 0) {
    throw new Error('No hay elementos de slide disponibles para exportar.');
  }

  // Ensure all web fonts (Plus Jakarta Sans, Inter, Playfair Display) are fully loaded
  if (document.fonts) {
    await document.fonts.ready;
  }

  const zip = new JSZip();
  const total = validElements.length;

  for (let i = 0; i < total; i++) {
    const el = validElements[i];
    if (onProgress) {
      onProgress(i + 1, total);
    }

    // Exact 1080x1350px Instagram standard resolution:
    // Base 540x675 layout scaled at 2x pixelRatio -> 1080x1350px
    const dataUrl = await toPng(el, {
      width: 540,
      height: 675,
      pixelRatio: 2,
      quality: 1,
      cacheBust: true,
      skipFonts: false,
      filter: (domNode) => {
        if (domNode?.classList?.contains('export-ignore')) return false;
        return true;
      }
    });

    // Extract base64 payload from dataURL
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const slideNumber = String(i + 1).padStart(2, '0');
    zip.file(`slide-${slideNumber}.png`, base64Data, { base64: true });
  }

  // Generate and trigger download of ZIP package
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, zipFileName);

  // Trigger celebration confetti
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff']
    });
  } catch (e) {
    // Ignore canvas confetti errors in unsupported environments
  }

  return true;
}

/**
 * Exports a single slide node directly to 1080x1350 PNG.
 */
export async function exportSingleSlide(slideElement, slideIndex) {
  if (!slideElement) return;

  if (document.fonts) {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(slideElement, {
    width: 540,
    height: 675,
    pixelRatio: 2,
    quality: 1,
    cacheBust: true,
    filter: (domNode) => {
      if (domNode?.classList?.contains('export-ignore')) return false;
      return true;
    }
  });

  const slideNumber = String(slideIndex).padStart(2, '0');
  saveAs(dataUrl, `codex-blue-slide-${slideNumber}.png`);
}
