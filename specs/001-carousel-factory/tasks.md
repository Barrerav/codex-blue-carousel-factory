# Tasks: Codex Blue Carousel Factory

**Feature**: `001-carousel-factory` | **Date**: 2026-08-14 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, bundler setup, styling tokens, and core dependencies.

- [x] T001 Initialize React + Vite project with dependencies (`lucide-react`, `html-to-image`, `jszip`, `file-saver`, `canvas-confetti`) in `package.json`
- [x] T002 [P] Configure Tailwind CSS, fonts, and dark mode theme tokens in `tailwind.config.js` and `src/index.css`

---

## Phase 2: Foundational (Parser & Data Model)

**Purpose**: Core data models, sample scripts, and resilient script tokenizer that all downstream components depend on.

- [x] T003 [P] Define data types and default pre-filled sample script in `src/types/carousel.js` and `src/utils/defaultScript.js`
- [x] T004 Implement robust script parser in `src/utils/parser.js` supporting HOOK, `Title | Body`, and CTA formats
- [x] T005 Implement reactive carousel state management hook in `src/hooks/useCarousel.js`

**Checkpoint**: Parser and state model verified — UI component development can now proceed.

---

## Phase 3: User Story 1 - Slide Components & 3 Design Templates (Priority: P1) 🎯 MVP

**Goal**: Render structured slides into visual 4:5 Instagram cards using 3 distinct templates (Minimal, Bold, Editorial) with brand tokens, watermark, and slide numbers.

**Independent Test**: Load parsed slides into preview track and verify all 3 templates render correctly at 4:5 aspect ratio with proper hierarchy.

- [x] T006 [P] [US1] Create Minimal Template component in `src/components/Templates/MinimalTemplate.jsx`
- [x] T007 [P] [US1] Create Bold / Alto Contraste Template component in `src/components/Templates/BoldTemplate.jsx`
- [x] T008 [P] [US1] Create Editorial Template component in `src/components/Templates/EditorialTemplate.jsx`
- [x] T009 [US1] Create SlideCard container component with strict 4:5 aspect ratio, watermark, and slide number in `src/components/Preview/SlideCard.jsx`
- [x] T010 [US1] Create horizontal scrollable preview track with navigation controls in `src/components/Preview/CarouselTrack.jsx`

**Checkpoint**: At this point, any parsed slide can be visually rendered across all 3 templates in 4:5 proportion.

---

## Phase 4: User Story 2 - Control Panel, Brand Colors & Template Selector (Priority: P2)

**Goal**: Provide a clean 2-panel workstation allowing users to paste scripts, adjust primary/accent/text hex colors, and toggle design templates with sub-second feedback.

**Independent Test**: Paste new text in the left panel, adjust color pickers, switch templates, and verify immediate visual reaction in the right preview panel.

- [x] T011 [P] [US2] Create ScriptEditor textarea with syntax highlighting/guides in `src/components/ControlPanel/ScriptEditor.jsx`
- [x] T012 [P] [US2] Create BrandColorPicker component with Hex inputs and presets in `src/components/ControlPanel/BrandColorPicker.jsx`
- [x] T013 [P] [US2] Create TemplateSelector visual picker component in `src/components/ControlPanel/TemplateSelector.jsx`
- [x] T014 [US2] Assemble ControlPanel container and responsive 2-panel layout in `src/components/ControlPanel/ControlPanel.jsx` and `src/components/Preview/PreviewWorkspace.jsx`

**Checkpoint**: Complete 2-panel interactive editor is functional with real-time reactive updates.

---

## Phase 5: User Story 3 - Per-Slide Live Editing & Regeneration (Priority: P3)

**Goal**: Allow granular editing of individual slide title and body text without rewriting the main script or resetting other slides.

**Independent Test**: Click edit on Slide 2, change its content in the modal/drawer, and verify that Slide 2 updates while preserving other slides.

- [x] T015 [US3] Create SlideEditorModal component for editing individual slide copy in `src/components/ControlPanel/SlideEditorModal.jsx`
- [x] T016 [US3] Connect granular slide mutation handlers in `src/hooks/useCarousel.js` and `src/components/Preview/SlideCard.jsx`

**Checkpoint**: Granular slide editing is active and synchronized.

---

## Phase 6: User Story 4 - High-Resolution PNG Export & Instagram Feed Grid (Priority: P4)

**Goal**: Enable high-resolution 1080x1350px batch PNG export into a single ZIP file and provide a simulated Instagram Feed Grid preview.

**Independent Test**: Toggle Feed Grid view to verify 3x3 layout, then trigger batch export and confirm all PNG files download at 1080x1350px.

- [x] T017 [P] [US4] Implement 1080x1350px PNG rendering and ZIP export engine in `src/utils/exporter.js`
- [x] T018 [P] [US4] Create Instagram Feed Grid simulation component in `src/components/Preview/InstagramFeedGrid.jsx`
- [x] T019 [US4] Connect export buttons, download progress states, and confetti celebration in `src/components/Header.jsx` and `src/App.jsx`

**Checkpoint**: Full export and feed preview pipeline verified.

---

## Phase 7: Polish & End-to-End Verification

**Purpose**: Header navigation, sample script loading, responsive polish, and validation against quickstart scenarios.

- [x] T020 [P] Create Header navigation with Codex Blue branding, quick sample loader, and status bar in `src/components/Header.jsx`
- [x] T021 Execute full validation against `specs/001-carousel-factory/quickstart.md` scenarios and build verification
