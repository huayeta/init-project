var cryptoJs=require('crypto-js');

var wechatCfgs={
    Token:'huayeta',
    appID:'wxa9324783827b2bbc',
    appsecret:'1b5d13472e2291012376d0fcf3bb7d23',
}
// 检查签名
wechatCfgs.checkSignature=function(query){
    // console.log(query);
    var signature=query.signature;
    var timestamp=query.timestamp;
    var nonce=query.nonce;
    var token=wechatCfgs.Token;

    var tmpArr=[token,timestamp,nonce].sort();
    var tmpStr=tmpArr.join('');
    tmpStr=cryptoJs.SHA1(tmpStr).toString();

    return tmpStr===signature;
}
module.exports=wechatCfgs;
