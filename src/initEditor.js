import './styles.css';

import { renderVisibleLines, updateLine } from './render';
import { getVisibleLineRange } from './utils';
import { lines, activeLineIndex, cursorIndex, setActiveLineIndex, setCursorIndex, getLineHeight } from './editorState';
import { createCanvasForLine, drawCursor, updateCursorPosition } from './editorCanvas';

export function initEditor(container) {
  const spacer = document.createElement("div");
  spacer.style.height = `${lines.length * getLineHeight()}px`; // Usando o lineHeight de editorState
  container.appendChild(spacer);

  renderVisibleLines();
  refreshCursor();

  container.addEventListener("scroll", renderVisibleLines);
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
  const currentLine = lines[lineIdx];
  const cursorPos = cursorIndex.value;
  lines[lineIdx] = currentLine.slice(0, cursorPos) + char + currentLine.slice(cursorPos);
  setCursorIndex(cursorPos + 1);
  updateLine(lineIdx);
  refreshCursor();
}

function handleBackspace() {
  const lineIdx = activeLineIndex.value;
  const currentLine = lines[lineIdx];
  const cursorPos = cursorIndex.value;
  if (cursorPos > 0) {
    lines[lineIdx] = currentLine.slice(0, cursorPos - 1) + currentLine.slice(cursorPos);
    setCursorIndex(cursorPos - 1);
    updateLine(lineIdx);
    refreshCursor();
  }
}

function handleEnter() {
  const lineIdx = activeLineIndex.value;
  const currentLine = lines[lineIdx];
  const cursorPos = cursorIndex.value;

  const before = currentLine.slice(0, cursorPos);
  const after = currentLine.slice(cursorPos);
  lines.splice(lineIdx, 1, before, after);

  setCursorIndex(0);
  setActiveLineIndex(lineIdx + 1);

  createCanvasForLine(lineIdx + 1, lines[lineIdx + 1]);
  updateLine(lineIdx);
  updateLine(lineIdx + 1);
  refreshCursor();

  // Movendo a rolagem para a linha ativa
  const container = document.getElementById("editorContainer");
  container.scrollTop = (lineIdx + 1) * getLineHeight(); // Usando lineHeight
}

function handleArrowKey(direction) {
  const lineIdx = activeLineIndex.value;
  const cursorPos = cursorIndex.value;

  switch (direction) {
    case "ArrowUp":
      if (lineIdx > 0) {
        setActiveLineIndex(lineIdx - 1);
        setCursorIndex(Math.min(cursorPos, lines[lineIdx - 1].length));
      }
      break;
    case "ArrowDown":
      if (lineIdx < lines.length - 1) {
        setActiveLineIndex(lineIdx + 1);
        setCursorIndex(Math.min(cursorPos, lines[lineIdx + 1].length));
      }
      break;
    case "ArrowLeft":
      if (cursorPos > 0) {
        setCursorIndex(cursorPos - 1);
      } else if (lineIdx > 0) {
        setActiveLineIndex(lineIdx - 1);
        setCursorIndex(lines[lineIdx - 1].length);
      }
      break;
    case "ArrowRight":
      if (cursorPos < lines[lineIdx].length) {
        setCursorIndex(cursorPos + 1);
      } else if (lineIdx < lines.length - 1) {
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
