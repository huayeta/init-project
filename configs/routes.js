var thunkify=require('thunkify');
var fs=require('fs');
var zlib=require('zlib');
var path=require('path');
var url=require('url');
var util=require('util');
var Router=require('koa-router');

var db=global.db;

function query(sql){
    return new Promise(function(resolve,reject){
        db.query(sql,function(err,rows){
            if(err)return reject(err);
            resolve(rows);
        });
    })
}

module.exports=function(){
    const router=new Router();

    router.get('/',function *(next){
        this.body='1122';
    })

    router.get('/mysql',function *(next){
        var results=yield query('select * from `members`');
        // console.log(results);
        this.body=results;
    })
    router.get('/gz',function *(){
        const gzip = zlib.createGzip();
        fs.createReadStream(path.join(__dirname,'../README.md'))
            .pipe(gzip)
            .pipe(fs.createWriteStream(path.join(__dirname,'../a.md.gz')));
        this.body='压缩完成';
    })
    router.get('/url',function *(next){
        const strUrl='http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
        const parseUrl=url.parse(strUrl);
        console.log(parseUrl);
        this.type='html';
        // this.body=parseUrl;
        this.body=util.inspect(parseUrl);
    })

    //后台程序
    var memberRouter=require('../app/member/routers.js')();
    router.use('/',memberRouter.routes(),memberRouter.allowedMethods());

    //微信的router
    require('../app/wechat/routes.js')(router);

    return router.routes();
}
