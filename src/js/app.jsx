import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import todoApp from './reducers/reducers';

let store=createStore(todoApp);

const rootRoute={
    component:'div',
    childRoutes:[{
        path:'/',
        component:require('./components/App'),
        childRoutes:[
            require('./routes/todo/')
        ]
    }],
}

render(
    <Provider store={store}>
        <Router children={rootRoute} />
    </Provider>,
    document.getElementById('app')
)
