var http = require('http');
var fs=require('fs');
var koa = require('koa');
var serve = require('koa-static');
var path=require('path');
var thunkify=require('thunkify');
var wechatCfgs=require('./configs/wechat.js');
var fetch = require('node-fetch');
fetch('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+wechatCfgs.appID+'&secret='+wechatCfgs.appsecret)
    .then(function(res){
        return res.json();
    }).then(function(res){
        console.log(res);
    })

var app=koa();

app.use(serve(path.resolve(__dirname,'./'),{
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
})

app.use(function *(next){
    // console.log(this.request.path);
    if(this.request.path==='/index.htm'){
        return this.body=yield thunkify(fs.readFile)('./index.htm','utf8');
    }
})

app=http.createServer(app.callback());
app.listen(80);
