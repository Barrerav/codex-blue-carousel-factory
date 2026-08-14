import React from 'react';
import { Bookmark, Quote, CornerDownRight } from 'lucide-react';
import { getTextWidthClass, getTextPositionClasses } from '../../utils/layoutUtils';

/**
 * Editorial Template - Sophisticated, Magazine & Thought Leadership
 * Elegant serif typography (Playfair Display) for headlines, refined hairline dividers.
 * Supports textPosition, textWidth, highlight callouts, and custom image backgrounds.
 */
export function EditorialTemplate({
  slide,
  colors,
  isExport = false,
  hasCustomBg = false,
  textPosition = 'center',
  textWidth = 'wide',
  highlight = '',
  hasLogoTop = false,
}) {
  const { type, title, body, index, totalSlides, tag } = slide;
  const isHook = type === 'hook';
  const isCta = type === 'cta';

  const positionClasses = getTextPositionClasses(textPosition, hasLogoTop);
  const widthClasses = getTextWidthClass(textWidth);

  return (
    <div 
      className="w-full h-full flex flex-col justify-between p-8 sm:p-10 pb-16 relative overflow-hidden"
      style={{
        backgroundColor: hasCustomBg ? 'transparent' : colors.primary,
        color: colors.text,
      }}
    >
      {/* Subtle paper grain / fine gradient (Only when no custom image) */}
      {!hasCustomBg && (
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, ${colors.accent} 25%, transparent 25%), linear-gradient(-45deg, ${colors.accent} 25%, transparent 25%)`,
            backgroundSize: '30px 30px'
          }}
        />
      )}

      {/* Header Area: Editorial Stamp (Rendered ONLY if tag is not empty) */}
      {Boolean(tag && tag.trim()) && (
        <div className={`relative z-10 flex items-center justify-between border-b pb-3 shrink-0 ${hasLogoTop ? 'pt-7' : ''}`} style={{ borderColor: `${colors.text}30` }}>
          <div className="flex items-center gap-2">
            <Bookmark className="w-3.5 h-3.5" style={{ color: colors.accent }} />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] opacity-90 drop-shadow">
              {tag.trim()}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">
            VOL. I
          </span>
        </div>
      )}

      {/* Main Content Area with Dynamic Text Position & Text Width */}
      <div className={`relative z-10 flex flex-col overflow-hidden ${positionClasses}`}>
        <div className={widthClasses}>
          {isHook ? (
            <div className="space-y-4">
              <Quote className="w-7 h-7 opacity-50 -mb-2" style={{ color: colors.accent }} />
              
              <h1 
                className="text-2xl sm:text-3xl font-normal leading-[1.3] font-editorial italic drop-shadow-md"
                style={{ color: colors.text }}
              >
                {title}
              </h1>
              
              <div className="w-16 h-[1px]" style={{ backgroundColor: colors.accent }} />

              {/* Optional Highlight Callout */}
              {highlight && (
                <div 
                  className="pl-3 border-l-2 py-1 italic text-xs font-editorial opacity-95"
                  style={{ borderColor: colors.accent, color: colors.accent }}
                >
                  « {highlight} »
                </div>
              )}

              {body && (
                <p className="text-sm font-sans font-light leading-relaxed opacity-90 drop-shadow whitespace-pre-line">
                  {body}
                </p>
              )}

              <div className="pt-1 flex items-center gap-2 text-xs font-mono tracking-wider opacity-80 drop-shadow">
                <CornerDownRight className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                <span>Desliza para continuar leyendo</span>
              </div>
            </div>
          ) : isCta ? (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <h2 
                  className="text-xl sm:text-2xl font-normal leading-snug font-editorial italic drop-shadow-md"
                  style={{ color: colors.text }}
                >
                  {title}
                </h2>
              </div>

              {/* Optional Highlight Callout */}
              {highlight && (
                <div 
                  className="p-3 rounded-lg border-l-2 text-xs font-editorial italic"
                  style={{
                    borderColor: colors.accent,
                    backgroundColor: `${colors.accent}15`,
                    color: colors.text
                  }}
                >
                  {highlight}
                </div>
              )}

              {body && (
                <div 
                  className="p-4 rounded-lg border-l-2 relative backdrop-blur-md shadow-lg"
                  style={{
                    borderColor: colors.accent,
                    backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.75)' : `${colors.primary === '#070d1a' ? '#0d1527' : colors.primary}80`
                  }}
                >
                  <p className="text-xs sm:text-sm font-light leading-relaxed opacity-95 font-sans whitespace-pre-line">
                    {body}
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t pt-3" style={{ borderColor: `${colors.text}30` }}>
                <span className="text-[10px] font-mono tracking-wider opacity-80">
                  CODEX BLUE STUDIO
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.accent }}>
                  @codexblue
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="space-y-1">
                <h2 
                  className="text-xl sm:text-2xl font-normal leading-snug font-editorial italic drop-shadow-md"
                  style={{ color: colors.text }}
                >
                  {title}
                </h2>
              </div>

              <div className="w-12 h-[1px]" style={{ backgroundColor: `${colors.accent}80` }} />

              {/* Optional Highlight Callout */}
              {highlight && (
                <div 
                  className="pl-3 border-l-2 py-0.5 italic text-xs font-editorial"
                  style={{ borderColor: colors.accent, color: colors.accent }}
                >
                  {highlight}
                </div>
              )}

              <div className="space-y-2">
                <p 
                  className="text-xs sm:text-sm font-light leading-relaxed opacity-95 font-sans whitespace-pre-line drop-shadow"
                  style={{ color: colors.text }}
                >
                  {body}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer spacing buffer */}
      <div className="h-2 shrink-0" />
    </div>
  );
}
