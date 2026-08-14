import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import confetti from 'canvas-confetti';

/**
 * Renders an array of slide DOM elements to 1080x1350 PNGs and packages them into a ZIP file.
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

  const zip = new JSZip();
  const total = validElements.length;

  for (let i = 0; i < total; i++) {
    const el = validElements[i];
    if (onProgress) {
      onProgress(i + 1, total);
    }

    // High resolution render (1080 x 1350)
    // html-to-image captures element CSS and renders to canvas
    const dataUrl = await toPng(el, {
      pixelRatio: 3, // 3x scaling ensures 1080x1350 sharpness
      quality: 1,
      cacheBust: true,
      skipFonts: false,
    });

    // Extract base64 data from dataURL
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const slideNumber = String(i + 1).padStart(2, '0');
    zip.file(`slide-${slideNumber}.png`, base64Data, { base64: true });
  }

  // Generate and save ZIP file
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
    // Ignore confetti errors if canvas unavailable
  }

  return true;
}

/**
 * Exports a single slide node to PNG.
 */
export async function exportSingleSlide(slideElement, slideIndex) {
  if (!slideElement) return;

  const dataUrl = await toPng(slideElement, {
    pixelRatio: 3,
    quality: 1,
    cacheBust: true,
  });

  const slideNumber = String(slideIndex).padStart(2, '0');
  saveAs(dataUrl, `codex-blue-slide-${slideNumber}.png`);
}
