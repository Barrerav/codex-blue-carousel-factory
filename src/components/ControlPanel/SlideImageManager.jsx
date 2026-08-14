import React, { useRef } from 'react';
import { ImagePlus, Trash2, Sliders, Image as ImageIcon, Sparkles } from 'lucide-react';

export function SlideImageManager({
  slides,
  onUpdateSlideImage,
  onRemoveSlideImage,
  onUpdateSlideOverlay,
  onSelectSlide,
  activeSlideIndex,
}) {
  const fileInputRefs = useRef({});

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
    // Reset input so same file can be re-selected if needed
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <ImageIcon className="w-4 h-4 text-blue-400" />
          <span>Fondos Personalizados por Slide</span>
        </label>
        <span className="text-[11px] text-slate-400 font-medium">
          {slides.filter((s) => s.backgroundImage).length} de {slides.length} con imagen
        </span>
      </div>

      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {slides.map((slide, idx) => {
          const hasImage = Boolean(slide.backgroundImage);
          const overlayVal = Math.round((slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65) * 100);

          return (
            <div
              key={slide.id || idx}
              className={`p-3 rounded-xl border transition-all flex flex-col gap-2.5 ${
                activeSlideIndex === idx
                  ? 'bg-blue-950/20 border-blue-500/50 shadow-sm'
                  : 'bg-[#0d1629] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Slide Info */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400 shrink-0">
                    #{slide.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {slide.title || `Slide ${slide.index}`}
                    </p>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">
                      {slide.type === 'hook' ? 'Portada (Hook)' : slide.type === 'cta' ? 'Cierre (CTA)' : 'Contenido'}
                    </span>
                  </div>
                </div>

                {/* Upload / Thumbnail Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Hidden File Input */}
                  <input
                    ref={(el) => (fileInputRefs.current[slide.id] = el)}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileChange(slide.id, e)}
                  />

                  {hasImage ? (
                    <div className="flex items-center gap-1.5">
                      {/* Clickable Thumbnail to change image */}
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[slide.id]?.click()}
                        className="w-10 h-12 rounded-lg border border-blue-500/50 overflow-hidden relative group cursor-pointer shadow-sm"
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

                      {/* Remove Image Button */}
                      <button
                        type="button"
                        onClick={() => onRemoveSlideImage(slide.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Quitar imagen de fondo (usar gradiente original)"
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
