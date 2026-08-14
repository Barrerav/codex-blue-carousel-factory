import React from 'react';
import { FileText, Sparkles, Trash2, HelpCircle } from 'lucide-react';
import { DEFAULT_SCRIPT } from '../../utils/defaultScript';

export function ScriptEditor({ script, onChange, onResetDefault }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Guion del Carrusel</span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetDefault}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
            title="Cargar guion de ejemplo predefinido"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ejemplo</span>
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 font-medium px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
            title="Borrar texto del guion"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={script}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Pega tu guion aquí...\n\nFormato esperado:\nSLIDE 1 (HOOK): 5 Errores que destruyen tu web\nSLIDE 2: Falta de jerarquía | Si todo compite...\nSLIDE FINAL (CTA): Escríbenos "CODEX" por DM`}
          rows={11}
          className="w-full bg-[#0d1629] border border-slate-800 rounded-xl p-4 text-sm font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y leading-relaxed shadow-inner"
        />
      </div>

      {/* Syntax Tip Banner */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-300">Reglas rápidas de formato:</p>
          <p>• <code className="text-blue-300 font-mono">SLIDE 1 (HOOK): [Texto]</code> para la portada inicial.</p>
          <p>• <code className="text-blue-300 font-mono">SLIDE 2: [Título] | [Cuerpo]</code> para separar título y descripción con barra vertical.</p>
          <p>• <code className="text-blue-300 font-mono">SLIDE FINAL (CTA): [Texto]</code> para el cierre con llamada a la acción.</p>
        </div>
      </div>
    </div>
  );
}
