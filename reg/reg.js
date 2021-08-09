
const email = document.querySelector('.email');
const emailUpdate = document.querySelector('.update-email');
const submitButton = document.querySelector('.submit-button');
submitButton.disabled = true;
email.addEventListener('input', inputEmail);

function inputEmail(e) {
    const inputem = e.target.value;
    if (inputem && /(^\w.*@\w+\.\w)/.test(inputem)) {
        emailUpdate.textContent = 'Подходит!';
    } else {
        emailUpdate.textContent = 'Не Подходит!';
    }
};

const password = document.querySelector('.password');
const passwordUpdate = document.querySelector('.update-password');

password.addEventListener('input', inputPassword);

function inputPassword(e) {
    const inputpwd = e.target.value;
    if (inputpwd && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(inputpwd)) {
      passwordUpdate.textContent = 'Подходит!';
    } else {
      passwordUpdate.textContent = 'Не Подходит!';
    }
};