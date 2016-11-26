/**
 * gets starting button and registers event handler
 */
var btnStart = document.getElementsByClassName('btn_start')[0];
btnStart.addEventListener('click', drawPage);


function drawPage() {
    /**
     * saves parking fee
     */
    var cost = +document.getElementById('cost').value;
    /**
     * removes starting form and starts create newpage
     */
    var page = document.body.firstElementChild;
    page.removeChild(document.getElementById('start_form'));

    /**
     * creates form to add new car to the table
     */
    var form = createForm({
        id: 'addCarForm',
        number: 'Номер',
        brand: 'Марка',
        owner: 'Владелец',
        phone: 'Телефон'
    });
    page.appendChild(form);

    /**
     * Creates new empty table
     */
    var tableParking = new Table({
        id: 'parking_table',
        number: 'Номер',
        brand: 'Марка',
        owner: 'Владелец',
        phone: 'Телефон',
        arrival: 'Заезд',
        exit: 'Выезд',
        thForBtn: ''
    });
    var table = document.getElementById('parking_table');

    /**
     * creates button to add cars into the table and registers event handler
     */
    var addCarBtn = createButton({
        id: 'add_car',
        type: 'submit',
        text: 'Добавить'
    });
    document.forms[0].appendChild(addCarBtn);
    addCarBtn.addEventListener('click', addCar);

    /**
     * creates button to remove cars from the table and registers event handler
     */
    var divRm = document.createElement('div');
    divRm.setAttribute('class', 'remove_block');
    var rmCarBtn = createButton({
        id: 'rm_car',
        text: 'Удалить'
    });
    divRm.appendChild(rmCarBtn);
    rmCarBtn.addEventListener('click', tableParking.removeRow);
    page.insertBefore(divRm, table);


    /**
     * constructor of car object
     * @param obj - will be got from the input form (id = addCarForm)
     * @constructor
     */
    function Car(obj) {
        this.number = obj.number || askData('Введите номер: ', true);
        this.brand = obj.brand || askData('Введите марку: ');
        this.owner = obj.owner || askData('ФИО владельца: ');
        this.phone = obj.phone || askData('Телефон владельца: ');
        this.arrival = new Date();
        this.exit = '';
    }

    /**
     * sets parameter if it not defined
     * @param str
     * @param required - allows empty string if false (default), doesnt allow empty string if true
     */
    function askData(str, required) {
        while (true) {
            var result = prompt(str, '');
            if (result === null) continue;
            if (!required) break;
            if (!result.length) continue;
            break;
        }
        return result;
    }


    /**
     * constructor of tables
     * creates only one row - THead (tr>th). Assign to th`s className and value obtained from obj.
     * @param obj
     * @constructor
     */
    function Table(obj) {
        var table = document.createElement('table');
        table.setAttribute('id', obj.id);
        var tr= document.createElement('tr');

        for (var key in obj) {
            if (key === 'id') continue;
            var th = document.createElement('th');
            th.innerHTML = obj[key];
            th.className = key;
            tr.appendChild(th);
        }
        table.appendChild(tr);
        page.appendChild(table);

        /**
         * creates new row in the table
         * @param obj
         */
        this.createRow = function (obj) {
            var newTr = document.createElement('tr');
            newTr.car = obj;

            for (var key in obj) {
                var newTd = document.createElement('td');
                if (key === 'arrival') {
                    newTd.innerHTML = setDate(obj[key]); // sets readable string with current date
                } else {
                    newTd.innerHTML = obj[key];
                }
                newTr.appendChild(newTd);
            }

            var btnExit = createButton({
                classList: 'exit_btn',
                text: '&rArr;'
            });
            newTd = document.createElement('td');
            newTd.appendChild(btnExit)
            newTr.appendChild(newTd);
            table.appendChild(newTr);

            btnExit.addEventListener('click', exitCar);
        };

        /**
         * removes row with checked checkboxes
         * @param e
         */
        this.removeRow = function (e) {
            e.preventDefault();
            /**
             * if checkbox#deleteAllCars does not exist, none of the cars have not left yet
             */
            if (!document.getElementById('deleteAllCars')) return;
            document.getElementById('deleteAllCars').checked = false;

            /**
             * gets all checkboxes and removes row only if it is checked
             */
            var checks = document.querySelectorAll('.deleteCar');
            if (!checks[0]) return;
            for (var i = 0; i < checks.length; i++) {
                if (checks[i].checked) {
                    var tr = checks[i].closest('tr');
                    tr.parentNode.removeChild(tr);
                }
            }

            /**
             * removes block with propose check all the cars if no one car in table have left
             */
            var newChecks = document.querySelectorAll('.deleteCar');
            if (!newChecks[0]) {
                var cb = document.getElementById('deleteAllCars');
                var lb = cb.nextElementSibling;
                cb.parentNode.removeChild(cb);
                lb.parentNode.removeChild(lb);
            }
        }
    }

    /**
     * creates new form with labels and inputs wrapped in div.input_field
     * @param obj
     * @returns {Element}
     */
    function createForm(obj) {
        var form = document.createElement('form');
        form.setAttribute('id', obj.id);
        form.href = obj.href || '#';
        form.method = obj.method || 'get';

        for (var key in obj) {
            if (key === 'id' || key === 'href' || key === 'method') continue;
            var div = document.createElement('div');
            div.setAttribute('class', 'input_field');
            var label = document.createElement('label');
            label.htmlFor = key;
            label.innerHTML = obj[key] + ': ';

            var inp = document.createElement('input');
            inp.id = key;
            if (key === 'phone') {
                inp.type = 'tel';
            } else {
                inp.type = 'text';
            }

            div.appendChild(label);
            div.appendChild(inp);
            form.appendChild(div);
        }
        return form;
    }

    /**
     * adds new car and adds it to the table
     */
    function addCar(e) {
        e.preventDefault();
        var obj = {};
        var form = this.form;
        var elm = form.getElementsByTagName('input');
        for (var i = 0; i < elm.length; i++) {
            obj[elm[i].id] = elm[i].value;
            elm[i].value = '';
        }
        var car = new Car(obj);
        // console.log('car:', car);

        tableParking.createRow(car);
    }

    /**
     * marks car as left
     */
    function exitCar(e) {
        e.preventDefault();
        this.disabled = 'true'; //makes 'exit' button disable
        this.closest('tr').car.exit = new Date(); // saves current date

        /**
         * writes readable string with date to the table
         */
        this.parentNode.previousElementSibling.innerHTML = setDate(this.closest('tr').car.exit);

        /**
         * counts cost of parking and outputs message with it
         */
        var time = (this.closest('tr').car.exit - this.closest('tr').car.arrival) / (60 * 1000) ;
        alert('Время стоянки: ' + time.toFixed(0) + ' минут\n' + 'К оплате: ' + bill(time) + ' грн.');

        /**
         * marks with grey color row , adds class exited
         */
        var prSib = this.parentNode.previousElementSibling;
        while (prSib) {
            prSib.classList.add('exited');
            prSib = prSib.previousElementSibling;
        }

        /**
         * adds checkboxes to select rows will be deleted
         */
        var chBox = document.createElement('input');
        chBox.type = 'checkbox';
        chBox.setAttribute('name', 'deleteCar');
        chBox.setAttribute('class', 'deleteCar');
        this.parentNode.appendChild(chBox);

        /**
         * adds (if not exist) one checkbox to check all cars in the table have left already
         */
        if (!document.getElementsByClassName('deleteAllCars')[0]) {
            var chBoxAll = document.createElement('input');
            chBoxAll.type = 'checkbox';
            chBoxAll.setAttribute('name', 'deleteAllCars');
            chBoxAll.setAttribute('id', 'deleteAllCars');
            chBoxAll.setAttribute('class', 'deleteAllCars');
            var rm = document.getElementsByClassName('remove_block')[0];
            rm.appendChild(chBoxAll);

            var lb = document.createElement('label');
            lb.htmlFor = 'deleteAllCars';
            lb.innerHTML = 'Выбрать все уехавшие: ';

            rm.appendChild(lb);

            /**
             * checks all available checkboxes and marks them as checked
             */
            chBoxAll.addEventListener('change', function () {
                var checks = document.getElementsByName('deleteCar');
                for (var i = 0; i < checks.length; i++) {
                    if (this.checked) {
                        checks[i].checked = true;
                        continue;
                    }
                    checks[i].checked = false;
                }
            });
        }

    }

    /**
     * calculates the parking cost based on the fee
     * @param min - minutes
     * @returns {number}
     */
    function bill(min) {
        if (min < 15) return 0;
        return Math.floor(min/60 + 1)*cost;
    }

    /**
     * translate date to readable string format
     * @param date
     * @returns {string}
     */
    function setDate(date) {
        var min = date.getMinutes();
        min = min < 10 ? ('0' + min) : min;
        var day = date.getDate();
        day = day < 10 ? ('0' + day) : day;
        var month = date.getMonth() + 1;
        month = month < 10 ? ('0' + month) : '' + month;
        var year = date.getFullYear() + '';
        year = year.slice(2);
        return date.getHours() + ':' + min + '<br>' + day + '.' + month + '.' + year;
    }

    /**
     * creates new button with setted id, classes, type and value
     * @param obj
     * @returns {Element}
     */
    function createButton (obj) {
        var btn = document.createElement('button');
        var type = obj.type || 'button';
        var text = obj.text || '';
        if (obj.id) {
            btn.setAttribute('id', obj.id);
        }
        if (obj.classList) {
            btn.setAttribute('class', obj.classList);
        }
        btn.type = type;
        btn.innerHTML = text;

        return btn;
    }
}
