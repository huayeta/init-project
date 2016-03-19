'use strict';
var path=require('path');
var webpack=require('webpack');

var JS_PATH=path.resolve(__dirname,'./public/src/js/');
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
   }),
   new webpack.DefinePlugin({
        'process.env.NODE_ENV': (!isProduction()?'"development"':'"production"')
    }),
   new webpack.NoErrorsPlugin()
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
//插件
var processors=[
    require('postcss-import'),//合并@import的样式到主样式里面
    // require('cssnext'),
    require('precss'),//预处理语言
    require('postcss-will-change'),//提前动画
    require('postcss-color-rgba-fallback'),//rgba的兼容
    require('postcss-opacity'),//opacity的兼容
    require('postcss-pseudoelements'),//::伪元素的兼容
    require('postcss-vmin'),//vmin单位的兼容
    require('pixrem'),//rem单位的兼容
    require('css-mqpacker'),//合并媒体查询的样式
    require('autoprefixer'),//自动添加前缀
    // require('cssnano'),//压缩合并优化
];

module.exports={
    resolve:{
        alias:{
            'js':path.resolve(__dirname,'./public/src/js/'),
            'css':path.join(__dirname,'./public/src/css/'),
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
                    plugins: ['transform-runtime']
                }
            },
            {
                test:/\.es6$/,
                loader:'babel',
                exclude: /(node_modules|bower_components)/,
                query:{
                    cacheDirectory:true,
                    presets:['es2015','stage-3'],
                    plugins: ['transform-runtime']
                }
            },
            {test: /.(png|jpg)$/, loader: "url-loader?limit=10000"}
        ]
    },
    postcss:function(){
        return processors;
    },
    plugins:plugins,
    devtool : isProduction()?null:'source-map'
}
