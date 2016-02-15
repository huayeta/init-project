var gulp=require('gulp');
var webpack=require('webpack');
var webpackStream=require('webpack-stream');
var postcss=require('gulp-postcss');
var del=require('del');
var shell=require('gulp-shell');
var gulpSequence=require('gulp-sequence');
var connect=require('gulp-connect');


gulp.task('default',['connect','connect-w'])

// gulp.task('start',shell.task([
//     'gulp webpack-w'
// ]))

gulp.task('publish',['clean'],function(cb){
    shell.task([
        'NODE_ENV="production" gulp webpack'
    ])(cb);
})

//清理项目文件
gulp.task('clean',function(cb){
    var delPaths=[
        './dest/'
    ];
    del(delPaths).then((path) => {
        console.log(path);
        cb();
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
    return gulp.src('./src/js/')
        .pipe(webpackStream(require('./webpack.config.js'),webpack))
        .pipe(gulp.dest('./dest/js'))
})
// gulp.task('webpack-w',function(){
//     gulp.watch(baseWebpack,['webpack']);
// })
//本地服务器
gulp.task('connect',function(cb){
    connect.server({
        root:'./',
        port: 8888,
        livereload:true
    })
});
// 自动刷新
gulp.task('connect-reload',function(){
    console.log(2);
    gulp.src('./*.htm')
        .pipe(connect.reload());
})
gulp.task('webpack-reload',gulpSequence('webpack','connect-reload'));
gulp.task('connect-w',function(cb){
    gulp.watch(['./*.htm'],['connect-reload']);
    gulp.watch(baseWebpack,['webpack-reload'])
})
