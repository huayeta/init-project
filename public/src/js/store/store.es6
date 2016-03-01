import {createStore,applyMiddleware} from 'redux';
import {todoApp} from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

let store=createStore(
    todoApp,
    applyMiddleware(thunkMiddleware,logger())
);

// console.log(store);
// console.log(store.getState());

export {store};
