var http = require('http');
var fs=require('fs');
var koa = require('koa');
var router=require('koa-router')();
var serve = require('koa-static');
var views=require('koa-views');
var path=require('path');
var wechatCfgs=require('./configs/wechat.js');

var app=koa();

app.use(serve(path.resolve(__dirname,'./public/'),{
    maxage:0
}))

//解析html
app.use(views(__dirname+'/views',{
    map:{
        html:'swig'
    }
}))

//路由
require('./configs/routes')(router);
app.use(router.routes());

//微信认证
app.use(function *(next){
    var query=this.request.query;
    if(query.signature){
        var tx=wechatCfgs.checkSignature(this.request.query);
        if(tx){
            return this.body=query.echostr;
        }
    }
    yield next;
})

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
