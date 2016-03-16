var Router=require('koa-router');
var fetch=require('node-fetch');
var configs=require('./configs.js');

const Token=configs.Token,appID=configs.appID,appsecret=configs.appsecret;
var access_token;

//判断access_token是否过期
function isExpireAccessToken(){
    if(!access_token) return false;
    if((Date.now()-access_token.date)/1000>=access_token.expires_in)return false;
    return true;
}

module.exports=function(router){
    const wetchatRouter=new Router({
        prefix:'wechat'
    });

    wetchatRouter.get('/',function *(next){
        this.body='wetchat';
    })

    //获取access_token
    wetchatRouter.get('/access_token',function *(next){
        if(isExpireAccessToken()){
            return this.body=access_token;
        }
        const url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`;
        const res=yield fetch(url,{method:'GET'}).then((res) => res.json());
        access_token=res;
        access_token.date=Date.now();
        this.body=res;
    })

    router.use('/',wetchatRouter.routes(),wetchatRouter.allowedMethods());
}
