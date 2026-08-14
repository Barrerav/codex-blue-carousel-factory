import { parseScriptToSlides } from './parser.js';
import { DEFAULT_SCRIPT } from './defaultScript.js';

console.log('--- TESTING PARSER WITH DEFAULT SCRIPT ---');
const parsed = parseScriptToSlides(DEFAULT_SCRIPT);
console.log(`Total slides parsed: ${parsed.length}`);

console.assert(parsed.length === 6, `Expected 6 slides, got ${parsed.length}`);
console.assert(parsed[0].type === 'hook', `Slide 1 should be hook, got ${parsed[0].type}`);
console.assert(parsed[1].type === 'content', `Slide 2 should be content, got ${parsed[1].type}`);
console.assert(parsed[1].title.includes('jerarquía visual'), `Slide 2 title should match`);
console.assert(parsed[1].body.includes('menos de 3 segundos'), `Slide 2 body should match`);
console.assert(parsed[5].type === 'cta', `Slide 6 should be CTA, got ${parsed[5].type}`);

console.log('--- TESTING EDGE CASE: Single Slide ---');
const single = parseScriptToSlides('SLIDE 1: Un solo hook potente');
console.assert(single.length === 1, `Expected 1 slide, got ${single.length}`);

console.log('--- TESTING EDGE CASE: Multiline without pipe ---');
const multiline = parseScriptToSlides(`SLIDE 1 (HOOK): Titulo directo
SLIDE 2
Paso Uno
Este es el cuerpo detallado del paso uno.
SLIDE FINAL (CTA): Comenta CODEX`);
console.assert(multiline.length === 3, `Expected 3 slides, got ${multiline.length}`);
console.assert(multiline[1].title === 'Paso Uno', `Title should be 'Paso Uno', got ${multiline[1].title}`);

console.log('--- TESTING NEW STRUCTURED CHATGPT FORMAT WITH COMPOSITION DIRECTION ---');
const structuredScript = `
SLIDE 1
TYPE: HOOK
TITLE: Google acaba de lanzar un nuevo monstruo de IA.
BODY: Gemini 3.7 Flash llega para programar, razonar y trabajar con agentes.
HIGHLIGHT: IA que trabaja. No solo responde.
VISUAL: Futuristic AI intelligence core emerging from a technological chamber.
PROMPT: Create a premium cinematic rendering of a glowing AI core with cyan energy pulses.
Photorealistic 8k, dark studio lighting.
TEXT_POSITION: TOP
TEXT_WIDTH: WIDE
VISUAL_FOCUS: RIGHT
LOGO_POSITION: TOP_LEFT

SLIDE 2
TYPE: CONTENT
TITLE: El poder del razonamiento híbrido
BODY: Combina velocidad de respuesta instantánea con cadenas de pensamiento profundo.
HIGHLIGHT: 10x más rápido que modelos anteriores.
VISUAL: Neural network nodes connecting at lightspeed.
PROMPT: Deep blue glowing network graph with holographic nodes in abstract 3D space.
TEXT_POSITION: CENTER
TEXT_WIDTH: MEDIUM
VISUAL_FOCUS: LEFT
LOGO_POSITION: TOP_RIGHT

SLIDE 3
TYPE: CTA
TITLE: ¿Quieres implementar agentes en tu empresa?
BODY: Escríbenos "AGENTE" por privado y te asesoramos paso a paso.
HIGHLIGHT: Cupos limitados para este mes.
VISUAL: Minimalist dark blue portal opening towards digital horizon.
PROMPT: A sleek futuristic portal door made of deep obsidian stone and blue laser lines.
TEXT_POSITION: LOWER_CENTER
TEXT_WIDTH: NARROW
VISUAL_FOCUS: FULL
LOGO_POSITION: GLOBAL
`;

const structuredParsed = parseScriptToSlides(structuredScript);
console.assert(structuredParsed.length === 3, `Expected 3 slides, got ${structuredParsed.length}`);

// Test Slide 1
console.assert(structuredParsed[0].type === 'hook', `Slide 1 should be hook, got ${structuredParsed[0].type}`);
console.assert(structuredParsed[0].title === 'Google acaba de lanzar un nuevo monstruo de IA.', `Title mismatch`);
console.assert(structuredParsed[0].highlight === 'IA que trabaja. No solo responde.', `Highlight mismatch`);
console.assert(structuredParsed[0].visualConcept.includes('Futuristic AI intelligence core'), `Visual concept mismatch`);
console.assert(structuredParsed[0].visualPrompt.includes('Photorealistic 8k'), `Multiline prompt should be captured`);
console.assert(structuredParsed[0].textPosition === 'top', `Text position should be 'top', got ${structuredParsed[0].textPosition}`);
console.assert(structuredParsed[0].textWidth === 'wide', `Text width should be 'wide', got ${structuredParsed[0].textWidth}`);
console.assert(structuredParsed[0].visualFocus === 'right', `Visual focus should be 'right', got ${structuredParsed[0].visualFocus}`);
console.assert(structuredParsed[0].logoPosition === 'top-left', `Logo position should be 'top-left', got ${structuredParsed[0].logoPosition}`);

// Test Slide 2
console.assert(structuredParsed[1].type === 'content', `Slide 2 should be content, got ${structuredParsed[1].type}`);
console.assert(structuredParsed[1].highlight === '10x más rápido que modelos anteriores.', `Slide 2 highlight mismatch`);
console.assert(structuredParsed[1].textPosition === 'center', `Slide 2 text position should be center`);
console.assert(structuredParsed[1].textWidth === 'medium', `Slide 2 text width should be medium`);
console.assert(structuredParsed[1].visualFocus === 'left', `Slide 2 visual focus should be left`);
console.assert(structuredParsed[1].logoPosition === 'top-right', `Slide 2 logo position should be top-right`);

// Test Slide 3
console.assert(structuredParsed[2].type === 'cta', `Slide 3 should be cta, got ${structuredParsed[2].type}`);
console.assert(structuredParsed[2].textPosition === 'lower-center', `Slide 3 text position should be lower-center`);
console.assert(structuredParsed[2].textWidth === 'narrow', `Slide 3 text width should be narrow`);
console.assert(structuredParsed[2].visualFocus === 'full', `Slide 3 visual focus should be full`);
console.assert(structuredParsed[2].logoPosition === 'global', `Slide 3 logo position should be global`);

console.log(' ALL PARSER TESTS (LEGACY, STRUCTURED, TEXT_WIDTH & VISUAL_FOCUS) PASSED SUCCESSFULLY!');
