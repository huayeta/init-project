import {createStore,applyMiddleware} from 'redux';
import {todoApp} from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const middleware=process.env.NODE_ENV === 'production'?[thunkMiddleware]:[thunkMiddleware,logger()];

let store=createStore(
    todoApp,
    applyMiddleware(...middleware)
);

export {store};
