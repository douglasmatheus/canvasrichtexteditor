import { lines, activeLineIndex, cursorIndex, lineHeight, font, marginLeft } from './editorState.js';
import { getFromPool, returnToPool, getCanvasAt } from './canvasPool.js';
import { getCursorVisibility } from './cursorAnimation.js';

const canvasMap = new Map(); // Relaciona índices de linha com seus canvases

function cleanCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  // Salva a largura e altura originais
  const width = canvas.width;
  const height = canvas.height;
  
  // Reset completo do canvas
  ctx.clearRect(0, 0, width, height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Redefine o tamanho para forçar uma limpeza completa
  canvas.width = width;
  canvas.height = height;
  
  // Reinicia as configurações padrão
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.lineWidth = 1;
}

// Cria (ou reaproveita) e posiciona o canvas da linha
export function createCanvasForLine(lineIndex) {
  if (canvasMap.has(lineIndex)) {
    // Se já existe, limpa e redesenha
    const existingCanvas = canvasMap.get(lineIndex);
    cleanCanvas(existingCanvas);
    drawLine(existingCanvas, lineIndex, lines.value[lineIndex]);
    return;
  }

  const container = document.getElementById('editorContainer');
  const canvas = getFromPool(container.clientWidth);
  
  cleanCanvas(canvas);
  canvas.dataset.line = lineIndex;
  canvas.style.top = `${lineIndex * lineHeight}px`;

  drawLine(canvas, lineIndex, lines.value[lineIndex]);
  container.appendChild(canvas);
  canvasMap.set(lineIndex, canvas);
}

// Redesenha o texto da linha em seu canvas
export function drawLine(canvas, lineIndex, text) {
  cleanCanvas(canvas);
  const ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = '#000';
  ctx.fillText(text || '', marginLeft, 0);
}

// Remove canvas de linha e libera para reuso
export function removeCanvas(lineIndex) {
  const canvas = canvasMap.get(lineIndex);
  if (canvas) {
    cleanCanvas(canvas);
    returnToPool(canvas);
    canvasMap.delete(lineIndex);
  }
}

// Redesenha a linha ativa e o cursor (se visível)
export function drawCursor(forceVisible = null) {
  const lineIdx = activeLineIndex.value;
  const canvas = canvasMap.get(lineIdx);
  if (!canvas) {
    createCanvasForLine(lineIdx);
    return;
  }

  const ctx = canvas.getContext('2d');
  const lineText = lines.value[lineIdx];
  
  // Limpa e redesenha a linha
  cleanCanvas(canvas);
  drawLine(canvas, lineIdx, lineText);

  // Decide se o cursor deve ser visível
  const isVisible = forceVisible !== null ? forceVisible : getCursorVisibility();
  
  if (isVisible) {
    const textBeforeCursor = lineText.slice(0, cursorIndex.value);
    const cursorX = ctx.measureText(textBeforeCursor).width + marginLeft;
    
    // Desenha o cursor com anti-aliasing
    ctx.beginPath();
    ctx.moveTo(Math.floor(cursorX) + 0.5, 4);
    ctx.lineTo(Math.floor(cursorX) + 0.5, lineHeight - 4);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// Atualiza apenas a posição visual do cursor (opcional se for fazer cursor flutuante)
export function updateCursorPosition() {
  const canvas = canvasMap.get(activeLineIndex.value);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.font = font;
  const textBeforeCursor = lines.value[activeLineIndex.value].slice(0, cursorIndex.value);
  return marginLeft + ctx.measureText(textBeforeCursor).width;
}

export function updateCanvasPositionsFromIndex(startIndex) {
  for (let i = startIndex; i < lines.value.length; i++) {
    const canvas = canvasMap.get(i);
    if (canvas) {
      canvas.style.top = `${i * lineHeight}px`;
      // Limpa e redesenha a linha
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLine(canvas, i, lines.value[i]);
    }
  }
}

export function ensureLineVisible(lineIndex) {
  const container = document.getElementById('editorContainer');
  const lineTop = lineIndex * lineHeight;
  const lineBottom = (lineIndex + 1) * lineHeight;
  const scrollTop = container.scrollTop;
  const visibleHeight = container.clientHeight;

  if (lineTop < scrollTop) {
    // Linha está acima da área visível
    container.scrollTop = lineTop;
  } else if (lineBottom > scrollTop + visibleHeight) {
    // Linha está abaixo da área visível
    container.scrollTop = lineBottom - visibleHeight;
  }
}
