class RichTextEditor {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.pages = [[]];
        this.fontSize = 20;
        this.fontFamily = "Arial";
        this.lineHeight = 30;
        this.margin = 20;
        this.pageWidth = 800;
        this.pageHeight = 1200;
        this.cursorPosition = { x: this.margin, y: this.margin };
        this.showCursor = true;
        this.hiddenInput = document.createElement("input");
        document.body.appendChild(this.hiddenInput);
        this.hiddenInput.style.position = "absolute";
        this.hiddenInput.style.opacity = 0;
        this.hiddenInput.style.pointerEvents = "none";
        this.hiddenInput.setAttribute("autocomplete", "off");
        this.hiddenInput.setAttribute("spellcheck", "false");
        this.container.addEventListener("click", (e) => this.moveCursorToClick(e));
        this.hiddenInput.addEventListener("input", (e) => this.handlePasteOrInput(e.data));
        this.hiddenInput.addEventListener("paste", (e) => this.handlePasteOrInput((e.clipboardData || window.clipboardData).getData("text")));
        this.hiddenInput.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.init();
        this.blinkCursor();
    }

    init() {
      this.renderText();
      this.renderCursor();
    }

    handlePasteOrInput(text) {
        if (!text) return;
        for (const char of text) {
            char === "\n" ? this.addNewLine() : this.addCharacter(char);
        }
    }

    handleKeyDown(e) {
        if (e.key === "Backspace") {
            this.removeCharacter();
            e.preventDefault();
        } else if (e.key === "Enter") {
            this.addNewLine();
            e.preventDefault();
        }
    }

    addCharacter(char) {
        let lastPage = this.pages[this.pages.length - 1];
        if (!lastPage.length) lastPage.push("");
        let lastIndex = lastPage.length - 1;
        let testLine = lastPage[lastIndex] + char;
        if (this.getTextWidth(testLine) > this.pageWidth - this.margin * 2) {
            this.addNewLine();
            lastPage = this.pages[this.pages.length - 1];
            lastIndex = lastPage.length - 1;
        }
        lastPage[lastIndex] += char;
        this.updateCursorPosition();
        this.renderText();
    }

    addNewLine() {
        let lastPage = this.pages[this.pages.length - 1];
        if ((lastPage.length + 1) * this.lineHeight >= this.pageHeight - this.margin * 2) {
            this.pages.push([]);
        }
        this.pages[this.pages.length - 1].push("");
        this.updateCursorPosition();
        this.renderText();
    }

    removeCharacter() {
        let lastPage = this.pages[this.pages.length - 1];
        if (!lastPage.length) return;
        let lastIndex = lastPage.length - 1;
        lastPage[lastIndex] = lastPage[lastIndex].slice(0, -1);
        if (lastPage[lastIndex] === "" && lastIndex > 0) lastPage.pop();
        this.updateCursorPosition();
        this.renderText();
    }

    moveCursorToClick(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let pageIndex = Math.floor(y / this.pageHeight);
        let localY = y % this.pageHeight;
        let lineIndex = Math.floor((localY - this.margin) / this.lineHeight);

        if (pageIndex >= this.pages.length) pageIndex = this.pages.length - 1;
        let page = this.pages[pageIndex];
        if (lineIndex >= page.length) lineIndex = page.length - 1;
        if (lineIndex < 0) lineIndex = 0;

        let line = page[lineIndex] || "";
        let closestX = this.margin;
        let cursorPos = 0;

        let ctx = this.getTextContext();
        for (let i = 0; i <= line.length; i++) {
            let textWidth = ctx.measureText(line.slice(0, i)).width;
            if (x < this.margin + textWidth) {
                closestX = this.margin + textWidth;
                cursorPos = i;
                break;
            }
        }

        this.cursorPosition = { x: closestX, y: this.margin + lineIndex * this.lineHeight + pageIndex * this.pageHeight };
        this.hiddenInput.focus();
        this.updateInputPosition();
        this.renderCursor();
    }

    getTextContext() {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        return ctx;
    }

    updateCursorPosition() {
        let lastPage = this.pages[this.pages.length - 1];
        if (lastPage.length === 0) {
            this.cursorPosition = { x: this.margin, y: this.margin + (this.pages.length - 1) * this.pageHeight };
            return;
        }
        const lastLine = lastPage[lastPage.length - 1];
        const textWidth = this.getTextWidth(lastLine);
        this.cursorPosition = { x: this.margin + textWidth, y: this.margin + (lastPage.length - 1) * this.lineHeight + (this.pages.length - 1) * this.pageHeight };
        this.updateInputPosition();
        this.renderCursor();
    }

    getTextWidth(text) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("font-size", this.fontSize);
        textElement.setAttribute("font-family", this.fontFamily);
        textElement.textContent = text;
        svg.appendChild(textElement);
        document.body.appendChild(svg);
        let width = textElement.getBBox().width;
        document.body.removeChild(svg);
        return width;
    }

    updateInputPosition() {
        this.hiddenInput.style.left = `${this.cursorPosition.x}px`;
        this.hiddenInput.style.top = `${this.cursorPosition.y}px`;
    }

    renderText() {
      this.container.innerHTML = "";
      let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", this.pageWidth);
      svg.setAttribute("height", this.pageHeight * this.pages.length);
      svg.style.border = "1px solid black";
      
      for (let pageIndex = 0; pageIndex < this.pages.length; pageIndex++) {
          let y = this.margin + pageIndex * this.pageHeight;
          for (let lineIndex = 0; lineIndex < this.pages[pageIndex].length; lineIndex++) {
              let textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
              textElement.setAttribute("x", this.margin);
              textElement.setAttribute("y", y);
              textElement.setAttribute("font-size", this.fontSize);
              textElement.setAttribute("font-family", this.fontFamily);
              textElement.textContent = this.pages[pageIndex][lineIndex];
              svg.appendChild(textElement);
              y += this.lineHeight;
          }
      }

      this.container.appendChild(svg);
    }

    renderCursor() {
      let svg = this.container.querySelector("svg");
      if (!svg) return;
      
      // Remover o cursor anterior
      let oldCursor = svg.querySelector(".cursor");
      if (oldCursor) {
          svg.removeChild(oldCursor);
      }

      // Se showCursor for falso, não adicionamos o novo cursor
      if (!this.showCursor) return;

      // Criar e adicionar o novo cursor
      let cursor = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      cursor.setAttribute("class", "cursor");
      cursor.setAttribute("x", this.cursorPosition.x);
      cursor.setAttribute("y", this.cursorPosition.y - this.fontSize);
      cursor.setAttribute("width", 2);
      cursor.setAttribute("height", this.fontSize);
      cursor.setAttribute("fill", "black");
      svg.appendChild(cursor);
    }


    blinkCursor() {
        setInterval(() => {
            this.showCursor = !this.showCursor;
            this.renderCursor();
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new RichTextEditor("editorContainer");
});
