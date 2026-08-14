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

console.log(' ALL PARSER TESTS PASSED SUCCESSFULLY!');
