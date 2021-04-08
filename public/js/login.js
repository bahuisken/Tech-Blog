const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
      
    } else {
      document.querySelector('#login-error').textContent = 'ACCOUNT NOT FOUND';
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
const createAccountHandler =  () => {
  document.querySelector('#create-account-form').style.display = 'block';
  document.querySelector('#login-form').style.display = 'none';
  document.querySelector('#name-signup').value = '';
  document.querySelector('#email-signup').value = '';
  document.querySelector('#password-signup').value = '';
};

const loginBtnHandler =  () => {
  document.querySelector('#create-account-form').style.display = 'none';
  document.querySelector('#login-form').style.display = 'block';
  document.querySelector('#login-error').textContent = '';
  document.querySelector('#email-login').value = '';
  document.querySelector('#password-login').value = '';
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  document
  .querySelector('#create-account-btn')
  .addEventListener('click', createAccountHandler);

  document
  .querySelector('#login-btn')
  .addEventListener('click', loginBtnHandler);