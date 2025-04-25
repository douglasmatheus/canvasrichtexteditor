// import { canvasPool, createCanvasForLine, removeCanvas } from './canvasPool.js';
import { createCanvasForLine, drawLine, removeCanvas } from './editorCanvas.js';
import { getVisibleLineRange } from './utils.js';
import { lines } from './editorState.js';

let lastRenderedRange = [null, null];

export function renderVisibleLines(container, lineHeight, totalLines) {
  const [first, last] = getVisibleLineRange(container, lineHeight, totalLines);

  if (first === lastRenderedRange[0] && last === lastRenderedRange[1]) return;

  lastRenderedRange = [first, last];

  for (let i = first; i <= last; i++) {
    createCanvasForLine(i, lines.value[i]);
  }

  for (let i = 0; i < lines.value.length; i++) {
    if (i < first || i > last) {
      removeCanvas(i);
    }
  }
}

export function updateLine(index) {
  drawLine(index, lines.value[index]);
}