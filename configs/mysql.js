var mysql=require('mysql');

const handleError=(err)=>{
    if(err){
        //如果是连接断开，自动重新连接
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            //2秒后重新连接一次
            console.log('进行锻炼重连：'+new Date());
            setTimeout(function(){
                global.db=connect();
            },2000)
        }else{
            console.log(err.stack || err);
        }
        return;
    }
    console.log('连接成功');
}

// const connect=()=>{
//     var db=mysql.createConnection({
//         host:'localhost',
//         port:'3306',
//         user:'root',
//         password:'',
//         database:'huayeta'
//     })
//     db.connect(handleError);
//     db.on('error',handleError);
//     return db;
// }

const connect=()=>{
    //连接池
    var pool=mysql.createPool({
        connectionLimit:100,
        host:'localhost',
        port:'3306',
        user:'root',
        password:'',
        database:'huayeta'
    })
    pool.on('connection',function(connection){
        //当有新链接被创建的时候
    })
    return pool;
}

global.db=connect();
