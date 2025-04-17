// webpack.prod.js
import path from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/index.js', // ponto de entrada da LIB
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'canvas-rich-text-editor.js',
    library: {
      type: 'module',
    },
    module: true,
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: false, // Desativa a minificação para preservar os nomes
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'dist/canvas-rich-text-editor.js'),
          to: path.resolve(__dirname, 'public'),
        },
      ],
    }),
  ],
  externalsType: 'module',
};
