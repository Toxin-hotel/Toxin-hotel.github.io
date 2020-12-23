class Nav {
    constructor(selector_main, btn_hide_id, btn_type, ...items) {
        this.main_box = document.querySelector(selector_main);
        this.btn_hide = document.createElement('button');
        this.btn_hide.setAttribute('id', btn_hide_id);
        this.type = btn_type;
        this.items = items.join('').split(',');

        this.screen = undefined;
        this.root_list = null;
    }

    _addItem(text_of_link) {
        const link = document.createElement('a');
        link.innerHTML = text_of_link;
        const li = document.createElement('li');
        li.prepend(link);
        const icon = document.createElement('span');
        li.append(icon);

        return li;
    }

    _createNav() {
        const list = document.createElement('ul');

        for (let j = 0; j < this.items.length; j++) {
            var item = this._addItem(this.items[j]);
            if ((j === 1) || (j === 4)) {
                var chevron = item.querySelector('span');
                chevron.classList.add('chevron-down');
            }

            list.append(item);
            this.main_box.append(list);
        }

        this.classNames();

        return this.main_box;
    }

    /*
        Метод для задания классов списку меню
    */
    classNames() {
        const link_of_list = Array.from(this.main_box.querySelectorAll('a'));
        const item_of_list = Array.from(this.main_box.querySelectorAll('li'));
        this.root_list = this.main_box.querySelector('ul');

        for (let l = 0; l < link_of_list.length; l++) {
            link_of_list[l].classList.add('root-list__link');
        }

        for (let i = 0; i < item_of_list.length; i++) {
            item_of_list[i].classList.add('root-list__item');
        }

        this.root_list.classList.add('root-list');
    }

    _screenWidth() {
        this.screen = window.innerWidth;

        return this.screen;
    }

    _updateWidth() {
        this._screenWidth = this._screenWidth.bind(this);
        window.addEventListener('resize', this._screenWidth);
        this._screenWidth();
    }

    _createMenuButton() {
        const inner = document.createElement('span');
        this.btn_hide.setAttribute('type', this.type);

        if (this.type !== 'button') {
            this.type = button;
            this.btn_hide.setAttribute('type', this.type);
        }

        this.btn_hide.prepend(inner);
        this.main_box.append(this.btn_hide);

        this.btn_hide.classList.add('menu-call__humburger');
        this.btn_hide.querySelector('span').classList.add('menu-call__shower');
    }

    start() {
        this._createNav();
        this._createMenuButton();
        this._menuVisible();

        return this;
    }

    _menuVisible() {
        const visually = this.main_box.querySelector('#menu-call');

        if (this._screenWidth() >= 1150) {
            visually.classList.add('visually');
            if (this.root_list.classList.contains('root-list--visible')) {
                this.root_list.classList.remove('root-list--visible');
            }
        } else if (this._screenWidth() < 1150) {
            this.root_list.classList.add('root-list--visible');
            if (visually.classList.contains('visually')) {
                visually.classList.remove('visually');
            }
        }
    }

    _toggle() {
        this.btn_hide.classList.toggle('click');

        if (this.btn_hide.classList.contains('click')) {
            this.root_list.style.display = 'block';
        } else if (!this.btn_hide.classList.contains('click')) {
            this.root_list.style.display = 'none';
        }
    }

    toggle() {
        this._toggle = this._toggle.bind(this);
        this.btn_hide.addEventListener('click', this._toggle);
        console.log(this.btn_hide);

        return this;
    }
}

const menu = new Nav(
    '.menu-call',
    'menu-call',
    'button',
    ['О нас', 'Услуги', 'Вакансии', 'Новости', 'Соглашения', 'Войти', 'Зарегистрироваться']
);

menu.start().toggle();
