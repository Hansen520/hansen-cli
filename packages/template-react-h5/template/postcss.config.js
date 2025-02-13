/*
 * @Date: 2023-11-29 10:45:00
 * @Description: description
 */
const px2rem = require('postcss-pxtorem');
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    px2rem({
      rootValue: 39,
      unitPrecision: 5,
      propList: ['*'],
      exclude: /node_modules/,
    }),
  ],
};