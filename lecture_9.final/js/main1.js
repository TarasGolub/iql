var btnStart = document.getElementsByClassName('btn_start')[0];
btnStart.addEventListener('click', drawPage);

function drawPage() {
    var page = document.body.firstElementChild;
    btnStart.parentNode.removeChild(btnStart);

    var form = createForm({
        id: 'addCarForm',
        number: 'Номер',
        brand: 'Марка',
        owner: 'Владелец',
        phone: 'Телефон'
    });
    page.appendChild(form);

    var table = createTable({
        id: 'parking_table',
        number: 'Номер',
        brand: 'Марка',
        owner: 'Владелец',
        phone: 'Телефон',
        arrival: 'Заезд',
        exit: 'Выезд',
        thForBtn: ''
    });
    page.appendChild(table);

    var addCarBtn = createButton({
        id: 'add_car',
        type: 'submit',
        text: 'Добавить'
    });
    document.forms[0].appendChild(addCarBtn);
    addCarBtn.addEventListener('click', addCar);

    var divRm = document.createElement('div');
    divRm.setAttribute('class', 'remove_block');
    var rmCarBtn = createButton({
        id: 'rm_car',
        text: 'Удалить'
    });
    divRm.appendChild(rmCarBtn);
    rmCarBtn.addEventListener('click', removeCars);
    page.insertBefore(divRm, table);
}

function Car(obj) {
    this.number = obj.number || askData('Введите номер: ', true);
    this.brand = obj.brand || askData('Введите марку: ');
    this.owner = obj.owner || askData('ФИО владельца: ');
    this.phone = obj.phone || askData('Телефон владельца: ');
    this.arrival = new Date();
    this.exit = '';
}

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

function createTable(obj) {
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
    return table;
}

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

function createRow(tableId, obj) {
    var table = document.getElementById(tableId);
    var newTr = document.createElement('tr');
    newTr.car = obj;

    for (var key in obj) {
        var newTd = document.createElement('td');
        if (key === 'arrival') {
            newTd.innerHTML = setDate(obj[key]);
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
}

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

    createRow('parking_table', car);
}

function removeCars(e) {
    e.preventDefault();
    document.getElementById('deleteAllCars').checked = false;

    var checks = document.querySelectorAll('.deleteCar');
    if (!checks[0]) return;
    for (var i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            var tr = checks[i].closest('tr');
            tr.parentNode.removeChild(tr);
        }
    }
    document.getElementById('deleteAllCars').checked = false;

    var newChecks = document.querySelectorAll('.deleteCar');
    if (!newChecks[0]) {
        var cb = document.getElementById('deleteAllCars');
        var lb = cb.nextElementSibling;
        cb.parentNode.removeChild(cb);
        lb.parentNode.removeChild(lb);
    }

}

function exitCar(e) {
    e.preventDefault();
    this.disabled = 'true';
    this.parentNode.previousElementSibling.innerHTML = setDate();
    var prSib = this.parentNode.previousElementSibling;
    // console.log(prSib)
    while (prSib) {
        prSib.classList.add('exited');
        prSib = prSib.previousElementSibling;
    }
    // this.parentNode.parentNode.classList.add('exited');
    
    var chBox = document.createElement('input');
    chBox.type = 'checkbox';
    chBox.setAttribute('name', 'deleteCar');
    chBox.setAttribute('class', 'deleteCar');
    this.parentNode.appendChild(chBox);

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

        chBoxAll.addEventListener('change', function () {
            console.log('Hello');
            var checks = document.getElementsByName('deleteCar');
            console.log(checks);
            for (var i = 0; i < checks.length; i++) {
                if (this.checked) {
                    checks[i].checked = true;
                } else {
                    checks[i].checked = false;
                }
            }
        });
    }

}

function setDate() {
    var date = new Date()
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
function parseDate(str) {
    var re = /^(\d{1,2}):(\d{2})(?:.|\n)+(\d{2}).(\d{2}).(\d{2})$/;
    var dataComponents = str.match(re);
    var year = 2000 + +dataComponents[5];
    var month = dataComponents[4] - 1;
    var day = +dataComponents[3];
    var hour = +dataComponents[2];
    var min = +dataComponents[1];

    return new Date(year,month,day,hour,min);


}

function createButton (obj) {
    // var classList = obj.classList || '';
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