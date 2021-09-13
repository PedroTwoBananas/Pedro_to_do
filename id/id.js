const userNameID = document.querySelector('.user-name-value');
const userEmailID = document.querySelector('.user-email-value');
const userID = document.querySelector('.user-id-value');
userNameID.textContent = JSON.parse(localStorage['log_user_name']).user_name;
userEmailID.textContent = JSON.parse(localStorage['log_user_name']).email;
userID.textContent = JSON.parse(localStorage['log_user_name']).id;