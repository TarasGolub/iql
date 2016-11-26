/**
 * Задание 3
 * Строка содержит набор слов, разделенных пробелами.
 * Нужно написать РВ которая будет реагировать на два одинаковых слова идущих подряд в строке.
 * Нужно вывести все такие пары.
 */


function task3(str) {
    return str.match(/\b(\w+)\s+\1\b/gi);
}

var str = "I am test    test string. Java and JavaScript will no return. Here we have three  ThRee pairs pairs";
console.log(task3(str) );
