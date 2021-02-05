const pins = document.querySelectorAll('button');
const buttons = Array.from(pins);
const overlay = document.querySelector('.modal-background');

const modal_box = document.querySelector('.modal-box');
/*Open Modal Window*/
for (const button of buttons) {
    button.addEventListener('click', (event) => {
        event.preventDefault;
        overlay.classList.remove('hidden');

        if (event.target.id == 'short') {

            const low = modal_box.querySelector('#low');
            const window_body = low.querySelector('.modal-body');
            const form = window_body.querySelector('.form');

            low.classList.remove('hidden');
            /*the animation*/
            window_body.classList.add('rise-modal');
            form.classList.add('rise-dialog');

        } else if (event.target.id == 'long') {

            const tall = modal_box.querySelector('#tall');
            const window_body = tall.querySelector('.modal-body');
            const form = window_body.querySelector('.form');

            tall.classList.remove('hidden');
            /*the animation*/
            window_body.classList.add('rise-modal');
            form.classList.add('rise-dialog');

        }
    });
}

/*Close Modal Window*/
overlay.addEventListener('click', () => {
    const windows = document.querySelectorAll('.modal-window');
    const modals = Array.from(windows);

    for (const modal of modals) {
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    }
});