import React, { useState } from 'react';
import { FileText, Sparkles, Trash2, HelpCircle, Code } from 'lucide-react';
import { DEFAULT_SCRIPT } from '../../utils/defaultScript';

const STRUCTURED_SAMPLE = `SLIDE 1
TYPE: HOOK
TITLE: Google acaba de lanzar un nuevo monstruo de IA.
BODY: Gemini 3.7 Flash llega para programar, razonar y trabajar con agentes autónomos.
HIGHLIGHT: IA que trabaja. No solo responde.
VISUAL: Futuristic glowing AI intelligence core emerging from a dark blue technological chamber.
PROMPT: Create a premium cinematic rendering of a glowing AI core with cyan energy pulses, dark blue obsidian surfaces, 8k resolution.
TEXT_POSITION: TOP
TEXT_WIDTH: WIDE
VISUAL_FOCUS: RIGHT
LOGO_POSITION: TOP_LEFT

SLIDE 2
TYPE: CONTENT
TITLE: El poder del razonamiento híbrido
BODY: Combina velocidad de respuesta instantánea con cadenas de pensamiento profundo para tareas de programación extrema.
HIGHLIGHT: 10x más rápido que modelos anteriores.
VISUAL: Neural network nodes connecting at lightspeed in 3D dark space.
PROMPT: Abstract deep navy neural pathways firing with bright cyan and sapphire light beams.
TEXT_POSITION: CENTER
TEXT_WIDTH: MEDIUM
VISUAL_FOCUS: LEFT
LOGO_POSITION: TOP_LEFT

SLIDE 3
TYPE: CTA
TITLE: ¿Quieres implementar agentes en tu empresa?
BODY: Escríbenos "AGENTE" por mensaje directo y te enviaremos nuestra guía paso a paso.
HIGHLIGHT: Cupos limitados para este mes.
VISUAL: Minimalist dark blue portal opening towards a luminous technological horizon.
PROMPT: Futuristic architectural portal of obsidian monoliths with blue neon borders.
TEXT_POSITION: LOWER_CENTER
TEXT_WIDTH: WIDE
VISUAL_FOCUS: FULL
LOGO_POSITION: GLOBAL`;

export function ScriptEditor({ script, onChange, onResetDefault }) {
  const [showFormatGuide, setShowFormatGuide] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <FileText className="w-4 h-4 text-blue-400" />
          <span>Guion del Carrusel</span>
        </label>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChange(STRUCTURED_SAMPLE)}
            className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold px-2 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-colors cursor-pointer"
            title="Cargar ejemplo con formato estructurado ChatGPT + Composición + Prompts"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Guion ChatGPT</span>
          </button>

          <button
            type="button"
            onClick={onResetDefault}
            className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 transition-colors cursor-pointer"
            title="Cargar guion simple estándar"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estándar</span>
          </button>

          <button
            type="button"
            onClick={() => onChange('')}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-400 font-medium px-2 py-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
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
          placeholder={`Pega tu guion aquí (Formato rápido o estructurado ChatGPT)...\n\nFormato Rápido:\nSLIDE 1 (HOOK): 5 Errores que destruyen tu web\nSLIDE 2: Falta de jerarquía | Si todo compite...\nSLIDE FINAL (CTA): Escríbenos "CODEX"\n\nO Formato Estructurado ChatGPT:\nSLIDE 1\nTYPE: HOOK\nTITLE: Titulo\nBODY: Cuerpo\nHIGHLIGHT: Destacado\nVISUAL: Concepto\nPROMPT: Prompt Gemini\nTEXT_WIDTH: WIDE\nVISUAL_FOCUS: RIGHT`}
          rows={11}
          className="w-full bg-[#0d1629] border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y leading-relaxed shadow-inner"
        />
      </div>

      {/* Syntax Tip Banner */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Formatos aceptados (100% compatibles)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFormatGuide(!showFormatGuide)}
            className="text-[10px] text-blue-400 hover:underline font-mono cursor-pointer"
          >
            {showFormatGuide ? 'Ocultar guía' : 'Ver campos'}
          </button>
        </div>

        {showFormatGuide ? (
          <div className="space-y-1.5 pt-1 text-[10px] border-t border-slate-800/80 font-mono text-slate-400">
            <p className="text-purple-300 font-bold">Campos de contenido & composición reconocidos:</p>
            <p><span className="text-blue-300">TYPE:</span> HOOK | CONTENT | CTA</p>
            <p><span className="text-blue-300">TAG:</span> Etiqueta superior (opcional)</p>
            <p><span className="text-blue-300">TITLE:</span> Frase o titular principal</p>
            <p><span className="text-blue-300">BODY:</span> Explicación o cuerpo</p>
            <p><span className="text-blue-300">HIGHLIGHT:</span> Callout o punchline destacado</p>
            <p><span className="text-blue-300">VISUAL:</span> Concepto de la imagen</p>
            <p><span className="text-blue-300">PROMPT:</span> Prompt completo para Gemini</p>
            <p><span className="text-blue-300">TEXT_POSITION:</span> TOP | UPPER_CENTER | CENTER | LOWER_CENTER | BOTTOM</p>
            <p><span className="text-blue-300">TEXT_WIDTH:</span> NARROW (~50%) | MEDIUM (~70%) | WIDE (~90%)</p>
            <p><span className="text-blue-300">VISUAL_FOCUS:</span> LEFT | CENTER | RIGHT | FULL</p>
            <p><span className="text-blue-300">LOGO_POSITION:</span> GLOBAL | TOP_LEFT | TOP_RIGHT | BOTTOM_LEFT | BOTTOM_RIGHT</p>
          </div>
        ) : (
          <p className="text-[10px] text-slate-400">
            Acepta formato rápido (<code className="text-blue-300 font-mono">Título | Cuerpo</code>) y formato estructurado <code className="text-purple-300 font-mono">ChatGPT (TYPE, TEXT_WIDTH, VISUAL_FOCUS, etc.)</code>.
          </p>
        )}
      </div>
    </div>
  );
}
