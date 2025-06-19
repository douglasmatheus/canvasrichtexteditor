import { lineHeight } from './editorState.js';

const pool = [];

export function getFromPool(width) {
  let canvas;
  if (pool.length > 0) {
    canvas = pool.pop();
  } else {
    canvas = createNewCanvas();
  }
  
  canvas.width = width;
  canvas.height = lineHeight;
  return canvas;
}

export function returnToPool(canvas) {
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  if (canvas) {
    pool.push(canvas);
  }
}

function createNewCanvas() {
  const canvas = document.createElement('canvas');
  canvas.className = 'lineCanvas';
  canvas.style.position = 'absolute';
  return canvas;
}

export function getCanvasAt(index) {
  return document.querySelector(`.lineCanvas[data-line="${index}"]`);
}
