module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "ignore": ["third_party"],
  "plugins": [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
