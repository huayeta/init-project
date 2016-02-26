'use strict';
var path=require('path');
var webpack=require('webpack');

var JS_PATH=path.resolve(__dirname,'./src/js/');
var bower_components=path.resolve(__dirname,'./bower_components');
var node_modules=path.resolve(__dirname,'./node_modules');
var date=Date.now();

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
}

var plugins=[
    // new webpack.optimize.CommonsChunkPlugin("./public/js/dist/react/common.js",[]),
    // new webpack.ProvidePlugin({
    //     React:'react',
    //     ReactDom:'react-dom',
    //     jquery:'jquery'
    // }),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
       'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
]
if(isProduction()){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            test:/(\.jsx|\.js|\.es6)$/,
            compress:{
                warnings:false
            }
        })
    )
}

module.exports={
    resolve:{
        alias:{
            'js':path.resolve(__dirname,'./src/js/')
        },
        root:[
            bower_components,
            node_modules
        ],
        extensions:['','.js','.jsx','.es6']
    },
    entry:{
        'app':'js/app.jsx',
    },
    output:{
        path:path.resolve(__dirname,'./js/'),
        publicPath:'/dest/js/',
        chunkFilename:date+'[name].chunk.js',
        filename:'[name].js'
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:'style-loader!css-loader!postcss-loader'},
            {
                test:/\.jsx$/,
                loader:'babel',
                exclude: /(node_modules|bower_components)/,
                query:{
                    cacheDirectory:true,
                    presets:['es2015','react','stage-3'],
                    // plugins: ['transform-runtime']
                }
            },
            {
                test:/\.es6$/,
                loader:'babel',
                exclude: /(node_modules|bower_components)/,
                query:{
                    cacheDirectory:true,
                    presets:['es2015','stage-3']
                }
            },
            {test: /.(png|jpg)$/, loader: "url-loader?limit=10000"}
        ]
    },
    postcss:function(){
        return [
            require('autoprefixer'),
            require('precess')
        ];
    },
    plugins:plugins,
    devtool : isProduction()?null:'source-map'
}
