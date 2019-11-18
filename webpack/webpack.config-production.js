const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const shouldUseSourceMap = false;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const deployPath = '/home/santhosh/scg/workspace/buyer-ui-build/';
//const assetFolder = 'static';
//const prodEnv = new Dotenv({path:'./webpack/prod.env'});
const fs = require('fs');
const dotenv = require('dotenv');
const envFile = './webpack/prod.env';
const prodConfig = dotenv.parse(fs.readFileSync(envFile));
const resourceFolder = prodConfig['RESOURCE_FOLDER'];
prodConfig['BUILD_NO'] = Date.now();
prodConfig['PAGE_CONFIG'] = JSON.stringify(prodConfig);
//console.log(prodEnv);
//const configIndex = process.argv.indexOf('--config-file');
//const envFile = configIndex>-1?process.argv[configIndex+1]:'prod.env';
module.exports = {
  devtool: shouldUseSourceMap,
  //context:path.join(process.cwd(), 'app'),
  entry:{
    app:path.join(process.cwd(), 'app/appmain.js')
  },
  output:{
    pathinfo: true,
    path:path.join(process.cwd(), 'dist'),
    filename: resourceFolder+'/js/[name]-bunddle-[contenthash].js',
    chunkFilename: resourceFolder+'/js/chunk-[name]-[contenthash].js',
    publicPath:prodConfig['PUBLIC_PATH'],
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
        test: /\.css|scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
              	localIdentName: resourceFolder+'/css/[name].css'
              }
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
                sourceMap: shouldUseSourceMap
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
                  name: resourceFolder+'/css/img/[name]-[hash:8].[ext]'
            }
      },
      {
	    test: /\.(jpg|png|svg|webp)$/,
	    loader: 'file-loader',
	    include: [path.join(process.cwd(), 'assets/images')],
	    options: {
		   //useRelativePath:true,
		   name: resourceFolder+'/images/[name]-[hash:8].[ext]'
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
    //aliasFields: ['browser'],
    alias: {
            components: path.join(process.cwd(),'app/components'),
            utils: path.join(process.cwd(), 'app/utils'),
            assets: path.join(process.cwd(), 'assets')
        }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
          parallel: 4,
          uglifyOptions: {
              ecma: 8,
              warnings: false,
              mangle: {
                safari10: true,
              },
              output: {
                comments: false,
                ascii_only: true,
              },
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
          }
      })
    ]
  },
  plugins: [
    new Dotenv({path:'./webpack/'+envFile}),
    new FileManagerPlugin({
			onStart:[
				{delete: [path.join(process.cwd(), 'dist/*')]},
				{copy: [
                { source: path.join(process.cwd(), 'public'), destination: path.join(process.cwd(), 'dist') },
                { source: path.join(process.cwd(), 'public/*.htaccess'), destination: path.join(process.cwd(), 'dist/.htaccess') }
				      ]}
      ],
      oEnd:[
        {delete: [path.join(process.cwd(), 'dist/data')]}
				/* mkdir: [deployPath+assetFolder+'/js',deployPath+assetFolder+'/css',deployPath+assetFolder+'/images'],
				copy: [
            { source: path.join(process.cwd(), 'public/*.htaccess'), destination: path.join(process.cwd(), 'dist') },
						{ source: path.join(process.cwd(), 'dist'), destination: deployPath },
						{ source: path.join(process.cwd(), 'dist/static/js'), destination: deployPath+assetFolder+'/js' },
						{ source: path.join(process.cwd(), 'dist/static/css'), destination: deployPath+assetFolder+'/css' },
						{ source: path.join(process.cwd(), 'dist/static/images'), destination: deployPath+assetFolder+'/images' }
				      ] */
      ]
		}),
    new HtmlWebPackPlugin({
      inject: true,
      template: path.join(process.cwd(), "public/index.html"),
      favicon: path.join(process.cwd(), 'assets/images/favicon.png'),
      chunksSortMode: 'none',
      hash:true,
      templateParameters:prodConfig,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: resourceFolder+'/css/[name]-[contenthash].css',
      chunkFilename: resourceFolder+'/css/chunk-[id]-[contenthash].css',
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
