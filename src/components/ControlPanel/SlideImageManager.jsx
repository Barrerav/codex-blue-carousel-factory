import React, { useRef, useState } from 'react';
import { ImagePlus, Trash2, Sliders, Image as ImageIcon, Sparkles, Copy, Check, Eye, Maximize, Focus } from 'lucide-react';

export function SlideImageManager({
  slides,
  onUpdateSlideImage,
  onRemoveSlideImage,
  onUpdateSlideOverlay,
  onSelectSlide,
  activeSlideIndex,
}) {
  const fileInputRefs = useRef({});
  const [copiedPromptId, setCopiedPromptId] = useState(null);

  const handleFileChange = (slideId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        onUpdateSlideImage(slideId, dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCopyPrompt = (slide) => {
    if (!slide.visualPrompt) return;
    navigator.clipboard.writeText(slide.visualPrompt);
    setCopiedPromptId(slide.id);
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2000);
  };

  // Helper to determine slide visual background state
  const getBackgroundState = (slide) => {
    if (slide.backgroundImage) {
      return {
        label: 'FONDO LISTO',
        colorClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
        badge: 'Listo'
      };
    }
    if (slide.visualConcept || slide.visualPrompt) {
      return {
        label: 'FONDO PENDIENTE',
        colorClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
        badge: 'Pendiente'
      };
    }
    return {
      label: 'SIN FONDO',
      colorClass: 'bg-slate-800/60 border-slate-700/60 text-slate-400',
      badge: 'Por Defecto'
    };
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <ImageIcon className="w-4 h-4 text-blue-400" />
          <span>Gestor de Fondos & Prompts Gemini</span>
        </label>
        <span className="text-[11px] text-slate-400 font-medium">
          {slides.filter((s) => s.backgroundImage).length} de {slides.length} listos
        </span>
      </div>

      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {slides.map((slide, idx) => {
          const hasImage = Boolean(slide.backgroundImage);
          const overlayVal = Math.round((slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65) * 100);
          const bgState = getBackgroundState(slide);
          const isCopied = copiedPromptId === slide.id;
          const textW = (slide.textWidth || 'wide').toUpperCase();
          const focusD = (slide.visualFocus || 'center').toUpperCase();

          return (
            <div
              key={slide.id || idx}
              className={`p-3.5 rounded-xl border transition-all flex flex-col gap-2.5 ${
                activeSlideIndex === idx
                  ? 'bg-blue-950/25 border-blue-500/50 shadow-md'
                  : 'bg-[#0d1629] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Header: Slide Number, Title & Visual Status Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400 shrink-0">
                    #{slide.index}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 truncate">
                    {slide.title || `Slide ${slide.index}`}
                  </p>
                </div>

                {/* Visual State Badge */}
                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border shrink-0 ${bgState.colorClass}`}>
                  {bgState.label}
                </span>
              </div>

              {/* Composition Metadata Badges: TEXT_WIDTH & VISUAL_FOCUS */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400">
                  TEXT: <strong className="text-blue-300">{textW}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400">
                  FOCUS: <strong className="text-purple-300">{focusD}</strong>
                </span>
                {slide.textPosition && slide.textPosition !== 'center' && (
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400">
                    POS: <strong className="text-slate-300">{slide.textPosition.toUpperCase()}</strong>
                  </span>
                )}
              </div>

              {/* Visual Concept description (if available) */}
              {slide.visualConcept && (
                <div className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
                  <span className="text-[10px] uppercase font-mono font-bold text-blue-400 block mb-0.5">
                    Concepto Visual:
                  </span>
                  {slide.visualConcept}
                </div>
              )}

              {/* Actions Row: Copy Prompt Button & Upload/Thumbnail */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {/* Copy Gemini Prompt Button (if prompt exists) */}
                {slide.visualPrompt ? (
                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(slide)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white'
                    }`}
                    title="Copiar prompt completo para generar en Gemini"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Prompt Copiado' : 'Copiar Prompt Gemini'}</span>
                  </button>
                ) : (
                  <div className="text-[10px] text-slate-500 italic">
                    Sin prompt específico
                  </div>
                )}

                {/* Upload / Thumbnail Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    ref={(el) => (fileInputRefs.current[slide.id] = el)}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(slide.id, e)}
                  />

                  {hasImage ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[slide.id]?.click()}
                        className="w-10 h-12 rounded-lg border border-emerald-500/50 overflow-hidden relative group cursor-pointer shadow-sm"
                        title="Cambiar imagen de fondo"
                      >
                        <img
                          src={slide.backgroundImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[9px] font-bold text-white">
                          Cambiar
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveSlideImage(slide.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Quitar imagen de fondo (usar diseño original)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[slide.id]?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/50 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 transition-all cursor-pointer"
                    >
                      <ImagePlus className="w-3.5 h-3.5 text-blue-400" />
                      <span>+ Subir Fondo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Contrast Scrim Slider (Visible when image is loaded) */}
              {hasImage && (
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-3 text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                    <Sliders className="w-3 h-3 text-blue-400" />
                    <span>Oscurecimiento:</span>
                  </span>
                  <div className="flex items-center gap-2 flex-1 max-w-[170px]">
                    <input
                      type="range"
                      min="30"
                      max="95"
                      value={overlayVal}
                      onChange={(e) => onUpdateSlideOverlay(slide.id, Number(e.target.value) / 100)}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="font-mono text-[10px] text-blue-300 w-7 text-right">
                      {overlayVal}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
