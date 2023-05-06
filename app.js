//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions

function addTodo(event){
    //Prevent form from Submitting
    event.preventDefault();
    //ToDo DIV
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODOS TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); 
    //Append to LIST
    todoList.appendChild(todoDiv);
    //Clear ToDo Input Value
    todoInput.value="";
    

}

function deleteCheck(e){
    const item =e.target;
    //DELETE TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });

    }
    //Check MARK
    if(item.classList[0]=== "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
   }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) { 
        const mStyle = todo.style;  
        if(mStyle != undefined && mStyle != null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}


function saveLocalTodos(todo) {
    //Check ---- things already stored there?or not!

    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos =[];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
todos.forEach(function(todo){
    //ToDo DIV
    const todoDiv =document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton); 
    //Append to LIST
    todoList.appendChild(todoDiv);
});
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos =[];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
     const todoIndex = todo.children[0].innerText;
     todos.splice(todoIndex, 1);
     localStorage.setItem("todos",JSON.stringify(todos));
}