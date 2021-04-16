let $todoInput; //user writing content
let $newTask; //new added li (task)
let $alertInfo; //displays info there is nothing to do
let $addBtn; // ADD button - adding new elements to list
let $ulList; // list of todo exercices (ul)
let $toolsArea; //Buttons in li element
let $completeBtn; //button signing that exercice is complete
let editBtn; //button enables editing content of quest
let deleteBtn; //button which deletes quest
let $allTasks; //this integer contains all tasks

let $popUp; //popup window
let $popUpInfo; //popup alert after adding empty text
let $editedTodo; //editet todo
let $popUpInput; //text writeen into popup input
let $addPopUpBtn; //accept button in popup
let $closePopUpBtn; //cancel button in popup
let $idNumber = 0;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};
//downloading elements
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.whattodo');
    $alertInfo = document.querySelector('.alertinfo');
    $addBtn = document.querySelector('.add');
    $ulList = document.querySelector('.todolist ul');
    $popUp = document.querySelector('.popup');
    $popUpInfo = document.querySelector('.popupinfo');
    $popUpInput = document.querySelector('.popupinput');
    $addPopUpBtn = document.querySelector('.accept');
    $closePopUpBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};

//downloading events
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closePopUpBtn.addEventListener('click', closePopUp);
    $addPopUpBtn.addEventListener('click', changeTodo);
    $closePopUpBtn.addEventListener('click', closePopUp);
    $todoInput.addEventListener('keyup', enterCheck);
    $popUpInput.addEventListener('keyup', enterCheck2);
    window.addEventListener('keydown', escapeCheck);
};


const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`)
        $ulList.appendChild($newTask);
        

        $todoInput.value = '';
        $alertInfo.innerText = '';
        createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania!';
    }
};

const createToolsArea = () => {
    $toolsArea = document.createElement('div');
    $toolsArea.classList.add('tools');
    $newTask.appendChild($toolsArea);

    $completeBtn = document.createElement('button');
    $completeBtn.classList.add('complete');
    $completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    $editBtn = document.createElement('button');
    $editBtn.classList.add('edit');
    $editBtn.innerHTML = 'EDIT';

    $deleteBtn = document.createElement('button');
    $deleteBtn.classList.add('delete');
    $deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    $toolsArea.appendChild($completeBtn);
    $toolsArea.appendChild($editBtn);
    $toolsArea.appendChild($deleteBtn);
}

const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('complete'))
    {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    }
    else if(e.target.closest('button').className ==='edit') {
        editTask(e);

    }
    else if(e.target.closest('button').className === 'delete') {
        deleteTask(e);
    }
};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popUpInput.value = $editedTodo.firstChild.textContent;

    $popUp.style.display = 'flex';
}

const changeTodo = () => {
    if($popUpInput.value !== '') {
        $editedTodo.firstChild.textContent = $popUpInput.value;
        closePopUp();
        $popUpInfo.innerText = '';
    }
    else {
        $popUpInfo.innerText = 'Nie można dodać pustego zadania!';
    }
};

const closePopUp = (e) => {
    $popUp.style.display = 'none';
    
}

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście';
    }

};

const enterCheck = (event) => {
    if(event.key === 'Enter') {
        addNewTask();
    }
}; // this function allows adding todo by clicking enter
const enterCheck2 = (event) => {
    if(event.key === 'Enter') {
        changeTodo();
    }
}; //this function allows changing todo task by clicking enter
const escapeCheck = (event) => {
    if($popUp.style.display === 'flex' && event.key === 'Escape') {
        closePopUp();
    }
}; //this function allows closing popupwindow by clicking escape
document.addEventListener('DOMContentLoaded', main);
