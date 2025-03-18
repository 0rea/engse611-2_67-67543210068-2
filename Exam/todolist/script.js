const form = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");

let todos = [];

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length === 0) {
        alert("Please enter a task!");
        return;
    }
    if (todoText.length > 50) {
        alert("Task should not exceed 50 characters!");
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false,
    };

    todos.push(todo);
    todoInput.value = "";

    renderTodos();
}

function deleteTodo(id) {
    const confirmDelete = confirm("Are you sure about that ?");
    if (confirmDelete) {
        todos = todos.filter((todo) => todo.id !== id);
        renderTodos();
    }
}

function toggleCompleted(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const todoItem = document.createElement("li");
        const todoText = document.createElement("span");
        const todoCheck = document.createElement("input");
        const todoDeleteButton = document.createElement("button");
        const completedImage = document.createElement("div");

        todoText.textContent = todo.text;
        todoCheck.type = "checkbox";
        todoCheck.checked = todo.completed;
        todoDeleteButton.textContent = "Delete";

        // เพิ่ม event สำหรับปุ่มเช็คถูก
        todoCheck.addEventListener("change", () => toggleCompleted(todo.id));

        // เพิ่ม event สำหรับลบ
        todoDeleteButton.addEventListener("click", () => deleteTodo(todo.id));

        if (todo.completed) {
            todoItem.classList.add("completed");
            todoText.style.textDecoration = "line-through";
        } else {
            todoText.style.textDecoration = "none";
        }

        // แสดงรูปที่ใช้แทนเครื่องหมายเช็คถูก
        completedImage.classList.add("completed-image");

        todoItem.appendChild(todoCheck);
        todoItem.appendChild(todoText);
        todoItem.appendChild(completedImage);
        todoItem.appendChild(todoDeleteButton);

        todoList.appendChild(todoItem);
    });
}

// เพิ่ม event listener สำหรับฟอร์ม
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});

renderTodos();
