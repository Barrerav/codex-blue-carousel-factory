import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Check,
  Edit3,
  Trash2,
  Tag,
  ImagePlus,
  Sliders,
  Image as ImageIcon,
  Sparkles,
  Copy,
  Layout,
  Compass,
  Zap,
} from 'lucide-react';

export function SlideEditorModal({ isOpen, slide, onClose, onSave, onDelete }) {
  if (!isOpen || !slide) return null;

  const [title, setTitle] = useState(slide.title || '');
  const [body, setBody] = useState(slide.body || '');
  const [highlight, setHighlight] = useState(slide.highlight || '');
  const [tag, setTag] = useState(slide.tag || '');
  const [type, setType] = useState(slide.type || 'content');
  const [visualConcept, setVisualConcept] = useState(slide.visualConcept || '');
  const [visualPrompt, setVisualPrompt] = useState(slide.visualPrompt || '');
  const [textPosition, setTextPosition] = useState(slide.textPosition || 'center');
  const [logoPosition, setLogoPosition] = useState(slide.logoPosition || 'global');
  const [backgroundImage, setBackgroundImage] = useState(slide.backgroundImage || null);
  const [overlayOpacity, setOverlayOpacity] = useState(
    slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65
  );

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setTitle(slide.title || '');
    setBody(slide.body || '');
    setHighlight(slide.highlight || '');
    setTag(slide.tag || '');
    setType(slide.type || 'content');
    setVisualConcept(slide.visualConcept || '');
    setVisualPrompt(slide.visualPrompt || '');
    setTextPosition(slide.textPosition || 'center');
    setLogoPosition(slide.logoPosition || 'global');
    setBackgroundImage(slide.backgroundImage || null);
    setOverlayOpacity(slide.overlayOpacity !== undefined ? slide.overlayOpacity : 0.65);
    setCopiedPrompt(false);
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

  const handleCopyPrompt = () => {
    if (!visualPrompt) return;
    navigator.clipboard.writeText(visualPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({
      ...slide,
      title: title.trim(),
      body: body.trim(),
      highlight: highlight.trim(),
      tag: tag.trim(),
      type,
      visualConcept: visualConcept.trim(),
      visualPrompt: visualPrompt.trim(),
      textPosition,
      logoPosition,
      backgroundImage,
      overlayOpacity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0d1629] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-scaleUp max-h-[92vh] flex flex-col"
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
                Ajusta contenido, dirección visual, prompt Gemini y fondo.
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
        <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* SECTION 1: CONTENT DATA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
              <Tag className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Contenido del Slide
              </h4>
            </div>

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
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
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

            {/* Tag / Pill Label & Title */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 sm:col-span-1">
                <label className="text-xs font-semibold text-slate-300">Etiqueta Superior</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Ej: HOOK, 01, CTA"
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Título / Frase Principal</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título llamativo..."
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  required
                />
              </div>
            </div>

            {/* Highlight Callout */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Highlight / Frase Destacada (Opcional)</span>
              </label>
              <input
                type="text"
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="Ej: 10x más rápido que versiones anteriores..."
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Body Text */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Cuerpo / Explicación {type === 'hook' && '(Opcional en Portada)'}
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Cuerpo del mensaje, puntos clave o llamado a la acción..."
                rows={3}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* SECTION 2: DIRECCIÓN VISUAL */}
          <div className="space-y-4 p-4 rounded-xl bg-slate-950/60 border border-purple-500/30">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Dirección Visual & Prompt Gemini
                </h4>
              </div>

              {visualPrompt && (
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                    copiedPrompt
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-purple-600/20 border-purple-500/40 text-purple-300 hover:bg-purple-600/30 hover:text-white'
                  }`}
                >
                  {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPrompt ? 'Prompt copiado' : 'Copiar Prompt Gemini'}</span>
                </button>
              )}
            </div>

            {/* Visual Concept */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Concepto Visual (VISUAL)</label>
              <input
                type="text"
                value={visualConcept}
                onChange={(e) => setVisualConcept(e.target.value)}
                placeholder="Ej: Futuristic AI core with cyan laser lighting..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Prompt Gemini */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Prompt Gemini Completo (PROMPT)</label>
              <textarea
                value={visualPrompt}
                onChange={(e) => setVisualPrompt(e.target.value)}
                placeholder="Pega el prompt detallado para generar el fondo en Gemini..."
                rows={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none font-mono text-[11px] leading-relaxed"
              />
            </div>

            {/* Layout Positioning: Text Position & Logo Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Text Position */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Layout className="w-3.5 h-3.5 text-blue-400" />
                  <span>Posición del Texto</span>
                </label>
                <select
                  value={textPosition}
                  onChange={(e) => setTextPosition(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="top">Arriba (Top)</option>
                  <option value="upper-center">Centro Superior (Upper-Center)</option>
                  <option value="center">Centro (Center - Por Defecto)</option>
                  <option value="lower-center">Centro Inferior (Lower-Center)</option>
                  <option value="bottom">Abajo (Bottom)</option>
                </select>
              </div>

              {/* Logo Position */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Posición del Logo en Slide</span>
                </label>
                <select
                  value={logoPosition}
                  onChange={(e) => setLogoPosition(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="global">Usar Global (Por Defecto)</option>
                  <option value="top-left">Superior Izquierda (Top-Left)</option>
                  <option value="top-right">Superior Derecha (Top-Right)</option>
                  <option value="bottom-left">Inferior Izquierda (Bottom-Left)</option>
                  <option value="bottom-right">Inferior Derecha (Bottom-Right)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: CUSTOM BACKGROUND IMAGE */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Fondo del Slide</span>
              </label>
              {backgroundImage && (
                <button
                  type="button"
                  onClick={() => setBackgroundImage(null)}
                  className="text-[11px] text-red-400 hover:text-red-300 font-medium flex items-center gap-1 cursor-pointer"
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
                  <div className="w-14 h-16 rounded-lg border border-emerald-500/50 overflow-hidden shrink-0 shadow-sm">
                    <img
                      src={backgroundImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium text-emerald-400">
                      ✓ Fondo cargado (FONDO LISTO)
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Reemplazar Imagen
                    </button>
                  </div>
                </div>

                {/* Scrim Overlay Slider */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Sliders className="w-3 h-3 text-blue-400" />
                    <span>Oscurecimiento / Contraste:</span>
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
                <span>Subir imagen de fondo generada en Gemini (PNG/JPG)</span>
              </button>
            )}
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
