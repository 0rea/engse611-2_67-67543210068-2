const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');

let todos = [];

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
  
  saveTodos();
}

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    todos.push({ text: taskText, completed: false });
    taskInput.value = ''; 
    renderTodos();
  }
});

todoList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('toggle')) {
    const index = target.dataset.index;
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }
  
  if (target.classList.contains('delete')) {
    const index = target.dataset.index;
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

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
  }
}

loadTodos();
