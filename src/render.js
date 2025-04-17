import { createCanvasForLine, drawLine, removeCanvas } from './editorCanvas.js';
import { getVisibleLineRange } from './utils.js';
import { lines } from './editorState.js';

let lastRenderedRange = [null, null];

export function renderVisibleLines(container) {
  const [first, last] = getVisibleLineRange(container);

  if (first === lastRenderedRange[0] && last === lastRenderedRange[1]) return;

  lastRenderedRange = [first, last];

  for (let i = first; i <= last; i++) {
    createCanvasForLine(i, lines[i]);
  }

  for (let i = 0; i < lines.length; i++) {
    if (i < first || i > last) {
      removeCanvas(i);
    }
  }
}

export function updateLine(index) {
  drawLine(index, lines[index]);
}