/**
 * Задание 6
 * Строка содержит набор слов, разделенных одиночными пробелами.
 * Нужно удалить из строки все слова, начинающиеся с заглавной буквы.
 */

function task6(str) {
    return str.replace(/\b[A-Z](\w+)?\s?\b/g, '');
}

var str = "Hello I am test Test string. Java and javaScript will No return Op.";
console.log('\n', str, '\n', task6(str) );
