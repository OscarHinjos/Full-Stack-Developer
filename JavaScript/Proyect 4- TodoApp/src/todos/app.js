import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderPending, renderTodos } from "./use-cases";



const elementIds = {
    todoList: ".todo-list",
    newTodoInput: "#new-todo-input",
    clearCompleted: ".clear-completed",
    todoFilters: '.filtro',
    countPending: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    const updatePendingCount = () =>{
        renderPending(elementIds.countPending)
    }
    // function app is call
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.gerCurrentFilter());
        renderTodos(elementIds.todoList, todos)
        updatePendingCount();
    };


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
    // Reference HTML
    const newDescriptionInput = document.querySelector(elementIds.newTodoInput)
    const todoListUl = document.querySelector(elementIds.todoList)
    const btnClearCompleted = document.querySelector(elementIds.clearCompleted)
    const filtersLi = document.querySelectorAll(elementIds.todoFilters)


    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return
        if (event.target.value.trim().length === 0) return

        todoStore.addTodo(event.target.value)
        displayTodos()
        event.target.value = ''
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos()
    })


    todoListUl.addEventListener('click', (event) => {
        const element = event.target
        if (element.classList.contains("destroy")) {
            const listItem = event.target.closest('li')
            // console.log(listItem.getAttribute('data-id'))
            todoStore.deleteTodo(listItem.getAttribute('data-id'))
            displayTodos()
        }

    })

    btnClearCompleted.addEventListener('click', (event) => {
        todoStore.deleteCompleted()
        displayTodos()

    })

    filtersLi.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLi.forEach(el => el.classList.remove('selected'))
            element.target.classList.add('selected')

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setSelectedFilter(Filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setSelectedFilter(Filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setSelectedFilter(Filters.Completed)
                    break;
                default:
                    break;
            }
            displayTodos()
        })
    })


  

}