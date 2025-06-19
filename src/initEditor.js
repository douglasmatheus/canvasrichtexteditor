import './styles.css';

import { renderVisibleLines, updateLine, clearAllCanvases } from './render.js';
import { lines, activeLineIndex, cursorIndex, setActiveLineIndex, setEditorContainer, setCursorIndex, lineHeight } from './editorState.js';
import { createCanvasForLine, drawCursor, updateCursorPosition, updateCanvasPositionsFromIndex, ensureLineVisible, removeCanvas } from './editorCanvas.js';
import { startCursorAnimation } from './cursorAnimation.js';
import { returnToPool, getCanvasAt } from './canvasPool.js';
import { getVisibleLineRange } from './utils.js';

function initEditor(container) {
  // Limpa qualquer estado anterior
  clearAllCanvases();
  
  setEditorContainer(container);
  const spacer = document.createElement("div");
  spacer.style.height = `${lines.value.length * lineHeight}px`;
  container.appendChild(spacer);

  renderVisibleLines(container, lineHeight, lines.value.length);
  refreshCursor();
  startCursorAnimation();

  // Usa um debounce para o evento de scroll para melhor performance
  let scrollTimeout;
  container.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      renderVisibleLines(container, lineHeight, lines.value.length);
    }, 10); // 10ms de delay
  });
  
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Enter"].includes(e.key)) {
    e.preventDefault();
  }

  switch (e.key) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      handleArrowKey(e.key);
      break;
    case "Backspace":
      handleBackspace();
      break;
    case "Enter":
      handleEnter();
      break;
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        handleTextInput(e.key);
      }
  }
}

function handleTextInput(char) {
  const lineIdx = activeLineIndex.value;
  const currentLine = lines.value[lineIdx];
  const cursorPos = cursorIndex.value;
  lines.value[lineIdx] = currentLine.slice(0, cursorPos) + char + currentLine.slice(cursorPos);
  setCursorIndex(cursorPos + 1);
  updateLine(lineIdx);
  refreshCursor();
}

function handleBackspace() {
  const lineIdx = activeLineIndex.value;
  const cursorPos = cursorIndex.value;
  const container = document.getElementById("editorContainer");
  
  if (cursorPos > 0) {
    const currentLine = lines.value[lineIdx];
    lines.value[lineIdx] = currentLine.slice(0, cursorPos - 1) + currentLine.slice(cursorPos);
    setCursorIndex(cursorPos - 1);
    updateLine(lineIdx);
    refreshCursor();
  } else if (lineIdx > 0) {
    // Guarda a posição atual da rolagem
    const currentScrollTop = container.scrollTop;
    
    // Mesclar com a linha anterior
    const previousLine = lines.value[lineIdx - 1];
    const currentLine = lines.value[lineIdx];
    const mergedLine = previousLine + currentLine;
    
    // Atualiza as linhas
    lines.value.splice(lineIdx - 1, 2, mergedLine);
    
    // Remove apenas os canvas afetados
    removeCanvas(lineIdx);
    removeCanvas(lineIdx - 1);
    
    // Atualiza índices
    setActiveLineIndex(lineIdx - 1);
    setCursorIndex(previousLine.length);
    
    // Atualiza o spacer
    const spacer = container.lastElementChild;
    spacer.style.height = `${lines.value.length * lineHeight}px`;
    
    // Cria o canvas para a linha mesclada
    createCanvasForLine(lineIdx - 1);
    
    // Atualiza as posições dos canvas após a linha removida
    updateCanvasPositionsFromIndex(lineIdx - 1);
    
    // Garante que o cursor seja desenhado
    refreshCursor();
    
    // Restaura a posição da rolagem
    container.scrollTop = currentScrollTop;
  }
}

function handleEnter() {
  const lineIdx = activeLineIndex.value;
  const currentLine = lines.value[lineIdx];
  const cursorPos = cursorIndex.value;
  const container = document.getElementById("editorContainer");

  // Divide a linha atual em duas
  const before = currentLine.slice(0, cursorPos);
  const after = currentLine.slice(cursorPos);
  lines.value.splice(lineIdx, 1, before, after);

  // Remove apenas os canvas que serão afetados
  removeCanvas(lineIdx);

  // Atualiza índices
  setCursorIndex(0);
  setActiveLineIndex(lineIdx + 1);

  // Atualiza o spacer
  const spacer = container.lastElementChild;
  spacer.style.height = `${lines.value.length * lineHeight}px`;

  // Cria os canvas para as linhas afetadas
  createCanvasForLine(lineIdx);
  createCanvasForLine(lineIdx + 1);

  // Atualiza as posições dos canvas após a linha inserida
  updateCanvasPositionsFromIndex(lineIdx);
  
  // Garante que o cursor seja desenhado
  refreshCursor();

  // Garante que a nova linha esteja visível
  ensureLineVisible(lineIdx + 1);
}

function handleArrowKey(direction) {
  const lineIdx = activeLineIndex.value;
  const cursorPos = cursorIndex.value;

  switch (direction) {
    case "ArrowUp":
      if (lineIdx > 0) {
        setActiveLineIndex(lineIdx - 1);
        setCursorIndex(Math.min(cursorPos, lines.value[lineIdx - 1].length));
      }
      break;
    case "ArrowDown":
      if (lineIdx < lines.value.length - 1) {
        setActiveLineIndex(lineIdx + 1);
        setCursorIndex(Math.min(cursorPos, lines.value[lineIdx + 1].length));
      }
      break;
    case "ArrowLeft":
      if (cursorPos > 0) {
        setCursorIndex(cursorPos - 1);
      } else if (lineIdx > 0) {
        setActiveLineIndex(lineIdx - 1);
        setCursorIndex(lines.value[lineIdx - 1].length);
      }
      break;
    case "ArrowRight":
      if (cursorPos < lines.value[lineIdx].length) {
        setCursorIndex(cursorPos + 1);
      } else if (lineIdx < lines.value.length - 1) {
        setActiveLineIndex(lineIdx + 1);
        setCursorIndex(0);
      }
      break;
  }

  refreshCursor();
}

function refreshCursor() {
  updateCursorPosition();
  drawCursor(true);
}

export { initEditor };