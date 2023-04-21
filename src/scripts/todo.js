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
let oldInputValue
let todos

//funcoes
const updateTodoList = setInterval(() => todos = document.querySelectorAll('.todo'), 100)

const addNewTodo = (text) =>{ 

    if(isRepeatedTodo(text)) return

    todoList.innerHTML += `
        <div class="todo">
            <h3>${text}</h3>
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

const updateTodo = (text) =>{

    todos.forEach(todo =>{
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
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

        filterTodo()
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = parentEl.querySelector('h3').innerText
        oldInputValue = parentEl.querySelector('h3').innerText

        editInput.focus()
    }

    if(targetEl.classList.contains('remove-todo')){
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
        updateTodo(editInput.value)
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