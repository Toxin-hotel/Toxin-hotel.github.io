const renderTemplate = (data = [], textdefault, option, switcher = 'select') => {
    let text = textdefault ?? 'Текст по умолчанию';

    const items = data.map(item => {
        let cls = '';
        if (item.id == option) {
            text = item.value;
            cls = 'selected';
        }
        if (switcher == 'select') {
            return `
                <li class="select__item ${cls}" data-type="item" data-value="${item.id}">${item.value}</li>
            `  
        } else if (switcher == 'dropdown') {
            return `
                <div class="select__item select__item--in ${cls}" data-type="item" data-value="${item.id}">
                    <a href="#" class="select__link">${item.value}</a>
                    <div class="select__counter">
                        <div class="select__dec">-</div>
                        <div class="select__count">${item.count}</div>
                        <div class="select__inc">+</div>
                    </div>
                </div>
            `
        } else if (switcher == 'mark') {
            return `
                <label class="select__mark">
                    <input type="checkbox" class="select__checkbox">
                    <span class="select__fake"></span>
                    <span class="select__text">${item.value}</span>
                </label>
            `
        }
        
    });

    if (switcher == 'select') {
        return `
            <div class="select__input" data-type="input">
                <div class="select__text" data-type="text">${text}</div>
                <span class="select__icon" data-type="icon"></span>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                    ${items.join('')}
                </ul>
            </div>
    `
    } else if (switcher == 'dropdown') {
        return `
            <div class="select__input" data-type="input">
                <div class="select__text" data-type="text">${text}</div>
                <span class="select__icon" data-type="icon"></span>
            </div>
            <div class="select__dropdown">
                <div class="select__list">
                    ${items.join('')}
                </div>  
            </div>
        `
    } else if (switcher == 'mark') {
        return `
            <div class="select__input" data-type="input">
                <div class="select__text select__text--upper" data-type="text">${text}</div>
                <span class="select__icon"></span>
            </div>
            <div class="select__dropdown">
                <div class="select__unit">
                    ${items.join('')}
                </div>
            </div>
        `
    }
}

class Select {
    constructor(box_selector, options, mode) {
        this.$wrap = document.querySelector(box_selector);
        this.props = options;
        this.selected = this.props.chosen;
        this.mode = mode;
    }

    create(attr_name, attr_value) {
       this.$el = document.createElement('div');
       this.$el.setAttribute(attr_name, attr_value);
       this.$wrap.prepend(this.$el);
       this.#render();
       this.#setup();

       return this;
    }

    open() {
        this.$el.classList.add('open');
        /*В этом месте меняем иконку, сделать вертикальный автоповорот*/
        /*
        1) Удаляем один класс - classList.add();
        2) Добавляем другой класс - classList.remove();
        */

        return this;
    }

    /*
        Метод принудительного добавления класса к this.$el
    */
    class(class_name) {
        this.$el.classList.add(class_name);

        return this;
    }

    #render() {
        const {placeholder, data, mode} = this.props;
        this.$el.classList.add('select');
        this.$el.innerHTML = renderTemplate(data, placeholder, this.selected, mode);
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$icon = this.$el.querySelector('[data-type="icon"]');
        this.$value = this.$el.querySelector('[data-type="text"]');
    }

    clickHandler(event) {
        const {type} = event.target.dataset;
        
        if (type === 'input') {
            this.#toggle();
        } else if (type === 'item') {
            const {value} = event.target.dataset;
            this.selected = this.#choose(value);
            this.#select(value);
        }
    }

    get isOpen() {
        return this.$el.className.indexOf('open') > -1;
    }

    get current() {
        /*Конструкция с find аналогична циклу for of
            for (let item of this.props.data) {
                if (item.id == this.selected) {
                    return item;
                }
            }
        */

        return this.props.data.find(item => item.id == this.selected);
    }

    #choose(id) {
        return id;
    }

    #select(id) {
        this.$value.innerHTML = this.current.value;
        this.$el
            .querySelectorAll('[data-type="item"]')
            .forEach(current => {
                current.classList.remove('selected');
            });
        this.$el
            .querySelector(`[data-value="${id}"]`)
            .classList
            .add('selected');
    }

    #toggle() {
        this.isOpen ? this.close() : this.open();
    }

    close() {
        this.$el.classList.remove('open');
        /*Повторяем манипуляции с классами, аналогичные в методе open, но в обратном порядке*/

        return this;
    }

    destroy() {
        this.$el.remove('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}

const selectedWhenStay = new Select('.sidebar__dropdownbox--temp', {
    placeholder: 'Выберите пожалуйста период',
    data: [
        {id: 1, value: '30 июля - 3 авг'},
        {id: 2, value: '4 авг - 8 авг'},
        {id: 3, value: '9 авг - 13 авг'},
        {id: 4, value: '14 авг - 18 авг'},
        {id: 5, value: '19 авг - 23 авг'},
        {id: 6, value: '24 авг - 28 авг'},
        {id: 7, value: '29 авг - 2 сен'}
    ],
    chosen: 3,
    mode: 'select'
});

selectedWhenStay
    .create('id', 'select-date')
    .open()
    .close();

const selectedCountGuests = new Select('.sidebar__dropdownbox--guets', {
    placeholder: 'Сколько гостей',
    data: [
        {id: 1, value: '1 гость'},
        {id: 2, value: '2 гостя'},
        {id: 3, value: '3 гостя, пара с 1 ребенком'},
        {id: 4, value: '3 гостя, 1 младенец'},
        {id: 5, value: '4 гостя, пара с 2 детьми'}
    ],
    chosen: '4',
    mode: 'select'
});

selectedCountGuests
    .create('id', 'select-guest')
    .open()
    .close();

const selectedComfortRoom = new Select('.sidebar__dropdownbox--short', {
    placeholder: '2 спальни, 2 кровати...',
    data: [
        {id: 1, value: 'спальни', count: 2},
        {id: 2, value: 'кровати', count: 2},
        {id: 3, value: 'ванные комнаты', count: 0}
    ],
    chosen: '0',
    mode: 'dropdown'
});

selectedComfortRoom
    .create('id', 'select-comfort')
    .open()
    .close();

const selectedMarkExtra = new Select('.sidebar__dropdownbox--long', {
    placeholder: 'дополнительные удобства',
    data: [
        {id: 1, value: 'Завтрак'},
        {id: 2, value: 'Письменные стол'},
        {id: 3, value: 'Стул для кормления'},
        {id: 4, value: 'Кроватка'},
        {id: 5, value: 'Телевизор'},
        {id: 6, value: 'Шампунь'},
        {id: 7, value: 'Телевизор'},
        {id: 8, value: 'Шампунь'}
    ],
    chosen: 0,
    mode: 'mark'
});

selectedMarkExtra
    .create('id', 'select-extra')
    .class('select--unlimited')
    .open()
    .close();
