import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Minimal Template - Technical, Clean Swiss Design
 * Modern typography, subtle borders, high negative space.
 */
export function MinimalTemplate({ slide, colors, isExport = false, hasCustomBg = false }) {
  const { type, title, body, index, totalSlides, tag } = slide;
  const isHook = type === 'hook';
  const isCta = type === 'cta';

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-8 sm:p-10 pb-14 relative overflow-hidden"
      style={{
        backgroundColor: hasCustomBg ? 'transparent' : colors.primary,
        color: colors.text,
      }}
    >
      {/* Background Tech Grid / Radial Glow (Only when no custom photo background) */}
      {!hasCustomBg && (
        <>
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${colors.accent} 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: colors.accent }}
          />
        </>
      )}

      {/* Header Area: Tag / Step Pill */}
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all backdrop-blur-sm shadow-sm"
          style={{
            borderColor: `${colors.accent}60`,
            backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.7)' : `${colors.accent}15`,
            color: colors.accent
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.accent }} />
          {tag || (isHook ? 'PORTADA' : isCta ? 'ACCIÓN' : `PASO 0${index}`)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col justify-center overflow-hidden">
        {isHook ? (
          <div className="space-y-5">
            <div 
              className="w-12 h-1 rounded-full shadow-sm"
              style={{ backgroundColor: colors.accent }}
            />
            <h1 
              className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.25] font-display drop-shadow-md"
              style={{ color: colors.text }}
            >
              {title}
            </h1>
            {body && (
              <p 
                className="text-sm sm:text-base font-normal leading-relaxed opacity-90 drop-shadow"
                style={{ color: colors.text }}
              >
                {body}
              </p>
            )}
            <div className="pt-1 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase drop-shadow" style={{ color: colors.accent }}>
              <span>Desliza para ver más</span>
              <ArrowRight className="w-3.5 h-3.5 animate-bounce-x" />
            </div>
          </div>
        ) : isCta ? (
          <div className="space-y-4 text-center py-2">
            <div 
              className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border shadow-lg shrink-0 backdrop-blur-md"
              style={{ 
                backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.75)' : `${colors.accent}20`,
                borderColor: `${colors.accent}60`,
                boxShadow: `0 0 20px ${colors.accent}30`
              }}
            >
              <Sparkles className="w-6 h-6" style={{ color: colors.accent }} />
            </div>
            
            <h2 
              className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug font-display drop-shadow-md"
              style={{ color: colors.text }}
            >
              {title}
            </h2>

            {body && (
              <div 
                className="p-4 rounded-xl border relative text-left backdrop-blur-md shadow-lg"
                style={{
                  backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.8)' : `${colors.primary === '#070d1a' ? '#0d1629' : colors.primary}95`,
                  borderColor: `${colors.accent}40`
                }}
              >
                <p 
                  className="text-xs sm:text-sm leading-relaxed opacity-95 max-w-md mx-auto whitespace-pre-line font-sans"
                  style={{ color: colors.text }}
                >
                  {body}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold tracking-wider drop-shadow" style={{ color: colors.accent }}>
                // 0{index}
              </span>
              <h2 
                className="text-xl sm:text-2xl font-bold tracking-tight leading-snug font-display drop-shadow-md"
                style={{ color: colors.text }}
              >
                {title}
              </h2>
            </div>

            <div 
              className="p-4 rounded-xl border relative backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.75)' : `${colors.primary === '#070d1a' ? '#0d1629' : colors.primary}90`,
                borderColor: `${colors.accent}35`
              }}
            >
              <p 
                className="text-xs sm:text-sm leading-relaxed opacity-95 whitespace-pre-line font-sans"
                style={{ color: colors.text }}
              >
                {body || 'Añade el contenido clave aquí para complementar este paso del carrusel.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer spacing buffer */}
      <div className="h-2 shrink-0" />
    </div>
  );
}
