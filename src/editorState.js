export const lineHeight = 24;
export const font = "16px sans-serif";
export const marginLeft = 10;

export const lines = {
  value: Array.from({ length: 1000 }, (_, i) =>
    i === 4 ? "Linha sendo editada aqui..." : `Linha ${i + 1}`
  ),
};

export const activeLineIndex = {
  value: 4,
};

export const previousActiveLineIndex = {
  value: 4,
};

export const cursorIndex = {
  value: lines.value[activeLineIndex.value].length,
};

// Funções de atualização
export function setActiveLineIndex(index) {
  previousActiveLineIndex.value = activeLineIndex.value;
  activeLineIndex.value = index;
}

export function setCursorIndex(index) {
  cursorIndex.value = index;
}
