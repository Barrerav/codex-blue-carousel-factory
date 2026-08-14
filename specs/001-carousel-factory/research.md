# Research: Codex Blue Carousel Factory

**Feature**: `001-carousel-factory`
**Status**: Completed

## 1. High-Resolution DOM-to-Image Rendering for 1080x1350 PNGs

- **Decision**: Use `html-to-image` (`toPng` / `toBlob`) paired with `jszip` and `file-saver` for batch downloading.
- **Rationale**:
  - `html-to-image` parses CSS modern features (gradients, flexbox, Tailwind classes, web fonts) accurately using SVG foreignObject and Canvas rasterization in-browser.
  - By rendering against an unconstrained container with exact `pixelRatio` or fixed dimensions (`1080` width, `1350` height), it guarantees 100% pixel-perfect 1080x1350 PNG export.
  - `jszip` bundles multi-slide PNGs into a single `codex-blue-carousel.zip` file, preventing browser download blocking or multiple popup warnings.
- **Alternatives Considered**:
  - `html2canvas`: Older, less accurate with modern CSS features like CSS grid, flex gap, and SVG watermarks.
  - Server-side Puppeteer: Breaks Constitution Principle I (Pure Client-Side Zero-Friction Architecture) by introducing backend infrastructure and latency.

## 2. Robust Script Parsing Strategy

- **Decision**: Hybrid Line-by-Line Regex Tokenizer with Tolerant Fallback Parsing.
- **Rationale**:
  - Creators paste varying formats: standard `SLIDE 1 (HOOK): ...`, `SLIDE 2: Title | Body`, `SLIDE FINAL (CTA): ...`, or variations with/without colons, parentheses, or pipe separators.
  - The parser normalizes line breaks, identifies slide boundary markers (`SLIDE \d+`, `HOOK`, `CTA`, `PORTADA`), extracts title and body, and categorizes slide types (`hook`, `content`, `cta`).
  - If a slide lacks a pipe delimiter (`|`), the parser treats the first sentence/line as the title and remainder as body.
- **Alternatives Considered**:
  - Strict AST parser / JSON-only input: High friction for users who want to copy-paste scripts directly from ChatGPT/Claude.

## 3. Template Architecture & Dynamic Brand Tokens

- **Decision**: Dedicated template renderer components sharing a unified `SlideRenderProps` contract and CSS custom property / inline style tokens.
- **Rationale**:
  - 3 distinct templates:
    1. **Minimal**: Technical, clean sans-serif (Inter/Geist feel), subtle borders, fine geometric lines, ultra-clean balance.
    2. **Bold / Alto Contraste**: Heavy display headers, high-contrast accent blocks, pill badges, intense focal points.
    3. **Editorial**: Refined serif + sans pairing, delicate divider rules, magazine-style quote layout.
  - Dynamic tokens (`--cb-primary`, `--cb-accent`, `--cb-text`) are injected into the container style, allowing instant runtime hex customization without stylesheet re-compilation.
- **Alternatives Considered**:
  - Single template with toggles: Limits visual variety and fails requirement to provide 3 distinct aesthetics.

## 4. UI/UX Layout & Instagram Feed Grid

- **Decision**: 2-panel split workstation (Left: Collapsible Script & Brand Editor; Right: Live Horizontal Carousel Preview + Instagram Feed Simulation toggle).
- **Rationale**:
  - Left panel provides immediate access to the large script textarea, hex color pickers, template switcher, and slide list.
  - Right panel gives a live, responsive 4:5 preview with drag/scroll navigation, plus an Instagram Feed Grid modal that places the slides in a simulated 3x3 Instagram profile feed with native UI chrome.
