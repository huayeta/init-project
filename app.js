var http = require('http');
var fs=require('fs');
var koa = require('koa');
var serve = require('koa-static');
var path=require('path');
var thunkify=require('thunkify');
var wechatCfgs=require('./configs/wechat.js');
var fetch = require('node-fetch');
// fetch('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+wechatCfgs.appID+'&secret='+wechatCfgs.appsecret)
//     .then(function(res){
//         return res.json();
//     }).then(function(res){
//         console.log(res);
//     })

var app=koa();

app.use(serve(path.resolve(__dirname,'./public/'),{
    maxage:0
}))
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

app.use(function *(next){
    // console.log(this.request.path);
    if(this.request.path==='/index.htm'){
        wechatCfgs.getToken();
        return this.body=yield thunkify(fs.readFile)('./views/index.htm','utf8');
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
