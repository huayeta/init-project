import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import {connect} from 'react-redux';
import {addTodo} from '../../../actions/actions';
import {bindActionCreators} from 'redux';
import {todosReducer,createReducer} from '../../../reducers/reducers';
import {store} from '../../../store/store.es6';
createReducer(store,{todos:todosReducer})

class TodoApp extends React.Component {
    constructor() {
        super();
    }
    render(){
        console.log(this);
        const {todos,actions} =this.props;
        return(
            <div>
                <AddTodo onAddClick={text=>{
                        actions.addTodo(text)
                    }} />
                <TodoList
                    todos={todos?todos:[]} />
            </div>
        )
    }
}
TodoApp.propTypes={
    router:React.PropTypes.object,
}

module.exports=connect((state)=>{
    return state;
},(dispatch)=>{
    return {
        actions:bindActionCreators({addTodo},dispatch),
    }
})(TodoApp);
