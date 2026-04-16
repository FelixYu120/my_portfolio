console.log('IT’S ALIVE!');

// Helper function to select elements (Step 1)
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'Resume' },
  { url: 'https://github.com/FelixYu120', title: 'GitHub' },
];

// Step 3.1: Detect if we are local or on GitHub Pages
const ARE_WE_HOME = document.documentElement.classList.contains('home');
const BASE_PATH = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') 
    ? '/' 
    : '/my_portfolio/'; // Change this to your EXACT repo name

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Fix paths: if it's not an external link, add the BASE_PATH
  url = !url.startsWith('http') ? BASE_PATH + url : url;

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  
  // Step 3.2: Highlight current page
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  // Open external links in new tab
  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.append(a);
}


// Step 4.2: Add the Switcher UI
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select id="theme-switch">
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`
);

const select = document.querySelector('#theme-switch');

// Step 4.4 & 4.5: Functionality and Persistence
function setColorScheme(color) {
    document.documentElement.style.setProperty('color-scheme', color);
    select.value = color;
    localStorage.colorScheme = color;
}

if ("colorScheme" in localStorage) {
    setColorScheme(localStorage.colorScheme);
}

select.addEventListener('input', function (event) {
    setColorScheme(event.target.value);
});
