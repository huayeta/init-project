import React from 'react';
import {createStore} from 'redux';
import todoApp from '../reducers/reducers';

let store = createStore(todoApp);

// store.subscribe(()=>{
//     console.log(store.getState());
// })
//
// store.dispatch(actions.addTodo(111));
// store.dispatch(actions.updateTodo(0,2));

class test extends React.Component {
    constructor() {
        super();
    }
    render(){
        return(
            <div>
                test1233
            </div>
        )
    }
}

module.exports=test;
