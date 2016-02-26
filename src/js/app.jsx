import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';

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
    <Router children={rootRoute} />,
    document.getElementById('app')
)
