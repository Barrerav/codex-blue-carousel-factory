import React from 'react';
import { Flame, ArrowUpRight, Check, Zap } from 'lucide-react';

/**
 * Bold / Alto Contraste Template - High Impact & Authority
 * Heavy display font, solid accent badges, punchy visual blocks.
 */
export function BoldTemplate({ slide, colors, isExport = false }) {
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
      {/* High impact background ambient graphic */}
      <div 
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{ backgroundColor: colors.accent }}
      />
      <div 
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: colors.accent }}
      />

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md"
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
      <div className="relative z-10 my-auto flex flex-col justify-center">
        {isHook ? (
          <div className="space-y-6">
            <h1 
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-[1.1] font-sans"
              style={{ color: colors.text }}
            >
              {title}
            </h1>
            
            {body && (
              <div 
                className="p-4 rounded-xl border-l-4 shadow-sm"
                style={{
                  borderLeftColor: colors.accent,
                  backgroundColor: `${colors.accent}15`,
                  color: colors.text
                }}
              >
                <p className="text-sm sm:text-base font-semibold opacity-95">
                  {body}
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <span 
                className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1.5"
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
          <div className="space-y-6 text-left py-2">
            <div 
              className="w-12 h-2 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            
            <h2 
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight font-sans"
              style={{ color: colors.text }}
            >
              {title}
            </h2>

            {body && (
              <div 
                className="p-5 rounded-2xl border-2"
                style={{
                  borderColor: colors.accent,
                  backgroundColor: `${colors.accent}10`
                }}
              >
                <p className="text-sm sm:text-base font-bold leading-relaxed opacity-95">
                  {body}
                </p>
              </div>
            )}

            <div 
              className="w-full py-3.5 px-6 rounded-xl font-black text-center text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary === '#ffffff' ? '#000000' : '#ffffff',
                boxShadow: `0 8px 25px ${colors.accent}40`
              }}
            >
              <span>¡COMENTA O ESCRÍBENOS AHORA!</span>
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span 
                className="text-4xl sm:text-5xl font-black leading-none shrink-0"
                style={{ color: colors.accent }}
              >
                0{index}
              </span>
              <div className="space-y-1">
                <h2 
                  className="text-xl sm:text-2xl font-black tracking-tight leading-tight uppercase font-sans"
                  style={{ color: colors.text }}
                >
                  {title}
                </h2>
              </div>
            </div>

            <div 
              className="p-5 rounded-2xl border bg-opacity-40"
              style={{
                backgroundColor: `${colors.primary === '#070d1a' ? '#0f1b33' : colors.primary}99`,
                borderColor: `${colors.accent}40`
              }}
            >
              <p 
                className="text-sm sm:text-base font-medium leading-relaxed opacity-95 whitespace-pre-line"
                style={{ color: colors.text }}
              >
                {body}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="h-6" />
    </div>
  );
}
