import React, { useState } from 'react';
import { ScriptEditor } from './ScriptEditor';
import { BrandColorPicker } from './BrandColorPicker';
import { TemplateSelector } from './TemplateSelector';
import { Sliders, ShieldCheck, Eye, EyeOff, Hash, Layers } from 'lucide-react';

export function ControlPanel({
  script,
  onScriptChange,
  onResetScript,
  config,
  onConfigChange,
}) {
  const [activeTab, setActiveTab] = useState('script'); // 'script' | 'design' | 'options'

  return (
    <aside className="w-full lg:w-[460px] xl:w-[500px] shrink-0 bg-[#070d1a] border-r border-slate-800/80 flex flex-col h-full overflow-hidden">
      {/* Panel Navigation Tabs */}
      <div className="flex items-center border-b border-slate-800/80 bg-slate-950/40 p-2 gap-1.5 shrink-0">
        <button
          onClick={() => setActiveTab('script')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'script'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>1. Guion</span>
        </button>

        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
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
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'options'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>3. Branding</span>
        </button>
      </div>

      {/* Panel Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === 'script' && (
          <ScriptEditor
            script={script}
            onChange={onScriptChange}
            onResetDefault={onResetScript}
          />
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
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Marca de Agua / Logo</span>
              </label>
              <div className="p-4 rounded-xl bg-[#0d1629] border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Mostrar Marca de Agua</span>
                  <button
                    type="button"
                    onClick={() => onConfigChange({ ...config, showWatermark: !config.showWatermark })}
                    className={`p-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 ${
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
                    <label className="text-[11px] text-slate-400">Texto del Logo/Agencia</label>
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

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-400" />
                <span>Paginación de Slides</span>
              </label>
              <div className="p-4 rounded-xl bg-[#0d1629] border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-200">Contador discreto (ej: 1/7)</p>
                  <p className="text-[11px] text-slate-400">Ubicado en la esquina inferior derecha</p>
                </div>
                <button
                  type="button"
                  onClick={() => onConfigChange({ ...config, showSlideNumbers: !config.showSlideNumbers })}
                  className={`p-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1 ${
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
