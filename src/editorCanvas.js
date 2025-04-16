import { lines, activeLineIndex, cursorIndex } from './editorState';
import { getCanvas, releaseCanvas } from './canvasPool';
import { lineHeight, font, marginLeft } from './editorState';

const canvasMap = new Map(); // Relaciona índices de linha com seus canvases

// Cria (ou reaproveita) e posiciona o canvas da linha
export function createCanvasForLine(lineIndex, text = lines[lineIndex]) {
  if (canvasMap.has(lineIndex)) return; // Já criado

  const canvas = getCanvas();
  canvas.classList.add('lineCanvas');
  canvas.width = 800;
  canvas.height = lineHeight;
  canvas.style.top = `${lineIndex * lineHeight}px`;

  drawLine(canvas, lineIndex, text);
  document.getElementById('editorContainer').appendChild(canvas);
  canvasMap.set(lineIndex, canvas);
}

// Redesenha o texto da linha em seu canvas
export function drawLine(canvas, lineIndex, text) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = font;
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#000';
  ctx.fillText(text, marginLeft, 0);
}

// Remove canvas de linha e libera para reuso
export function removeCanvas(lineIndex) {
  const canvas = canvasMap.get(lineIndex);
  if (canvas) {
    canvas.remove();
    releaseCanvas(canvas);
    canvasMap.delete(lineIndex);
  }
}

// Redesenha a linha ativa e o cursor (se visível)
export function drawCursor(isVisible) {
  const canvas = canvasMap.get(activeLineIndex);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const lineText = lines[activeLineIndex];
  const cursorPos = cursorIndex;
  const textBeforeCursor = lineText.slice(0, cursorPos);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLine(canvas, activeLineIndex, lineText);

  if (isVisible) {
    const cursorX = ctx.measureText(textBeforeCursor).width + marginLeft;
    ctx.beginPath();
    ctx.moveTo(cursorX, 0);
    ctx.lineTo(cursorX, lineHeight);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Atualiza apenas a posição visual do cursor (opcional se for fazer cursor flutuante)
export function updateCursorPosition() {
  // No modelo atual, o cursor está embutido no canvas via drawCursor
  // Se quiser usar um elemento separado futuramente, esse método pode ser útil
}
