const themeSelector = document.querySelector('#theme');
const body = document.querySelector('body');
const logo = document.querySelector('#logo');

function changeTheme() {
  const selectedTheme = themeSelector.value;

  if (selectedTheme === 'dark') {
    body.classList.add('dark');
    logo.src = 'byui-logo_white.png'; // Make sure this file is saved locally!
  } else {
    body.classList.remove('dark');
    logo.src = 'byui-logo_blue.webp';
  }
}

themeSelector.addEventListener('change', changeTheme);
