<!--
Sync Impact Report:
- Version change: Initial -> 1.0.0
- Ratified: 2026-08-14
- Status: Ratified
- Added sections: Core Principles (I-V), Technical & Design Constraints, Quality & Verification Standards, Governance
-->

# Codex Blue Carousel Factory Constitution

## Core Principles

### I. Pure Client-Side Zero-Friction Architecture
The application MUST run completely in-browser without requiring backend processing for parsing, preview generation, or graphic exporting. The entire workflow from script input to final carousel export MUST execute instantaneously with zero setup friction, achieving a production-ready carousel in under 10 seconds.

### II. Visual Fidelity & Strict 4:5 Canvas Geometry
All slide renderings and generated export images MUST strictly maintain the Instagram 4:5 portrait ratio (1080x1350px native resolution). Typography, watermarks, slide counters, and padding MUST be dynamically scaled or rendered so that exported PNG assets match preview visuals with pixel-perfect fidelity.

### III. Modular Design Templates & Brand Tokenization
Design styles MUST be strictly decoupled from slide content. The platform MUST support distinct visual templates ("Minimal", "Bold / Alto Contraste", "Editorial") altering typography, hierarchy, and spatial arrangement. Brand identity tokens (Base Background `#070d1a`, Brand Accent `#3b82f6`, Text `#ffffff`) MUST remain fully customizable via hex controls without breaking visual balance.

### IV. Incremental & Phased Build Verification
Implementation MUST proceed strictly in sequential phases:
1. Script Parser & Normalized Data Model
2. Slide Components & Design Templates
3. Control Panel & State Management (Live per-slide editing)
4. Export Pipeline (High-res 1080x1350 PNG & Instagram Feed Grid)
Each phase MUST be independently tested and verified for functional correctness before proceeding to dependent modules.

### V. Defensive Parsing & State Isolation
The parser MUST handle malformed user inputs, variable slide counts, unconventional line breaks, and missing delimiters gracefully without throwing unhandled exceptions. Slide edits made individually MUST persist and never trigger destructive cascades on the rest of the carousel data.

## Technical & Design Constraints

- **Framework & Styling**: React with modern functional components, standard hooks, and Tailwind CSS.
- **Design Aesthetic**: Dark mode premium web development agency aesthetic, high contrast, clean typography, expansive whitespace, non-cluttered hierarchy.
- **Export Engine**: In-browser DOM-to-Canvas / DOM-to-Image rendering (e.g. `html-to-image`) outputting standard ZIP / batch PNG files at exactly 1080x1350px per slide.
- **Responsiveness**: Responsive 2-panel workstation layout (Control/Script Editor on left, Horizontal Live Carousel / Feed Grid on right).

## Development Workflow & Quality Gates

1. **Parser Verification**: Unit-level validation verifying parsing of HOOK, standard slides (`Title | Body`), and CTA slides across varied edge cases.
2. **Template Accuracy**: Visual audit of all 3 design templates confirming typography scale, contrast ratios, and watermark positioning.
3. **Export Validation**: End-to-end download test verifying 1080x1350px resolution and visual fidelity across all generated images.

## Governance

This Constitution represents the supreme technical and design directive for Codex Blue Carousel Factory. Any architectural shift, template addition, or dependency change MUST comply with these principles. Amendments require formal version increments and documentation updates.

**Version**: 1.0.0 | **Ratified**: 2026-08-14 | **Last Amended**: 2026-08-14
