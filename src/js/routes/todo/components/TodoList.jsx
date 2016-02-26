import React,{PropTypes} from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    constructor() {
        super();
    }
    render(){
        return(
            <ul>
                {this.props.todos.map((todo,index) => {
                    return <Todo {...todo} key={index} index={index} handleRemoveClick={(index)=>{
                            console.log(index);
                        }} />
                })}
            </ul>
        )
    }
}

TodoList.propTypes={
    todos:PropTypes.arrayOf(PropTypes.shape({
        text:PropTypes.string.isRequired,
    }).isRequired).isRequired,
}

module.exports=TodoList;
