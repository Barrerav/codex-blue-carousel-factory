import React from 'react';
import { Flame, ArrowUpRight, Zap } from 'lucide-react';

/**
 * Bold / Alto Contraste Template - High Impact & Authority
 * Heavy display font, solid accent badges, punchy visual blocks.
 */
export function BoldTemplate({ slide, colors, isExport = false, hasCustomBg = false }) {
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
      {/* High impact background ambient graphic (Only when no custom image) */}
      {!hasCustomBg && (
        <>
          <div 
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
            style={{ backgroundColor: colors.accent }}
          />
          <div 
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ backgroundColor: colors.accent }}
          />
        </>
      )}

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-between shrink-0">
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-lg"
          style={{
            backgroundColor: colors.accent,
            color: colors.primary === '#ffffff' ? '#000000' : '#ffffff'
          }}
        >
          {isHook ? <Flame className="w-3.5 h-3.5 fill-current" /> : <Zap className="w-3.5 h-3.5 fill-current" />}
          <span>{tag || (isHook ? 'ESTRATEGIA' : isCta ? 'ACCIÓN CLAVE' : `REGLA #0${index}`)}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col justify-center overflow-hidden">
        {isHook ? (
          <div className="space-y-5">
            <h1 
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-[1.1] font-sans drop-shadow-lg"
              style={{ color: colors.text }}
            >
              {title}
            </h1>
            
            {body && (
              <div 
                className="p-4 rounded-xl border-l-4 shadow-md backdrop-blur-md"
                style={{
                  borderLeftColor: colors.accent,
                  backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.75)' : `${colors.accent}15`,
                  color: colors.text
                }}
              >
                <p className="text-sm sm:text-base font-semibold opacity-95">
                  {body}
                </p>
              </div>
            )}

            <div className="pt-1 flex items-center gap-3">
              <span 
                className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow-md"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary === '#ffffff' ? '#000000' : '#ffffff'
                }}
              >
                <span>DESLIZA</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ) : isCta ? (
          <div className="space-y-4 text-left py-2">
            <div 
              className="w-12 h-2 rounded-full shadow-sm"
              style={{ backgroundColor: colors.accent }}
            />
            
            <h2 
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-snug font-sans drop-shadow-lg"
              style={{ color: colors.text }}
            >
              {title}
            </h2>

            {body && (
              <div 
                className="p-4 rounded-2xl border-l-4 backdrop-blur-md shadow-lg"
                style={{
                  borderLeftColor: colors.accent,
                  backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.8)' : `${colors.accent}15`
                }}
              >
                <p className="text-xs sm:text-sm font-bold leading-relaxed opacity-95 whitespace-pre-line">
                  {body}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span 
                className="text-3xl sm:text-4xl font-black leading-none shrink-0 drop-shadow-md"
                style={{ color: colors.accent }}
              >
                0{index}
              </span>
              <div className="space-y-1">
                <h2 
                  className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase font-sans drop-shadow-md"
                  style={{ color: colors.text }}
                >
                  {title}
                </h2>
              </div>
            </div>

            <div 
              className="p-4 rounded-2xl border backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: hasCustomBg ? 'rgba(7, 13, 26, 0.75)' : `${colors.primary === '#070d1a' ? '#0f1b33' : colors.primary}99`,
                borderColor: `${colors.accent}40`
              }}
            >
              <p 
                className="text-xs sm:text-sm font-medium leading-relaxed opacity-95 whitespace-pre-line"
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
