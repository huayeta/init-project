var wechatCfgs=require('./configs.js');
var parse=require('co-body');
var xml2js=require('xml2js');
var thunkify=require('thunkify');

module.exports=function(){
    return function *(next){
        var query=this.query;
        var method=this.method;
        if(query.signature){
            //检查微信验证
            if(method=='GET'){
                var tx=wechatCfgs.checkSignature(this.query);
                if(tx){
                    return this.body=query.echostr;
                }
            }
            //接受消息
            if(method=='POST'){
                var string=yield parse.text(this);
                var parseString=thunkify(xml2js.parseString);
                var stringJson=yield parseString(string);
                this.body='';
            }
        }
        yield next;
    }
}
