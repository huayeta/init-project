import React from 'react';
import {render} from 'react-dom';
import {Router,IndexRoute} from 'react-router';

const rootRoute={
    component:'div',
    childRoutes:[{
        path:'/',
        component:require('./components/App'),
        childRoutes:[
            require('./routes/test/')
        ]
    }],
}

render(
    <Router children={rootRoute} ></Router>,
    document.getElementById('app')
)
