import React from 'react';
import { Bookmark, Quote, CornerDownRight } from 'lucide-react';

/**
 * Editorial Template - Sophisticated, Magazine & Thought Leadership
 * Elegant serif typography (Playfair Display) for headlines, refined hairline dividers.
 */
export function EditorialTemplate({ slide, colors, isExport = false }) {
  const { type, title, body, index, totalSlides, tag } = slide;
  const isHook = type === 'hook';
  const isCta = type === 'cta';

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-8 sm:p-10 pb-14 relative overflow-hidden"
      style={{
        backgroundColor: colors.primary,
        color: colors.text,
      }}
    >
      {/* Subtle paper grain / fine gradient */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(45deg, ${colors.accent} 25%, transparent 25%), linear-gradient(-45deg, ${colors.accent} 25%, transparent 25%)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Header Area: Editorial Stamp */}
      <div className="relative z-10 flex items-center justify-between border-b pb-3 shrink-0" style={{ borderColor: `${colors.text}20` }}>
        <div className="flex items-center gap-2">
          <Bookmark className="w-3.5 h-3.5" style={{ color: colors.accent }} />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-80">
            {tag || (isHook ? 'ESSAY & FRAMEWORK' : isCta ? 'TAKEAWAY' : `CHAPTER 0${index}`)}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
          VOL. I
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col justify-center overflow-hidden">
        {isHook ? (
          <div className="space-y-5">
            <Quote className="w-7 h-7 opacity-40 -mb-2" style={{ color: colors.accent }} />
            
            <h1 
              className="text-2xl sm:text-3xl font-normal leading-[1.3] font-editorial italic"
              style={{ color: colors.text }}
            >
              {title}
            </h1>
            
            <div className="w-16 h-[1px]" style={{ backgroundColor: colors.accent }} />

            {body && (
              <p className="text-sm font-sans font-light leading-relaxed opacity-85">
                {body}
              </p>
            )}

            <div className="pt-1 flex items-center gap-2 text-xs font-mono tracking-wider opacity-70">
              <CornerDownRight className="w-3.5 h-3.5" style={{ color: colors.accent }} />
              <span>Desliza para continuar leyendo</span>
            </div>
          </div>
        ) : isCta ? (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: colors.accent }}>
                // CONCLUSIÓN & PRÓXIMO PASO
              </span>
              <h2 
                className="text-xl sm:text-2xl font-normal leading-snug font-editorial italic"
                style={{ color: colors.text }}
              >
                {title}
              </h2>
            </div>

            {body && (
              <div 
                className="p-4 rounded-lg border-l-2 relative"
                style={{
                  borderColor: colors.accent,
                  backgroundColor: `${colors.primary === '#070d1a' ? '#0d1527' : colors.primary}80`
                }}
              >
                <p className="text-xs sm:text-sm font-light leading-relaxed opacity-90 font-sans whitespace-pre-line">
                  {body}
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t pt-3" style={{ borderColor: `${colors.text}20` }}>
              <span className="text-[10px] font-mono tracking-wider opacity-70">
                CODEX BLUE STUDIO
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.accent }}>
                @codexblue
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono tracking-widest opacity-60">
                PARTE 0{index} DE 0{totalSlides}
              </span>
              <h2 
                className="text-xl sm:text-2xl font-normal leading-snug font-editorial italic"
                style={{ color: colors.text }}
              >
                {title}
              </h2>
            </div>

            <div className="w-12 h-[1px]" style={{ backgroundColor: `${colors.accent}80` }} />

            <div className="space-y-2">
              <p 
                className="text-xs sm:text-sm font-light leading-relaxed opacity-90 font-sans whitespace-pre-line"
                style={{ color: colors.text }}
              >
                {body}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="h-2 shrink-0" />
    </div>
  );
}
