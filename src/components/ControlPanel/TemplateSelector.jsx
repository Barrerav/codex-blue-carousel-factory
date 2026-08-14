import React from 'react';
import { Layout, Check, Sparkles } from 'lucide-react';
import { TEMPLATES } from '../../types/carousel';

export function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <Layout className="w-4 h-4 text-blue-400" />
          <span>Plantilla de Diseño</span>
        </label>
        <span className="text-[11px] text-slate-400 font-medium">3 Estilos Visuales</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TEMPLATES.map((tmpl) => {
          const isSelected = selectedTemplate === tmpl.id;

          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all relative overflow-hidden group ${
                isSelected
                  ? 'bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/50 shadow-glow-sm'
                  : 'bg-[#0d1629] border-slate-800/80 hover:border-slate-700 hover:bg-[#101b33]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-100 font-display">
                    {tmpl.name}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {tmpl.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-slate-800">
                  {tmpl.badge}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors">
                  {tmpl.id === 'editorial' ? 'Playfair Serif' : 'Inter Sans'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
