import objectAssign from 'object-assign';
import {Filters,ADD_TODO,UPDATE_TODO,UPDATE_FILTER} from '../actions/actions';
import {combineReducers} from 'redux';

const filtersReducer=(state=Filters.SHOW_ALL,action)=>{
    switch (action.type) {
        case UPDATE_FILTER:
            return action.filter
            break;
        default:
            return state;
    }
}

const todosReducer=(state=[],action)=>{
    // console.log(action);
    switch (action.type) {
        case ADD_TODO:
            return [...state,{text:action.text}]
            break;
        case UPDATE_TODO:
            return [
                ...state.slice(0,action.index),
                objectAssign({},state[action.index],{
                    text:action.text
                }),
                ...state.slice(action.index+1)
            ]
            break;
        default:
            return state;
    }
}

const todoApp=combineReducers({
    filter:filtersReducer,
    todos:todosReducer
});

module.exports=todoApp;
