function Tab(name) {
    this.name = name;
    this.todos = [];
}

function Todo(name, date, priority, status) {
    this.name = name
    this.date = date
    this.priority = priority
    this.status = status;
}

//selectors main area
const todoInput = document.querySelector('.todo-input');
const todoDateInput = document.querySelector('.todo-date-input');
const todoPriorityInput = document.querySelector('.priority-select')
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//selectors tab area
const addTabButton = document.querySelector('.tab-button');
const TabList = document.querySelector('.tab-list');
const tab = document.querySelectorAll('.tab');


//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', loadTabs);
document.addEventListener('DOMContentLoaded', activateTab);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
addTabButton.addEventListener('click', createTab);
TabList.addEventListener('click', deleteSelectTab);

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
    newTodoNameDiv.classList.add('todo-info-boxes-name')

    const newTodoDateDiv = document.createElement('div');
    newTodoDateDiv.textContent = date;
    newTodoDateDiv.classList.add('todo-info-boxes-date')

    const newTodoPriorityDiv = document.createElement('div');
    newTodoPriorityDiv.textContent = priority;
    newTodoPriorityDiv.classList.add('todo-info-boxes-priority')
    
    
    newTodo.appendChild(newTodoNameDiv);
    newTodo.appendChild(newTodoDateDiv);
    newTodo.appendChild(newTodoPriorityDiv);

    todoDiv.appendChild(newTodo);


    // add todo to the local storage
    saveLocalTodos(newtodoobj);
    // CHECK MARK button

    //put todo in the active tab
    saveTodosinTab(newtodoobj);

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

function saveTodosinTab(todo) {
    const activeTab = document.querySelector('.tab-active');
    const tabName = activeTab.childNodes[0].innerText;
    if(localStorage.getItem('tabs') === null) return;
    else {
        tabs = JSON.parse(localStorage.getItem('tabs'));
    }    
    tabs.forEach(tab => {
        if(tab.name == tabName) {
            tab.todos.push(todo);
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
    })
}

function deleteCheck(event) {
    const item = event.target;
    
    // delete todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        // animation
        todo.classList.add('fall');
        removeLocalTodos();
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
        newTodoNameDiv.classList.add('todo-info-boxes-name')

        const newTodoDateDiv = document.createElement('div');
        newTodoDateDiv.textContent = date;
        newTodoDateDiv.classList.add('todo-info-boxes-date')

        const newTodoPriorityDiv = document.createElement('div');
        newTodoPriorityDiv.textContent = priority;
        newTodoPriorityDiv.classList.add('todo-info-boxes-priority')
        
        
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

function removeLocalTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    // what I click is the div, now I want the li and the inner text
    // so we can SPLICE it
    const todoForTab = document.querySelector('.todo-info-boxes-name').innerText;
    
    todos = todos.filter(item => item.name != todoForTab );

    // todos.splice(todos.indexOf(todoForTab), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    if(localStorage.getItem('tabs') === null) return;
    else {
        tabs = JSON.parse(localStorage.getItem('tabs'));
    }      
    tabs.forEach(item => {
        item.todos = item.todos.filter(item => item.name != todoForTab);
    })
    localStorage.setItem('tabs', JSON.stringify(tabs));


}

function createTab(event) {
    event.preventDefault();   
    
    let name = prompt('Name your tab!', 'Popsicle');
    let tab = new Tab(name);

    let newTab = document.createElement('li');
    newTab.classList.add('tab');
    let newDiv = document.createElement('div');
    newDiv.classList.add('tab-div');
    let newSpanDiv = document.createElement('div');
    newSpanDiv.classList.add('span-div');
    let newSpan = document.createElement('span');
    newSpan.textContent = tab.name;

    let newTrashcanDiv = document.createElement('div');
    newTrashcanDiv.classList.add('trashcan-div')
    let newTrashButton = document.createElement('button');
    newTrashButton.classList.add('trash-btn');
    newTrashButton.textContent = '🗑️';

    //save tab to local memory
    saveLocalTab(tab);
    
    newSpanDiv.appendChild(newSpan);
    newDiv.appendChild(newSpanDiv);
    newTrashcanDiv.appendChild(newTrashButton);
    newTab.appendChild(newDiv);
    newTab.appendChild(newTrashcanDiv);
    TabList.appendChild(newTab);   
    
    activateTab();

}

function deleteSelectTab(event) { 
    
    const item = event.target;
    
    
    // delete todo
    if(item.classList[0] === 'trash-btn') {
        const tab = item.parentElement.parentElement;
        // animation
        tab.classList.add('fall');
        removeLocalTab(tab);
        tab.addEventListener('transitionend', () => {
            tab.remove();
        });
    }

    // check mark

    if(item.classList[0] === 'tab-div' || item.classList[0] === 'tab' || item.classList[0] === 'span-div') {
        let tab = document.querySelectorAll('.tab');
        if(event.target.classList.contains('tab')) {
            tab.forEach(item => item.classList.remove('tab-active'));
            item.classList.add('tab-active');
            
        }
        
    }
}

function saveLocalTab(tab) {
    //check -- do I already have things in there?
    let tabs;
    if(localStorage.getItem('tabs') === null) {
        tabs = [];
    } else {
        tabs = JSON.parse(localStorage.getItem('tabs'));
    }
    tabs.push(tab);

    localStorage.setItem('tabs', JSON.stringify(tabs));   
}

function loadTabs() {
    let tabs;
    if(localStorage.getItem('tabs') === null) {
        tabs = [];
    } else {
        tabs = JSON.parse(localStorage.getItem('tabs'));
    }
    tabs.forEach(function(tab){
        let name = tab.name;
        
        let newTab = document.createElement('li');
        newTab.classList.add('tab');
        let newDiv = document.createElement('div');
        newDiv.classList.add('tab-div');
        let newSpanDiv = document.createElement('div');
        newSpanDiv.classList.add('span-div');
        let newSpan = document.createElement('span');
        newSpan.textContent = name;
    
        let newTrashcanDiv = document.createElement('div');
        newTrashcanDiv.classList.add('trashcan-div')
        let newTrashButton = document.createElement('button');
        newTrashButton.classList.add('trash-btn');
        newTrashButton.textContent = '🗑️';
        
        newSpanDiv.appendChild(newSpan);
        newDiv.appendChild(newSpanDiv);
        newTrashcanDiv.appendChild(newTrashButton);
        newTab.appendChild(newDiv);
        newTab.appendChild(newTrashcanDiv);
        TabList.appendChild(newTab);   
    })
}

function removeLocalTab(tab) {
    let tabs;
    if(localStorage.getItem('tabs') === null) {
        tabs = [];
    } else {
        tabs = JSON.parse(localStorage.getItem('tabs'));
    }
    // what I click is the div, now I want the li and the inner text
    // so we can SPLICE it
    const tabIndex = tab.children[0].innerText;
    tabs.splice(tabs.indexOf(tabIndex), 1);
    localStorage.setItem('tabs', JSON.stringify(tabs));

}

function activateTab() {
    
    if(TabList.childNodes[0] === undefined) return;
    else {
        TabList.childNodes[0].classList.add('tab-active');    
    }
}