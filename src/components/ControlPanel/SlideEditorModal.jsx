import React, { useState, useEffect } from 'react';
import { X, Check, Edit3, Trash2, Tag, AlertCircle } from 'lucide-react';

export function SlideEditorModal({ isOpen, slide, onClose, onSave, onDelete }) {
  if (!isOpen || !slide) return null;

  const [title, setTitle] = useState(slide.title || '');
  const [body, setBody] = useState(slide.body || '');
  const [tag, setTag] = useState(slide.tag || '');
  const [type, setType] = useState(slide.type || 'content');

  useEffect(() => {
    setTitle(slide.title || '');
    setBody(slide.body || '');
    setTag(slide.tag || '');
    setType(slide.type || 'content');
  }, [slide]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...slide,
      title: title.trim(),
      body: body.trim(),
      tag: tag.trim(),
      type,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#0d1629] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Editar Slide #{slide.index} de {slide.totalSlides}
              </h3>
              <p className="text-xs text-slate-400">
                Modifica el contenido individual sin afectar el resto del carrusel.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
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
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            {onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`¿Eliminar slide #${slide.index}?`)) {
                    onDelete(slide.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminar Slide</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md"
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
