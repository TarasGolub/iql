/**
 * Задание 5
 * Строка содержит набор слов, разделенных пробелами.
 * Нужно написать РВ которая будет реагировать на то, что все слова в строке одинаковые.
 */

function task5(str) {
    if (!str.length) {
        return 'NO! This string is empty';
    }
    return str.match(/^(\w+)(\s+\1)+[\W]?$/gi) ? 'YES! This string contains only one word!' :
    'NO! This string contains different words!';
}

var str = "Hello hello hello heLLo hello!";
console.log('\n', str, '\n', task5(str) );

var str = "Hello hello helloheLLo hello!";
console.log('\n', str, '\n', task5(str) );

var str = "Hello am test test string. Java and JavaScript will no return.";
console.log('\n', str, '\n', task5(str) );

var str = "";
console.log('\n', str, '\n', task5(str) );