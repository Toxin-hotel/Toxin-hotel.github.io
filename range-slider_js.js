class Range {
    constructor(type, min, max, step, value, orientation = 'horizontal') {
        this.type = type;
        this.min = min;
        this.max = max;
        this.step = step;
        this.default = value;
        this.rotate = orientation;

        this.base_input = null;
        this.range_box = null;
        this.current = null;
    }

    create() {
       this.base_input = document.createElement('input');
       this.base_input.setAttribute('type', this.type);

       if (this.type !== 'range') {
           this.type = 'range';
           this.base_input.setAttribute('type', this.type);
       }

       return this;
    }

    settings(set_elem_id) {
        /*
            Проверяем принимаемые опции
            Если приходит строковый тип данных, то
            выполняем преобразование в числовой
        */

        if (typeof(this.min) == 'number') {
            this.base_input.setAttribute('min', this.min);
        } else {
            this.min = parseInt(this.min);
        }

        if (typeof(this.max) == 'number') {
            this.base_input.setAttribute('max', this.max);
        } else {
            this.max = parseInt(this.max);
        }

        if (typeof(this.step) == 'number') {
            this.base_input.setAttribute('step', this.step);
        } else {
            this.step = parseInt(this.step);
        }

        if (typeof(this.default) == 'number') {
            this.base_input.setAttribute('value', this.default)
        } else {
            this.default = parseInt(this.default);
        }

        this.current = document.createElement('p');
        this.current.innerHTML = this.default;

        this.range_box = document.querySelector(set_elem_id);

        /*
            Вставка range-slider в нужное место страницы
        */
        if (this.range_box) {
            this.range_box.prepend(this.base_input);
            this.range_box.append(this.current);
        } else {

            /*
                Поведение пол умолчанию,
                range-slider - название класса для
                label по умолчанию
            */

            this.range_box = document.createElement('label');
            this.range_box.classList.add('range-slider');
            document.body.prepend(this.range_box);
            this.range_box.prepend(this.base_input);
            this.range_box.append(this.current);
        }

        /*
            Используем событие oninput для отслеживания изменений input
        */
        this._watch();

        return this;
    }

    orientation() {
        if (this.rotate == 'horizontal') {
            this.base_input.style.transform = 'rotate(0deg)';
        } else if (this.rotate == 'vertical') {
            this.base_input.style.transform = 'rotate(270deg)';
        }

        return this;
    }

    negaAttr() {
        /*
            Выполняем смену знака
        */
        this.min = this.min * (-1);
        this.max = this.max * (-1);

        /*
            Проверка корректности значений интервала
        */
        if (this.min > this.max) {
            this.min = this.min + this.max;
            this.max = this.min - this.max;
            this.min = this.min - this.max;
        }

        /*
            Установка новых значений
        */
       this.base_input.setAttribute('min', this.min);
       this.base_input.setAttribute('max', this.max);

       /*
            Пересчет значения по умолчанию
       */
        this._current();
        this._watch();

      return this;
    }

    _current() {
        this.default = this.min + (this.max - this.min) / 2;
        this.current.innerHTML = this.default;
        this.base_input.setAttribute('value', this.default);
    }

    _watch() {
        this.base_input.oninput = () => {
        const input = this.range_box.getElementsByTagName('input');
        this.current.innerHTML = input[0].value;

        /*this.range_box.querySelectorAll('p');*/
        const visible = this.range_box.querySelectorAll('p');

        for (let show of visible) {
            show.style.display = 'flex';
        }
      }
    }

    posAttr() {
        if (this.min < 0) {
            this.min = Math.abs(this.min);
            this.max = Math.abs(this.max);

            if (this.min > this.max) {
                this.min = this.min + this.max;
                this.max = this.min - this.max;
                this.min = this.min - this.max;
            }

            this.base_input.setAttribute('min', this.min);
            this.base_input.setAttribute('max', this.max);

            this._current();
            this._watch();
        }

        return this;
    }

    /*
        Добавляет классы всем элементам
        внутри контейнера this.range_box
    */
    classes(cls_input, cls_show) {
        /*
            cls_input - класс инпута
            cls_show - класс элемента, просмотр
            значения this.default
        */

        this.base_input.classList.add(`${cls_input}`);
        const showers = Array.from(this.range_box.querySelectorAll('p'));

        for (let shower of showers) {
            shower.classList.add(`${cls_show}`);
        }
    }
}

const start = new Range('range', 0, 5000, 100, 2500, 'horizontal');
    start
        .create()
        .settings('#start-piece')
        .orientation()
        .posAttr()
        .classes(
            'range-box__input',
            'range-box__state'
        );
const end = new Range('range', 5000, 10000, 100, 8500, 'horizontal');
    end
        .create()
        .settings('#end-piece')
        .orientation()
        .posAttr()
        .classes(
            'range-box__input',
            'range-box__state'
        );
