/**
 * Created by taraska on 10/7/2016.
 */


/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция проверяет ИНН
 * ссылка на описание алгоритма https://ru.wikipedia.org/wiki/Идентификационный_номер_налогоплательщика
 */

function checkINN(inn) {
    if (isNaN(parseFloat(inn)) || !isFinite(inn) ) {
        return 'It is not valid INN. Must contain only digits';
    }

    var innToStr = inn + '';
    if (innToStr.length !== 10) {
        return 'You have entered not valid or not complete code ';
    }

    var checkResult = '\nВы ввели 10 цифр. Проверяем..... ';
    var innArr = innToStr.split('');
    var koef = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
    var sum = sumArrays(innArr, koef);
    var resultOfCheck = innArr[innArr.length - 1] == ( (sum % 11) % 10);
    checkResult += resultOfCheck ? '\nПОХОЖЕ НА ПРАВИЛЬНЫЙ КОД'  : '\n!!! НЕ КОРРЕКТНЫЙ КОД !!!';

    if (resultOfCheck) {
        checkResult += bDay(innToStr.slice(0, 5));
        checkResult += (innArr[innArr.length-2] % 2) ? '\nВаш пол: Мужчина' : '\nВаш пол: Женщина';
    }

    return checkResult + '\n\n';


    function sumArrays (a, b) {
        var res = [];
        var sum = 0;

        for (var i = 0; i < b.length; i++) {
            res.push(a[i] * b[i]);
        }

        for (var j = 0; j < res.length; j++) {
            sum += res[j];
        }
        return sum;
    }

    function bDay(days) {
        if (days[0] === '8' || days[0] === '7') {
            return '\nДату Вашего рождения определить не удалось';
        }
        var startDate = new Date(1899, 11, 31);
        var bDayMs = +startDate + (days * 24 *3600 *1000);
        var bDay = new Date(bDayMs);
        var day = bDay.getDate();
        var month = (bDay.getMonth()+1) < 10 ? '0' + (bDay.getMonth()+1) : (bDay.getMonth()+1);
        var year = bDay.getFullYear();
        return '\nДата Вашего рождения: ' + day + '.' + month + '.' + year;
    }
}


console.log('checkINN(3216000695)' , checkINN(3217000695));
console.log('checkINN(3216000695)' , checkINN(3217100695));

console.log('checkINN(1653001805)' , checkINN(1653001805));
console.log('checkINN(165300180512)' , checkINN(165300180512));
console.log('checkINN(165300180512)' , checkINN(165300180512));
console.log('checkINN(32160006953434343)' , checkINN(32160006953434343));
console.log('checkINN(3vcvxvx)' , checkINN('3vcvxvx'));
console.log('checkINN(" ")' , checkINN(''));
console.log('checkINN(12)' , checkINN(12));
