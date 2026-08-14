import React, { useState } from 'react';
import { SlideCard } from './SlideCard';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Grid, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export function InstagramFeedGrid({ slides, config, onEditSlide }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [tab, setTab] = useState('post'); // 'post' (Single Carousel Post simulator) | 'grid' (3x3 Profile Feed)

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const simulatedFeedPosts = [
    { title: 'Landing Pages que Convierten', type: 'single', bg: '#0b1329' },
    { title: 'Next.js 15 vs Remix', type: 'single', bg: '#111e3b' },
    { title: 'Estrategia de Marca Tech', type: 'single', bg: '#0e1726' },
    { title: 'UI/UX Design Systems', type: 'single', bg: '#1e1b4b' },
    { title: 'Arquitectura Cloud Serverless', type: 'single', bg: '#06202a' },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-start bg-slate-950/60">
      {/* Feed Mode Switcher */}
      <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-6">
        <button
          onClick={() => setTab('post')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            tab === 'post'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Vista Post Carrusel</span>
        </button>
        <button
          onClick={() => setTab('grid')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            tab === 'grid'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Vista Perfil Feed 3x3</span>
        </button>
      </div>

      {tab === 'post' ? (
        /* Realistic Instagram Post Simulation */
        <div className="w-full max-w-[420px] bg-black border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Post Top Header */}
          <div className="flex items-center justify-between p-3.5 border-b border-zinc-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold text-blue-400">
                  CB
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white">codexblue.dev</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <span className="text-[10px] text-zinc-400">Audio original • Codex Blue</span>
              </div>
            </div>
            <button className="text-zinc-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Slide Viewer (4:5 Ratio) */}
          <div className="relative w-full aspect-[4/5] bg-slate-950 overflow-hidden">
            {activeSlide && (
              <SlideCard
                slide={activeSlide}
                config={config}
                onEdit={onEditSlide}
                className="w-full h-full"
              />
            )}

            {/* In-post carousel navigation arrows */}
            {currentSlideIndex > 0 && (
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all z-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {currentSlideIndex < slides.length - 1 && (
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all z-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Slide Index Badge (Instagram style) */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white z-30">
              {currentSlideIndex + 1}/{slides.length}
            </div>
          </div>

          {/* Post Action Buttons */}
          <div className="p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-white">
                <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer transition-colors" />
                <MessageCircle className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                <Send className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>

              {/* Dots indicator */}
              <div className="flex items-center gap-1">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlideIndex(i)}
                    className={`rounded-full transition-all ${
                      currentSlideIndex === i 
                        ? 'w-1.5 h-1.5 bg-blue-500 scale-125' 
                        : 'w-1 h-1 bg-zinc-600 hover:bg-zinc-400'
                    }`}
                  />
                ))}
              </div>

              <Bookmark className="w-5 h-5 text-white hover:text-amber-400 cursor-pointer transition-colors" />
            </div>

            {/* Likes count & caption */}
            <div className="space-y-1 text-xs">
              <p className="font-bold text-white">1,482 Me gusta</p>
              <p className="text-zinc-200">
                <span className="font-bold text-white mr-1.5">codexblue.dev</span>
                {slides[0]?.title || 'Nuevo carrusel'} — Desliza para aprender más 🚀
              </p>
              <p className="text-[10px] text-zinc-500 uppercase">HACE 2 HORAS</p>
            </div>
          </div>
        </div>
      ) : (
        /* Profile 3x3 Grid Simulator */
        <div className="w-full max-w-[500px] bg-black border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-sm font-bold text-white">
                CODEX
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">codexblue.dev</h4>
                <ShieldCheck className="w-4 h-4 text-blue-400 fill-blue-400/20" />
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <span><b>142</b> posts</span>
                <span><b>18.4k</b> followers</span>
                <span><b>280</b> following</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-tight">
                High-Performance Web Apps & Visual Systems ⚡
              </p>
            </div>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden bg-zinc-900 p-1">
            {/* Slot 1: Current Carousel Cover */}
            <div 
              onClick={() => setTab('post')}
              className="aspect-square relative cursor-pointer group overflow-hidden bg-slate-950 border border-blue-500/40"
            >
              {slides[0] && (
                <div className="w-full h-full scale-[0.95] flex items-center justify-center p-1">
                  <div className="w-full h-full text-[6px] overflow-hidden">
                    <SlideCard slide={slides[0]} config={config} isExport={true} />
                  </div>
                </div>
              )}
              <div className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded bg-black/70 text-[9px] text-white font-mono flex items-center gap-0.5">
                <SlidersHorizontal className="w-2.5 h-2.5 text-blue-400" />
                <span>{slides.length}</span>
              </div>
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold text-white">
                Ver Post
              </div>
            </div>

            {/* Other simulated posts */}
            {simulatedFeedPosts.map((p, i) => (
              <div
                key={i}
                className="aspect-square p-2 flex flex-col justify-between text-left text-[9px] font-bold text-slate-300 border border-zinc-800/80"
                style={{ backgroundColor: p.bg }}
              >
                <span className="text-[7px] text-zinc-400 uppercase tracking-widest">// ARCHIVO</span>
                <span className="leading-tight">{p.title}</span>
                <span className="text-[7px] text-blue-400">@codexblue</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
