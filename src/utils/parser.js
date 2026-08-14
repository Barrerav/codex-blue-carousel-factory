/**
 * Normalize Text Position string to one of the valid positions
 * @param {string} val 
 * @returns {'top' | 'upper-center' | 'center' | 'lower-center' | 'bottom'}
 */
function normalizeTextPosition(val) {
  if (!val) return 'center';
  const clean = val.trim().toLowerCase().replace(/[_ ]+/g, '-');
  if (['top', 'upper-center', 'center', 'lower-center', 'bottom'].includes(clean)) {
    return /** @type {any} */ (clean);
  }
  if (clean === 'upper' || clean === 'top-center') return 'upper-center';
  if (clean === 'lower' || clean === 'bottom-center') return 'lower-center';
  return 'center';
}

/**
 * Normalize Logo Position string
 * @param {string} val 
 * @returns {'global' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'}
 */
function normalizeLogoPosition(val) {
  if (!val) return 'global';
  const clean = val.trim().toLowerCase().replace(/[_ ]+/g, '-');
  if (['global', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(clean)) {
    return /** @type {any} */ (clean);
  }
  if (clean === 'topleft') return 'top-left';
  if (clean === 'topright') return 'top-right';
  if (clean === 'bottomleft') return 'bottom-left';
  if (clean === 'bottomright') return 'bottom-right';
  return 'global';
}

/**
 * Parse raw carousel script into an array of structured Slide objects.
 * 
 * Supports:
 * - Structured ChatGPT Format (TYPE, TITLE, BODY, HIGHLIGHT, VISUAL, PROMPT, TEXT_POSITION, LOGO_POSITION)
 * - Legacy Pipe Format: SLIDE 1 (HOOK): [hook text] | SLIDE N: [title] | [body]
 * - Plain Multiline and paragraph variations
 * 
 * @param {string} rawText
 * @returns {import('../types/carousel').Slide[]}
 */
export function parseScriptToSlides(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return [];
  }

  const cleanText = rawText.trim();
  if (!cleanText) {
    return [];
  }

  // Split into raw blocks while capturing headers
  const lines = cleanText.split('\n');
  const slideBlocks = [];
  let currentBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if this line is a new slide header
    const match = trimmedLine.match(/^(?:(?:SLIDE|DIAPOSITIVA|TARJETA)\s*(\d+|FINAL)?(?:\s*\(([^)]+)\))?|(HOOK|CTA))\s*[:：\-–—]?\s*(.*)$/i);

    if (match) {
      if (currentBlock) {
        slideBlocks.push(currentBlock);
      }

      const slideNum = match[1];
      const tagInsideParens = match[2];
      const directRole = match[3];
      const inlineContent = match[4] || '';

      currentBlock = {
        rawHeader: trimmedLine.split(/[:：\-–—]/)[0] || 'SLIDE',
        slideNum,
        tag: tagInsideParens || directRole || '',
        inlineContent: inlineContent.trim(),
        lines: inlineContent.trim() ? [inlineContent.trim()] : []
      };
    } else {
      if (!currentBlock) {
        // Start first slide implicitly if user didn't write "SLIDE 1"
        currentBlock = {
          rawHeader: 'SLIDE 1',
          slideNum: '1',
          tag: 'HOOK',
          inlineContent: '',
          lines: [line]
        };
      } else {
        currentBlock.lines.push(line);
      }
    }
  }

  if (currentBlock) {
    slideBlocks.push(currentBlock);
  }

  // If no blocks were extracted (e.g. just raw plain paragraphs)
  if (slideBlocks.length === 0 && cleanText) {
    const paragraphs = cleanText.split(/\n{2,}/).filter(p => p.trim());
    paragraphs.forEach((p, idx) => {
      slideBlocks.push({
        rawHeader: `SLIDE ${idx + 1}`,
        slideNum: String(idx + 1),
        tag: idx === 0 ? 'HOOK' : idx === paragraphs.length - 1 ? 'CTA' : '',
        inlineContent: '',
        lines: [p.trim()]
      });
    });
  }

  const totalSlides = slideBlocks.length;

  return slideBlocks.map((block, idx) => {
    const index = idx + 1;
    const isFirst = idx === 0;
    const isLast = idx === totalSlides - 1;

    // Check if this block contains structured key-value lines
    const structuredKeyRegex = /^(TYPE|TAG|TITLE|BODY|HIGHLIGHT|VISUAL|PROMPT|TEXT_POSITION|TEXT POSITION|LOGO_POSITION|LOGO POSITION)\s*[:：]\s*(.*)$/i;
    const hasStructuredKeys = block.lines.some(l => structuredKeyRegex.test(l.trim()));

    if (hasStructuredKeys) {
      // --- STRUCTURED PARSING (ChatGPT New Format) ---
      const fields = {
        type: '',
        tag: undefined,
        title: '',
        body: '',
        highlight: '',
        visualConcept: '',
        visualPrompt: '',
        textPosition: 'center',
        logoPosition: 'global'
      };

      let currentField = null;

      for (let j = 0; j < block.lines.length; j++) {
        const rawLine = block.lines[j];
        const lineTrimmed = rawLine.trim();

        const fieldMatch = lineTrimmed.match(structuredKeyRegex);
        if (fieldMatch) {
          const rawKey = fieldMatch[1].toUpperCase().replace(/\s+/g, '_');
          const value = fieldMatch[2];

          switch (rawKey) {
            case 'TYPE':
              currentField = 'type';
              fields.type = value.trim().toLowerCase();
              break;
            case 'TAG':
              currentField = 'tag';
              fields.tag = value.trim();
              break;
            case 'TITLE':
              currentField = 'title';
              fields.title = value.trim();
              break;
            case 'BODY':
              currentField = 'body';
              fields.body = value.trim();
              break;
            case 'HIGHLIGHT':
              currentField = 'highlight';
              fields.highlight = value.trim();
              break;
            case 'VISUAL':
              currentField = 'visualConcept';
              fields.visualConcept = value.trim();
              break;
            case 'PROMPT':
              currentField = 'visualPrompt';
              fields.visualPrompt = value.trim();
              break;
            case 'TEXT_POSITION':
              currentField = 'textPosition';
              fields.textPosition = normalizeTextPosition(value);
              break;
            case 'LOGO_POSITION':
              currentField = 'logoPosition';
              fields.logoPosition = normalizeLogoPosition(value);
              break;
            default:
              currentField = null;
              break;
          }
        } else {
          // Continuation line for multi-line fields (e.g. PROMPT or BODY)
          if (currentField && ['visualPrompt', 'body', 'visualConcept', 'title', 'highlight'].includes(currentField)) {
            if (fields[currentField]) {
              fields[currentField] += '\n' + rawLine;
            } else if (lineTrimmed) {
              fields[currentField] = rawLine;
            }
          }
        }
      }

      // Determine slide role/type
      let finalType = 'content';
      const parsedType = (fields.type || '').toLowerCase();
      if (parsedType === 'hook' || parsedType === 'portada' || (isFirst && totalSlides > 1 && !parsedType)) {
        finalType = 'hook';
      } else if (parsedType === 'cta' || parsedType === 'final' || (isLast && totalSlides > 2 && !parsedType)) {
        finalType = 'cta';
      }

      const resolvedTag = fields.tag !== undefined ? fields.tag : (block.tag || '');

      return {
        id: `slide-${index}-${Date.now().toString(36).substring(4)}`,
        index,
        totalSlides,
        type: finalType,
        rawHeader: block.rawHeader,
        tag: resolvedTag,
        title: fields.title || `Slide ${index}`,
        body: fields.body || '',
        highlight: fields.highlight || '',
        visualConcept: fields.visualConcept || '',
        visualPrompt: fields.visualPrompt || '',
        textPosition: normalizeTextPosition(fields.textPosition),
        logoPosition: normalizeLogoPosition(fields.logoPosition),
        backgroundImage: null,
        overlayOpacity: 0.65,
      };
    }

    // --- LEGACY PARSING (Pipe & Simple Multiline Format) ---
    let type = 'content';
    const tagUpper = (block.tag || '').toUpperCase();
    const headerUpper = (block.rawHeader || '').toUpperCase();

    if (
      tagUpper.includes('HOOK') ||
      tagUpper.includes('PORTADA') ||
      headerUpper.includes('HOOK') ||
      headerUpper.includes('PORTADA') ||
      (isFirst && totalSlides > 1)
    ) {
      type = 'hook';
    } else if (
      tagUpper.includes('CTA') ||
      tagUpper.includes('FINAL') ||
      headerUpper.includes('CTA') ||
      headerUpper.includes('FINAL') ||
      (isLast && totalSlides > 2)
    ) {
      type = 'cta';
    }

    // Join lines into full text
    const fullText = block.lines.join('\n').trim();

    let title = '';
    let body = '';

    // Check for pipe delimiter |
    if (fullText.includes('|')) {
      const parts = fullText.split('|');
      title = parts[0].trim();
      body = parts.slice(1).join('|').trim();
    } else {
      if (type === 'hook' || type === 'cta') {
        title = fullText;
        body = '';
      } else {
        const linesArr = block.lines.filter(l => l.trim());
        if (linesArr.length > 1) {
          title = linesArr[0].trim();
          body = linesArr.slice(1).join('\n').trim();
        } else {
          const colonIdx = fullText.indexOf(':');
          if (colonIdx > 0 && colonIdx < 60) {
            title = fullText.substring(0, colonIdx).trim();
            body = fullText.substring(colonIdx + 1).trim();
          } else {
            title = fullText;
            body = '';
          }
        }
      }
    }

    return {
      id: `slide-${index}-${Date.now().toString(36).substring(4)}`,
      index,
      totalSlides,
      type,
      rawHeader: block.rawHeader,
      tag: block.tag || '',
      title: title || `Slide ${index}`,
      body: body || '',
      highlight: '',
      visualConcept: '',
      visualPrompt: '',
      textPosition: 'center',
      logoPosition: 'global',
      backgroundImage: null,
      overlayOpacity: 0.65,
    };
  });
}
