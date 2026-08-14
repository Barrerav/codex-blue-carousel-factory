import React, { useRef } from 'react';
import { SlideCard } from './SlideCard';
import { ChevronLeft, ChevronRight, Eye, Grid } from 'lucide-react';

/**
 * CarouselTrack - Smooth horizontal scrollable track for carousel preview
 */
export function CarouselTrack({
  slides,
  config,
  onEditSlide,
  slideRefs,
  activeSlideIndex,
  onSelectSlide,
}) {
  const scrollContainerRef = useRef(null);

  const scrollBy = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center mb-4 text-blue-400 shadow-inner">
          <Eye className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-lg font-semibold text-slate-200 mb-1">No hay slides para mostrar</h3>
        <p className="text-sm max-w-sm text-slate-400">
          Pega un guion en el panel izquierdo para generar automáticamente la preview del carrusel.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col h-full">
      {/* Scroll Navigation Header Controls */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {slides.length} {slides.length === 1 ? 'SLIDE' : 'SLIDES'}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Formato 4:5 (1080x1350px)
          </span>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy('left')}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Slide anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy('right')}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Slide siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden p-6 sm:p-8 flex items-center gap-6 scroll-smooth snap-x snap-mandatory"
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="w-[300px] sm:w-[340px] md:w-[380px] shrink-0 snap-center transition-transform hover:-translate-y-1 duration-200"
            onClick={() => onSelectSlide && onSelectSlide(idx)}
          >
            <SlideCard
              ref={(el) => {
                if (slideRefs && slideRefs.current) {
                  slideRefs.current[idx] = el;
                }
              }}
              slide={slide}
              config={config}
              onEdit={onEditSlide}
              isActive={activeSlideIndex === idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
