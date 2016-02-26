import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

class TodoApp extends React.Component {
    constructor() {
        super();
    }
    render(){
        return(
            <div>
                <AddTodo onAddClick={text=>{
                        console.log('AddTodo',text);
                    }} />
                <TodoList
                    todos={[
                        {text:'user'},
                        {text:'learn'},
                    ]} />
            </div>
        )
    }
}

module.exports=TodoApp;
