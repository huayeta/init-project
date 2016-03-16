var http = require('http');
var fs=require('fs');
var koa = require('koa');
var path=require('path');

var app=koa();

//错误信息的捕获
app.use(function *(next){
    try {
        yield next;
    } catch (err) {
        this.status= err.status || 500;
        this.type='html';
        // this.body='<p>Something <em>exploded</em>, please contact huayeta.</p>';
        this.body=err.message;
        //发送错误信息
        this.app.emit('error',err,this);
    } finally {

    }
})
app.on('error',function(err){
    if (process.env.NODE_ENV != 'test') {
        // console.log('sent error %s to the cloud', err.message);
        console.log(err);
      }
})

//静态资源的设置
var serve = require('koa-static');
app.use(serve(path.resolve(__dirname,'./public/'),{
    maxage:0
}))

//解析html
var views=require('koa-views');
app.use(views(__dirname+'/views',{
    map:{
        html:'swig'
    }
}))

//打印日志
var logger=require('koa-logger');
function ignpreAssets(mw){
    return function *(next){
        if(/(\.js|\.css|\.ico)$/.test(this.path)){
            yield next;
        }else{
            yield mw.call(this,next);
        }
    }
}
app.use(ignpreAssets(logger()));

//微信
app.use(require('./app/wechat/index.js')());

//路由
app.use(require('./configs/routes')());

//404页面的中间件
app.use(function *pageNotFound(next){
  yield next;

  if (404 != this.status) return;

  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  this.status = 404;
  switch (this.accepts('html', 'json')) {
    case 'html':
      this.type = 'html';
      this.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      this.body = {
        status:0,
        info: 'Page Not Found'
      };
      break;
    default:
      this.type = 'text';
      this.body = 'Page Not Found';
  }
})

app=http.createServer(app.callback());
app.listen(80);
