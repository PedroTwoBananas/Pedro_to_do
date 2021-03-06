const email = document.querySelector('.email');
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let isValidEmail = false;
const emailUpdate = document.querySelector('.update-email');

email.addEventListener('input', inputEmail);
function inputEmail(e) {
    const input_em = e.target.value;
    if (input_em && re.test(input_em)) {
        email.style.background = 'green';
        isValidEmail = true;
    } else if (input_em && !re.test(input_em)) {
        email.style.background = 'red';
        isValidEmail = false;
      } else {
        email.style.background = 'white';
        isValidEmail = false;
      }
  validCheck();
};

email.addEventListener('mouseover', mouseoverEmail);
function mouseoverEmail(e) {
  const input_em = e.target.value;
  if (input_em && !re.test(input_em)) {
    emailUpdate.textContent = 'Введите корректный email';
    }
};

email.addEventListener('mouseout', mouseoutEmail);
function mouseoutEmail(e) {
  const input_em = e.target.value;
  emailUpdate.textContent = '';
}

const password = document.querySelector('.password');
const re_pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
const passwordUpdate = document.querySelector('.update-password');
let isValidPassword = false;
let showPassword = document.querySelector('.show-password');

showPassword.onchange = function () {
  if (showPassword.checked) {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
};

password.addEventListener('input', inputPassword);
function inputPassword(e) {
    const input_pwd = e.target.value;
    if (input_pwd && re_pwd.test(input_pwd)) {
      password.style.background = 'green';
      isValidPassword = true;
    } else if (input_pwd && !re_pwd.test(input_pwd)) {
      password.style.background = 'red';
      isValidPassword = false;
      } else {
        password.style.background = 'white';
        isValidPassword = false;
      }
  validCheck();
};

password.addEventListener('mouseover', mouseoverPassword);
function mouseoverPassword(e) {
  const input_pwd = e.target.value;
  if (input_pwd && !re_pwd.test(input_pwd)) {
    passwordUpdate.textContent = 'Введите корректный пароль';
    }
};

password.addEventListener('mouseout', mouseoutPassword);
function mouseoutPassword(e) {
  const input_pwd = e.target.value;
  passwordUpdate.textContent = '';
}

const userName = document.querySelector('.username');



const submitButton = document.querySelector('.submit-button');
submitButton.disabled = true;

let validCheck = function () {
  if (isValidEmail === true && isValidPassword === true) {
    submitButton.disabled = false;
    } else {
    submitButton.disabled = true;
    }
};

const host = 'https://apipedrotodo.herokuapp.com'; 

submitButton.onclick = function () {
  let user = {
    "email": email.value,
    "password": password.value,
    "username": userName.value
  };

    fetch(host + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify(user)
  }).then(
    response => {
      response.json()
      .then(
        saveLocal => {
          localStorage.setItem('reg_user_name', JSON.stringify(saveLocal))})
          .then(() => document.location.href = "../log/log.html") 
  }).catch(
      error => console.error(error)
    )}  
 




// {
//   "email": "paradaigor20@gmail.com",
//   "user_name": "Pedro",
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mjk2NTEwNDgsInVzZXJJRCI6MTB9.o5v2-eO0iYwWbgPssYTHQSkyWPgNC18AoW7Rbr_WoEQ",
//   "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzE3MjQ2NDgsInVzZXJJRCI6MTB9.LbSMg-yaRfwOYUdrQN9LFlS04dZ4ipQ_P3F8moMDyNg",
//   "id": 10
// }



// response => {return response.json().then(data => {console.log(typeof data); console.log(data)})}
// ).then(
//     saveLocal => {localStorage.setItem('saveLocal', saveLocal); console.log(saveLocal)}
// ).catch(
//     error => console.error(error)
// );
// };


