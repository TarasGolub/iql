/**
 * Задание 11
 * Написать регулярное выражение, которое позволит проверить, 
 * что строка произвольной длины содержит только 2 символа.
 * “1111111111112221222111111111112” – OK
 * “aaaaaaaaaabbabaabababaa” – OK
 * “x” – NOT OK
 * “” – NOT OK
 * “12###########12” – NOT OK
 * “XY” – OK
 * “aaa aaa aaa” – OK
 */

function task_11(str) {
    if(/^(.)\1*$/.test(str)) return 'NOT OK';
    return /^(.)\1*(.)(\2|\1)*$/.test(str) ? 'OK' : 'NOT OK';
}
var str = '1111111111112221222111111111112';
console.log('\n', str, '\n', task_11(str));

var str = 'aaaaaaaaaabbabaabababaa';
console.log('\n', str, '\n', task_11(str));

var str = 'x';
console.log('\n', str, '\n', task_11(str));

var str = '';
console.log('\n', str, '\n', task_11(str));

var str = '12###########12';
console.log('\n', str, '\n', task_11(str));

var str = 'XY';
console.log('\n', str, '\n', task_11(str));

var str = 'aaa aaa aaa';
console.log('\n', str, '\n', task_11(str));