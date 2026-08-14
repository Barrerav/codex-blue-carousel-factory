# Contract: Script Parser Engine

**Feature**: `001-carousel-factory`

## Overview
Parses unstructured or semi-structured plain text into an array of normalized `Slide` objects.

## Interface Contract

```typescript
export interface ParseScriptOptions {
  defaultHookTitle?: string;
  defaultCtaTitle?: string;
}

export function parseScriptToSlides(
  rawText: string,
  options?: ParseScriptOptions
): Slide[];
```

## Input Format Patterns Supported

### Pattern 1: Standard Colon & Pipe Format
```text
SLIDE 1 (HOOK): 5 Errores que destruyen tu web antes de lanzar
SLIDE 2: El diseño no vende | Si no tienes jerarquía visual, el usuario se va en 3 segundos.
SLIDE 3: Carga lenta | 1 segundo de retraso te cuesta el 20% de tus conversiones.
SLIDE FINAL (CTA): ¿Quieres una web que convierta de verdad? Síguenos en @codexblue
```

### Pattern 2: Multi-line Block Format
```text
SLIDE 1
Cómo optimizar tu embudo

SLIDE 2
Paso 1: Simplifica tu oferta
Menos opciones generan más conversiones.

SLIDE 3 (CTA)
Guarda este post para tu próximo lanzamiento
```

## Output Guarantee
- Returns an array with length equal to the number of parsed slides (minimum 1 if non-empty).
- Each slide has `index` set (1-based) and `totalSlides` updated to match array length.
- Special roles (`hook`, `content`, `cta`) are correctly assigned.
