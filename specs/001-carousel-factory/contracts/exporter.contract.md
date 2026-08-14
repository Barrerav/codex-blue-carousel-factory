# Contract: Canvas & Image Export Engine

**Feature**: `001-carousel-factory`

## Overview
Generates high-resolution (1080x1350) PNG images from rendered slide DOM nodes and packs them for batch downloading.

## Interface Contract

```typescript
export interface ExportOptions {
  slides: Slide[];
  config: CarouselConfig;
  targetWidth?: number;  // Default: 1080
  targetHeight?: number; // Default: 1350
  onProgress?: (current: number, total: number) => void;
}

export interface ExportResult {
  success: boolean;
  zipBlob?: Blob;
  singlePngBlobs?: { fileName: string; blob: Blob }[];
  error?: string;
}

export function exportCarouselToZip(
  slideNodes: HTMLElement[],
  options: ExportOptions
): Promise<ExportResult>;

export function exportSingleSlideToPng(
  slideNode: HTMLElement,
  slideIndex: number,
  config: CarouselConfig
): Promise<Blob>;
```

## Guarantees
- Every output PNG has dimensions of exactly `1080` x `1350` pixels at 72/96 DPI screen density or scaled up for ultra-sharpness.
- Fonts and styles are embedded cleanly before rasterization.
- Filename convention: `codex-blue-slide-01.png`, `codex-blue-slide-02.png`, etc.
- ZIP package: `codex-blue-carousel.zip`.
