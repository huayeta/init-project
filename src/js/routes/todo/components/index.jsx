import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import {connect} from 'react-redux';
import {addTodo} from '../../../actions/actions';
import {bindActionCreators} from 'redux';

class TodoApp extends React.Component {
    constructor() {
        super();
    }
    render(){
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

module.exports=connect((state)=>{
    return state;
},(dispatch)=>{
    return {
        actions:bindActionCreators({addTodo},dispatch),
    }
})(TodoApp);
