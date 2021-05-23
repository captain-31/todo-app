// App Elements
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const deleteAll = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const search = document.querySelector('#search');

// Load all event listener
loadEventListerners();

function loadEventListerners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Remove all tasks event
    deleteAll.addEventListener('click', deleteAllTasks);
    // Search task
    search.addEventListener('keyup', searchTask);
}

// Add task
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add value');
    } else {

         // Create li element
         const li = document.createElement('li');
         // Add class
         li.className = 'collection-item';
 
         // Add checkbox to li item
         const checkboxBlock = document.createElement('label');
         const checkboxInput = document.createElement('input');
         const span = document.createElement('span');
         span.textContent = taskInput.value;
 
         checkboxInput.setAttribute('type', 'checkbox');
         checkboxBlock.appendChild(checkboxInput);
         checkboxBlock.appendChild(span);
         li.appendChild(checkboxBlock);
 
         // Create remove button to task
         const link = document.createElement('a');
         link.className = 'delete-item secondary-content';
         link.innerHTML = '<i class="material-icons left">clear</i>';
         // Append link to li
         li.appendChild(link);
         taskList.appendChild(li);

        // Store in localstorage
        storeInLocalStorage(taskInput.value);

        // Clear the input
        taskInput.value = '';
    }
    e.preventDefault();
}

// Remove task
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Delete all tasks
function deleteAllTasks() {

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    removeAllTasksFromLocalStorage();
}

// Search task
function searchTask(e) {

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent.toLowerCase();
        if (item.indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Save to LocalStorage
function storeInLocalStorage(taskValue) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks
function getTasks() {

    setDate();

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';

        // Add checkbox to li item
        const checkboxBlock = document.createElement('label');
        const checkboxInput = document.createElement('input');
        const span = document.createElement('span');
        span.textContent = task;

        checkboxInput.setAttribute('type', 'checkbox');
        checkboxBlock.appendChild(checkboxInput);
        checkboxBlock.appendChild(span);
        li.appendChild(checkboxBlock);

        // Create remove button to task
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons left">clear</i>';
        // Append link to li
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

// Delete element
function removeTaskFromLocalStorage(taskValue) {

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( function(task, index) {
        if( taskValue.firstChild.textContent === task ) {
            tasks.splice(index, 1)
        } 
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove all tasks
function removeAllTasksFromLocalStorage() {
    if( confirm('Are you sure you want to delete all tasks?')) {
        localStorage.clear();
    }
}

// Set date 
function setDate() {
    let d = new Date();
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentMonth = months[d.getMonth()];
    let currentYear = d.getFullYear();
    let currentDate = d.getDate();
    let currentDay = days[d.getDay()];
    
    document.title = `To Do List - ${currentDate} ${currentMonth} ${currentYear}`;
}