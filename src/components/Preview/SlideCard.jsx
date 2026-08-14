import React, { forwardRef } from 'react';
import { MinimalTemplate } from '../Templates/MinimalTemplate';
import { BoldTemplate } from '../Templates/BoldTemplate';
import { EditorialTemplate } from '../Templates/EditorialTemplate';
import { Edit3, Sparkles } from 'lucide-react';

/**
 * SlideCard component with strict 4:5 aspect ratio, template rendering,
 * watermark, slide counter, and hover controls.
 */
export const SlideCard = forwardRef(function SlideCard(
  {
    slide,
    config,
    onEdit,
    isActive = false,
    isExport = false,
    className = ''
  },
  ref
) {
  const { template, brandColors, watermarkText, showWatermark, showSlideNumbers } = config;

  // Select appropriate template component
  const renderTemplate = () => {
    switch (template) {
      case 'bold':
        return <BoldTemplate slide={slide} colors={brandColors} isExport={isExport} />;
      case 'editorial':
        return <EditorialTemplate slide={slide} colors={brandColors} isExport={isExport} />;
      case 'minimal':
      default:
        return <MinimalTemplate slide={slide} colors={brandColors} isExport={isExport} />;
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* 4:5 Aspect Ratio Container */}
      <div
        ref={ref}
        data-slide-index={slide.index}
        className={`relative w-full aspect-[4/5] overflow-hidden rounded-2xl border transition-all duration-300 select-none shadow-2xl flex flex-col justify-between ${
          isActive 
            ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#070d1a] border-blue-500/50 shadow-glow-md' 
            : 'border-slate-800/80 hover:border-slate-700/80'
        }`}
        style={{
          backgroundColor: brandColors.primary,
          color: brandColors.text,
        }}
      >
        {/* Template Layout Layer */}
        <div className="w-full h-full">
          {renderTemplate()}
        </div>

        {/* Global Slide Footer: Watermark & Counter (Overlayed strictly in corners) */}
        <div className="absolute bottom-5 left-8 right-8 flex items-center justify-between pointer-events-none z-20">
          {/* Watermark Logo */}
          {showWatermark && (
            <div className="flex items-center gap-1.5 opacity-60">
              <span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: brandColors.accent }} />
              <span 
                className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] uppercase"
                style={{ color: brandColors.text }}
              >
                {watermarkText || 'CODEX BLUE'}
              </span>
            </div>
          )}

          {/* Slide Counter */}
          {showSlideNumbers && (
            <div 
              className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider opacity-60 ml-auto"
              style={{ color: brandColors.text }}
            >
              {slide.index} / {slide.totalSlides}
            </div>
          )}
        </div>
      </div>

      {/* Hover Action Overlay (Disabled during export) */}
      {!isExport && onEdit && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/50 shadow-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(slide);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            title="Editar texto de este slide"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>
        </div>
      )}
    </div>
  );
});
