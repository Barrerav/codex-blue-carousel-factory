# Feature Specification: Codex Blue Carousel Factory

**Feature Branch**: `001-carousel-factory`

**Created**: 2026-08-14

**Status**: Draft

**Input**: User description: "Quiero que construyas una app web que sea una fábrica de carruseles para Instagram. Se llama Codex Blue Carousel Factory. Permite pegar un guion estructurado, previsualizar en 4:5 (1080x1350), personalizar colores de marca, alternar 3 plantillas de diseño, editar slides individuales, previsualizar en grid de feed y exportar todos los slides como imágenes PNG en alta resolución."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Script Parsing & Real-Time 4:5 Preview (Priority: P1)

As a social media creator or agency developer, I want to paste a structured text script into a dedicated input area and instantly see a live, interactive 4:5 carousel preview so that I can draft Instagram carousels in seconds without manual graphic design tools.

**Why this priority**: Core value proposition. Without instant script parsing and live 4:5 visual rendering, the application cannot function.

**Independent Test**: Paste a multi-slide script with HOOK, standard slides (`Title | Body`), and CTA. Verify that individual 4:5 visual cards are instantly rendered with correct text hierarchy, slide numbering, and watermark.

**Acceptance Scenarios**:

1. **Given** an empty script input, **When** the user pastes a standard script with `SLIDE 1 (HOOK): ...`, `SLIDE 2: Title | Body`, and `SLIDE FINAL (CTA): ...`, **Then** the system parses the input into structured slide cards and displays them in a horizontal preview.
2. **Given** parsed slides, **When** examining each slide preview, **Then** each slide displays in 4:5 aspect ratio with "CODEX BLUE" watermark, slide counter (e.g., "1/5"), and hierarchical typography based on default brand colors (`#070d1a`, `#3b82f6`, `#ffffff`).
3. **Given** an invalid or loosely formatted script line, **When** the parser runs, **Then** it gracefully captures the text without crashing and assigns default fallback slide roles.

---

### User Story 2 - Brand Palette Customization & Design Template Switching (Priority: P2)

As a brand manager or content creator, I want to adjust the brand colors (Background, Accent, Text) and switch between 3 curated design templates ("Minimal", "Bold / Alto Contraste", "Editorial") so that the carousel matches varying client visual identities and moods.

**Why this priority**: Visual differentiation and agency-grade versatility. Empowers users to produce distinct styles beyond a single static look.

**Independent Test**: Change hex values for primary, accent, and text colors, then toggle between "Minimal", "Bold", and "Editorial" templates. Verify that colors and layout/typography shift dynamically across all slide previews.

**Acceptance Scenarios**:

1. **Given** the live preview, **When** the user inputs a new hex code for Primary Background, Accent, or Text, **Then** all slides immediately update their color tokens.
2. **Given** an active carousel, **When** the user selects the "Bold / Alto Contraste" template, **Then** the slides adopt heavy sans-serif typography, prominent accent callouts, and high-impact hierarchy.
3. **Given** an active carousel, **When** the user selects the "Editorial" template, **Then** the slides adapt sophisticated serif/sans pairings, refined margins, and elegant spacing.

---

### User Story 3 - Per-Slide Live Editing & Regeneration (Priority: P3)

As a copywriter, I want to edit or tweak individual slide titles and bodies directly without re-typing or losing my changes in the main script textarea, so that I can refine copy iteratively.

**Why this priority**: Enhances workflow efficiency during fine-tuning copy before final export.

**Independent Test**: Select slide 3, modify its title and body text in the slide editor, and verify that the preview updates that slide while preserving all other slides intact.

**Acceptance Scenarios**:

1. **Given** a generated carousel, **When** the user edits the text on a specific slide via the slide editor, **Then** that slide's preview updates in real time.
2. **Given** individually modified slides, **When** the user edits the main script textarea, **Then** the system preserves state consistency with clear synchronization.

---

### User Story 4 - High-Resolution PNG Batch Export & Instagram Feed Grid Preview (Priority: P4)

As a social media publisher, I want to see how the carousel looks within a simulated Instagram feed grid and click a single button to download all slides as individual 1080x1350 PNG images, so that they are immediately ready for publication.

