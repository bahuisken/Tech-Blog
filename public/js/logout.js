const logout = async () => {
  console.log('You are now logged out.');
  const response = await fetch(`/api/users/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response);
  if (response.ok) {
    document.location.replace('/');
  } else {
    console.log(response.statusText);
  }
};

// const inactivityTime = () => {
//   window.onload = timerReset;
//   document.onmousemove = timerReset;
//   document.onkeypress = timerReset;
// };

// const timerReset = () => {
//   let time = 0;
//   clearTimeout(time);
//   time = setTimeout(logout, 15000);
// };

// inactivityTime();

let inactivityTime = function () {
  let time;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 10000);
  }
};
inactivityTime();

document.querySelector('#logout').addEventListener('click', logout);
