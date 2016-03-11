var thunkify=require('thunkify');
var fs=require('fs');

module.exports=function(router){
    router.get('/',function *(next){
        this.body='1122';
    })
    router.get('/index',function *(next){
        yield this.render('index');
    })
}
