function createTaskBlock() {
    const taskBlock = document.createElement('div');
    taskBlock.classList.add('task-block');
    return taskBlock;
}

function createTaskNameBlock() {
    const taskNameBlock = document.createElement('div');
    taskNameBlock.classList.add('table-task');
    return taskNameBlock;   
}

function createTaskNameText(nameValue) {
    const taskNameText = document.createElement('span');
    taskNameText.textContent = nameValue;
    return taskNameText;
}

function createTaskDescriptionBlock() {
    const taskDescriptionBlock = document.createElement('div');
    taskDescriptionBlock.classList.add('table-task');
    return taskDescriptionBlock;
}

function createTaskDescriptionText(descriptionValue) {
    const taskDescriptionText = document.createElement('span');
    taskDescriptionText.textContent = descriptionValue;
    return taskDescriptionText;
}

function createTaskEndtimeBlock() {
    const taskEndtimeBlock = document.createElement('div');
    taskEndtimeBlock.classList.add('table-task');
    return taskEndtimeBlock;
}

function createTaskEndtimeText(endtimeValue) {
    const taskEndtimeText = document.createElement('span');
    taskEndtimeText.textContent = endtimeValue;
    return taskEndtimeText;
}

function createEditTaskBlock() {
    const editTaskBlock = document.createElement('div');
    editTaskBlock.classList.add('table-task');
    return editTaskBlock;
}

function createDoneButton() {
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Готово';
    return doneButton;
}

function createEditButton() {
    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.onclick = function () {
      modalEdit.style.display = "block";
      editTaskNameValue.value = createTaskNameText(taskNameValue.value).textContent;
      editTaskDescriptionValue.value = createTaskDescriptionText(taskDescriptionValue.value).textContent;
      editTaskEndtime.value = createTaskEndtimeText(taskEndtime.value).textContent;
    };
    return editButton;
}

function createDeliteButton(delite) {
    const deliteButton = document.createElement('button');
    deliteButton.textContent = 'Удалить';
    deliteButton.onclick = function () {
        taskList.removeChild(delite);
    }
    return deliteButton;
}

const modal = document.querySelector('.modal'); // модальное окно при создании задачи
const addTaskButton = document.querySelector(".add-task-button"); // кнопка, вызывающее модальное окно добавления задачи

addTaskButton.onclick = function() {
    modal.style.display = "block";
}

const modalAddTaskButton = document.querySelector('.modal-add-task-button'); // модальная кнопка добавления задачи 
const taskList = document.querySelector('.task-list');
// const array = [];
// console.log(array);
// let counterID = 1; 

modalAddTaskButton.onclick = function () {
    // const taskObject = {
    //   'end_time': null,
    //   'task_desc': null,
    //   'task_title': null,
    //   'user_id': counterID 
    // };
    const addTaskBlock = createTaskBlock();
    taskList.append(addTaskBlock);

    const addTaskNameBlock = createTaskNameBlock()
    addTaskBlock.append(addTaskNameBlock);

    const taskNameValue = document.querySelector('.task-name-value');
    const addTaskNameText = createTaskNameText(taskNameValue.value);
    addTaskNameBlock.append(addTaskNameText);

    const addTaskDescriptionBlock = createTaskDescriptionBlock();
    addTaskBlock.append(addTaskDescriptionBlock);

    const taskDescriptionValue = document.querySelector('.task-description-value');
    const addTaskDescriptionText = createTaskDescriptionText(taskDescriptionValue.value);
    addTaskDescriptionBlock.append(addTaskDescriptionText);

    const addTaskEndtimeBlock = createTaskEndtimeBlock();
    addTaskBlock.append(addTaskEndtimeBlock);

    const taskEndtime = document.querySelector('.task-endtime');
    const addTaskEndtimeText = createTaskEndtimeText(taskEndtime.value);
    addTaskEndtimeBlock.append(addTaskEndtimeText);

    const addEditTaskBlock = createEditTaskBlock();
    addTaskBlock.append(addEditTaskBlock);

    const addDoneButton = createDoneButton();
    addEditTaskBlock.append(addDoneButton);

    const addEditButton = createEditButton();
    addEditTaskBlock.append(addEditButton);
    
    const addDeliteButton = createDeliteButton(addTaskBlock);
    addEditTaskBlock.append(addDeliteButton);
    // console.log(taskObject);
    taskNameValue.value = '';
    taskDescriptionValue.value = '';
    taskEndtime.value = '';
    
    // array.push(taskObject);
    // console.log(array);
    // counterID++;
    modal.style.display = "none"; 
}

const modalCanselTaskButton = document.querySelector(".modal-cancel-task-button"); // модальная кнопка добавления "отменить"

modalCanselTaskButton.onclick = function() {
    modal.style.display = "none";
}

const modalEdit = document.querySelector('.modal-edit'); // модальное окно редактирования задачи

const editTaskNameValue = document.querySelector(".edit-task-name-value"); // поле редактирования названия задачи
const editTaskDescriptionValue = document.querySelector('.edit-task-description-value'); // поле редактирования описания задачи
const editTaskEndtime = document.querySelector('.edit-task-endtime'); // поле редактироваания времени выполнения задачи



const modalEditTaskButton = document.querySelector(".modal-edit-task-button"); // модальная кнопка редактирования задачи

modalEditTaskButton.onclick = function () {
    
}

const modalEditCanselTaskButton = document.querySelector(".modal-edit-cancel-task-button"); // модальная кнопка редактирования "отменить"

modalEditCanselTaskButton.onclick = function () {
    modalEdit.style.display = "none";
};

















                                                             // Старый код
// function createNewObjective (newObjectiveValue) {
//     const newObjective = document.createElement('li');
//     newObjective.classList.add('new-objective');
//     newObjective.textContent = newObjectiveValue;
//     return newObjective;
// };

// function createCheckedButton (addNewObjective) {
//     const checkedButton = document.createElement('button');
//     checkedButton.classList.add('checked-button');
//     checkedButton.textContent = 'Выполнено';
//     checkedButton.onclick = function () {
//         addNewObjective.style.textDecoration = 'line-through'
//     }
//     return checkedButton;
// };

// function createAbortButton (addNewObjective) {
//     const abortButton = document.createElement('button');
//     abortButton.classList.add('abort-button');
//     abortButton.textContent = 'Удалить';
//     abortButton.onclick = function () {
//         toDoList.removeChild(addNewObjective);
//     }
//     return abortButton;
// };

// const addNewObjectiveButton = document.querySelector('.button');
// const toDoList = document.querySelector('.list');

// addNewObjectiveButton.onclick = function () {
//     const field = document.querySelector('.field');
//     const addNewObjective = createNewObjective(field.value);

//     const addCheckedButton = createCheckedButton(addNewObjective);
//     addNewObjective.append(addCheckedButton)

//     const addAbortButton = createAbortButton(addNewObjective);
//     addNewObjective.append(addAbortButton);

//     field.value = '';
//     toDoList.append(addNewObjective);
// };





