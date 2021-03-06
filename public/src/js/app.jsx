import React from 'react';
import {render} from 'react-dom';
import {Router,hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import {store} from './store/store';

const rootRoute={
    component:'div',
    childRoutes:[{
        path:'/',
        component:require('./components/App'),
        childRoutes:[
            require('./routes/login/'),
        ]
    }],
}

render(
    <Provider store={store}>
        <Router children={rootRoute} history={hashHistory} />
    </Provider>,
    document.getElementById('app')
)
