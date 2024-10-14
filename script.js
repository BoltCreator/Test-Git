const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-list">No tasks yet. Add a task to get started!</li>';
        return;
    }
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleComplete(${index})">✓</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">✕</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

renderTodos();