function createNewObjective (newObjectiveValue) {
    const newObjective = document.createElement('li');
    newObjective.classList.add('new-objective');
    newObjective.textContent = newObjectiveValue;
    return newObjective;
}

function createCheckedButton (addNewObjective) {
    const checkedButton = document.createElement('button');
    checkedButton.classList.add('checked-button');
    checkedButton.textContent = 'Выполнено';
    checkedButton.onclick = function () {
        addNewObjective.style.textDecoration = 'line-through'
    }
    return checkedButton;
}

function createAbortButton (addNewObjective) {
    const abortButton = document.createElement('button');
    abortButton.classList.add('abort-button');
    abortButton.textContent = 'Удалить';
    abortButton.onclick = function () {
        toDoList.removeChild(addNewObjective);
    }
    return abortButton;
}

const addNewObjectiveButton = document.querySelector('.button');
const toDoList = document.querySelector('.list');

addNewObjectiveButton.onclick = function () {
    const field = document.querySelector('.field');
    const addNewObjective = createNewObjective(field.value);

    const addCheckedButton = createCheckedButton(addNewObjective);
    addNewObjective.append(addCheckedButton)

    const addAbortButton = createAbortButton(addNewObjective);
    addNewObjective.append(addAbortButton);

    field.value = '';
    toDoList.append(addNewObjective);
}