**Why this priority**: Final delivery step. Completes the end-to-end publishing pipeline.

**Independent Test**: Trigger "Instagram Feed Grid" mode to view the grid simulation, then click "Descargar todas las imágenes" and verify that all slides download as crisp 1080x1350 PNG files.

**Acceptance Scenarios**:

1. **Given** a ready carousel, **When** the user toggles the Feed Grid view, **Then** the system displays a grid preview mimicking an Instagram profile feed.
2. **Given** any number of slides, **When** the user clicks "Descargar todas las imágenes", **Then** the system renders each slide at 1080x1350px resolution and initiates batch PNG download.

---

### Edge Cases

- **Empty or Whitespace-Only Input**: System displays a helpful placeholder state with sample script guidance.
- **Single-Slide Scripts**: System renders a single slide with "1/1" counter and watermark without layout distortion.
- **Large Slide Count (e.g., 15+ slides)**: Horizontal preview provides smooth scroll indicators; export handles sequential processing without browser freezing.
- **Long Text Overflow**: Slides utilize responsive typography scaling or balanced line wrapping to prevent text overflowing the 4:5 frame.
- **Invalid Hex Codes**: Color inputs validate hex patterns and fallback gracefully to default brand colors if incomplete.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a multi-line script input supporting the standard syntax:
  - `SLIDE 1 (HOOK): [hook text]`
  - `SLIDE N: [title] | [body]`
  - `SLIDE FINAL (CTA): [cta text]`
- **FR-002**: System MUST parse the input into a structured slide collection identifying slide type (Hook, Content, CTA), title, and body content.
- **FR-003**: System MUST render each slide in strict 4:5 aspect ratio (1080x1350 proportion) in a horizontal scrollable preview panel.
- **FR-004**: System MUST display brand tokens including customizable Primary Background (`#070d1a`), Brand Accent (`#3b82f6`), and Text Color (`#ffffff`) with live color picker/hex inputs.
- **FR-005**: System MUST include a configurable watermark ("CODEX BLUE") with wide tracking and a discrete slide index counter ("X/N") on every slide.
- **FR-006**: System MUST offer 3 distinct design templates:
  - **Minimal**: Clean sans-serif, balanced whitespace, subtle accent lines.
  - **Bold / Alto Contraste**: Heavy display typography, prominent accent badges, high impact.
  - **Editorial**: Elegant styling, sophisticated typography pairings, magazine-style layout.
- **FR-007**: System MUST allow editing individual slide contents directly without resetting other slides.
- **FR-008**: System MUST provide an Instagram Feed Grid preview mode simulating a mobile feed view.
- **FR-009**: System MUST export all slides as individual 1080x1350 PNG images via a single batch download action.
- **FR-010**: System MUST adopt a 2-panel workstation layout (Editor/Controls on left, Live Carousel Workspace on right).

### Key Entities

- **Slide**: Represents a single carousel page with attributes: `id`, `slideNumber`, `totalSlides`, `type` (`hook`, `content`, `cta`), `title`, `body`, `customOverrides`.
- **CarouselConfig**: Global styling configuration with attributes: `templateId` (`minimal`, `bold`, `editorial`), `brandColors` (`primary`, `accent`, `text`), `watermarkText`, `showWatermark`, `showSlideNumbers`.
- **CarouselProject**: Root state container containing the raw script, parsed `Slide[]` array, and active `CarouselConfig`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can paste a multi-slide script and see a rendered 4:5 preview in under 1 second.
- **SC-002**: Complete workflow from script pasting to downloading exported PNGs takes less than 10 seconds.
- **SC-003**: 100% of exported slide images match the exact 1080x1350 pixel dimensions with zero text clipping or visual distortion.
- **SC-004**: Users can seamlessly switch between all 3 design templates with zero latency and full visual recalculation.

## Assumptions

- **Browser Environment**: Modern web browser (Chrome, Edge, Safari, Firefox) supporting HTML5 Canvas and modern CSS grid/flexbox.
- **Client-Side Export**: Export uses in-browser DOM-to-canvas rendering without requiring external rendering APIs.
- **Default Sample Data**: App loads with a pre-filled sample script so first-time users immediately see a live carousel without having to write one from scratch.
