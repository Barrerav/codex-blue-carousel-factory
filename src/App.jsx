import React from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { PreviewWorkspace } from './components/Preview/PreviewWorkspace';
import { SlideEditorModal } from './components/ControlPanel/SlideEditorModal';
import { useCarousel } from './hooks/useCarousel';

export default function App() {
  const {
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
  } = useCarousel();

  return (
    <div className="flex flex-col h-screen w-screen bg-[#070d1a] text-slate-100 overflow-hidden select-none font-sans">
      {/* Top Application Header */}
      <Header
        slidesCount={slides.length}
        onExport={handleExportAll}
        isExporting={isExporting}
        exportProgress={exportProgress}
      />

      {/* 2-Panel Workstation Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Control Panel (Script, Background Images, Colors, Templates, Branding) */}
        <ControlPanel
          script={script}
          onScriptChange={setScript}
          onResetScript={resetScript}
          slides={slides}
          onUpdateSlideImage={updateSlideImage}
          onRemoveSlideImage={removeSlideImage}
          onUpdateSlideOverlay={updateSlideOverlay}
          activeSlideIndex={activeSlideIndex}
          onSelectSlide={setActiveSlideIndex}
          config={config}
          onConfigChange={setConfig}
        />

        {/* Right Side: Live 4:5 Carousel Preview & Feed Simulation */}
        <PreviewWorkspace
          slides={slides}
          config={config}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onEditSlide={setEditingSlide}
          slideRefs={slideRefs}
          exportContainerRef={exportContainerRef}
          activeSlideIndex={activeSlideIndex}
          onSelectSlide={setActiveSlideIndex}
        />
      </div>

      {/* Per-Slide Granular Live Editor Modal */}
      <SlideEditorModal
        isOpen={Boolean(editingSlide)}
        slide={editingSlide}
        onClose={() => setEditingSlide(null)}
        onSave={updateSlide}
        onDelete={deleteSlide}
      />
    </div>
  );
}
