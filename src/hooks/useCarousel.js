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
  });

  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'feed-grid'
  const [editingSlide, setEditingSlide] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(null); // { current, total }

  const slideRefs = useRef([]);
  const exportContainerRef = useRef(null);

  // Automatically re-parse when raw script changes
  useEffect(() => {
    const parsed = parseScriptToSlides(script);
    setSlides(parsed);
  }, [script]);

  // Update a single slide without losing others
  const updateSlide = useCallback((updatedSlide) => {
    setSlides((prevSlides) =>
      prevSlides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s))
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
    deleteSlide,
    resetScript,
    handleExportAll,
    isExporting,
    exportProgress,
    slideRefs,
    exportContainerRef,
  };
}
