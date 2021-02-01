/*Скрипт гамбургер меню*/
const humb = document.querySelector('.btn-humburger');
humb.addEventListener('click', () => {
    humb.classList.toggle('action-down');
});

const show_menu = document.querySelector('.cm-dropdown-menu');
humb.addEventListener('click', () => {
    show_menu.classList.toggle('show');
});