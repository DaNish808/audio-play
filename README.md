# d3-scratch
a personal learning project

## GOALS
- approach d3 from scratch
- utilize React without create-react-app
- learn a bit about the Web Audio API

## Ancillary Goals
- utilize webpack
- utilize babel
- utilize s3

## Notes 
- on things learned

### webpack
1. npm i webpack webpack-cli -S
2. directory structure
```
- webpack.config.js
- server.js
- src
  |- index.js
- dist
  |- index.html
  |- style.css
```
3. webpack.config.js
```
module.exports = {
  entry: "./src",
  output: {
    filename: "main.js"
  },
  mode: "development",
  watch: true
}
```
4. webpack-dev-server
- `npm i -S webpack-dev-server`
```
// in webpack.config.js export
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true, 
  open: true  // open on "npm run start"
}
```
```
// in package.json
"scripts": {
  "start": "nodemon --watch webpack.config.js --exec \"webpack-dev-server --mode development\"",
  "build": "webpack --mode production"
},
```
5. import media files
- `npm install file-loader --save-dev`
```
// in webpack.config.js export
module: {
  rules: [
    {
      test: /\.(png|jpg|gif|mp3|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }
  ]
}
```
6. html-webpack-plugin
- `npm i html-webpack-plugin -D`
```
// in webpack.config.js
const HtmlWebPackPlugin = require("html-webpack-plugin");

// in webpack.config.js export
plugins: [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  })
],

```
7. style-loader and css-loader
- `npm i -D style-loader css-loader `
```
// in webpack.config.js export
  module: {
    rules: [
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ...
```
```
// in app.js
import './path/to/style.css
```
```
// in index.html
<link href="./style.css" rel="stylesheet" type="text/css">
```

### HOW HAVE I NOT HEARD OF requestAnimationFrame() UNTIL NOW!?!?!?


### React/Babel
- `npm i -S react react-dom`
- `npm i -D babel-core babel-loader babel-preset-env babel-preset-react`
- `npm install --save-dev babel-plugin-transform-object-rest-spread`
- `npm install --save-dev babel-plugin-transform-class-properties`
```
// in webpack.config.js export
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
```
```
// in .babelrc
{
  "presets": ["env", "react"],
  "plugins": [
    "transform-object-rest-spread",
    "babel-plugin-transform-class-properties"
  ]

}
```

## S3
- `npm i -S aws-sdk`
