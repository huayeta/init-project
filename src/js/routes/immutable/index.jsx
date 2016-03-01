module.exports={
    path:'immutable',
    getComponent(location,cb){
        require.ensure([],(require)=>{
            cb(null,require('./components/index'))
        })
    }
}
