// Task Class
class Task {
    constructor(title, timeHour, timeMinute, timeDay) {
        this.title = title;
        this.timeHour = timeHour;
        this.timeMinute = timeMinute;
        this.timeDay = timeDay;
    }
}
// UI Tasks
class UI{
    static displayTasks() {
        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task));
    }
    static addTaskToList(task) {
        const list = document.getElementById('task-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td id="td-title">${task.title}</td>
            <td id="td-time">${task.timeHour}:${task.timeMinute} ${task.timeDay}</td>
            <td id="td-remove"><a href="#" style="text-decoration:none"class="btn-danger btn-sm remove">⛌</a></td>
        `;
        list.appendChild(row);
    }
    static removeTask(el) {
        if(el.classList.contains('remove')) {
            el.parentElement.parentElement.remove();
        }
        else if(el.classList.contains('remove2')) { 
            el.parentElement.parentElement.parentElement.remove();    
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#task-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(),2000);
    }
}
//Store Tasks Locally
class Store {
    static getTasks() {
        let tasks;
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }
    static addTasks(task) {
        const tasks = Store.getTasks();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        var listy = tasks.length
        const progress = document.querySelector('#progressBar')
        
        if (listy > 0) {
            var addProgress = listy * 10
        } else { 
            var addProgress = 0
        }    
        progress.style.width = addProgress+"%"
    }
    static removeTask(title){
        const tasks = Store.getTasks();
        tasks.forEach((task, index) => {
            if(task.title === title) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        var listy = tasks.length
        const progress = document.querySelector('#progressBar')
        
        if (listy < 1) {
            var removeProgress = 0
        } else { 
            var removeProgress = (listy / 10) * 100
        }    
        progress.style.width = removeProgress+"%"
    }
}
// Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);
// Add Task
document.querySelector('#task-form').addEventListener('submit', (e) => {
    // Prevent form submission
    e.preventDefault();
    // Values from form
    const title = document.querySelector('#title').value;
    const timeHour = document.querySelector('#timeHour').value;
    const timeMinute = document.querySelector('#timeMinute').value;
    const timeDay = document.querySelector('#timeDay').value;

    // Validation
    if(title === '' || timeHour === '' || timeMinute === '' || timeDay === '') {
        UI.showAlert('Please select a task name and time!', 'danger');
    } else {
        // Populate task
        const task = new Task(title,timeHour,timeMinute,timeDay);
        // Add task to UI
        UI.addTaskToList(task);
        // Add task to Local Storage
        Store.addTasks(task);
        // Notify Task Added
        UI.showAlert('Task added', 'info');
        // Clear form
        document.getElementById("task-form").reset();
    }
});
// Complete Task
document.querySelector('#task-list').addEventListener('click', (e) => {
    UI.removeTask(e.target);
    // Remove task from Local Storage
    Store.removeTask(e.target.parentElement.parentElement.children['td-title'].textContent);
    // Notify Task Completed
    UI.showAlert('Task completed!', 'success');
});