/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/initEditor.js":
/*!***************************!*\
  !*** ./src/initEditor.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initEditor: () => (/* binding */ initEditor)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './utils'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorCanvas'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\n\nfunction initEditor(container) {\n  // Espaçador invisível para permitir o scroll\n  var spacer = document.createElement(\"div\");\n  spacer.style.height = \"\".concat(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).length * 24, \"px\");\n  container.appendChild(spacer);\n\n  // Renderiza linhas visíveis iniciais\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n  refreshCursor();\n\n  // Listeners\n  container.addEventListener(\"scroll\", Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n  document.addEventListener(\"keydown\", handleKeyDown);\n}\nfunction handleKeyDown(e) {\n  if ([\"ArrowUp\", \"ArrowDown\", \"ArrowLeft\", \"ArrowRight\", \"Backspace\", \"Enter\"].includes(e.key)) {\n    e.preventDefault();\n  }\n  var lineIdx = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).value;\n  var currentLine = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx];\n  var cursorPos = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).value;\n  if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {\n    var newText = currentLine.slice(0, cursorPos) + e.key + currentLine.slice(cursorPos);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx] = newText;\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(cursorPos + 1);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx);\n    refreshCursor();\n  } else if (e.key === \"Backspace\") {\n    if (cursorPos > 0) {\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx] = currentLine.slice(0, cursorPos - 1) + currentLine.slice(cursorPos);\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(cursorPos - 1);\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx);\n      refreshCursor();\n    }\n  } else if (e.key === \"Enter\") {\n    var before = currentLine.slice(0, cursorPos);\n    var after = currentLine.slice(cursorPos);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).splice(lineIdx, 1, before, after);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(0);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx + 1);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorCanvas'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx + 1, Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx + 1]);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx + 1);\n    refreshCursor();\n  } else if (e.key === \"ArrowUp\" && lineIdx > 0) {\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx - 1);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(Math.min(cursorPos, Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx - 1].length));\n    refreshCursor();\n  } else if (e.key === \"ArrowDown\" && lineIdx < Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).length - 1) {\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx + 1);\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(Math.min(cursorPos, Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx + 1].length));\n    refreshCursor();\n  } else if (e.key === \"ArrowLeft\") {\n    if (cursorPos > 0) {\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(cursorPos - 1);\n    } else if (lineIdx > 0) {\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx - 1);\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())[lineIdx - 1].length);\n    }\n    refreshCursor();\n  } else if (e.key === \"ArrowRight\") {\n    if (cursorPos < currentLine.length) {\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(cursorPos + 1);\n    } else if (lineIdx < Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).length - 1) {\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(lineIdx + 1);\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorState'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(0);\n    }\n    refreshCursor();\n  }\n}\nfunction refreshCursor() {\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorCanvas'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './editorCanvas'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(true);\n}\n\n//# sourceURL=webpack://canvas-rich-text-editor/./src/initEditor.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
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
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__["./src/initEditor.js"](0, __webpack_exports__, __webpack_require__);
/******/ 
