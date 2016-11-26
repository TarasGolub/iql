/**
 * Задание 4
 * Строка содержит набор слов, разделенных пробелами.
 * Нужно написать РВ которая будет реагировать на то,
 * что строка начинается и заканчивается одним и тем же словом.
 */

function task4(str) {
    if (!str.length) {
        return 'NO! This string is empty';
    }
    return str.match(/^(\w+).+\1[\W]?$/gi) ? 'Yes! This string starts and ends with the same word!' :
        'NO! This string starts and ends with different words!';
}

var str = "Hello am test test string. Java and JavaScript will no return. hello.";
console.log('\n', str, '\n', task4(str) );

var str = "Hello am test test string. Java and JavaScript will no return.";
console.log('\n', str, '\n', task4(str) );

var str = '';
console.log('\n', str, '\n', task4(str) );
