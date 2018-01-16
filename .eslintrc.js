module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "brace-style": [
      "error",
      "stroustrup",
    ],
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
  },
  globals: {},
}
