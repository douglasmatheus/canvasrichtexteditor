# Canvas Rich Text Editor

This is a **canvas-segmented** text editor designed to provide a smooth and efficient editing experience, with a focus on handling large volumes of text.

## Overview

The editor is designed to be highly performant when dealing with large documents by splitting the text into **canvas segments** to optimize rendering and improve navigation. It also features an efficient cursor control, real-time text updates, and support for keyboard navigation.

## Features

- **Efficient text rendering** using segmented canvases.
- **Smooth editing**, allowing real-time modifications.
- **Dynamic cursor control** with per-line rendering.
- Support for **keyboard navigation** (arrow keys, Enter, Backspace).
- Can handle **large documents** (around 3000–3500 words).

## Installation

### Requirements

- Node.js (>=12.x)
- NPM (>=6.x)

### Installation Steps

1. Clone this repository:
   ```bash```
   ```git clone https://github.com/douglasmatheus/canvas-rich-text-editor.git```

2. Navigate to the project directory:
  ```cd canvas-rich-text-editor```

3. Install the dependencies:
  ```npm install```


Usage
Start the development server

To test the editor locally, use the Webpack development server:
```
npm start
```
The server will be available at http://localhost:3000, where you can interact with the editor.
Using the library

The library can be imported into your project as follows:
```
import { initEditor } from 'canvas-rich-text-editor';

// Initialize the editor in an HTML container
const container = document.getElementById('editorContainer');
initEditor(container);
```

API

* initEditor(container): Initializes the editor in the specified container.

* setActiveLine(index): Sets the active line in the editor.

* updateLine(index): Updates the specified line in the editor.

Contribution

If you would like to contribute improvements or fixes to the project, feel free to open an issue or pull request.
License

This project is licensed under the ISC License.