var gulp=require('gulp');
var webpack=require('webpack');
var webpackStream=require('webpack-stream');
var postcss=require('gulp-postcss');
var del=require('del');
var shell=require('gulp-shell');

gulp.task('default',['start'])

gulp.task('start',shell.task([
    'gulp webpack-w'
]))

gulp.task('publish',shell.task([
    'NODE_ENV="production" gulp webpack'
]))

//清理项目文件
gulp.task('clean',function(){
    var delPaths=[
        './dest/'
    ];
    del(delPaths).then((paths) => {
        console.log(paths+'\n');
    })
})

//postcss
var baseCss=['./src/css/*.css','./src/css/**/*.css'];
gulp.task('postcss',function(){
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
    return gulp.src(baseCss)
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/css'))
})

gulp.task('postcss-w',function(){
    gulp.watch(baseCss,['postcss']);
})

//webpack
var baseWebpack=[
    './src/js/*.jsx',
    './src/js/*.es6',
    './src/js/**/*.jsx',
    './src/js/**/&.es6'
]
gulp.task('webpack',function(){
    gulp.src('./src/js/')
        .pipe(webpackStream(require('./webpack.config.js'),webpack))
        .pipe(gulp.dest('./dest/js'))
})
gulp.task('webpack-w',function(){
    gulp.watch(baseWebpack,['webpack']);
})
