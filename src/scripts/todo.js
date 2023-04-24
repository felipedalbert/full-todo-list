// selecao de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let idTodo
let objTodo
let oldInputValue
let todos

//funcoes
const updateTodoList = setInterval(() => todos = document.querySelectorAll('.todo'), 100)

const renderTodos = () => {
    todoItems.forEach(todo => {

        todoList.innerHTML += `
          <div class="todo ${todo.done ? 'done' : ''}" data-id="${todo.id}">
            <h3>${todo.text}</h3>
            <button class="finish-todo" title="check sua tarefa">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="edit-todo" title="edite sua tarefa">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="remove-todo" title="exclua sua tarefa">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        `;
      });
}

const addNewTodo = (text) =>{ 

    if(isRepeatedTodo(text)) return

    const newTodo = {
        id: Date.now(),
        text: text,
        done: false
    };
    
    todoItems.push(newTodo);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    todoList.innerHTML += `
        <div class="todo" data-id="${newTodo.id}">
            <h3>${newTodo.text}</h3>
            <button class="finish-todo" title="check sua tarefa">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="edit-todo" title="edite sua tarefa">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="remove-todo" title="exclua sua tarefa">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `

    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () =>{
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text, objTodo) =>{
    todos.forEach(todo =>{
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })

    objTodo[0].text = text
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

const isRepeatedTodo = (text)=>{
    let namesTodo = todoList.querySelectorAll('h3')

    if(Array.from(namesTodo).some(h3 => h3.textContent.trim() == text.trim())){
        alert('Você ja adicionou isso na lista')
        return true
    }
}

const searchTodo = () => {  
    filterSelect.value = 'all'  
    const searchTerm = searchInput.value.trim().toLowerCase();

    todos.forEach(todo => {
        const todoTitle = todo.querySelector('h3');
        const todoTitleText = todoTitle.innerText.trim().toLowerCase();

        todo.classList.toggle('hide', !todoTitleText.includes(searchTerm))
    })
}

const filterTodo = () =>{
    searchInput.value = ''
    const selectOption = filterSelect.value

    todos.forEach(todo => {

        if(selectOption === 'all'){
            todo.classList.remove('hide')
        }else if(selectOption === 'done'){
            todo.classList.toggle('hide', !todo.classList.contains('done'))
        }else{
            todo.classList.toggle('hide', todo.classList.contains('done'))
        }
    })
     
}

//eventos
todoForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        addNewTodo(inputValue);
    }
})

document.addEventListener('click', (e) =>{
    const targetEl = e.target
    const parentEl = targetEl.closest('.todo') 

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done')

        idTodo = parentEl.dataset.id
        objTodo = todoItems.filter(todo => todo.id == idTodo)
        
        objTodo[0].done = objTodo[0].done ? false : true
        
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        filterTodo()
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = parentEl.querySelector('h3').innerText
        oldInputValue = parentEl.querySelector('h3').innerText
        idTodo = parentEl.dataset.id

        editInput.focus()
    }

    if(targetEl.classList.contains('remove-todo')){
        idTodo = parentEl.dataset.id
        objTodo = todoItems.findIndex(todo => todo.id == idTodo)

        todoItems.splice(objTodo, 1)
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        parentEl.remove()
    }
})

cancelEditBtn.addEventListener('click', (e) =>{
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    if(isRepeatedTodo(editInput.value)){
       return 
    }else if(editInput.value){
        objTodo = todoItems.filter(todo => todo.id == idTodo)
        updateTodo(editInput.value, objTodo)
    }
    
    toggleForms()

    todoInput.focus()
})

searchInput.addEventListener('input', (e) => searchTodo())

filterSelect.addEventListener('change', filterTodo)

eraseButton.addEventListener('click', () => {
    searchInput.value = ''
    searchTodo()
})

window.addEventListener('load', renderTodos)