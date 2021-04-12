const logout = async () => {
  console.log('User has been logged out');
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

const timerReset = () => {
  console.log('Timer has been reset');
  let time = 0;
  clearTimeout(time);
  time = setTimeout(logout, 300000);
};

const userIdle = () => {
  window.onload = timerReset;
  document.onmousemove = timerReset;
  document.onkeypress = timerReset;

  logout();
};

window.onload = () => {
  userIdle();
};

document.querySelector('#logout').addEventListener('click', logout);
