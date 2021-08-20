function Todo(name, date, priority, status) {
    this.name = name
    this.date = date
    this.priority = priority
    this.status = status;
}

//selectors
const todoInput = document.querySelector('.todo-input');
const todoDateInput = document.querySelector('.todo-date-input');
const todoPriorityInput = document.querySelector('.priority-select')
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    // todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create LI

    // todo object instantiation

    let name = todoInput.value;
    let date = todoDateInput.value;
    let priority = todoPriorityInput.value;
    let newtodoobj = new Todo(name, date, priority);


    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');

    const newTodoNameDiv = document.createElement('div');
    newTodoNameDiv.textContent = name;
    newTodoNameDiv.classList.add('todo-info-boxes')

    const newTodoDateDiv = document.createElement('div');
    newTodoDateDiv.textContent = date;
    newTodoDateDiv.classList.add('todo-info-boxes')

    const newTodoPriorityDiv = document.createElement('div');
    newTodoPriorityDiv.textContent = priority;
    newTodoPriorityDiv.classList.add('todo-info-boxes')
    
    
    newTodo.appendChild(newTodoNameDiv);
    newTodo.appendChild(newTodoDateDiv);
    newTodo.appendChild(newTodoPriorityDiv);

    todoDiv.appendChild(newTodo);


    // add todo to the local storage
    saveLocalTodos(newtodoobj);
    // CHECK MARK button

    const completedButton = document.createElement('button');
    completedButton.textContent = '✔️';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    // trash MARK button

    const trashButton = document.createElement('button');
    trashButton.textContent = '🗑️';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = '';
    todoDateInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    
    // delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    // check mark

    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check -- do I already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        // todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create LI

        // todo object instantiation

        let name = todo.name;
        let date = todo.date;
        let priority = todo.priority;        

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');

        const newTodoNameDiv = document.createElement('div');
        newTodoNameDiv.textContent = name;
        newTodoNameDiv.classList.add('todo-info-boxes')

        const newTodoDateDiv = document.createElement('div');
        newTodoDateDiv.textContent = date;
        newTodoDateDiv.classList.add('todo-info-boxes')

        const newTodoPriorityDiv = document.createElement('div');
        newTodoPriorityDiv.textContent = priority;
        newTodoPriorityDiv.classList.add('todo-info-boxes')
        
        
        newTodo.appendChild(newTodoNameDiv);
        newTodo.appendChild(newTodoDateDiv);
        newTodo.appendChild(newTodoPriorityDiv);

        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.textContent = '✔️';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        
        // trash MARK button

        const trashButton = document.createElement('button');
        trashButton.textContent = '🗑️';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        // append to list
        todoList.appendChild(todoDiv);
            
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // what I click is the div, now I want the li and the inner text
    // so we can SPLICE it
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}