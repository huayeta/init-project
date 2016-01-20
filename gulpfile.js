var gulp=require('gulp');
var webpack=require('webpack');
var webpackStream=require('webpack-stream');

gulp.task('default',function(){
    console.log(1);
})

var baseWebpack=[
    './src/js/*.jsx',
    './src/js/*.es6',
    './src/js/**/*.jsx',
    './src/js/**/&.es6'
]

gulp.task('webpack',function(){
    gulp.src('./src/js/')
        .pipe(webpackStream(require('./webpack.config.js'),webpack))
        .pipe(gulp.dest('./lib/js'))
})
gulp.task('webpack-w',function(){
    gulp.watch(baseWebpack,['webpack']);
})
