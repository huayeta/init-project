// action 类型
export const ADD_TODO='ADD_TODO';
export const UPDATE_TODO='UPDATE_TODO';
export const UPDATE_FILTER='UPDATE_FILTER';

// 其他常量
export const Filters={
    SHOW_ALL:'SHOW_ALL',
    COMPLATE_ALL:'COMPLATE_ALL',
}

// action 创建函数
export const addTodo=(text)=>{
    // return {type:ADD_TODO,text}
    return (dispatch,getState)=>{
        setTimeout(()=>{
            dispatch({type:ADD_TODO,text:'异步添加的东西'});
        },1000)
        dispatch({type:ADD_TODO,text});
    }
}
export const updateTodo=(index,text)=>{
    return {type:UPDATE_TODO,index,text}
}
export const modifyFilter=(filter)=>{
    return {type:UPDATE_TODO,filter}
}
