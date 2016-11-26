/**
 * Задание 12
 * Номер кредитной карточки состоит из 16 цифр, записанных слитно.
 * Однако этот номер можно условно разделить на 4 секции по 4 цифры.
 * Нужно проверить, есть ли в номере кредитки секция, которая содержит 4 одинаковые цифры.
 * “1234123412341234” - NOT OK
 * “5555555555554444” - OK
 * “1234000012341234” - OK
 * “1200001299111188” - NOT OK
 */

function task_12(str) {
    if ( !/^\d{16}$/.test(str)) return "invalid card number";
    var re = /\d{4}/g;
    while (res = re.exec(str)) {
        if (/(\d)\1{3}/.test(res[0])) return 'OK';
    }
    return 'NOT OK';
}

var str = '1234123412341234';
console.log('\n', str, '\n', task_12(str));

var str = '5555555555554444';
console.log('\n', str, '\n', task_12(str));

var str = '1234000012341234';
console.log('\n', str, '\n', task_12(str));

var str = '1200001299111188';
console.log('\n', str, '\n', task_12(str));