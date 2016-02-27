import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import todoApp from './reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

let store=createStore(
    todoApp,
    applyMiddleware(thunkMiddleware,logger())
);
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

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
