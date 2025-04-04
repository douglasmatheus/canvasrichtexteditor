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
        this.text = "";  // Inicializa a string vazia
        this.cursorPosition = { x: 0, y: 0 };
        this.showCursor = true;
        this.hiddenInput = document.createElement("input");
        document.body.appendChild(this.hiddenInput);
        this.container.style.position = "relative";

        // canvas para o cursor
        this.cursorCanvas = document.createElement("canvas");
        this.cursorCanvas.width = this.pageWidth;
        this.cursorCanvas.height = this.pageHeight;
        this.cursorCanvas.style.width = `${this.pageWidth}px`;
        this.cursorCanvas.style.height = `${this.pageHeight}px`;
        this.cursorCanvas.style.position = "absolute";
        this.cursorCanvas.style.pointerEvents = "none";
        this.cursorCanvas.style.zIndex = 100;
        this.cursorCanvas.style.left = "0px"; // deixa fixo dentro do container
        this.cursorCanvas.style.top = "0px";
        this.container.appendChild(this.cursorCanvas);
        this.cursorCanvas.style.border = "1px solid red"; // DEBUG
        this.cursorCtx = this.cursorCanvas.getContext("2d");
        
        this.init();
        this.blinkCursor();
    }

    init() {
        this.hiddenInput.style.position = "absolute";
        this.hiddenInput.style.opacity = 0;
        this.hiddenInput.style.pointerEvents = "none";
        this.hiddenInput.setAttribute("autocomplete", "off");
        this.hiddenInput.setAttribute("spellcheck", "false");
        
        this.container.addEventListener("click", (e) => {
            this.moveCursorToClick(e);
            this.hiddenInput.focus();
            this.updateInputPosition();
            this.render();
        });
        
        this.hiddenInput.addEventListener("input", (e) => {
            this.handlePasteOrInput(e.data);
        });
        
        this.hiddenInput.addEventListener("paste", (e) => {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData("text");
            this.handlePasteOrInput(pastedText);
        });
        
        this.hiddenInput.addEventListener("keydown", (e) => {
            if (e.key === "Backspace") {
                this.removeCharacter();
                e.preventDefault();
            } else if (e.key === "Enter") {
                this.addNewLine();
                e.preventDefault();
            }
        });
        
        this.render();
        this.drawCursorOnly();
    }

    handlePasteOrInput(text) {
        if (!text) return;
        for (const char of text) {
            if (char === "\n") {
                this.addNewLine();
            } else {
                this.addCharacter(char);
            }
        }
    }

    addCharacter(char) {
        let lastPage = this.pages[this.pages.length - 1];
        if (!lastPage.length) {
            lastPage.push("");
        }
        
        let lastIndex = lastPage.length - 1;
        let testLine = lastPage[lastIndex] + char;
        
        const ctx = this.getContext();
        if (ctx.measureText(testLine).width > this.pageWidth - this.margin * 2) {
            this.addNewLine();
            lastPage = this.pages[this.pages.length - 1];
            lastIndex = lastPage.length - 1;
        }
        
        lastPage[lastIndex] += char;
        this.updateCursorPosition();
        this.render();
    }

    addNewLine() {
        let lastPage = this.pages[this.pages.length - 1];
        if ((lastPage.length + 1) * this.lineHeight >= this.pageHeight - this.margin * 2) {
            this.pages.push([]);
        }
        this.pages[this.pages.length - 1].push("");
        this.updateCursorPosition();
        this.render();
    }

    removeCharacter() {
        let lastPage = this.pages[this.pages.length - 1];
        if (!lastPage.length) return;
        
        let lastIndex = lastPage.length - 1;
        lastPage[lastIndex] = lastPage[lastIndex].slice(0, -1);
        
        if (lastPage[lastIndex] === "" && lastIndex > 0) {
            lastPage.pop();
        }
        
        this.updateCursorPosition();
        this.render();
    }

    moveCursorToClick(event) {
        const rect = this.container.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        let pageIndex = Math.floor(clickY / this.pageHeight);
        if (pageIndex >= this.pages.length) pageIndex = this.pages.length - 1;

        let page = this.pages[pageIndex] || [];
        let lineIndex = Math.floor((clickY - this.margin) / this.lineHeight);
        if (lineIndex >= page.length) lineIndex = page.length - 1;
        if (lineIndex < 0) lineIndex = 0;

        let line = page[lineIndex] || "";
        const ctx = this.getContext();

        let closestX = this.margin;
        let cursorIndex = 0;
        let minDistance = Infinity;

        for (let i = 0; i <= line.length; i++) {
            let width = ctx.measureText(line.substring(0, i)).width;
            let charX = this.margin + width;
            let distance = Math.abs(clickX - charX);

            if (distance < minDistance) {
                minDistance = distance;
                closestX = charX;
                cursorIndex = i;
            }
        }

        this.cursorPosition = {
            x: closestX + rect.left,
            y: this.margin + lineIndex * this.lineHeight + rect.top
        };

        this.hiddenInput.focus();
        this.updateInputPosition();
        this.drawCursorOnly();
    }

    updateCursorPosition() {
        let rect = this.container.getBoundingClientRect();
        let xBase = this.margin + rect.left + window.scrollX;
        let yBase = this.margin + rect.top + window.scrollY;

        let lastPage = this.pages[this.pages.length - 1] || [];
        let lastLineIndex = Math.max(0, lastPage.length - 1);
        let lastLine = lastPage[lastLineIndex] || "";

        let ctx = this.getContext();
        let textWidth = ctx.measureText(lastLine).width;

        this.cursorPosition = {
            x: Math.min(xBase + textWidth, rect.left + this.pageWidth - this.margin), // Evita ultrapassar a página
            y: yBase + lastLineIndex * this.lineHeight
        };

        console.log("Cursor atualizado para:", this.cursorPosition);
        this.updateInputPosition();
        this.drawCursorOnly();
    }
	
	updateCursorCanvasPosition() {
		this.cursorCanvas.style.left = this.container.offsetLeft + "px";
		this.cursorCanvas.style.top = this.container.offsetTop + "px";
	}

    updateInputPosition() {
        this.hiddenInput.style.left = `${this.cursorPosition.x}px`;
        this.hiddenInput.style.top = `${this.cursorPosition.y}px`;
    }
	
	renderCursor() {
		this.cursorCtx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);
        console.log("Renderizando cursor em:", this.cursorPosition);

		if (this.showCursor) {
			ctx.fillStyle = "black";
			ctx.fillRect(this.cursorPosition.x, this.cursorPosition.y - this.fontSize, 2, this.fontSize);
		}
	}

    getContext() {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        return ctx;
    }

    render() {
        this.container.querySelectorAll("canvas:not(:last-child)").forEach(c => c.remove());

        for (let i = 0; i < this.pages.length; i++) {
            let canvas = document.createElement("canvas");
            canvas.width = this.pageWidth;
            canvas.height = this.pageHeight;
            canvas.style.border = "1px solid black";
            canvas.style.marginBottom = "20px";

            let ctx = canvas.getContext("2d");
            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            ctx.fillStyle = "black";
            
            let y = this.margin;
            for (let line of this.pages[i]) {
                ctx.fillText(line, this.margin, y);
                y += this.lineHeight;
            }
            
            this.container.insertBefore(canvas, this.cursorCanvas);
        }
        this.updateCursorCanvasPosition();
    }

    updateCursorCanvasPosition() {
        const rect = this.container.getBoundingClientRect();
        this.cursorCanvas.style.left = rect.left + "px";
        this.cursorCanvas.style.top = rect.top + "px";
    }

    blinkCursor() {
        setInterval(() => {
            this.showCursor = !this.showCursor;
            this.drawCursorOnly();
        }, 500);
    }

    drawCursorOnly() {
        if (!this.cursorCtx) return;

        this.cursorCtx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);

        if (!this.showCursor) return;

        let rect = this.container.getBoundingClientRect();

        let x = Math.min(this.cursorPosition.x - rect.left, this.pageWidth - this.margin);
        let y = this.cursorPosition.y - rect.top;

        this.cursorCtx.fillStyle = "black";
        this.cursorCtx.fillRect(x, y, 2, this.fontSize);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    new RichTextEditor("editorContainer");
});
