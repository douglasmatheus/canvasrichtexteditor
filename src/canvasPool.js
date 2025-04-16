const pool = [];

export function getCanvas() {
  return pool.length > 0 ? pool.pop() : document.createElement("canvas");
}

export function releaseCanvas(canvas) {
  // // Garante que o canvas não está mais no DOM antes de reaproveitar
  // if (canvas.parentNode) {
  //   canvas.parentNode.removeChild(canvas);
  // }

  // // (Opcional: limpar estilo, conteúdo ou resetar contexto se quiser garantir estado neutro)
  // canvas.width = 0;
  // canvas.height = 0;
  pool.push(canvas);
}
