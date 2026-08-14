import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

/**
 * Minimal Template - Technical, Clean Swiss Design
 * Modern typography, subtle borders, high negative space.
 */
export function MinimalTemplate({ slide, colors, isExport = false }) {
  const { type, title, body, index, totalSlides, tag } = slide;
  const isHook = type === 'hook';
  const isCta = type === 'cta';

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-8 sm:p-10 relative overflow-hidden"
      style={{
        backgroundColor: colors.primary,
        color: colors.text,
      }}
    >
      {/* Background Tech Grid / Radial Glow */}
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

      {/* Header Area: Tag / Step Pill */}
      <div className="relative z-10 flex items-center justify-between">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all"
          style={{
            borderColor: `${colors.accent}40`,
            backgroundColor: `${colors.accent}15`,
            color: colors.accent
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.accent }} />
          {tag || (isHook ? 'PORTADA' : isCta ? 'ACCIÓN' : `PASO 0${index}`)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col justify-center">
        {isHook ? (
          <div className="space-y-6">
            <div 
              className="w-12 h-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            <h1 
              className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[1.25] font-display"
              style={{ color: colors.text }}
            >
              {title}
            </h1>
            {body && (
              <p 
                className="text-sm sm:text-base font-normal leading-relaxed opacity-85"
                style={{ color: colors.text }}
              >
                {body}
              </p>
            )}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase" style={{ color: colors.accent }}>
              <span>Desliza para ver más</span>
              <ArrowRight className="w-3.5 h-3.5 animate-bounce-x" />
            </div>
          </div>
        ) : isCta ? (
          <div className="space-y-6 text-center py-4">
            <div 
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border shadow-lg"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                borderColor: colors.accent,
                boxShadow: `0 0 25px ${colors.accent}30`
              }}
            >
              <Sparkles className="w-7 h-7" style={{ color: colors.accent }} />
            </div>
            
            <h2 
              className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight font-display"
              style={{ color: colors.text }}
            >
              {title}
            </h2>

            {body && (
              <p 
                className="text-sm sm:text-base leading-relaxed opacity-90 max-w-md mx-auto"
                style={{ color: colors.text }}
              >
                {body}
              </p>
            )}

            <div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-transform"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary === '#ffffff' ? '#000000' : '#ffffff'
              }}
            >
              <span>Guardar & Compartir</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider" style={{ color: colors.accent }}>
                // 0{index}
              </span>
              <h2 
                className="text-xl sm:text-2xl font-bold tracking-tight leading-snug font-display"
                style={{ color: colors.text }}
              >
                {title}
              </h2>
            </div>

            <div 
              className="p-4 rounded-xl border relative"
              style={{
                backgroundColor: `${colors.primary === '#070d1a' ? '#0d1629' : colors.primary}90`,
                borderColor: `${colors.accent}30`
              }}
            >
              <p 
                className="text-sm sm:text-base leading-relaxed opacity-90 whitespace-pre-line font-sans"
                style={{ color: colors.text }}
              >
                {body || 'Añade el contenido clave aquí para complementar este paso del carrusel.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer is handled by parent SlideCard for uniform watermark & numbering */}
      <div className="h-6" />
    </div>
  );
}
