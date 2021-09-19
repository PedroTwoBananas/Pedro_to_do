function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

let nowData = new Date();
console.log(nowData);
let nowManyNumbers = nowData.getTime();
console.log(nowManyNumbers / 1000);

console.log(parseJwt(JSON.parse(localStorage['log_user_name']).access_token));
console.log(parseJwt(JSON.parse(localStorage['log_user_name']).refresh_token));
if (JSON.parse(localStorage['log_user_name'])) {
  let usernameWelcome = document.querySelector(".username-information");
  usernameWelcome.textContent = JSON.parse(localStorage['log_user_name']).user_name;
}

const logOutButton = document.querySelector('.logout-button');
logOutButton.onclick = function () {
    localStorage.clear();
    document.location.href = "title/title.html";
}

let serverArray;

const host = 'https://apipedrotodo.herokuapp.com';

fetch(host + '/api/getTasks', {
    headers: {
        'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
      }
})
.then(response => response.json())
.then(response => {serverArray = response})
.then(() => console.log(serverArray))
.then(() => { if (serverArray.length > 0) {
    for (let i = 0; i < serverArray.length; i++) {
      const taskBlock = document.createElement('div');
      taskBlock.setAttribute('id', serverArray[i].id);
      taskBlock.classList.add('task-block');
      taskList.append(taskBlock);
      // if (serverArray[i].is_done === true) {
      //   taskBlock.style.backgroundColor = 'SpringGreen';
      // };
    
      const taskNameText = document.createElement('span');
      taskNameText.setAttribute('id', serverArray[i].id);
    
      taskBlock.append(taskNameText);

      const taskDescriptionText = document.createElement('span');
      taskDescriptionText.setAttribute('id', serverArray[i].id);
    
      taskBlock.append(taskDescriptionText);

      const taskEndtimeText = document.createElement('span');
      taskEndtimeText.setAttribute('id', serverArray[i].id);
      let endtimeDate = taskEndtime.value;
      let manyNumbers = new Date(endtimeDate);
      taskBlock.append(taskEndtimeText);

      const doneButton = document.createElement('button');
      doneButton.setAttribute('id', serverArray[i].id);
      doneButton.textContent = 'Готово';
      doneButton.onclick = function () {
        let time = taskEndtimeText.textContent;
        time = time.split('.').reverse().join('-');
        // time = time.reverse();
        // time = time.join('-');
        let doneManyNumbers = new Date(time);
        console.log(time);
          let doneObject = {
            "end_time": doneManyNumbers.getTime() / 1000,
            "is_done": true,
            "task_desc": taskNameText.textContent,
            "task_title": taskDescriptionText.textContent
          };
          console.log(doneObject);
          fetch(host + '/api/editTask?id=' + serverArray[i].id, {
            method: 'PUT',
            headers: {
              'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
            },
            body: JSON.stringify(doneObject)
          }).then(
            response => {
              return response.json()  
          }).then(response => {
            if (response.is_done === true && response.end_time < nowManyNumbers / 1000) {
              taskBlock.style.backgroundColor ='Yellow';
                  taskBlock.removeChild(doneButton);
                  taskBlock.removeChild(editButton);
            } else {
              taskBlock.style.backgroundColor ='SpringGreen';
                  taskBlock.removeChild(doneButton);
                  taskBlock.removeChild(editButton);
            };
  
          }).catch(
              error => console.error(error)
            )
      }
      taskBlock.append(doneButton);

      const editButton = document.createElement('button');
      editButton.setAttribute('id', serverArray[i].id);
      editButton.textContent = 'Редактировать';
      taskBlock.append(editButton);
      editButton.onclick = function () {
        modalEdit.style.display = "block";
        
        editTaskNameValue.value = serverArray[i].task_title;
        editTaskDescriptionValue.value = serverArray[i].task_desc;

        modalEditTaskButton.onclick = function () {
          let editEndtimeDate = editTaskEndtime.value;
          console.log(editEndtimeDate);
          // editEndtimeDate = editEndtimeDate.split('-');
          console.log(editEndtimeDate);
          let editManyNumbers = new Date(editEndtimeDate);
          console.log(editManyNumbers);
          console.log(editManyNumbers.getTime());
  
          let editObject = {
              "end_time": editManyNumbers.getTime() / 1000,
              "is_done": false,
              "task_desc": editTaskDescriptionValue.value,
              "task_title": editTaskNameValue.value
          }
          console.log(editObject);
          fetch(host + '/api/editTask?id=' + serverArray[i].id, {
              method: 'PUT',
              headers: {
                'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
              },
              body: JSON.stringify(editObject)
            }).then(
              response => {
                return response.json()  
            }).then(
                response => {
                  // serverID = response.id;
                  taskBlock.setAttribute('id', response.id);
                  taskNameText.setAttribute('id', response.id);
                  taskDescriptionText.setAttribute('id', response.id);
                  taskEndtimeText.setAttribute('id', response.id);
                  doneButton.setAttribute('id', response.id);
                  editButton.setAttribute('id', response.id);
                  deleteButton.setAttribute('id', response.id);
                  taskNameText.textContent = response.task_title;
                  taskDescriptionText.textContent = response.task_desc;
                  // taskEndtimeText.textContent = response.end_time;
                  taskEndtimeText.textContent = new Date(response.end_time * 1000).toLocaleDateString();
                  // taskEndtimeText.textContent = ("" + new Date(response.end_time * 1000).toISOString())
                  // .replace(/^([^T]+)T(.+)$/,'$1')
                  // .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1');
  
            }).catch(
                error => console.error(error)
              )
        };
      };

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', serverArray[i].id);
      deleteButton.textContent = 'Удалить';
      taskBlock.append(deleteButton);
      deleteButton.onclick = function () {
        console.log('delete');
        fetch(host + '/api/deleteTask?id=' + serverArray[i].id, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
              },
          })
          .then(
            response => {
              response.json()  
          }).catch(
              error => console.error(error)
            )
         
        taskList.removeChild(taskBlock);
    }
    
    

      taskNameText.textContent = serverArray[i].task_title;
      taskDescriptionText.textContent = serverArray[i].task_desc;
      taskEndtimeText.textContent = new Date(serverArray[i].end_time * 1000).toLocaleDateString();
      // taskEndtimeText.textContent = ("" + new Date(serverArray[i].end_time * 1000).toISOString())
      //   .replace(/^([^T]+)T(.+)$/,'$1')
      //   .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1');

      if (serverArray[i].is_done === false && serverArray[i].end_time < nowManyNumbers / 1000) {
        taskBlock.style.backgroundColor ='Red';
      } else if (serverArray[i].is_done === true && serverArray[i].end_time < nowManyNumbers / 1000) {
        taskBlock.style.backgroundColor ='Yellow';
            taskBlock.removeChild(doneButton);
            taskBlock.removeChild(editButton);
      } else if (serverArray[i].is_done === true) {
        taskBlock.style.backgroundColor ='SpringGreen';
            taskBlock.removeChild(doneButton);
            taskBlock.removeChild(editButton);
      };
    }
}
} 
)
.then(() => console.log(serverArray))
.catch(error => console.error(error));



