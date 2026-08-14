import React, { forwardRef } from 'react';
import { MinimalTemplate } from '../Templates/MinimalTemplate';
import { BoldTemplate } from '../Templates/BoldTemplate';
import { EditorialTemplate } from '../Templates/EditorialTemplate';
import { Edit3 } from 'lucide-react';

/**
 * SlideCard component with strict 4:5 aspect ratio, template rendering,
 * custom background image, contrast overlay, real logo branding, text positioning,
 * highlight callouts, watermark, slide counter, and hover controls.
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
  const {
    template,
    brandColors,
    watermarkText,
    showWatermark,
    showSlideNumbers,
    showLogo = true,
    logoImage = null,
    logoPosition: globalLogoPosition = 'top-left',
    logoSize = 36,
    logoMargin = 24,
  } = config;

  const hasCustomBg = Boolean(slide.backgroundImage);
  const overlayOpacity = slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65;

  // Resolve logo position precedence: Slide override > Global config
  const effectiveLogoPosition = (slide.logoPosition && slide.logoPosition !== 'global')
    ? slide.logoPosition
    : globalLogoPosition;

  // Select appropriate template component
  const renderTemplate = () => {
    const templateProps = {
      slide,
      colors: brandColors,
      isExport,
      hasCustomBg,
      textPosition: slide.textPosition || 'center',
      highlight: slide.highlight || '',
      logoPosition: effectiveLogoPosition,
      hasLogoTop: Boolean(showLogo && (logoImage || showWatermark) && effectiveLogoPosition.startsWith('top')),
    };

    switch (template) {
      case 'bold':
        return <BoldTemplate {...templateProps} />;
      case 'editorial':
        return <EditorialTemplate {...templateProps} />;
      case 'minimal':
      default:
        return <MinimalTemplate {...templateProps} />;
    }
  };

  // Helper to compute absolute CSS position coordinates for Logo
  const getLogoPositionStyles = (pos, margin) => {
    switch (pos) {
      case 'top-right':
        return { top: `${margin}px`, right: `${margin + 4}px` };
      case 'bottom-left':
        return { bottom: `${margin}px`, left: `${margin + 4}px` };
      case 'bottom-right':
        return { bottom: `${margin}px`, right: `${margin + 4}px` };
      case 'top-left':
      default:
        return { top: `${margin}px`, left: `${margin + 4}px` };
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* 4:5 Aspect Ratio Container (1080x1350 format) */}
      <div
        ref={ref}
        data-slide-index={slide.index}
        className={`relative w-full aspect-[4/5] overflow-hidden transition-all duration-300 select-none flex flex-col justify-between ${
          isExport 
            ? 'rounded-none border-0 shadow-none' 
            : 'rounded-2xl border shadow-2xl'
        } ${
          !isExport && isActive 
            ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#070d1a] border-blue-500/50 shadow-glow-md' 
            : !isExport ? 'border-slate-800/80 hover:border-slate-700/80' : ''
        }`}
        style={{
          backgroundColor: hasCustomBg ? '#000000' : brandColors.primary,
          color: brandColors.text,
        }}
      >
        {/* Layer 1: Custom Background Image Layer */}
        {hasCustomBg && (
          <img
            src={slide.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        )}

        {/* Layer 2: Contrast Scrim / Dark Gradient Overlay */}
        {hasCustomBg && (
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: `linear-gradient(180deg, rgba(7,13,26,${overlayOpacity * 0.65}) 0%, rgba(7,13,26,${overlayOpacity * 0.8}) 45%, rgba(7,13,26,${Math.min(0.98, overlayOpacity * 1.15)}) 100%)`,
            }}
          />
        )}

        {/* Layer 3 & 4: Template Visual Layout & Text Content */}
        <div className="w-full h-full flex flex-col relative z-10">
          {renderTemplate()}
        </div>

        {/* Layer 5: Real Logo Asset / Watermark Branding */}
        {showLogo && (
          <div
            className="absolute pointer-events-none z-20 flex items-center"
            style={getLogoPositionStyles(effectiveLogoPosition, isExport ? logoMargin * 1.2 : logoMargin)}
          >
            {logoImage ? (
              <img
                src={logoImage}
                alt="Brand Logo"
                className="object-contain drop-shadow-md"
                style={{
                  height: `${isExport ? logoSize * 1.25 : logoSize}px`,
                  maxHeight: `${isExport ? logoSize * 1.25 : logoSize}px`,
                  maxWidth: '140px',
                }}
              />
            ) : showWatermark ? (
              <div className="flex items-center gap-1.5 opacity-90 drop-shadow-md bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: brandColors.accent }} />
                <span 
                  className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase"
                  style={{ color: brandColors.text }}
                >
                  {watermarkText || 'CODEX BLUE'}
                </span>
              </div>
            ) : null}
          </div>
        )}

        {/* Layer 6: Slide Counter / Pagination Footer */}
        {showSlideNumbers && (
          <div 
            className={`absolute pointer-events-none z-20 text-xs font-mono font-semibold tracking-wider opacity-85 drop-shadow-md bg-black/25 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 ${
              effectiveLogoPosition === 'bottom-right' ? 'bottom-6 left-8' : 'bottom-6 right-8'
            }`}
            style={{ color: brandColors.text }}
          >
            {slide.index} / {slide.totalSlides}
          </div>
        )}
      </div>

      {/* Hover Action Overlay (Disabled during export) */}
      {!isExport && onEdit && (
        <div className="export-ignore absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-slate-700/50 shadow-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(slide);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
            title="Editar texto, prompt y fondo de este slide"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>
        </div>
      )}
    </div>
  );
});
