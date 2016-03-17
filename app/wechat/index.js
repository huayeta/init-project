var wechat=require('co-wechat');

module.exports=function(){
    return wechat('huayeta').middleware(function *(next){
        var message=this.weixin;
        this.body='heh222e';
    })
}
