const menu_items = document.querySelectorAll('.cm-dropdown-menu__item');
const enter = document.querySelector('.header__entrance');
const overlay = document.querySelector('.modal-background');

const dialogOpen = function(event) {
    console.log(event.target);
    if (event.target.nodeName == 'BUTTON') {
        if (event.target.classList.contains('btn--sign-in')) {
            const current_classes = event.target.className.split(' ');

            for (let current of current_classes) {
                if (current == 'btn--sign-in') {
                    var class_name = current;
                }
            }

            const dialog = document.querySelector(`#${class_name}`);
            overlay.classList.remove('hidden');
            dialog.classList.remove('hidden');

            const body = dialog.querySelector(`#${class_name} .modal-body`);
            body.classList.add('rise-modal');

            const form = dialog.querySelector(`#${class_name} .form`);
            form.classList.add('rise-dialog');

        } else if (event.target.classList.contains('btn--sign-up')) {
            const current_classes = event.target.className.split(' ');

            for (let current of current_classes) {
                if (current == 'btn--sign-up') {
                    var class_name = current;
                }
            }

            const dialog = document.querySelector(`#${class_name}`);
            overlay.classList.remove('hidden');
            dialog.classList.remove('hidden');

            const body = document.querySelector(`#${class_name} .modal-body`);
            body.classList.add('rise-modal');

            const form = dialog.querySelector(`#${class_name} .form`);
            form.classList.add('rise-dialog');
        }
    } else return;
}

const dialogClose = function() {
    const dialogs = Array.from(document.querySelectorAll('.modal-window'));

    for (let window of dialogs) {
        if (!window.classList.contains('hidden')) {
            window.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    }
}

enter.addEventListener('click', dialogOpen);

for (const item of menu_items) {
    item.addEventListener('click', dialogOpen);
}

overlay.addEventListener('click', dialogClose);