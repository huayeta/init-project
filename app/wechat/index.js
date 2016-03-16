var wechatCfgs=require('./configs.js');

module.exports=function(){
    return function *(next){
        var query=this.query;
        if(query.signature){
            var tx=wechatCfgs.checkSignature(this.query);
            if(tx){
                return this.body=query.echostr;
            }
        }
        yield next;
    }
}
