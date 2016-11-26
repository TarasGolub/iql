/**
 * Задание 10
 * Заменить все заглавные буквы в строке строчными, а строчные – заглавными.
 * Замену нужно выполнить при помощи РВ.
 */

function task_10(str) {
    return str.replace(/([A-ZА-ЯЁ])|([a-zа-яё])/g, function (str, p1, p2) {
        if (p1) return p1.toLowerCase();
        if (p2) return p2.toUpperCase();
    });
}

var str = 'aA bB аА яЯ ёЁ ,;123';
console.log('\n', str, '\n', task_10(str));