const modal = document.querySelector('.modal'); // модальное окно при создании задачи
const modalEditTaskButton = document.querySelector(".modal-edit-task-button"); // модальная кнопка редактирования задачи
const addTaskButton = document.querySelector(".add-task-button"); // кнопка, вызывающее модальное окно добавления задачи
addTaskButton.onclick = function() {
    modal.style.display = "block";
}
const taskList = document.querySelector('.task-list');
const taskNameValue = document.querySelector('.task-name-value');
const taskDescriptionValue = document.querySelector('.task-description-value');
const taskEndtime = document.querySelector('.task-endtime');
const modalAddTaskButton = document.querySelector('.modal-add-task-button'); // модальная кнопка добавления задачи 

modalAddTaskButton.onclick = function () {
    const taskObject = {};

    const taskBlock = document.createElement('div');
    taskBlock.classList.add('task-block');
    taskList.append(taskBlock);
    
    const taskNameText = document.createElement('span');
    taskBlock.append(taskNameText);

    const taskDescriptionText = document.createElement('span');
    taskBlock.append(taskDescriptionText);

    const taskEndtimeText = document.createElement('span');
    
    let endtimeDate = taskEndtime.value;
    console.log(endtimeDate);
    let manyNumbers = new Date(endtimeDate);
    console.log( '12334 ' + manyNumbers.getTime());
    
    taskBlock.append(taskEndtimeText);

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Готово';
    doneButton.onclick = function () {
      let time = taskEndtimeText.textContent;
      time = time.split('.').reverse().join('-');
      // time = time.reverse();
      // time = time.join('-');
      let doneManyNumbers = new Date(time);
      console.log(time);
        let doneObject = {
            "end_time": doneManyNumbers.getTime() / 1000,
            "is_done": true,
            "task_desc": taskNameText.textContent,
            "task_title": taskDescriptionText.textContent
        };
        console.log(doneObject);
        fetch(host + '/api/editTask?id=' + serverID, {
          method: 'PUT',
          headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
          },
          body: JSON.stringify(doneObject)
        }).then(
          response => {
            return response.json()  
        }).then(response => {

          // taskBlock.style.backgroundColor ='SpringGreen';
          // taskBlock.removeChild(doneButton);
          // taskBlock.removeChild(editButton);
          if (response.is_done === true && response.end_time < nowManyNumbers / 1000) {
            taskBlock.style.backgroundColor ='Yellow';
                taskBlock.removeChild(doneButton);
                taskBlock.removeChild(editButton);
          } else {
            taskBlock.style.backgroundColor ='SpringGreen';
                taskBlock.removeChild(doneButton);
                taskBlock.removeChild(editButton);
          };

        }).catch(
            error => console.error(error)
          )
    }
    taskBlock.append(doneButton);

    const editButton = document.createElement('button');
    
    editButton.textContent = 'Редактировать';
    taskBlock.append(editButton);
    editButton.onclick = function () {
      modalEdit.style.display = "block";
      
      editTaskNameValue.value = taskNameText.textContent;
      editTaskDescriptionValue.value = taskDescriptionText.textContent;
    //   editTaskEndtime.value = taskEndtime.textContent;
      
      
      modalEditTaskButton.onclick = function () {
        let editEndtimeDate = editTaskEndtime.value;
        console.log(editEndtimeDate);
        // editEndtimeDate = editEndtimeDate.split('-');
        console.log(editEndtimeDate);
        let editManyNumbers = new Date(editEndtimeDate);
        console.log(editManyNumbers);
        console.log(editManyNumbers.getTime());

        let editObject = {
            "end_time": editManyNumbers.getTime() / 1000,
            "is_done": false,
            "task_desc": editTaskDescriptionValue.value,
            "task_title": editTaskNameValue.value
        }
        console.log(editObject);
        fetch(host + '/api/editTask?id=' + serverID, {
            method: 'PUT',
            headers: {
              'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
            },
            body: JSON.stringify(editObject)
          }).then(
            response => {
              return response.json()  
          }).then(
              response => {
                serverID = response.id;
                taskBlock.setAttribute('id', response.id);
                taskNameText.setAttribute('id', response.id);
                taskDescriptionText.setAttribute('id', response.id);
                taskEndtimeText.setAttribute('id', response.id);
                doneButton.setAttribute('id', response.id);
                editButton.setAttribute('id', response.id);
                deleteButton.setAttribute('id', response.id);
                taskNameText.textContent = response.task_title;
                taskDescriptionText.textContent = response.task_desc;
                // taskEndtimeText.textContent = response.end_time;
                taskEndtimeText.textContent = new Date(response.end_time * 1000).toLocaleDateString();
                // taskEndtimeText.textContent = ("" + new Date(response.end_time).toISOString())
                // .replace(/^([^T]+)T(.+)$/,'$1')
                // .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1');

          }).catch(
              error => console.error(error)
            )
      };
    };

    const deleteButton = document.createElement('button');
    
    deleteButton.textContent = 'Удалить';
    taskBlock.append(deleteButton);
    deleteButton.onclick = function () {
        fetch(host + '/api/deleteTask?id=' + serverID, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
              },
          })
          .then(
            response => {
              response.json()  
          }).catch(
              error => console.error(error)
            )
        taskList.removeChild(taskBlock);
    }

    taskObject.end_time = (manyNumbers.getTime() / 1000);
    taskObject.task_desc = taskDescriptionValue.value;
    taskObject.task_title = taskNameValue.value;
    taskObject.id_user = JSON.parse(localStorage['log_user_name']).id;
    
    taskNameValue.value = '';
    taskDescriptionValue.value = '';
    taskEndtime.value = '';

    let serverID;

    fetch(host + '/api/addTask', {
        method: 'POST',
        headers: {
          'Authorization' : 'Bearer ' + JSON.parse(localStorage['log_user_name']).access_token
        },
        body: JSON.stringify(taskObject)
      }).then(
        response => {
          return response.json()  
      }).then(
          response => {
            console.log(response);
            serverID = response.id;
            taskBlock.setAttribute('id', response.id);
            taskNameText.setAttribute('id', response.id);
            taskDescriptionText.setAttribute('id', response.id);
            taskEndtimeText.setAttribute('id', response.id);
            doneButton.setAttribute('id', response.id);
            editButton.setAttribute('id', response.id);
            deleteButton.setAttribute('id', response.id);
            taskNameText.textContent = response.task_title;
            taskDescriptionText.textContent = response.task_desc;
            taskEndtimeText.textContent = new Date(response.end_time * 1000).toLocaleDateString();
            if (response.is_done === false && response.end_time < nowManyNumbers / 1000) {
              taskBlock.style.backgroundColor ='Red';
            }
            // taskEndtimeText.textContent = ("" + new Date(response.end_time * 1000).toISOString())
            // .replace(/^([^T]+)T(.+)$/,'$1')
            // .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1');
      }).catch(
          error => console.error(error)
        )

    // for (let i = 0; i < array.length; i++) {
    //     if (taskObject.id_task === array[i].id_task) {
    //         taskNameText.textContent = array[i].task_title;
    //         taskDescriptionText.textContent = array[i].task_desc;
    //         // taskEndtimeText.textContent = array[i].end_time;
    //         taskEndtimeText.textContent = ("" + new Date(array[i].end_time).toISOString())
    //         .replace(/^([^T]+)T(.+)$/,'$1')
    //         .replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1');
    //     }
    // }
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





const modalEditCanselTaskButton = document.querySelector(".modal-edit-cancel-task-button"); // модальная кнопка редактирования "отменить"

modalEditCanselTaskButton.onclick = function () {
    modalEdit.style.display = "none";
}; 