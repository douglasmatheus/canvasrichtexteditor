import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development', // Alterar para 'production' em produção
  entry: './src/initEditor.js',
  output: {
    filename: 'canvas-rich-text-editor.js', // Nome do arquivo final
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      name: 'CanvasRichTextEditor', // Nome da biblioteca
      type: 'umd', // Universal Module Definition (compatível com AMD, CommonJS, e também exportação global)
    },
  },
  devServer: {
    static: './public',
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
};
