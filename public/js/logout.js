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

let inactivityTime = function () {
  let time;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 300000);
  }
};
inactivityTime();

document.querySelector('#logout').addEventListener('click', logout);
