import { Todo } from '../todos/models/todo.model.js';


export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del espacio'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra de poder'),
        new Todo('Piedra de realidad'),
    ],
    filter: Filters.All,
};

const initStore = () => {
    loadStore();
    console.log('Init Store 🫡')
}


const loadStore = () => {
    if(!localStorage.getItem('state')) return 

    const {todos = [] , filter = Filters.All} = JSON.parse(localStorage.getItem('state'))
    state.todos = todos
    state.filter = filter
}


const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}
/**
* 
* @param {String} newFilter 
*/
const getTodos = (newFilter = Filters.All) => {
    switch (newFilter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${newFilter} is not valid.`)
    }
}

/**
* 
* @param {String} todo 
*/
const addTodo = (description) => {
    if(!description) throw new Error('Description is required.')
    
    state.todos.push(new Todo(description))
    saveStateToLocalStorage();
}

/**
* 
* @param {String} todoId 
*/
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done
        }
        return todo
    });

    saveStateToLocalStorage();
}

/**
* 
* @param {String} todoId 
*/
const deleteTodo = (todoId) => {
    if(!todoId) throw new Error('Id is required.')
    state.todos = state.todos.filter( todo => todo.id !== todoId)
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done)
    saveStateToLocalStorage();
}

/**
* 
* @param {Filters} newFilter 
*/
const setSelectedFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
   
}

const gerCurrentFilter = () => {
    return state.filter
}

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setSelectedFilter,
    gerCurrentFilter,
}