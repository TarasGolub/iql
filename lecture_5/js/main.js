/**
 * Created by taraska on 10/11/2016.
 */
var page = document.getElementsByClassName('page_wrap')[0];

page.onclick = function (e) {
    var target = e.target;
    if (target.tagName != 'BUTTON') {
        return;
    }

    var form = target.parentNode;
    var inputs = form.getElementsByTagName('textarea');
    var res = form.nextElementSibling;
    var fn;
    var args = [];

    if (target.type === 'submit') {
        switch (target.id) {
            case 'btn_task1':
                fn = countTypes;
                break;
            case 'btn_task2':
                fn = doFunctionsUI;
                break;
        }
    } else if (target.type === 'reset') {
        res.innerHTML = '';
        return;
    }

    for (var i = 0; i <inputs.length; i++) {
        args.push(inputs[i].value);
    }
    res.innerHTML = fn.apply(null, args);
};

closureCallback();

function closureCallback() {
    var exchange = changeMoneyUI();
    var inp_rate = document.getElementById('rate');
    var inp_amount = document.getElementById('inp_amount');
    var btnRate = document.getElementById('btn_task3_set_rate');
    var btnGo = document.getElementById('btn_task3');
    var btnReset = document.getElementById('btn_reset_task3');
    var res = document.getElementById('res_task3');

    btnRate.onclick = function () {
        exchange.setRate(+inp_rate.value);
        inp_rate.value = '';
    }
    btnGo.onclick = function () {
        res.innerHTML = exchange.change(+inp_amount.value);
    }
    btnReset.onclick = function () {
        res.innerHTML = '';
    }
}


// TASK 1
function countTypes(obj) {
    try {
        obj = JSON.parse(obj);
    }
    catch (e){
        return 'Упс!.. Похоже, Вы ввели не корректную запись';
    }
    if ( emptyObject(obj) ) {
        return 'Вы ввели пустой объект';
    }

    var res = {};
    var typeOfArg;

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        typeOfArg = checkType(obj[key]);

        if (typeOfArg in res) {
            res[typeOfArg]++;
        } else {
            res[typeOfArg] = 1;
        }
    }

    return resToString(res);
    // return res;

    function emptyObject(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    }

    function checkType(arg) {
        var typeArg = typeof(arg);

        if (arg === null) {
            typeArg = 'null';
        } else if (typeArg === 'undefined') {
            typeArg = 'undefined';
        } else if (typeArg === 'object') {
            var toString = {}.toString;
            typeArg = toString.call(arg).slice(8,-1);
        }
        return typeArg;
    }

    function resToString(obj) {
        var resString = '<ul>';
        for (var key in obj) {
            if ( !obj.hasOwnProperty(key) ) continue;
            resString += '<li>' + key + ': ' + obj[key] + '</li>';
        }
        resString += '</ul>';

        return resString;
    }
}

// TASK 2
function doFunctionsUI(str) {
    if (str === null || str.length === 0) {
        return 'Вы не ввели ни одной функции';
    }
    str = str.replace(/\s\s+/g,' ').replace(/},/g,'}\n');
    var arrOfFuncs = str.split('\n');
    var funcs = [];

    try {
        arrOfFuncs.forEach(function (item) {
            funcs.push(parseFunc(item));
        });
    }
    catch (e){
        return 'Похоже, Вы ввели не корректную запись. Проверьте правильно ли записаны все ' +
            'функции и разделены ли запятой'
    }

    return doFunctions.apply(null, funcs).join(', ');

    function doFunctions() {
        if (arguments.length === 0) {
            return 'Вы не ввели ни одной функции';
        }

        var res = [];

        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] != 'function') {
                return 'Арументами могут быть только функции';
            }
            if (!arguments[i]()) {
                break;
            }
            res.push(arguments[i]());
        }
        return res;
    }

    function parseFunc(str) {
        var args = str.match(/\((.*?)\)/)[1];
        var toDo = str.match(/{(.*)}/)[1];
        return new Function(args,toDo);
    }
}

// TASK 3
function changeMoneyUI() {
  return (function changeMoney() {
            var exchangeRate;
            return {
                setRate: function (newRate) {
                    if (!isNaN(newRate) && isFinite(newRate) && newRate > 0) {
                        exchangeRate = newRate;
                    } else {
                        exchangeRate = 'курс был введен не корректно'
                    }
                },
                getRate: function () {
                    if (!exchangeRate || typeof exchangeRate === 'string') {
                        return "Курс не задан или задан не правильно";
                    }
                    return exchangeRate;
                },
                change: function (amount) {
                    if (!exchangeRate || typeof exchangeRate === 'string') {
                        return "Курс не задан или задан не правильно";
                    }
                    if (!amount || isNaN(amount)) {
                        return "Сумма не задана или задана не правильно";
                    }
                    return amount * exchangeRate;
                }
            }
        })();
}
