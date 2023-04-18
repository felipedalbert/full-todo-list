// selecao de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue

//funcoes

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
    const todos = document.querySelectorAll('.todo')

    todos.forEach((todo) =>{
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
    let todoTitle

    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText
    }

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
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
})


