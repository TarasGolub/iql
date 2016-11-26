/**
 * Задание 1
 * Дана строка, содержащая номер кредитной карточки.
 * Длина строки может быть произвольной, но больше 8 символов.
 * Нужно оставить первые 3 и последние 4 символа, а остальные заменить звездочками.
 * Результирующая строка должна быть той же длины, что и исходная.
 * Например, "DE56986623670976937041" должно превратиться в "DE5***************7041"
 */
function task1(str) {
    if (str.length < 8) {
        return 'Input string should be at least 8 chars';
    }
    return str.slice(0, 3) + str.slice(3).replace(/\w(?=.{4,})/g, '*');;
}
var str = 'DE56986623670976937041';
console.log('\n ' + str + '\n', task1(str));
var str = 'DE041';
console.log('\n ' + str + '\n', task1(str));
var str = '1234 5678 9876 5432';
console.log('\n ' + str + '\n', task1(str));
var str = 'DE56986623670976937041DE56986623670976937041DE56986623670976937041';
console.log('\n ' + str + '\n', task1(str));



// var str = 'DE56986623670976937041';
// var str2 = str.match(/(^.{3})([.])(.{4}&)/g);
// console.log('str2 \n', str2);
// var str1 = str.replace(/^([\w]{3,})[\w]([\w]{4,})$/g,'$1' + '*' + '$2');
// console.log('\n', str, '\n', str1);