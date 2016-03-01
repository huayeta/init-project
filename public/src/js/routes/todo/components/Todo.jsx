import React,{PropTypes} from 'react';

class Todo extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <li onClick={this.handleClick.bind(this,this.props.index)}>{this.props.text}</li>
        )
    }
    handleClick(index){
        this.props.handleRemoveClick(index);
    }
}

Todo.propTypes={
    text:PropTypes.string.isRequired,
    handleRemoveClick:PropTypes.func.isRequired,
}

module.exports=Todo;
