var Router=require('koa-router');

module.exports=function(router){
    const memberRouter=new Router({
        prefix:'member'
    });

    memberRouter.get('/',function *(next){
        yield this.render('index');
    })

    return memberRouter;
}
