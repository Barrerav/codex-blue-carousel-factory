import React from 'react';
import { CarouselTrack } from './CarouselTrack';
import { InstagramFeedGrid } from './InstagramFeedGrid';
import { SlideCard } from './SlideCard';
import { LayoutGrid, GalleryHorizontal, Sparkles } from 'lucide-react';

export function PreviewWorkspace({
  slides,
  config,
  viewMode,
  onViewModeChange,
  onEditSlide,
  slideRefs,
  exportContainerRef,
  activeSlideIndex,
  onSelectSlide,
}) {
  return (
    <main className="flex-1 flex flex-col h-full bg-[#040812] relative overflow-hidden">
      {/* Top Workspace Toolbar */}
      <div className="h-14 px-6 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Vista Previa del Carrusel</span>
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => onViewModeChange('carousel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'carousel'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GalleryHorizontal className="w-3.5 h-3.5" />
            <span>Carrusel Horizontal</span>
          </button>

          <button
            onClick={() => onViewModeChange('feed-grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'feed-grid'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Instagram Feed Mockup</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center">
        {viewMode === 'carousel' ? (
          <CarouselTrack
            slides={slides}
            config={config}
            onEditSlide={onEditSlide}
            slideRefs={slideRefs}
            activeSlideIndex={activeSlideIndex}
            onSelectSlide={onSelectSlide}
          />
        ) : (
          <InstagramFeedGrid
            slides={slides}
            config={config}
            onEditSlide={onEditSlide}
          />
        )}
      </div>

      {/* Offscreen 540x675 Export Staging Container */}
      {/* Renders each slide in standard 4:5 proportions with 2x multiplier for guaranteed 1080x1350 output */}
      <div 
        ref={exportContainerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: '-9999px',
          width: '540px',
          pointerEvents: 'none',
          zIndex: -9999,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={`export-${slide.id || idx}`}
            id={`export-slide-${idx}`}
            style={{ width: '540px', height: '675px', position: 'relative' }}
          >
            <SlideCard
              slide={slide}
              config={config}
              isExport={true}
              className="w-[540px] h-[675px]"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
