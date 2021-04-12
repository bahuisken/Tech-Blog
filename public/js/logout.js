const logout = async () => {
  console.log('You are now logged out.');
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

const inactivityTime = () => {
  window.onload = timerReset;
  document.onload = timerReset;
  document.onmousemove = timerReset;
  document.onmousedown = timerReset; // touchscreen presses
  document.ontouchstart = timerReset;
  document.onclick = timerReset; // touchpad clicks
  document.onkeypress = timerReset;
  document.addEventListener('scroll', timerReset, true); // improved; see comments
};

const timerReset = () => {
  let time;
  clearTimeout(time);
  time = setTimeout(logout, 300000);
};

inactivityTime();

document.querySelector('#logout').addEventListener('click', logout);
