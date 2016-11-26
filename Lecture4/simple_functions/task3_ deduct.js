/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция получает на вход два числа и вычитает из большего меньшее.
 */

function deduct(a, b) {
    if (!isNumeric(a) || !isNumeric(b)) {
        return 'Incorrect arguments';
    }
    a = +a;
    b = +b;
    return (a > b) ? (a - b) : (b-a);

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

console.log('deduct(2,10): ', deduct(2,10));
console.log('deduct(10,2): ', deduct(10,2));
console.log('deduct(-2,100): ', deduct(-2,100));
console.log('deduct(0,10): ', deduct(0,10));
console.log(' deduct(2,0): ', deduct(2,0));
console.log('deduct("","8"): ', deduct('','8'));
console.log("deduct('sfs ','8'): ", deduct('sfs ','8'));
console.log("deduct(' ','sdsd'): ", deduct(' ','sdsd'));
console.log("deduct(null,'8'): ", deduct(null,'8'));
console.log("deduct('',''): ", deduct('',''));
console.log("deduct(2): ", deduct(2));
