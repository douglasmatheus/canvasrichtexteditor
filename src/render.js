// import { canvasPool, createCanvasForLine, removeCanvas } from './canvasPool.js';
import { createCanvasForLine, drawLine, removeCanvas } from './editorCanvas.js';
import { getVisibleLineRange } from './utils.js';
import { lines } from './editorState.js';

let lastRenderedRange = [null, null];

export function renderVisibleLines(container, lineHeight, totalLines) {
  const [first, last] = getVisibleLineRange(container, lineHeight, totalLines);

  // Se não houver mudança no range visível e não for uma renderização forçada, não faz nada
  if (first === lastRenderedRange[0] && last === lastRenderedRange[1]) return;

  // Remove todos os canvas existentes na área visível
  const existingCanvases = container.querySelectorAll('.lineCanvas');
  existingCanvases.forEach(canvas => {
    const lineIndex = parseInt(canvas.dataset.line);
    if (lineIndex >= first - 5 && lineIndex <= last + 5) {
      removeCanvas(lineIndex);
    }
  });

  // Cria canvas para linhas visíveis
  for (let i = first; i <= last; i++) {
    createCanvasForLine(i);
  }

  lastRenderedRange = [first, last];
}

export function updateLine(index) {
  const canvas = document.querySelector(`.lineCanvas[data-line="${index}"]`);
  if (canvas) {
    drawLine(canvas, index, lines.value[index]);
  }
}

// Função para limpar todos os canvas (útil em casos de reinicialização)
export function clearAllCanvases() {
  const container = document.getElementById('editorContainer');
  if (!container) return;
  
  const canvases = container.querySelectorAll('.lineCanvas');
  canvases.forEach(canvas => {
    const lineIndex = parseInt(canvas.dataset.line);
    removeCanvas(lineIndex);
  });
  lastRenderedRange = [null, null];
}