# Quickstart & Verification Guide: Codex Blue Carousel Factory

**Feature**: `001-carousel-factory`

## Prerequisites
- Node.js >= 18.0.0
- npm / npx

## Setup & Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

## Validation Scenarios

### Scenario 1: Script Parsing & Instant 4:5 Preview
1. Open the application at `http://localhost:5173`.
2. Observe the default pre-filled sample script.
3. Verify that 6 slide cards appear in horizontal scroll order with 4:5 aspect ratio.
4. Verify slide 1 contains the Hook styling, slides 2-5 contain content, and slide 6 contains CTA styling.
5. Verify the "CODEX BLUE" watermark and "1/6", "2/6" counters appear in their respective corners.

### Scenario 2: Brand Color Tokens & Hex Switching
1. In the left panel, change Base Background to `#0f172a` (slate dark).
2. Change Brand Accent to `#10b981` (emerald green).
3. Verify that all slides instantly reflect the updated color tokens without lag or reloading.

### Scenario 3: Design Template Switcher
1. Select "Bold / Alto Contraste": Verify heavy display headers and high-contrast badges.
2. Select "Editorial": Verify elegant typography pairings with subtle dividers.
3. Select "Minimal": Verify return to technical Swiss design aesthetic.

### Scenario 4: Per-Slide Live Editing
1. Click the "Edit" button on Slide 2.
2. Modify the Title to `"Título Personalizado"` and Body to `"Cuerpo actualizado con éxito."`.
3. Verify that Slide 2 updates in real-time in the preview while Slide 1 and Slide 3-6 remain untouched.

### Scenario 5: Instagram Feed Grid Mode
1. Click the "Feed Grid" toggle button in the header/preview toolbar.
2. Verify that the view transforms into a 3x3 Instagram mobile feed simulation.

### Scenario 6: High-Resolution 1080x1350 PNG Export
1. Click "Descargar todas las imágenes".
2. Confirm that progress indicator shows slide generation.
3. Download the resulting ZIP package and inspect extracted PNG images.
4. Verify image dimensions are exactly 1080x1350 px and visual quality is razor-sharp.
