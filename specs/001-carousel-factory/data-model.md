# Data Model: Codex Blue Carousel Factory

**Feature**: `001-carousel-factory`
**Status**: Completed

## 1. Entities & Types

### Slide
Represents an individual slide within the carousel.

```typescript
export type SlideType = 'hook' | 'content' | 'cta';

export interface Slide {
  id: string;              // Unique identifier (e.g., 'slide-1', 'slide-2')
  index: number;          // 1-based index (e.g., 1, 2, 3...)
  totalSlides: number;    // Total slide count in carousel (e.g., 7)
  type: SlideType;        // Type: 'hook' (first), 'content' (middle), 'cta' (last)
  rawHeader?: string;     // Raw header line (e.g., 'SLIDE 1 (HOOK)')
  title: string;          // Main title or hook statement
  body: string;           // Supporting body copy, bullet points, or subtext
  tag?: string;           // Optional slide tag/pill (e.g., 'TIP 01', 'ESTRATEGIA')
  accentKeyword?: string; // Highlighted word in title (optional)
}
```

### BrandColors
Brand color configuration customized via hex inputs.

```typescript
export interface BrandColors {
  primary: string; // Base background color (Default: '#070d1a')
  accent: string;  // Accent/highlight color (Default: '#3b82f6')
  text: string;    // Primary text color (Default: '#ffffff')
}
```

### TemplateId
Supported design templates.

```typescript
export type TemplateId = 'minimal' | 'bold' | 'editorial';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  fontHeading: string;
  fontBody: string;
}
```

### CarouselConfig
Global configuration for rendering the carousel.

```typescript
export interface CarouselConfig {
  template: TemplateId;
  brandColors: BrandColors;
  watermarkText: string;   // Default: 'CODEX BLUE'
  showWatermark: boolean;  // Default: true
  showSlideNumbers: boolean;// Default: true
  aspectRatio: '4:5';      // Fixed to 4:5 (1080x1350)
}
```

### CarouselProject
Root state containing all active project data.

```typescript
export interface CarouselProject {
  rawScript: string;
  slides: Slide[];
  config: CarouselConfig;
  activeSlideId: string | null;
  viewMode: 'carousel' | 'feed-grid';
  isExporting: boolean;
}
```

## 2. Validation & Normalization Rules

1. **Slide Count**: Minimum 1 slide, maximum unbounded (typical Instagram limit is 10-20 slides).
2. **Slide Type Assignment**:
   - `Slide[0]` defaults to `'hook'` if marked or if first slide.
   - `Slide[N-1]` defaults to `'cta'` if marked or if final slide.
   - Intermediate slides are `'content'`.
3. **Hex Color Validation**:
   - Validates regex `/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/`.
   - If invalid during typing, uses last valid value or default fallback.
4. **Text Safety**:
   - Strips leading/trailing whitespace.
   - Preserves intentional line breaks in body text.
