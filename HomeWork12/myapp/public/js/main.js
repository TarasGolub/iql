var carList = [];
fetch('/car-list', {
    method: 'get',
    headers: new Headers ({
        'Content-Type': 'application/json'
    })
})
    .then(function (response) {
        return response.json();
    },
    function (error) {
        console.log(error);
    })
    .then(function (respJson) {
        carList = respJson;
        addToTable('parking_table', respJson);
    });



var btn = document.getElementById('add_car');
btn.onclick = function (e) {
    e.preventDefault();
    var newCar = {};
    var form = this.form;
    var elm = form.getElementsByTagName('input');
    for (var i = 0; i < elm.length; i++) {
        newCar[elm[i].id] = elm[i].value;
        elm[i].value = '';
    }
    var car = new Car(newCar);

    fetch('/add-car', {
        method: 'post',
        headers: new Headers ({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(car)
    })
        .then(function (response) {
            return response.json();
        },
        function (error) {
            console.log(error);
        })
        .then(function (respJson) {
        carList.push(respJson);
        console.log(respJson);
        addToTable('parking_table', respJson);
    })



};

function addToTable(tableId, itemsToAdd) {
    if (!itemsToAdd.forEach) itemsToAdd = [itemsToAdd];
    var table = document.getElementById(tableId);
    itemsToAdd.forEach(function (item) {
        var row = document.createElement('tr');
        row.id = item.number;
        for (var key in item) {
            var cell = document.createElement('td');
            if (key === 'arrival') {
                cell.innerText = setDate(new Date(item[key]));
            } else if (key === 'exit' && item[key].length !== 0){
                cell.innerText = setDate(new Date(item[key]));
                row.classList.add('exited');
            } else {
                cell.innerText = item[key];
            }
            row.appendChild(cell);
        }
        var tdForBtn = document.createElement('td');
        var exitBtn = createExitBtn();
        var chBox = createCheckbox();
        tdForBtn.appendChild(exitBtn);
        tdForBtn.appendChild(chBox);
        row.appendChild( tdForBtn);
        if (row.classList.contains('exited') ) {
            chBox.style.display = 'inline-block';
            exitBtn.disabled = true;
        }
        table.appendChild(row);
    });
}

function createExitBtn() {
    var exitBtn = document.createElement('button');
    exitBtn.className = 'exit_btn';
    exitBtn.setAttribute('type', 'button');
    exitBtn.appendChild(document.createTextNode('⇒'));
    exitBtn.onclick = function (e) {
        e.preventDefault();
        var rowId = this.closest('tr').id;
        fetch('/exit-car', {
            method: 'post',
            headers: new Headers ({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({id: rowId})
        })
            .then(function (response) {
                    return response.json();
            },
            function (error) {
                console.log(error);
            })
            .then(function (respJson) {
                exitCar(rowId, respJson);
                console.log(respJson);
            });
    };
    return exitBtn;
}
function createCheckbox() {
    var chBox = document.createElement('input');
    chBox.type = 'checkbox';
    chBox.setAttribute('name', 'deleteCar');
    chBox.setAttribute('class', 'deleteCar');
    chBox.style.display = 'none';
    return chBox;
}


function exitCar(rowId, respJson) {
    var row = document.getElementById(rowId);
    var chBox = row.lastElementChild.lastElementChild;
    var exitBtn = row.lastElementChild.firstElementChild;
    var exitCell = row.lastElementChild.previousElementSibling;
    exitCell.innerHTML = setDate(new Date(respJson));
    row.classList.add('exited');
    chBox.style.display = 'inline-block';
    exitBtn.disabled = true;
}

function setDate(date) {
    var min = date.getMinutes();
    min = min < 10 ? ('0' + min) : min;
    var day = date.getDate();
    day = day < 10 ? ('0' + day) : day;
    var month = date.getMonth() + 1;
    month = month < 10 ? ('0' + month) : '' + month;
    var year = date.getFullYear() + '';
    year = year.slice(2);
    return date.getHours() + ':' + min + '\n' + day + '.' + month + '.' + year;
}
// var xhr = new XMLHttpRequest();
// xhr.open('get', '/car-list' );
// xhr.send();
// xhr.onreadystatechange = function() {
//     if (xhr.readyState != 4) return;
//
//     console.log('Come');
//
//     if (xhr.status != 200) {
//         alert(xhr.status + ': ' + xhr.statusText);
//     } else {
//         carList = xhr.responseText;
//         console.log('carList',carList);
//     }
//
// };

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