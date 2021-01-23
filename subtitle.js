const subtitle = document.querySelector('.subtitle');
const similar_copy = document.querySelector('.subtitle-copy');
const class_name_defined = 'subtitle-copy__letter';

const splitText = function(sub_title, clone, class_name_target) {
    sub_title.style.display = 'none';
    const getting_letters = sub_title.innerHTML.trim().split('');
    console.log(sub_title.innerHTML);
    console.log(getting_letters);

    for (let j = 0; j < getting_letters.length; j++) {
        const text_item_box = document.createElement('span');

        text_item_box.classList.add(`${class_name_target}`);
        text_item_box.prepend(`${getting_letters[j]}`);
        clone.append(text_item_box);

        if (text_item_box.innerHTML == ' ') {
            text_item_box.classList.add(`${class_name_target}--spaced`);
        }
    }
}

window.onload = splitText(subtitle, similar_copy, class_name_defined);