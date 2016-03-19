import React from 'react';

class App extends React.Component {
    constructor() {
        super();
    }
    componentWillMount(){
        this.context.router.replace('/login');
    }
    render(){
        return (
            <div>
                {this.props.children || 'app'}
            </div>
        )
    }
}
App.contextTypes={
    router: React.PropTypes.object.isRequired
}

module.exports=App;
