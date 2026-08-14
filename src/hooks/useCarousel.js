import { useState, useEffect, useCallback, useRef } from 'react';
import { parseScriptToSlides } from '../utils/parser';
import { DEFAULT_SCRIPT } from '../utils/defaultScript';
import { DEFAULT_BRAND_COLORS } from '../types/carousel';
import { exportSlidesToZip } from '../utils/exporter';

export function useCarousel() {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [slides, setSlides] = useState(() => parseScriptToSlides(DEFAULT_SCRIPT));
  const [config, setConfig] = useState({
    template: 'minimal',
    brandColors: DEFAULT_BRAND_COLORS,
    watermarkText: 'CODEX BLUE',
    showWatermark: true,
    showSlideNumbers: true,
    aspectRatio: '4:5',
    // Real Logo Asset Configuration
    showLogo: true,
    logoImage: null,
    logoPosition: 'top-left', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    logoSize: 36, // px height bound
    logoMargin: 28, // px margin from edges
  });

  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'feed-grid'
  const [editingSlide, setEditingSlide] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(null); // { current, total }

  const slideRefs = useRef([]);
  const exportContainerRef = useRef(null);

  // Automatically re-parse when raw script changes while preserving uploaded images & custom properties
  useEffect(() => {
    const parsed = parseScriptToSlides(script);
    setSlides((prevSlides) => {
      return parsed.map((newSlide, idx) => {
        const existing = prevSlides[idx];
        if (existing) {
          return {
            ...newSlide,
            backgroundImage: existing.backgroundImage || null,
            overlayOpacity: existing.overlayOpacity !== undefined ? existing.overlayOpacity : 0.65,
            highlight: newSlide.highlight || existing.highlight || '',
            visualConcept: newSlide.visualConcept || existing.visualConcept || '',
            visualPrompt: newSlide.visualPrompt || existing.visualPrompt || '',
            textPosition: newSlide.textPosition || existing.textPosition || 'center',
            logoPosition: newSlide.logoPosition || existing.logoPosition || 'global',
          };
        }
        return newSlide;
      });
    });
  }, [script]);

  // Update a single slide without losing others
  const updateSlide = useCallback((updatedSlide) => {
    setSlides((prevSlides) =>
      prevSlides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s))
    );
  }, []);

  // Set or update background image for a specific slide
  const updateSlideImage = useCallback((slideId, dataUrl) => {
    setSlides((prevSlides) =>
      prevSlides.map((s) =>
        s.id === slideId ? { ...s, backgroundImage: dataUrl } : s
      )
    );
  }, []);

  // Remove background image from a specific slide
  const removeSlideImage = useCallback((slideId) => {
    setSlides((prevSlides) =>
      prevSlides.map((s) =>
        s.id === slideId ? { ...s, backgroundImage: null } : s
      )
    );
  }, []);

  // Adjust dark contrast overlay opacity for a specific slide
  const updateSlideOverlay = useCallback((slideId, overlayOpacity) => {
    setSlides((prevSlides) =>
      prevSlides.map((s) =>
        s.id === slideId ? { ...s, overlayOpacity } : s
      )
    );
  }, []);

  // Delete a slide
  const deleteSlide = useCallback((slideId) => {
    setSlides((prevSlides) => {
      const filtered = prevSlides.filter((s) => s.id !== slideId);
      return filtered.map((s, idx) => ({
        ...s,
        index: idx + 1,
        totalSlides: filtered.length,
      }));
    });
  }, []);

  // Reset script to default sample
  const resetScript = useCallback(() => {
    setScript(DEFAULT_SCRIPT);
  }, []);

  // High-Resolution Batch Export Handler
  const handleExportAll = useCallback(async () => {
    if (!exportContainerRef.current) return;

    try {
      setIsExporting(true);
      setExportProgress({ current: 0, total: slides.length });

      // Gather child elements from offscreen export container
      const exportElements = Array.from(exportContainerRef.current.children);

      await exportSlidesToZip(exportElements, {
        zipFileName: `codex-blue-carousel-${config.template}.zip`,
        onProgress: (current, total) => {
          setExportProgress({ current, total });
        },
      });
    } catch (err) {
      console.error('Error al exportar imágenes:', err);
      alert('Hubo un error al exportar las imágenes. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
      setExportProgress(null);
    }
  }, [slides.length, config.template]);

  return {
    script,
    setScript,
    slides,
    config,
    setConfig,
    viewMode,
    setViewMode,
    editingSlide,
    setEditingSlide,
    activeSlideIndex,
    setActiveSlideIndex,
    updateSlide,
    updateSlideImage,
    removeSlideImage,
    updateSlideOverlay,
    deleteSlide,
    resetScript,
    handleExportAll,
    isExporting,
    exportProgress,
    slideRefs,
    exportContainerRef,
  };
}
