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

const loginButton = document.querySelector('.login-button');
loginButton.disabled = true;

let validCheck = function () {
  if (isValidEmail === true && isValidPassword === true) {
    loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
};

const host = 'https://apipedrotodo.herokuapp.com'; 

loginButton.onclick = function () {
  let user = {
    "email": email.value,
    "password": password.value
  };

    fetch(host + '/auth/login', {
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
          localStorage.setItem('log_user_name', JSON.stringify(saveLocal))})
          .then(() => document.location.href = "../index.html")  
  }).catch(
      error => console.error(error)
    )}