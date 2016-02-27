import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import {connect} from 'react-redux';
import {addTodo} from '../../../actions/actions';

class TodoApp extends React.Component {
    constructor() {
        super();
    }
    render(){
        const {dispatch,todos} =this.props;
        return(
            <div>
                <AddTodo onAddClick={text=>{
                        dispatch(addTodo(text));
                    }} />
                <TodoList
                    todos={todos} />
            </div>
        )
    }
}

module.exports=connect((state)=>{
    return state;
})(TodoApp);
