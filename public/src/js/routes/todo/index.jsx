module.exports={
    path:'todo',
    getComponent(location,cb){
        require.ensure([],(require)=>{
            cb(null,require('./components/index'))
        })
    }
}
