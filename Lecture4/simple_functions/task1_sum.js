/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция получает на вход два аргумента и если оба из них числа,
 * то возвращает сумму этих чисел. Во всех остальных случаях возвращает NaN
 */
function sumNumbers(a, b) {
    if ( !(isNumeric(a) && isNumeric(b)) ) {
        return NaN;
    }
    a = +a;
    b = +b;
    return a+b;

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

console.log('a=1,  b=5,    sum=', sumNumbers(1,5));
console.log('a=1.25,  b=105.43,    sum=', sumNumbers(1.25,105.43));
console.log('a=-95,  b=45.7,    sum=', sumNumbers(-95,45.7));
console.log('a="a",  b=5,    sum=', sumNumbers('a',5));
console.log('a=1,  b={},    sum=', sumNumbers(1,{}));
console.log('a=1,  b=,    sum=', sumNumbers(1));
console.log('a="1",  b="5",    sum=', sumNumbers('1','5'));
console.log('a=" ",  b="5",    sum=', sumNumbers('','5'));
console.log('a="NaN",  b="5",    sum=', sumNumbers(NaN,'5'));
console.log('a="null",  b="5",    sum=', sumNumbers(null,'5'));