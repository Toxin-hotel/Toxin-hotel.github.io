const cards = Array.from(document.querySelectorAll('.card'));
const turnCardHelper = (event) => {
    if (event.target) {

        for (const card of cards) {
            const parent = card.parentElement;

            parent.classList.remove('turn');
        }

        for (const card of cards) {
            const search_img = card.querySelector('img');

            if (event.target === search_img) {
                const parent = card.parentElement;
                parent.classList.toggle('turn');
                console.log(parent);
            }
        }
    }
}

for (const card of cards) {
    const img = card.querySelector('img');
    img.addEventListener('click', turnCardHelper);
}