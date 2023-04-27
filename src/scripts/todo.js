// selecao de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const clearButton = document.querySelector("#clear-button");
const filterSelect = document.querySelector("#filter-select");
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let idTodo
let objTodo

//funcoes

const renderTodos = () => {

    todoList.innerHTML = ''

    todoItems.forEach(todo => {
        
        todoList.innerHTML += `
            <div class="todo ${todo.done ? 'done' : ''} ${todo.visibility ? '': 'hide'}" data-id="${todo.id}">
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
        `
    })
}

const addNewTodo = (text) =>{ 

    if(isRepeatedTodo(text)) return

    const newTodo = {
        id: Date.now(),
        text: text,
        done: false,
        visibility: true
    };
    
    todoItems.push(newTodo);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    renderTodos()

    todoInput.value = ''
    todoInput.focus()
}

const toggleForms = () =>{
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}

const updateTodo = (text, objTodo) =>{
    objTodo[0].text = text
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderTodos()
}

const isRepeatedTodo = (text)=>{
    if(todoItems.some(todo => todo.text.trim() === text.trim())){
        alert('Você ja adicionou isso na lista')
        return true
    }
}

const searchTodo = () => {  
    filterSelect.value = 'all'  
    const searchTerm = searchInput.value.trim().toLowerCase();

    console.log('oi')

    todoItems.forEach(todo => {
        const todoTitleText = todo.text.trim().toLowerCase();

        todo.visibility = !todoTitleText.includes(searchTerm) ? false : true

        renderTodos()

        console.log(todo)
    })
}

const filterTodo = () =>{
    searchInput.value = ''
    const selectOption = filterSelect.value

    todoItems.forEach(todo => {

        if(selectOption === 'all'){
            todo.visibility = true
        }else if(selectOption === 'done'){
            todo.visibility = todo.done ? true : false
        }else{
            todo.visibility = todo.done ? false : true
        }
    })

    renderTodos()

    switch (selectOption){
        case 'done': 
            if(todoItems.every(todo => todo.done === false)){
                todoList.innerHTML = `
                <div class="empty-todos">
                        <h5>Nenhuma tarefa realizada</h5>
                </div > `
            }
        return 
        case 'todo': 
            if(todoItems.every(todo => todo.done === true)){
                todoList.innerHTML = `
                <div class="empty-todos">
                        <h5>Nenhuma tarefa pendente</h5>
                </div > `
            }
        return
    }
    
}

//eventos

window.addEventListener('load', filterTodo)

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

        if(filterSelect.value !== 'all') setTimeout(filterTodo, 250)
        
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = parentEl.querySelector('h3').innerText

        idTodo = parentEl.dataset.id

        editInput.focus()
    }

    if(targetEl.classList.contains('remove-todo')){
        idTodo = parentEl.dataset.id
        objTodo = todoItems.findIndex(todo => todo.id == idTodo)

        todoItems.splice(objTodo, 1)
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        filterTodo()
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

searchInput.closest('form').addEventListener('submit', (e)=>{
    e.preventDefault()
})

searchInput.addEventListener('input', searchTodo)

eraseButton.addEventListener('click', () => {
    if (searchInput.value !== ''){
        searchInput.value = ''
        searchTodo()
    }
    
})

filterSelect.addEventListener('change', filterTodo)

clearButton.addEventListener('click', () =>{
    const resposta = confirm("Você está prestes a excluir todos os seus itens")
    if(resposta){
        localStorage.clear()
        location.reload()
    }
})