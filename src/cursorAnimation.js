import { drawCursor } from './editorCanvas.js';

let cursorVisible = true;
let lastBlink = performance.now();
const blinkInterval = 500;

export function startCursorAnimation() {
  function renderLoop(timestamp) {
    if (timestamp - lastBlink >= blinkInterval) {
      cursorVisible = !cursorVisible;
      drawCursor();
      lastBlink = timestamp;
    }
    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);
}

export function getCursorVisibility() {
  return cursorVisible;
}

export function setCursorVisibility(visible) {
  cursorVisible = visible;
  lastBlink = performance.now();
} 