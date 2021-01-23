const start_texts = Array.from(document.querySelectorAll('.subhead'));
const target_boxes = Array.from(document.querySelectorAll('.subhead-characters'));
const class_name_target = 'subhead__character';

/*Функция посимвольного итерирования букв в предложении*/
const brokenText = function(start_text_value, character_box, class_name_added) {
    start_text_value.style.display = 'none';
    const getting_characters = start_text_value.innerHTML.split('');

    for (let j = 0; j < getting_characters.length; j++) {
        const text_item = document.createElement('span');

        text_item.classList.add(`${class_name_added}`);
        text_item.prepend(`${getting_characters[j]}`);
        character_box.append(text_item);

        if (text_item.innerHTML == ' ') {
            text_item.classList.add(`${class_name_added}--spaced`);
        }
    }
}

function explorer(start_text_values, character_box, class_name_added) {
    for (let j = 0; j < target_boxes.length; j++) {
        brokenText(start_text_values[j], character_box[j], class_name_added);
    }
}

window.onload = explorer(start_texts, target_boxes, class_name_target);