const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const envFile = path.join(process.cwd(), 'webpack/dev.env');
const devConfig = dotenv.parse(fs.readFileSync(envFile));
const resourceFolder = devConfig['RESOURCE_FOLDER'];
devConfig['BUILD_NO'] = Date.now();
devConfig['PAGE_CONFIG'] = JSON.stringify(devConfig);
module.exports = {
  devtool: 'source-map',
  //context:path.join(process.cwd(), 'app'),
  entry:{
    app:path.join(process.cwd(), 'app/appmain.js')
  },
  output:{
    pathinfo: true,
    path:path.join(process.cwd(), 'dist'),
    filename:resourceFolder+'/js/appbundle.js',
    chunkFilename: resourceFolder+'/js/chunk-[name].js',
    publicPath:devConfig['PUBLIC_PATH'],
  },
  devServer:{
    contentBase:path.join(process.cwd(), 'public'),
    port:3000,
    historyApiFallback: true,
    hot: true,
    //open: true,
    //openPage: '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            ["@babel/env", {
                "targets": {
                    'browsers': ['Chrome >=59']
                },
                "modules":false,
                "loose":true
            }],"@babel/preset-react"],

         plugins: [
            "@babel/proposal-object-rest-spread"
         ]
        }
      },
      {
        test: /\.css|.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader',
            options: {
              importLoaders: 1,
              //minimize: false,
              //localIdentName: 'static/css/[name].css'
            } 
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
                sassOptions: {
		        indentWidth: 4,
		        includePaths: [path.join(process.cwd(), 'assets/saas')]
                },
                sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif|webp)$/,
        loader: 'url-loader',
        include: [path.join(process.cwd(), 'assets/css')],
        options: {
                  limit: 1000,
                  name: resourceFolder+'/images/[name].[ext]'
            }
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        loader: 'file-loader',
        include: [path.join(process.cwd(), 'assets/images')],
        options: {
          //useRelativePath:true,
          name: resourceFolder+'/images/[name].[ext]'
        }
      }
    ]
  },
  resolve:{
    modules:[
      path.join(process.cwd(), 'app'),
      path.join(process.cwd(), 'node_modules'),
    ],
    extensions: ['.js', '.jsx'],
    alias: {
            components: path.resolve('app/components'),
            utils: path.resolve('app/utils'),
            assets: path.resolve('assets')
        }
  },
  plugins: [
    new Dotenv({path:envFile}),
    new HtmlWebPackPlugin({
      inject: true,
      template: path.join(process.cwd(), "public/index.html"),
      favicon: path.join(process.cwd(), 'assets/images/favicon.png'),
      chunksSortMode: 'none',
      templateParameters:devConfig,
      //filename: "./index.html"
      //title: 'Output Management'
    }),
    new MiniCssExtractPlugin({
      filename: resourceFolder+'/css/[name].css',// : '[name].[hash].css',
      chunkFilename: resourceFolder+'/css/chunk-[id].css'// : '[id].[hash].css',
    })
  ]
};
