// toggle theme
const body = document.body;
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

// get theme
if (localStorage.getItem('themes') === 'dark'){
    body.classList.add('dark');
} else {
    body.classList.remove('dark');
}

sun.addEventListener('click', ()=> {
    body.classList.remove('dark');
    localStorage.removeItem('themes');
});

moon.addEventListener('click', ()=> {
    body.classList.add('dark');
    JSON.stringify(localStorage.setItem('themes', 'dark'));
});

// add todo
const form = document.querySelector('form');
const ul = document.querySelector('.todo-list-container');
const input = document.getElementById('todo-input');
const todoFilterContainer = document.querySelector('.todo-filter-container');
const todoLeft = document.querySelector('.todo-left');
const clearBtn = document.getElementById('clear-btn');
let todoLI = [];
let itemLeft = 0;

// get todo 
const getTodos = JSON.parse(localStorage.getItem('todos'));

if (getTodos){
    getTodos.forEach(todo => addTodo(todo));
    showFilterOption();
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    addTodo();
});

function addTodo(todoFromGet){
    let todoInput = input.value;

    if(todoFromGet){
        todoInput = todoFromGet.text;
    }

    if (todoInput){
        // create Elements
        const li = document.createElement('li');
        const checkBtn = document.createElement('button');
        const img = document.createElement('img');
        const text = document.createElement('span');
        const removeBtn = document.createElement('i');

        // give a class
        checkBtn.className = 'round-btn check-btn';
        text.className = 'li-text';
        removeBtn.className = 'fa fa-xmark';
        text.textContent = todoInput;

        checkBtn.appendChild(img);
        li.appendChild(checkBtn);
        li.appendChild(text);
        li.appendChild(removeBtn);

        completedTodo(checkBtn)
        removeTodo(removeBtn, text.textContent);
        todoLI.push(li);

        ul.appendChild(li);

        itemLeft ++;
        todoLeftCount();

        if(todoFromGet && todoFromGet.completed){
            checkBtn.classList.add('checked');
            checkBtn.nextElementSibling.classList.toggle('checked');
            itemLeft --;
            todoLeftCount();
        }

        input.value = '';

        showFilterOption()

        saveTodos();
    }
}

// completed button
function completedTodo(checkBtn){
    checkBtn.addEventListener('click', ()=> {
        checkBtn.classList.toggle('checked');
        checkBtn.nextElementSibling.classList.toggle('checked');
        if (checkBtn.classList.contains('checked')){
            itemLeft --;
        } else {
            itemLeft ++;
        }
        todoLeftCount();
        saveTodos();
    })
}

// remove button
function removeTodo(removeBtn, text){
    removeBtn.addEventListener('click', ()=>{
        if (removeBtn.previousElementSibling.classList.contains('checked')){
            itemLeft += 0;
        } else {
            itemLeft --;
        }
        todoLeftCount();
        const thisTodo = todoLI.find(todo => todo.firstElementChild.nextElementSibling.innerHTML == text);
        todoLI.splice(todoLI.indexOf(thisTodo), 1);
        removeBtn.parentElement.remove();
        showFilterOption();
        saveTodos();
    })
}

// clear button
clearBtn.addEventListener('click', ()=>{
    todoLI.forEach(todo => {
        todo.remove();
        itemLeft --;
        todoLeftCount();
    });
    todoLI = [];
    todoLeftCount();
    showFilterOption();
    saveTodos();
})

// counting todo left
function todoLeftCount(){
    if (itemLeft <= 0){
        itemLeft = 0;
    }
    todoLeft.innerHTML = `${itemLeft} item left`;
}

// filtering todo
const filterOption = document.querySelectorAll('.filter-option span');
const all = document.getElementById('all');
const active = document.getElementById('active');
const completed = document.getElementById('completed');

for (let i = 0; i < filterOption.length; i++){
    all.addEventListener('click', ()=>{
        filterOption[i].classList.remove('active');
        all.classList.add('active');
        todoLI.forEach(todo => todo.style.display = '');
    });

    active.addEventListener('click', ()=>{
        filterOption[i].classList.remove('active');
        active.classList.add('active');
        todoLI.forEach(todo => {
            if (todo.firstElementChild.classList.contains('checked')){
                todo.style.display = 'none';
            } else {
                todo.style.display = '';
            }
        });
    });

    completed.addEventListener('click', ()=>{
        filterOption[i].classList.remove('active');
        completed.classList.add('active');
        todoLI.forEach(todo => {
            if (todo.firstElementChild.classList.contains('checked')){
                todo.style.display = '';
            } else {
                todo.style.display = 'none';
            }
        });
    });
}

all.click();

function saveTodos(){
    const todosLI = document.querySelectorAll('li');

    const todos = [];

    todosLI.forEach(item => {
        todos.push({
            completed: item.firstElementChild.classList.contains('checked'),
            text: item.firstElementChild.nextElementSibling.textContent
        })
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function showFilterOption(){
    if (todoLI.length > 0){
        todoFilterContainer.style.display = 'flex';
    } else {
        todoFilterContainer.style.display = 'none';
    }
}