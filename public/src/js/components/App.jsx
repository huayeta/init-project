import React from 'react';
import {Link} from 'react-router';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
    }
    render(){
        return (
            <div>
                <div className="routes">
                    <Link to='/todo' activeClassName="active" >todo</Link>
                    <Link to={{pathname:'immutable',query:{id:1}}} activeClassName="active" >immutable</Link>
                </div>
                {this.props.children || 'app'}
            </div>
        )
    }
}

module.exports=App;
