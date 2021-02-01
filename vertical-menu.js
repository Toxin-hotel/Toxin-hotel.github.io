/*Скрипт компонента Аккордион*/
const accordion = document.querySelector('.cm-dropdown-menu');
const items = Array.from(accordion.querySelectorAll('.cm-dropdown-menu__item'));

for (const item of items) {
    if (item.classList.contains('open')) {
        const dropdown = item.querySelector('.cm-dropdown-menu__hidden');
        if (dropdown) {
            dropdown.style.maxHeight = dropdown.scrollHeight + 75 + 'px';
        }
    }

    const title = item.querySelector('.cm-dropdown-menu__title');
    title.addEventListener('click', (event) => {
        const dropdown = title.nextElementSibling;
        if (dropdown) {
            const menu_item = title.parentElement;
            menu_item.classList.toggle('open');

            if (menu_item.classList.contains('open')) {
                dropdown.style.maxHeight = dropdown.scrollHeight + 75 + 'px';
            } else {
                dropdown.style.maxHeight = 0;
            }

            for (const item of items) {
                const caption = item.querySelector('.cm-dropdown-menu__title');

                if (caption != event.target) {
                    if (caption.nextElementSibling) {
                        caption.nextElementSibling.style.maxHeight = 0;
                        caption.parentElement.classList.remove('open');
                    }
                }
            }
        }
    });
}