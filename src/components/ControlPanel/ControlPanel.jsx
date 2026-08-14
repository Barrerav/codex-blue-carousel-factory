import React, { useState, useRef } from 'react';
import { ScriptEditor } from './ScriptEditor';
import { SlideImageManager } from './SlideImageManager';
import { BrandColorPicker } from './BrandColorPicker';
import { TemplateSelector } from './TemplateSelector';
import {
  Sliders,
  ShieldCheck,
  Eye,
  EyeOff,
  Hash,
  Layers,
  Image as ImageIcon,
  Upload,
  Trash2,
  Move,
  Maximize2
} from 'lucide-react';

export function ControlPanel({
  script,
  onScriptChange,
  onResetScript,
  slides,
  onUpdateSlideImage,
  onRemoveSlideImage,
  onUpdateSlideOverlay,
  activeSlideIndex,
  onSelectSlide,
  config,
  onConfigChange,
}) {
  const [activeTab, setActiveTab] = useState('script'); // 'script' | 'design' | 'options'
  const logoInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor sube un logo en formato PNG, JPG o WEBP con transparencia.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        onConfigChange({
          ...config,
          logoImage: dataUrl,
          showLogo: true,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveLogo = () => {
    onConfigChange({
      ...config,
      logoImage: null,
    });
  };

  return (
    <aside className="w-full lg:w-[460px] xl:w-[500px] shrink-0 bg-[#070d1a] border-r border-slate-800/80 flex flex-col h-full overflow-hidden">
      {/* Panel Navigation Tabs */}
      <div className="flex items-center border-b border-slate-800/80 bg-slate-950/40 p-2 gap-1.5 shrink-0">
        <button
          onClick={() => setActiveTab('script')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'script'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>1. Guion & Fondos</span>
        </button>

        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'design'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>2. Diseño & Colores</span>
        </button>

        <button
          onClick={() => setActiveTab('options')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'options'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>3. Branding & Logo</span>
        </button>
      </div>

      {/* Panel Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'script' && (
          <div className="space-y-6">
            <ScriptEditor
              script={script}
              onChange={onScriptChange}
              onResetDefault={onResetScript}
            />

            {/* Per-Slide Custom Background Image & Prompt Manager */}
            {slides.length > 0 && (
              <div className="border-t border-slate-800/80 pt-5">
                <SlideImageManager
                  slides={slides}
                  onUpdateSlideImage={onUpdateSlideImage}
                  onRemoveSlideImage={onRemoveSlideImage}
                  onUpdateSlideOverlay={onUpdateSlideOverlay}
                  activeSlideIndex={activeSlideIndex}
                  onSelectSlide={onSelectSlide}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-6">
            <TemplateSelector
              selectedTemplate={config.template}
              onSelectTemplate={(template) => onConfigChange({ ...config, template })}
            />

            <div className="border-t border-slate-800/80 pt-5">
              <BrandColorPicker
                colors={config.brandColors}
                onChange={(brandColors) => onConfigChange({ ...config, brandColors })}
              />
            </div>
          </div>
        )}

        {activeTab === 'options' && (
          <div className="space-y-6">
            {/* SECTION: REAL LOGO ASSET */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Logo Oficial de Marca</span>
              </label>

              <div className="p-4 rounded-xl bg-[#0d1629] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">Mostrar Logo en Slides</p>
                    <p className="text-[10px] text-slate-400">Renderizado consistente por la app en cada slide</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onConfigChange({ ...config, showLogo: !config.showLogo })}
                    className={`p-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      config.showLogo
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {config.showLogo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{config.showLogo ? 'Visible' : 'Oculto'}</span>
                  </button>
                </div>

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleLogoUpload}
                />

                {config.logoImage ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="w-16 h-12 rounded-lg bg-black/40 border border-slate-700/80 flex items-center justify-center p-1.5 overflow-hidden">
                        <img
                          src={config.logoImage}
                          alt="Logo Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-emerald-400">✓ Asset cargado</p>
                        <p className="text-[10px] text-slate-400">Se compone automáticamente</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => logoInputRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          Cambiar
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Eliminar logo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full py-3.5 px-4 rounded-xl border border-dashed border-slate-700 hover:border-blue-500 bg-slate-900/40 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 transition-all flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Subir Logo Oficial (PNG / JPG / WEBP)</span>
                  </button>
                )}

                {/* Logo Global Position */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Move className="w-3.5 h-3.5 text-blue-400" />
                    <span>Posición Global del Logo</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'top-left', label: 'Top-Left' },
                      { id: 'top-right', label: 'Top-Right' },
                      { id: 'bottom-left', label: 'Bottom-Left' },
                      { id: 'bottom-right', label: 'Bottom-Right' },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => onConfigChange({ ...config, logoPosition: pos.id })}
                        className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          config.logoPosition === pos.id
                            ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logo Size & Margin Sliders */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-blue-400" />
                        <span>Tamaño:</span>
                      </span>
                      <span className="font-mono text-blue-300">{config.logoSize || 36}px</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="70"
                      value={config.logoSize || 36}
                      onChange={(e) => onConfigChange({ ...config, logoSize: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Move className="w-3 h-3 text-blue-400" />
                        <span>Margen:</span>
                      </span>
                      <span className="font-mono text-blue-300">{config.logoMargin || 24}px</span>
                    </div>
                    <input
                      type="range"
                      min="14"
                      max="48"
                      value={config.logoMargin || 24}
                      onChange={(e) => onConfigChange({ ...config, logoMargin: Number(e.target.value) })}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: TEXT WATERMARK (Fallback / Secondary) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Marca de Agua en Texto (Fallback)</span>
              </label>
              <div className="p-4 rounded-xl bg-[#0d1629] border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Activar Watermark de Texto</span>
                  <button
                    type="button"
                    onClick={() => onConfigChange({ ...config, showWatermark: !config.showWatermark })}
                    className={`p-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      config.showWatermark
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {config.showWatermark ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span>{config.showWatermark ? 'Visible' : 'Oculto'}</span>
                  </button>
                </div>

                {config.showWatermark && (
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Texto del Watermark</label>
                    <input
                      type="text"
                      value={config.watermarkText}
                      onChange={(e) => onConfigChange({ ...config, watermarkText: e.target.value })}
                      placeholder="CODEX BLUE"
                      className="w-full bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* SECTION: SLIDE PAGINATION */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-400" />
                <span>Paginación de Slides</span>
              </label>
              <div className="p-4 rounded-xl bg-[#0d1629] border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-200">Contador discreto (ej: 1/7)</p>
                  <p className="text-[11px] text-slate-400">Posicionado en la esquina inferior</p>
                </div>
                <button
                  type="button"
                  onClick={() => onConfigChange({ ...config, showSlideNumbers: !config.showSlideNumbers })}
                  className={`p-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    config.showSlideNumbers
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  {config.showSlideNumbers ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{config.showSlideNumbers ? 'Activo' : 'Inactivo'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
