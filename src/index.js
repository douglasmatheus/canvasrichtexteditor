export { initEditor } from './initEditor.js';
export { createCanvasForLine, drawCursor, updateCursorPosition, updateCanvasPositionsFromIndex } from './editorCanvas.js';
export { renderVisibleLines, updateLine } from './render.js';
export { lines, activeLineIndex, cursorIndex, setActiveLineIndex, setCursorIndex } from './editorState.js';
export { getVisibleLineRange } from './utils.js';
export { startCursorAnimation, getCursorVisibility } from './cursorAnimation.js';
export { getFromPool, returnToPool, getCanvasAt } from './canvasPool.js';
