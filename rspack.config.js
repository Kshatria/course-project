const { resolve } = require('path');
const { DefinePlugin } = require('@rspack/core');

module.exports = {
  // Точка входа приложения
  entry: './src/main.tsx',

  // Режим разработки или продакшн
  mode: process.env.NODE_ENV || 'development',

  // Настройка выходных файлов
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },

  // Разрешение расширений файлов
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve(__dirname, 'src'), // Алиас для импортов
    },
  },

  // experiments: {
  //   css: true,
  // },

  module: {
    rules: [
      // Обработка JavaScript (JS/JSX) и TypeScript (TS/TSX)
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic', // Для нового JSX transform
              },
            },
          },
        },
      },

      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                exportLocalsConvention: 'asIs', // Сохраняет оригинальные имена классов
                namedExport: false, // Отключает именованные экспорты
              },
              importLoaders: 1, // Важно для работы postcss-loader
            },
          },
          'postcss-loader', // Добавлен postcss-loader
        ],
      },

      //Обычный CSS (без модулей) + PostCSS
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  // Плагины
  plugins: [
    // Глобальные переменные (например, для process.env)
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  // Настройки dev-сервера
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true, // Для SPA (React Router)
  },

  // Source maps (для отладки)
  devtool: 'source-map',
};
