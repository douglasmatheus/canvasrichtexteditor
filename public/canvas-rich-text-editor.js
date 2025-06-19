/******/ var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 365:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#editorContainer {
  width: 800px;
  height: 500px;
  overflow-y: auto;       /* auto mostra o scroll só quando necessário */
  border: 1px solid #ccc;
  position: relative;
  background-color: #fff; /* fundo branco ajuda na visibilidade */
}

.lineCanvas {
  display: block;
  position: absolute;
  left: 0;                 /* garantir que fique alinhado à esquerda */
  width: 100%;             /* ocupa toda a largura do editor */
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 601:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/nonce */
/******/ (() => {
/******/ 	__webpack_require__.nc = undefined;
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(365);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/editorState.js
var lineHeight = 24;
var font = "16px sans-serif";
var marginLeft = 10;
var editorContainer = null;
var lines = {
  value: Array.from({
    length: 1000
  }, function (_, i) {
    return i === 4 ? "Linha sendo editada aqui..." : "Linha ".concat(i + 1);
  })
};
var activeLineIndex = {
  value: 4
};
var previousActiveLineIndex = {
  value: 4
};
var cursorIndex = {
  value: lines.value[activeLineIndex.value].length
};

// Funções de atualização
function setActiveLineIndex(index) {
  previousActiveLineIndex.value = activeLineIndex.value;
  activeLineIndex.value = index;
}
function setCursorIndex(index) {
  cursorIndex.value = index;
}
function setEditorContainer(el) {
  editorContainer = el;
}
;// ./src/canvasPool.js

var pool = [];
function getFromPool(width) {
  var canvas;
  if (pool.length > 0) {
    canvas = pool.pop();
  } else {
    canvas = createNewCanvas();
  }
  canvas.width = width;
  canvas.height = lineHeight;
  return canvas;
}
function returnToPool(canvas) {
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
  if (canvas) {
    pool.push(canvas);
  }
}
function createNewCanvas() {
  var canvas = document.createElement('canvas');
  canvas.className = 'lineCanvas';
  canvas.style.position = 'absolute';
  return canvas;
}
function getCanvasAt(index) {
  return document.querySelector(".lineCanvas[data-line=\"".concat(index, "\"]"));
}
;// ./src/cursorAnimation.js

var cursorVisible = true;
var lastBlink = performance.now();
var blinkInterval = 500;
function startCursorAnimation() {
  function renderLoop(timestamp) {
    if (timestamp - lastBlink >= blinkInterval) {
      cursorVisible = !cursorVisible;
      drawCursor();
      lastBlink = timestamp;
    }
    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);
}
function getCursorVisibility() {
  return cursorVisible;
}
function setCursorVisibility(visible) {
  cursorVisible = visible;
  lastBlink = performance.now();
}
;// ./src/editorCanvas.js



var canvasMap = new Map(); // Relaciona índices de linha com seus canvases

function cleanCanvas(canvas) {
  var ctx = canvas.getContext('2d');
  // Salva a largura e altura originais
  var width = canvas.width;
  var height = canvas.height;

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
function createCanvasForLine(lineIndex) {
  if (canvasMap.has(lineIndex)) {
    // Se já existe, limpa e redesenha
    var existingCanvas = canvasMap.get(lineIndex);
    cleanCanvas(existingCanvas);
    drawLine(existingCanvas, lineIndex, lines.value[lineIndex]);
    return;
  }
  var container = document.getElementById('editorContainer');
  var canvas = getFromPool(container.clientWidth);
  cleanCanvas(canvas);
  canvas.dataset.line = lineIndex;
  canvas.style.top = "".concat(lineIndex * lineHeight, "px");
  drawLine(canvas, lineIndex, lines.value[lineIndex]);
  container.appendChild(canvas);
  canvasMap.set(lineIndex, canvas);
}

// Redesenha o texto da linha em seu canvas
function drawLine(canvas, lineIndex, text) {
  cleanCanvas(canvas);
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillStyle = '#000';
  ctx.fillText(text || '', marginLeft, 0);
}

// Remove canvas de linha e libera para reuso
function removeCanvas(lineIndex) {
  var canvas = canvasMap.get(lineIndex);
  if (canvas) {
    cleanCanvas(canvas);
    returnToPool(canvas);
    canvasMap["delete"](lineIndex);
  }
}

// Redesenha a linha ativa e o cursor (se visível)
function drawCursor() {
  var forceVisible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var lineIdx = activeLineIndex.value;
  var canvas = canvasMap.get(lineIdx);
  if (!canvas) {
    createCanvasForLine(lineIdx);
    return;
  }
  var ctx = canvas.getContext('2d');
  var lineText = lines.value[lineIdx];

  // Limpa e redesenha a linha
  cleanCanvas(canvas);
  drawLine(canvas, lineIdx, lineText);

  // Decide se o cursor deve ser visível
  var isVisible = forceVisible !== null ? forceVisible : getCursorVisibility();
  if (isVisible) {
    var textBeforeCursor = lineText.slice(0, cursorIndex.value);
    var cursorX = ctx.measureText(textBeforeCursor).width + marginLeft;

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
function updateCursorPosition() {
  var canvas = canvasMap.get(activeLineIndex.value);
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  var textBeforeCursor = lines.value[activeLineIndex.value].slice(0, cursorIndex.value);
  return marginLeft + ctx.measureText(textBeforeCursor).width;
}
function updateCanvasPositionsFromIndex(startIndex) {
  for (var i = startIndex; i < lines.value.length; i++) {
    var canvas = canvasMap.get(i);
    if (canvas) {
      canvas.style.top = "".concat(i * lineHeight, "px");
      // Limpa e redesenha a linha
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLine(canvas, i, lines.value[i]);
    }
  }
}
function ensureLineVisible(lineIndex) {
  var container = document.getElementById('editorContainer');
  var lineTop = lineIndex * lineHeight;
  var lineBottom = (lineIndex + 1) * lineHeight;
  var scrollTop = container.scrollTop;
  var visibleHeight = container.clientHeight;
  if (lineTop < scrollTop) {
    // Linha está acima da área visível
    container.scrollTop = lineTop;
  } else if (lineBottom > scrollTop + visibleHeight) {
    // Linha está abaixo da área visível
    container.scrollTop = lineBottom - visibleHeight;
  }
}
;// ./src/utils.js


/**
 * Retorna o intervalo de linhas visíveis no container com scroll.
 * @param {HTMLElement} container - O container do editor com scroll.
 * @param {number} lineHeight - Altura de cada linha.
 * @param {number} totalLines - Número total de linhas no documento.
 * @returns {[number, number]} Índices da primeira e última linha visível.
 */
function getVisibleLineRange(container, lineHeight, totalLines) {
  var _container$scrollTop;
  if (!container) return [0, 0];
  var scrollTop = (_container$scrollTop = container === null || container === void 0 ? void 0 : container.scrollTop) !== null && _container$scrollTop !== void 0 ? _container$scrollTop : 0;
  var visibleHeight = container.clientHeight;

  // Adiciona um buffer menor, apenas algumas linhas antes e depois
  var buffer = 5; // 5 linhas de buffer

  var firstVisible = Math.max(0, Math.floor(scrollTop / lineHeight) - buffer);
  var lastVisible = Math.min(totalLines - 1, Math.ceil((scrollTop + visibleHeight) / lineHeight) + buffer);
  return [firstVisible, lastVisible];
}
;// ./src/render.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// import { canvasPool, createCanvasForLine, removeCanvas } from './canvasPool.js';



var lastRenderedRange = [null, null];
function renderVisibleLines(container, lineHeight, totalLines) {
  var _getVisibleLineRange = getVisibleLineRange(container, lineHeight, totalLines),
    _getVisibleLineRange2 = _slicedToArray(_getVisibleLineRange, 2),
    first = _getVisibleLineRange2[0],
    last = _getVisibleLineRange2[1];

  // Se não houver mudança no range visível e não for uma renderização forçada, não faz nada
  if (first === lastRenderedRange[0] && last === lastRenderedRange[1]) return;

  // Remove todos os canvas existentes na área visível
  var existingCanvases = container.querySelectorAll('.lineCanvas');
  existingCanvases.forEach(function (canvas) {
    var lineIndex = parseInt(canvas.dataset.line);
    if (lineIndex >= first - 5 && lineIndex <= last + 5) {
      removeCanvas(lineIndex);
    }
  });

  // Cria canvas para linhas visíveis
  for (var i = first; i <= last; i++) {
    createCanvasForLine(i);
  }
  lastRenderedRange = [first, last];
}
function updateLine(index) {
  var canvas = document.querySelector(".lineCanvas[data-line=\"".concat(index, "\"]"));
  if (canvas) {
    drawLine(canvas, index, lines.value[index]);
  }
}

// Função para limpar todos os canvas (útil em casos de reinicialização)
function clearAllCanvases() {
  var container = document.getElementById('editorContainer');
  if (!container) return;
  var canvases = container.querySelectorAll('.lineCanvas');
  canvases.forEach(function (canvas) {
    var lineIndex = parseInt(canvas.dataset.line);
    removeCanvas(lineIndex);
  });
  lastRenderedRange = [null, null];
}
;// ./src/initEditor.js
function initEditor_slicedToArray(r, e) { return initEditor_arrayWithHoles(r) || initEditor_iterableToArrayLimit(r, e) || initEditor_unsupportedIterableToArray(r, e) || initEditor_nonIterableRest(); }
function initEditor_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function initEditor_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return initEditor_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? initEditor_arrayLikeToArray(r, a) : void 0; } }
function initEditor_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function initEditor_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function initEditor_arrayWithHoles(r) { if (Array.isArray(r)) return r; }







function initEditor(container) {
  // Limpa qualquer estado anterior
  clearAllCanvases();
  setEditorContainer(container);
  var spacer = document.createElement("div");
  spacer.style.height = "".concat(lines.value.length * lineHeight, "px");
  container.appendChild(spacer);
  renderVisibleLines(container, lineHeight, lines.value.length);
  refreshCursor();
  startCursorAnimation();

  // Usa um debounce para o evento de scroll para melhor performance
  var scrollTimeout;
  container.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
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
function handleTextInput(_char) {
  var lineIdx = activeLineIndex.value;
  var currentLine = lines.value[lineIdx];
  var cursorPos = cursorIndex.value;
  lines.value[lineIdx] = currentLine.slice(0, cursorPos) + _char + currentLine.slice(cursorPos);
  setCursorIndex(cursorPos + 1);
  updateLine(lineIdx);
  refreshCursor();
}
function handleBackspace() {
  var lineIdx = activeLineIndex.value;
  var cursorPos = cursorIndex.value;
  var container = document.getElementById("editorContainer");
  if (cursorPos > 0) {
    var currentLine = lines.value[lineIdx];
    lines.value[lineIdx] = currentLine.slice(0, cursorPos - 1) + currentLine.slice(cursorPos);
    setCursorIndex(cursorPos - 1);
    updateLine(lineIdx);
    refreshCursor();
  } else if (lineIdx > 0) {
    // Guarda a posição atual da rolagem
    var currentScrollTop = container.scrollTop;

    // Mesclar com a linha anterior
    var previousLine = lines.value[lineIdx - 1];
    var _currentLine = lines.value[lineIdx];
    var mergedLine = previousLine + _currentLine;

    // Atualiza as linhas
    lines.value.splice(lineIdx - 1, 2, mergedLine);

    // Limpa os canvas afetados
    removeCanvas(lineIdx - 1);
    removeCanvas(lineIdx);

    // Atualiza índices
    setActiveLineIndex(lineIdx - 1);
    setCursorIndex(previousLine.length);

    // Atualiza o spacer
    var spacer = container.lastElementChild;
    spacer.style.height = "".concat(lines.value.length * lineHeight, "px");

    // Renderiza novamente as linhas visíveis
    renderVisibleLines(container, lineHeight, lines.value.length);

    // Garante que o cursor seja desenhado
    refreshCursor();

    // Restaura a posição da rolagem
    container.scrollTop = currentScrollTop;
  }
}
function handleEnter() {
  var lineIdx = activeLineIndex.value;
  var currentLine = lines.value[lineIdx];
  var cursorPos = cursorIndex.value;
  var container = document.getElementById("editorContainer");

  // Guarda a posição atual da rolagem
  var currentScrollTop = container.scrollTop;

  // Divide a linha atual em duas
  var before = currentLine.slice(0, cursorPos);
  var after = currentLine.slice(cursorPos);
  lines.value.splice(lineIdx, 1, before, after);

  // Limpa todos os canvas existentes na área visível
  var _getVisibleLineRange = getVisibleLineRange(container, lineHeight, lines.value.length),
    _getVisibleLineRange2 = initEditor_slicedToArray(_getVisibleLineRange, 2),
    first = _getVisibleLineRange2[0],
    last = _getVisibleLineRange2[1];
  for (var i = first; i <= last; i++) {
    removeCanvas(i);
  }

  // Atualiza índices
  setCursorIndex(0);
  setActiveLineIndex(lineIdx + 1);

  // Atualiza o spacer
  var spacer = container.lastElementChild;
  spacer.style.height = "".concat(lines.value.length * lineHeight, "px");

  // Renderiza novamente as linhas visíveis
  renderVisibleLines(container, lineHeight, lines.value.length);

  // Garante que o cursor seja desenhado
  refreshCursor();

  // Garante que a nova linha esteja visível
  ensureLineVisible(lineIdx + 1);
}
function handleArrowKey(direction) {
  var lineIdx = activeLineIndex.value;
  var cursorPos = cursorIndex.value;
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

;// ./src/index.js







export { activeLineIndex, createCanvasForLine, cursorIndex, drawCursor, getCanvasAt, getCursorVisibility, getFromPool, getVisibleLineRange, initEditor, lines, renderVisibleLines, returnToPool, setActiveLineIndex, setCursorIndex, startCursorAnimation, updateCanvasPositionsFromIndex, updateCursorPosition, updateLine };
