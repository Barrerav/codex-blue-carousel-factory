import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Edit3, Trash2, Tag, ImagePlus, Sliders, Image as ImageIcon } from 'lucide-react';

export function SlideEditorModal({ isOpen, slide, onClose, onSave, onDelete }) {
  if (!isOpen || !slide) return null;

  const [title, setTitle] = useState(slide.title || '');
  const [body, setBody] = useState(slide.body || '');
  const [tag, setTag] = useState(slide.tag || '');
  const [type, setType] = useState(slide.type || 'content');
  const [backgroundImage, setBackgroundImage] = useState(slide.backgroundImage || null);
  const [overlayOpacity, setOverlayOpacity] = useState(
    slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    setTitle(slide.title || '');
    setBody(slide.body || '');
    setTag(slide.tag || '');
    setType(slide.type || 'content');
    setBackgroundImage(slide.backgroundImage || null);
    setOverlayOpacity(slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65);
  }, [slide]);

  const handleImageFile = (e) => {
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
        setBackgroundImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...slide,
      title: title.trim(),
      body: body.trim(),
      tag: tag.trim(),
      type,
      backgroundImage,
      overlayOpacity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#0d1629] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Editar Slide #{slide.index} de {slide.totalSlides}
              </h3>
              <p className="text-xs text-slate-400">
                Modifica el contenido e imagen de fondo individual.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Slide Type Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Rol del Slide</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'hook', label: 'Hook (Portada)' },
                { id: 'content', label: 'Contenido' },
                { id: 'cta', label: 'CTA (Cierre)' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    type === t.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Background Image Uploader */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Imagen de Fondo Personalizada</span>
              </label>
              {backgroundImage && (
                <button
                  type="button"
                  onClick={() => setBackgroundImage(null)}
                  className="text-[11px] text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Quitar Imagen</span>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={handleImageFile}
            />

            {backgroundImage ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-16 rounded-lg border border-blue-500/50 overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={backgroundImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                      <span>✓ Imagen cargada con éxito</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      Reemplazar Imagen
                    </button>
                  </div>
                </div>

                {/* Scrim Overlay Slider */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Sliders className="w-3 h-3 text-blue-400" />
                    <span>Oscurecimiento:</span>
                  </span>
                  <div className="flex items-center gap-2 flex-1 max-w-[200px]">
                    <input
                      type="range"
                      min="30"
                      max="95"
                      value={Math.round(overlayOpacity * 100)}
                      onChange={(e) => setOverlayOpacity(Number(e.target.value) / 100)}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="font-mono text-[11px] text-blue-300 w-8 text-right">
                      {Math.round(overlayOpacity * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/40 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 transition-all flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
              >
                <ImagePlus className="w-4 h-4 text-blue-400" />
                <span>Subir imagen desde mi computadora (PNG/JPG)</span>
              </button>
            )}
          </div>

          {/* Tag / Pill Label */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-400" />
              <span>Etiqueta / Tag Superior</span>
            </label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Ej: TIP 01, ESTRATEGIA, HOOK, ACCIÓN"
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Title / Main Statement */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Título o Frase Principal</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe el título llamativo del slide..."
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
              required
            />
          </div>

          {/* Body Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Cuerpo / Explicación {type === 'hook' && '(Opcional en Portada)'}
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Escribe el cuerpo del mensaje, puntos clave o llamado a la acción..."
              rows={4}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between shrink-0">
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`¿Eliminar slide #${slide.index}?`)) {
                    onDelete(slide.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar Slide</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
