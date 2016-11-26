(function () {

    getAllCars();

    var addBtn = document.getElementById('add_car');
    addBtn.onclick = function (e) {
        e.preventDefault();
        var newCar = {};
        var form = this.form;
        var elm = form.getElementsByTagName('input');
        for (var i = 0; i < elm.length; i++) {
            newCar[elm[i].id] = elm[i].value;
            elm[i].value = '';
        }
        var car = new Car(newCar);
        if (car.except) return;

        fetch('/add-car', {
            method: 'post',
            headers: new Headers({
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
                addToTable('parking_table', respJson);
            })


    };

    var chBoxAll = document.getElementById('deleteAllCars');
    chBoxAll.onchange = function () {
        var checks = document.getElementsByName('deleteCar');
        for (var i = 0; i < checks.length; i++) {
            if (this.checked) {
                if (checks[i].style.display === 'none') continue;
                checks[i].checked = true;
                continue;
            }
            checks[i].checked = false;
        }
    };

    var rmBtn = document.getElementById('rm_car');
    rmBtn.onclick = function (e) {
        e.preventDefault();
        document.getElementById('deleteAllCars').checked = false;
        var checkedItems = [].filter.call(document.getElementsByName('deleteCar'), function (car) {
            if (car.checked === true) return true;
        });
        var checkedCars = [];
        checkedItems.forEach(function (item) {
            checkedCars.push(item.closest('tr').id);
        });
        if (!checkedCars.length) return;

        fetch('/rm-car', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(checkedCars)
        })
            .then(function (response) {
                    return response.json();
                },
                function (error) {
                    console.log(error);
                })
            .then(function (respJson) {
                removeFromTable('parking_table', respJson);
            })

    };

    var searchInp = document.getElementById('searchByBrand');
    searchInp.oninput = function () {
        var searchString = searchInp.value;
        if (searchString.length === 0) refreshTable('parking_table');

        var searchObj = {prop: 'brand', val: searchString};
        fetch('/search-car', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(searchObj)
        })
            .then(function (response) {
                    return response.json();
                },
                function (error) {
                    console.log(error);
                })
            .then(function (respJson) {
                showSearchResult('parking_table', respJson);
            })
    };

    function getAllCars() {
        fetch('/car-list', {
            method: 'get',
            headers: new Headers({
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
                addToTable('parking_table', respJson);
            });
    }

    function refreshTable(tableId) {
        var table = document.getElementById(tableId);
        var rows = table.getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            rows[i].parentNode.removeChild(rows[i--]);
        }
        getAllCars();
    }

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
                } else if (key === 'exit' && item[key].length !== 0) {
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
            row.appendChild(tdForBtn);
            if (row.classList.contains('exited')) {
                chBox.style.display = 'inline-block';
                exitBtn.disabled = true;
            }
            table.appendChild(row);
        });
    }

    function isUniqId(id) {
        var flag = true;
        var table = document.getElementById('parking_table');
        var rows = table.getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            if (rows[i].id === id) flag = false;
        }
        return flag;
    }

    function removeFromTable(tableId, itemsToRemove) {
        if (!itemsToRemove.length) return;
        var table = document.getElementById(tableId);
        var rows = table.getElementsByTagName('tr');
        itemsToRemove.forEach(function (rowId) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].id === rowId) {
                    rows[i].parentNode.removeChild(rows[i--]);
                }
            }
        })
    }

    function showSearchResult(tableId, itemsToShow) {
        var table = document.getElementById(tableId);
        var rows = table.getElementsByTagName('tr');
        for (var i = 1; i < rows.length; i++) {
            rows[i].style.display = ~itemsToShow.indexOf(rows[i].id) ? '' : 'none';
        }
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
                headers: new Headers({
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

    function Car(obj) {
        this.number = obj.number || askData('Введите номер: ', true);
        if (!isUniqId(this.number)) {
            while (true) {
                this.number = prompt('Looks like duplicate number!\n Enter correct number:', '');
                if (this.number === null) this.except = 'duplicate number';
                if (isUniqId(this.number) && this.number !== '') break;
            }
        }
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
})();