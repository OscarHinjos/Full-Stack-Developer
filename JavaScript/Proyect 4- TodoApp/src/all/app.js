import  html  from "./app.html?raw";



/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {
    // function app is call
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();


}