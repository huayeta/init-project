import objectAssign from 'object-assign';
import {Filters,ADD_TODO,UPDATE_TODO,UPDATE_FILTER,addTodo} from '../actions/actions';
import {combineReducers} from 'redux';
import store from '../store/store';

export const filtersReducer=(state=Filters.SHOW_ALL,action)=>{
    switch (action.type) {
        case UPDATE_FILTER:
            return action.filter
            break;
        default:
            return state;
    }
}

export const todosReducer=(state=[],action)=>{
    switch (action.type) {
        case ADD_TODO:
            return [...state,{text:action.text}];
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

let objectReducers={
    filter:filtersReducer,
}

export const createReducer=(store,obj)=>{
    // console.log(store.getState());
    if(obj)objectAssign(objectReducers,obj);
    store.replaceReducer(
        combineReducers(objectReducers)
    )
}

export const todoApp=combineReducers(objectReducers);
