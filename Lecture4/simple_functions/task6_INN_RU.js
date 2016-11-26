/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция проверяет ИНН
 * ссылка на описание алгоритма https://ru.wikipedia.org/wiki/Идентификационный_номер_налогоплательщика
 */

function checkINNRu(inn) {
    if (isNaN(parseFloat(inn)) || !isFinite(inn) ) {
        return 'It is not valid INN. Must contain only digits';
    }

    var innToStr = inn + '';
    if (innToStr.length === 10) {
        return checkEntityINN(innToStr);
    } else if (innToStr.length === 12) {
        return checkPersonINN(innToStr);
    } else {
        return 'You have entered not valid or not complete code ';
    }

    function checkEntityINN (inn) {
        var checkResult = 'Вы ввели 10 цифр. ИНН юрлица. Проверяем..... ';
        var innArr = inn.split('');
        var koef = [2, 4, 10, 3, 5, 9, 4, 6, 8];

        var sum = sumArrays(innArr, koef);
        var resultOfCheck = innArr[innArr.length - 1] == ( (sum % 11) % 10);

        checkResult += resultOfCheck ? 'ПОХОЖЕ НА ПРАВИЛЬНЫЙ КОД'  : '!!! НЕ КОРРЕКТНЫЙ КОД !!!';
        return checkResult;
    }

    function checkPersonINN (inn) {
        var checkResult = 'Вы ввели 12 цифр. ИНН физлица. Проверяем..... ';
        var innArr = inn.split('');
        var koef10 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        var koef11 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

        var sum10 = sumArrays(innArr, koef10);
        var sum11 = sumArrays(innArr, koef11);

        var resultOfCheck10 = innArr[innArr.length - 2] == ( (sum10 % 11) % 10);
        var resultOfCheck11 = innArr[innArr.length - 1] == ( (sum11 % 11) % 10);

        checkResult += (resultOfCheck10 &&  resultOfCheck11) ? 'ПОХОЖЕ НА ПРАВИЛЬНЫЙ КОД'  : '!!! НЕ КОРРЕКТНЫЙ КОД !!!';
        return checkResult;
    }

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
}


console.log('checkINNRu(1191111110)' , checkINNRu(1191111110));
console.log('checkINNRu(1191111410)' , checkINNRu(1191111410));
console.log('checkINNRu(1653001805)' , checkINNRu(1653001805));

console.log('checkINNRu(165300180512)' , checkINNRu(165300180512));
console.log('checkINNRu(32160006953434343)' , checkINNRu(32160006953434343));
console.log('checkINNRu(3vcvxvx)' , checkINNRu('3vcvxvx'));
console.log('checkINNRu(" ")' , checkINNRu(''));
console.log('checkINNRu(12)' , checkINNRu(12));