(function () {
    // gets cars from server and displays them
    getAllCars();

    // adds new car to array on server and displays it in table
    var addBtn = document.getElementById('add_car');
    addBtn.onclick = function (e) {
        e.preventDefault();

        // collects info from the inputs to the object
        var newCar = {};
        var form = this.form;
        var elm = form.getElementsByTagName('input');
        for (var i = 0; i < elm.length; i++) {
            newCar[elm[i].id] = elm[i].value;
            elm[i].value = '';
        }

        // creates new car and aborts if car.except is defined
        var car = new Car(newCar);
        if (car.except) {
            console.log(car.except);
            return;
        }

        // sends info to server to add car to the array
        fetch('/add-car', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(car)
            })
            .then(status)
            .then(json)
            .then(function (data) {
                addToTable('parking_table', data);  // after response displays car in table
            }).catch(function (error) {
                console.log('Request failed\n Car was not added', error);
            });
    };

    // removes selected cars from array on server and table
    var rmBtn = document.getElementById('rm_car');
    rmBtn.onclick = function (e) {
        e.preventDefault();

        // collects only checked to delete cars
        document.getElementById('deleteAllCars').checked = false;
        var checkedItems = [].filter.call(document.getElementsByName('deleteCar'), function (car) {
            if (car.checked === true) return true;
        });
        var checkedCars = [];
        checkedItems.forEach(function (item) {
            checkedCars.push(item.closest('tr').id); // pushes id`s of checked cars to the array, it will be send to server
        });
        if (!checkedCars.length) return; //aborts if no checked cars

        // sends request to server to remove cars with numbers in array (checkedCars)
        fetch('/rm-car', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(checkedCars)
            })
            .then(status)
            .then(json)
            .then(function (data) {
                removeFromTable('parking_table', data); //after response removes cars from table
            }).catch(function (error) {
                console.log('Request failed\n Cars were not removed!', error);
            });

    };

    // searches cars in accordance with input and displays them
    var searchInp = document.getElementById('searchByBrand');
    searchInp.oninput = function () {
        // on each inputted char generics object, it will be send to server
        var searchString = searchInp.value;
        var searchObj = {prop: 'brand', val: searchString}; // prop - where to search, val - what to search

        // sends request to server
        fetch('/search-car', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(searchObj)
        })
            .then(status)
            .then(json)
            .then(function (data) {
                showSearchResult('parking_table', data); // after response displays matches
            }).catch(function (error) {
                console.log('Request failed\n Search did not load!', error);
            });
    };

    // checks all available(with exit time) cars if checked this checkbox
    var chBoxAll = document.getElementById('deleteAllCars');
    chBoxAll.onchange = function () {
        var checks = document.getElementsByName('deleteCar');
        for (var i = 0; i < checks.length; i++) {
            if (this.checked) {
                if (checks[i].style.display === 'none') continue; // if display === none, the car still no gone yet
                checks[i].checked = true;
                continue;
            }
            checks[i].checked = false;
        }
    };

    // handler for fetch
    function status(response) {
        // checks code of response from server and throw error if was not successful
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    // handler for fetch
    function json(response) {
        // parses response from server
        return response.json()
    }

    function getAllCars() {
        // sends request to server to get list of all cars
        fetch('/car-list', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(status)
            .then(json)
            .then(function (data) {
                addToTable('parking_table', data); // after response displays cars in table
            }).catch(function(error) {
            console.log('Request failed\n Car list was not loaded!', error);
        });
    }

    function addToTable(tableId, itemsToAdd) {
        if (!itemsToAdd.forEach) itemsToAdd = [itemsToAdd]; // if itemsToAdd is object wraps it in array
        var table = document.getElementById(tableId);
        itemsToAdd.forEach(function (item) {
            var row = document.createElement('tr');         // for each car creates row in table
            row.id = item.number;                           // sets id equivalent cars number
            for (var key in item) {
                var cell = document.createElement('td');
                if (key === 'arrival') {                     // arrival and exit writes in readable format
                    cell.innerText = setDate(new Date(item[key]));
                } else if (key === 'exit' && item[key].length !== 0) {
                    cell.innerText = setDate(new Date(item[key]));
                    row.classList.add('exited');              // marks row as exited if exit time is defined
                } else {
                    cell.innerText = item[key];
                }
                row.appendChild(cell);
            }
            var tdForBtn = document.createElement('td');        // last cell contains button 'exit' and checkbox
            var exitBtn = createExitBtn();
            var chBox = createCheckbox();
            tdForBtn.appendChild(exitBtn);
            tdForBtn.appendChild(chBox);
            row.appendChild(tdForBtn);
            if (row.classList.contains('exited')) {             // checkbox will be displayed only if row is marked as 'exited'
                chBox.style.display = 'inline-block';
                exitBtn.disabled = true;
            }
            table.appendChild(row);
        });
    }

    function removeFromTable(tableId, itemsToRemove) {
        if (!itemsToRemove.length) return;
        var table = document.getElementById(tableId);
        var rows = table.getElementsByTagName('tr');
        itemsToRemove.forEach(function (rowId) {            // removes car if it`s number in itemsToRemove
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
            // hides rows with cars if they not matched with search string
            rows[i].style.display = ~itemsToShow.indexOf(rows[i].id) ? '' : 'none';
        }
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

    function createExitBtn() {
        var exitBtn = document.createElement('button');
        exitBtn.className = 'exit_btn';
        exitBtn.setAttribute('type', 'button');
        exitBtn.appendChild(document.createTextNode('⇒'));
        exitBtn.onclick = function (e) {
            e.preventDefault();
            var rowId = this.closest('tr').id;

            // sends request to server with number(id) of car
            fetch('/exit-car', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({id: rowId})
                })
                .then(status)
                .then(json)
                .then(function (data) {
                    exitCar(rowId, data);  // after response sets info about left in table
                }).catch(function (error) {
                    console.log('Request failed\n Car was not marked as left!', error);
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
        // number is required parameter and must be unique
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

        // if parameter was not defined asks about it
        // required - optional parameter, if true obliges enter a value
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

        function isUniqId(id) {
            var flag = true;
            var table = document.getElementById('parking_table');
            var rows = table.getElementsByTagName('tr');
            for (var i = 1; i < rows.length; i++) {
                if (rows[i].id === id) flag = false;
            }
            return flag;
        }
    }
})();