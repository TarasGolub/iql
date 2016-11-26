/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция получает на вход три числа и возвращает их среднее значение.
 */

function countAverage(a, b, c) {
    if (!isNumeric(a) || !isNumeric(b) || !isNumeric(c)) {
        return 'Incorrect value of arguments';
    }
    a = +a;
    b = +b;
    c = +c;
    var avarage = (a + b + c) / 3;
    return parseFloat(avarage.toFixed(2));


    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

console.log('countAverage(1, 2, 3): ', countAverage(1, 2, 3));
console.log('countAverage(2, 4, 6): ', countAverage(2, 4, 6));
console.log('countAverage(-1, 0, 3): ', countAverage(-1, 0, 3));
console.log('countAverage(0, 0, 0): ', countAverage(0, 0, 0));
console.log('countAverage(1.5, 4.5, 3): ', countAverage(1.5, 4.5, 3));
console.log('countAverage(1, 2): ', countAverage(1, 2));
console.log('countAverage(1, 2, " "): ', countAverage(1, 2, ''));
console.log('countAverage(1, null, 3): ', countAverage(1, null, 3));
console.log('countAverage({}, 2, 3): ', countAverage({}, 2, 3));
console.log('countAverage(1, 2, []): ', countAverage(1, 2, []));