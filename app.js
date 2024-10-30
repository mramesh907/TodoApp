const todoForm = document.querySelector("form")
const todoInput = document.querySelector("#todo-input")
const todoUl = document.querySelector("#todo-list")


let allTodos = getTodo();

UpdateTodoList();
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();

})
function addTodo() {
    const todoText = todoInput.value.trim();
    if (!todoText == "") {
        const todoObject={
            text:todoText,
            completed:false
        }
        allTodos.push(todoObject);
        UpdateTodoList();
        saveTodo();
        todoInput.value = "";
    }
}
function UpdateTodoList(){
    todoUl.innerHTML="";
    allTodos.forEach((todoText,idx) => {
        var todoItem=CreateTodoItem(todoText,idx);
        todoUl.appendChild(todoItem);
    })
}
function CreateTodoItem(todo,idx){
    const li=document.createElement("li");
    const id="todo-"+idx;
    const todoText=todo.text;
    li.className="todo";
    li.innerHTML=`
    <input type="checkbox" name="" id="${id}">
                <label class="custom-checkbox" for="${id}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                        fill="undefined">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                </label>
                <label for="${id}" class="todo-text">
                   ${todoText}
                </label>
                <button onclick="deleteTodo(${idx})" class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined">
                        <path
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                </button>
    `;
    const checkbox=li.querySelector("input");
    checkbox.addEventListener("change",(e)=>{
        allTodos[idx].completed=checkbox.checked;
        saveTodo();
    });
    checkbox.checked=todo.completed;
    todoUl.appendChild(li);
    return li;
}
function deleteTodo(idx){
    allTodos.splice(idx,1);
    UpdateTodoList();
    saveTodo();
}



// save todo
function saveTodo() {
    const todoJSON=JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJSON);
}
function getTodo(){
    const todos=localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
