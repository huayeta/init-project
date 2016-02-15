var http = require('http');
var fs=require('fs');
var koa = require('koa');
var serve = require('koa-static');
var path=require('path');
var thunkify=require('thunkify');

var app=koa();

app.use(serve(path.resolve(__dirname,'dest/'),{
    maxage:0
}))

app.use(function *(next){
    // console.log(this.request.path);
    if(this.request.path==='/index.htm'){
        this.body=yield thunkify(fs.readFile)('./index.htm','utf8');
    }
})

app=http.createServer(app.callback());
app.listen(3005);
