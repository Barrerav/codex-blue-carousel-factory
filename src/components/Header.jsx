import React from 'react';
import { Download, Layers, Loader2, Sparkles, CheckCircle, Smartphone } from 'lucide-react';

export function Header({
  slidesCount,
  onExport,
  isExporting,
  exportProgress,
}) {
  return (
    <header className="h-16 px-6 bg-[#070d1a] border-b border-slate-800/80 flex items-center justify-between shrink-0 z-30">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-glow-sm">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-extrabold tracking-wider text-white font-display">
              CODEX BLUE
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              Carousel Factory
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Generador de carruseles para Instagram en formato 4:5 (1080x1350px)
          </p>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-3">
        {/* Status pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{slidesCount} Slides Listos</span>
        </div>

        {/* Batch Export Button */}
        <button
          onClick={onExport}
          disabled={isExporting || slidesCount === 0}
          className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md hover:shadow-glow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>
                {exportProgress 
                  ? `Exportando ${exportProgress.current}/${exportProgress.total}...` 
                  : 'Procesando...'}
              </span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Descargar Todas las Imágenes</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
