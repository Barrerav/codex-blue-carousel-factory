/**
 * Parse raw carousel script into an array of structured Slide objects.
 * 
 * Supports:
 * - SLIDE 1 (HOOK): [hook text]
 * - SLIDE N: [title] | [body]
 * - SLIDE FINAL (CTA): [cta text]
 * - Varied block formats, custom numbers, missing pipes, etc.
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

  // Regex to split by slide boundary markers (e.g. SLIDE 1, SLIDE 2 (HOOK), SLIDE FINAL, DIAPOSITIVA X)
  const slideHeaderRegex = /(?:^|\n+)(?:(?:SLIDE|DIAPOSITIVA|TARJETA)\s*(?:\d+|FINAL)?(?:\s*\([^)]+\))?|HOOK|CTA)\s*[:：\-–—]?\s*/i;

  // Split into raw blocks while capturing headers
  const lines = cleanText.split('\n');
  const slideBlocks = [];
  let currentBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (currentBlock && currentBlock.lines.length > 0) {
        // Keep empty line inside a block if already has content
        currentBlock.lines.push('');
      }
      continue;
    }

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
          lines: [trimmedLine]
        };
      } else {
        currentBlock.lines.push(trimmedLine);
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

    // Determine slide role/type
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
        // Hooks and CTAs are predominantly title/statement driven
        title = fullText;
        body = '';
      } else {
        // For standard content without pipe, split on first line break or punctuation
        const linesArr = block.lines.filter(l => l.trim());
        if (linesArr.length > 1) {
          title = linesArr[0].trim();
          body = linesArr.slice(1).join('\n').trim();
        } else {
          // If single line without pipe, check for colon or bullet
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
      tag: block.tag || (type === 'hook' ? 'HOOK' : type === 'cta' ? 'CTA' : `0${index}`),
      title: title || `Slide ${index}`,
      body: body || '',
    };
  });
}
