const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');
let todos = [];
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = { text: taskText, completed: false };
        todos.push(newTask);
        taskInput.value = '';
        renderTodos();
    }
});
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle')) {
        const index = e.target.dataset.index;
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
    if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index;
        todos.splice(index, 1);
        renderTodos();
    }
});
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});
clearAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="task-actions">
                <button class="toggle" data-index="${index}">${todo.completed ? '↩️' : '✓'}</button>
                <button class="delete" data-index="${index}">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
const thumbnails = document.querySelectorAll('.thumbnail');
const largeImage = document.getElementById('largeImage');
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const largeImageUrl = thumbnail.getAttribute('data-large');
        largeImage.src = largeImageUrl;
    });
});
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const targetTab = button.dataset.tab;
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            if (pane.id === targetTab) {
                pane.classList.add('active');
            }
        });
    });
});
