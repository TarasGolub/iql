/**
 * Задание 14
 * Есть строка, в которой содержатся десятичные числа.
 * Нужно заменить все эти числа шестнадцатиричными.
 * Строка “2233 + 1122 = 3355” должна превратиться в “0x8B9 + 0x462 = 0xD1B”
 */

function task_14(str) {
    var re = /(\b\d+\b)/g;
    return str.replace(re, function (str, p) {
        return '0x' + (+p).toString(16).toUpperCase();
    });
}

var str = "2233 + 1122 = 3355";
console.log('\n', str, '\n', task_14(str));
