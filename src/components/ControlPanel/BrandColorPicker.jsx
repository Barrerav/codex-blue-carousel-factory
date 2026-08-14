import React from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { DEFAULT_BRAND_COLORS, COLOR_PRESETS } from '../../types/carousel';

export function BrandColorPicker({ colors, onChange }) {
  const handleColorChange = (key, value) => {
    onChange({
      ...colors,
      [key]: value,
    });
  };

  const handleResetDefaults = () => {
    onChange(DEFAULT_BRAND_COLORS);
  };

  const colorFields = [
    {
      key: 'primary',
      label: 'Fondo Base',
      description: 'Color de fondo oscuro',
      value: colors.primary,
    },
    {
      key: 'accent',
      label: 'Color Acento',
      description: 'Detalles, botones y CTA',
      value: colors.accent,
    },
    {
      key: 'text',
      label: 'Color Texto',
      description: 'Títulos y párrafos',
      value: colors.text,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
          <Palette className="w-4 h-4 text-blue-400" />
          <span>Paleta de Marca</span>
        </label>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 font-medium px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          title="Restaurar colores originales de Codex Blue"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar</span>
        </button>
      </div>

      {/* 3 Color Hex Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {colorFields.map((field) => (
          <div
            key={field.key}
            className="p-3 rounded-xl bg-[#0d1629] border border-slate-800/80 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">{field.label}</span>
              <div 
                className="w-5 h-5 rounded-md border border-slate-600 shadow-inner relative overflow-hidden cursor-pointer"
                style={{ backgroundColor: field.value }}
              >
                <input
                  type="color"
                  value={field.value.length === 7 ? field.value : '#070d1a'}
                  onChange={(e) => handleColorChange(field.key, e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-xs font-mono text-slate-500">#</span>
              <input
                type="text"
                value={field.value.replace('#', '')}
                onChange={(e) => {
                  const val = '#' + e.target.value.replace(/[^A-Fa-f0-9]/g, '').slice(0, 6);
                  handleColorChange(field.key, val);
                }}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-lg pl-6 pr-2 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                placeholder="HEX"
                maxLength={7}
              />
            </div>
            <p className="text-[10px] text-slate-400">{field.description}</p>
          </div>
        ))}
      </div>

      {/* Preset Palettes */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Presets de Paleta:
        </span>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = 
              colors.primary.toLowerCase() === preset.primary.toLowerCase() &&
              colors.accent.toLowerCase() === preset.accent.toLowerCase();

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => onChange({
                  primary: preset.primary,
                  accent: preset.accent,
                  text: preset.text,
                })}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500/10 text-white shadow-sm' 
                    : 'border-slate-800/80 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center -space-x-1">
                  <span className="w-3 h-3 rounded-full border border-slate-900" style={{ backgroundColor: preset.primary }} />
                  <span className="w-3 h-3 rounded-full border border-slate-900" style={{ backgroundColor: preset.accent }} />
                </div>
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
