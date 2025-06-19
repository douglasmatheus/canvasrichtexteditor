import { editorContainer } from './editorState.js';

/**
 * Retorna o intervalo de linhas visíveis no container com scroll.
 * @param {HTMLElement} container - O container do editor com scroll.
 * @param {number} lineHeight - Altura de cada linha.
 * @param {number} totalLines - Número total de linhas no documento.
 * @returns {[number, number]} Índices da primeira e última linha visível.
 */
export function getVisibleLineRange(container, lineHeight, totalLines) {
  if (!container) return [0, 0];
  
  const scrollTop = container?.scrollTop ?? 0;
  const visibleHeight = container.clientHeight;
  
  // Adiciona um buffer menor, apenas algumas linhas antes e depois
  const buffer = 5; // 5 linhas de buffer
  
  const firstVisible = Math.max(0, Math.floor(scrollTop / lineHeight) - buffer);
  const lastVisible = Math.min(
    totalLines - 1,
    Math.ceil((scrollTop + visibleHeight) / lineHeight) + buffer
  );

  return [firstVisible, lastVisible];
}
