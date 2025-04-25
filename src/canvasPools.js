// canvasPool.js

export const canvasPool = {};

export function createCanvasForLine(index, lineContent) {
  let canvas = canvasPool[index];

  // Se não houver canvas na pool, cria um novo
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.setAttribute('data-line-index', index);
    canvasPool[index] = canvas;
  }

  const ctx = canvas.getContext('2d');
  ctx.font = '16px sans-serif';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 800; // Largura do canvas (ajustar conforme necessário)
  canvas.height = 24; // Altura da linha

  // Desenho do conteúdo da linha (exemplo)
  ctx.fillText(lineContent, 10, 20); // Ajuste o posicionamento conforme necessário

  return canvas;
}

export function removeCanvas(index) {
  const canvas = canvasPool[index];
  if (canvas) {
    canvas.remove();
    delete canvasPool[index];
  }
}
