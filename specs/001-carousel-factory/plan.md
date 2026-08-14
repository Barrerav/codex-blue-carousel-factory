# Implementation Plan: Codex Blue Carousel Factory

**Branch**: `001-carousel-factory` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-carousel-factory/spec.md`

## Summary

Build a high-performance, client-side web application ("Codex Blue Carousel Factory") in React + Tailwind CSS that converts structured text scripts into 4:5 (1080x1350px) Instagram carousels in seconds. Key capabilities include tolerant script parsing, dynamic brand color tokens (`#070d1a`, `#3b82f6`, `#ffffff`), 3 switchable design templates (Minimal, Bold / Alto Contraste, Editorial), per-slide granular editing, simulated Instagram Feed Grid preview, and 1080x1350 pixel-perfect PNG export packaged into a single ZIP file.

## Technical Context

**Language/Version**: JavaScript (ES2022+) / TypeScript (React 18/19 JSX)
**Primary Dependencies**: React, Tailwind CSS, Lucide React (icons), `html-to-image`, `jszip`, `file-saver`, `canvas-confetti` (for export delight)
**Storage**: Client-side localStorage for saving recent drafts/projects (optional offline persistence)
**Testing**: Manual test scenarios via [quickstart.md](./quickstart.md) and component isolation
**Target Platform**: Modern Desktop/Mobile Web Browsers (Chrome, Safari, Firefox, Edge)
**Project Type**: Standalone Single-Page Web Application (SPA)
**Performance Goals**: < 100ms parse-to-preview latency, < 3s complete 6-slide 1080x1350 PNG batch export
**Constraints**: 100% Client-Side zero-backend architecture, exact 4:5 (1080x1350) canvas export resolution
**Scale/Scope**: 1-20 slides per carousel, instantaneous preview rendering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evaluation & Compliance Notes |
|-----------|--------|-------------------------------|
| **I. Pure Client-Side Zero-Friction Architecture** | PASS | All parsing, state management, and export logic execute directly in the browser with no backend requirement. |
| **II. Visual Fidelity & Strict 4:5 Canvas Geometry** | PASS | Slides and offscreen export nodes are locked to 4:5 aspect ratio (1080x1350px). |
| **III. Modular Design Templates & Brand Tokenization** | PASS | 3 modular template renderers (Minimal, Bold, Editorial) consuming reactive brand tokens. |
| **IV. Incremental & Phased Build Verification** | PASS | 4-stage sequential implementation roadmap (Parser -> Slide Templates -> Control Panel -> Exporter). |
| **V. Defensive Parsing & State Isolation** | PASS | Regex tokenization handles diverse formatting gracefully; slide edits are state-isolated. |

## Project Structure

### Documentation (this feature)

```text
specs/001-carousel-factory/
├── plan.md              # This file
├── research.md          # Phase 0 technology choices
├── data-model.md        # Phase 1 data entities & schemas
├── quickstart.md        # Phase 1 validation guide
├── contracts/           # Phase 1 interface contracts
│   ├── parser.contract.md
│   └── exporter.contract.md
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── index.css
│   ├── main.jsx
│   ├── App.jsx
│   ├── types/
│   │   └── carousel.js
│   ├── utils/
│   │   ├── parser.js
│   │   ├── exporter.js
│   │   └── defaultScript.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ControlPanel/
│   │   │   ├── ControlPanel.jsx
│   │   │   ├── ScriptEditor.jsx
│   │   │   ├── BrandColorPicker.jsx
│   │   │   ├── TemplateSelector.jsx
│   │   │   └── SlideEditorModal.jsx
│   │   ├── Preview/
│   │   │   ├── PreviewWorkspace.jsx
│   │   │   ├── CarouselTrack.jsx
│   │   │   ├── SlideCard.jsx
│   │   │   └── InstagramFeedGrid.jsx
│   │   └── Templates/
│   │       ├── MinimalTemplate.jsx
│   │       ├── BoldTemplate.jsx
│   │       └── EditorialTemplate.jsx
│   └── hooks/
│       └── useCarousel.js
```

**Structure Decision**: Clean Single-Page React Application with modular separation of UI controls, live rendering workspace, template components, and export utilities.

## Complexity Tracking

*No constitution violations identified. All modules strictly adhere to the project constitution.*
