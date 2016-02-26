import React,{PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

class AddTodo extends React.Component {
    constructor() {
        super();
    }
    render(){
        return(
            <div>
                <input type="text" ref="ipt" />
                <button onClick={e=>this.handleClick(e)} >添加</button>
            </div>
        )
    }
    handleClick(e){
        const node=findDOMNode(this.refs.ipt);
        const text=node.value.trim();
        this.props.onAddClick(text);
        node.value='';
    }
}

AddTodo.propTypes={
    onAddClick:PropTypes.func.isRequired,
}

module.exports=AddTodo;
