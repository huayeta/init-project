var thunkify=require('thunkify');
var fs=require('fs');
var zlib=require('zlib');
var path=require('path');

module.exports=function(router){
    router.get('/',function *(next){
        this.body='1122';
    })
    router.get('/index',function *(next){
        // console.log(this.cookies.get('huayeta'));
        // this.cookies.set('huayeta',null);
        yield this.render('index');
    })
    router.get('/gz',function *(){
        const gzip = zlib.createGzip();
        fs.createReadStream(path.join(__dirname,'../README.md'))
            .pipe(gzip)
            .pipe(fs.createWriteStream(path.join(__dirname,'../a.md.gz')));
        this.body='压缩完成';
    })
}
