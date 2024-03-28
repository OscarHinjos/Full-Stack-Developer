import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./";



let element;

/**
 * 
 * @param {String} elementIdHTML 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementIdHTML, todos = []) =>{
    if(!element) element = document.querySelector(elementIdHTML);

    if(!element) throw new Error(`Element ${element.id} not found.`)

    element.innerHTML = ''

    todos.forEach(todo => {
        element.append(createTodoHTML(todo))
    });
}