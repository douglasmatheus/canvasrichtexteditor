// webpack.dev.js
import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: './src/initEditor.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'canvas-rich-text-editor.js',
    clean: true,
    library: 'CanvasRichTextEditor',
    libraryTarget: 'window', // <- compatível com navegador direto
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    static: [
      { directory: path.resolve(__dirname, 'public') },
      { directory: path.resolve(__dirname, 'dist') },
    ],
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devtool: 'source-map',
};
