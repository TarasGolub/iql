/**
 * Created by taraska on 10/11/2016.
 */

/**
 * Функция получает на вход функции(любое количество) и выполняет их пока возвращаемое значение выполняемых
 * функций истинно. Результат выполнения массив возвращаемых функциями значений.
 */

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

// TEST AREA


function sum(a,b) {
    return a+b;
}
function say(str) {
    return 'hello ' + str;
}
function sayFalse() {
    return '';
}

var result1 = doFunctions(
    function () {
        return 'hello';
    },
    function () {
        return Math.random().toFixed(2);
    },
    function () {
        return 0;
    },
    function () {
        return 2+5;
    }

);
console.log(result1);

var result2 = doFunctions();
console.log(result2);


var result3 = doFunctions('afsrtrt');
console.log(result3);


var result4 = doFunctions(
    function () {
        return sum(2,4);
    },
    function () {
        return say('world!');
    },
    function () {
        var a = 1; // will return undefined
    },
    function () {
        return 3;
    }

);
console.log(result4);/**
 * Created by taraska on 10/11/2016.
 */
