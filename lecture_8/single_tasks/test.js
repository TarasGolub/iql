/**
 * Created by taraska on 10/18/2016.
 */

function task1(str) {
    return /^(.)\1*$/.test(str)
}
var str = '1 ';
console.log(' ' + str + '\n', task1(str));