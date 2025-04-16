/**
 * Retorna o intervalo de linhas visíveis no container com scroll.
 * @param {HTMLElement} container - O container do editor com scroll.
 * @param {number} lineHeight - Altura de cada linha.
 * @param {number} totalLines - Número total de linhas no documento.
 * @returns {[number, number]} Índices da primeira e última linha visível.
 */
export function getVisibleLineRange(container, lineHeight, totalLines) {
  const scrollTop = container.scrollTop;
  const visibleHeight = container.clientHeight;

  const firstVisible = Math.floor(scrollTop / lineHeight);
  const lastVisible = Math.min(
    totalLines - 1,
    Math.ceil((scrollTop + visibleHeight) / lineHeight)
  );

  return [firstVisible, lastVisible];
}
