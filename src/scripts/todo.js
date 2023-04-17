// selecao de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-form");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");


//funcoes

const addNewTodo = (text) =>{
    let nameTodo = todoList.querySelectorAll('h3')  

    if(Array.from(nameTodo).some(h3 => h3.textContent.trim() == text.trim())){
        alert('Você ja adicionou isso na lista')
        return
    }

    todoList.innerHTML += `
        <div class="todo">
            <h3>${text}</h3>
            <button class="finish-todo">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="edit-todo">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="remove-todo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `

    todoInput.value = ''
    todoInput.focus()
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
    }
})




