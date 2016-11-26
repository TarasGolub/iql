/**
 * Created by taraska on 10/8/2016.
 */
var page = document.getElementsByClassName('page_wrap')[0];

page.onclick = function (e) {
    var target = e.target;
    if (target.tagName != 'BUTTON') {
        return;
    }

    var form = target.parentNode;
    var inputs = form.getElementsByTagName('input');
    var res = form.nextElementSibling;
    var fn;
    var args = [];

    if (target.type === 'submit') {
        switch (target.id) {
            case 'btn_task1':
                fn = sumNumbers;
                break;
            case 'btn_task2':
                fn = creditCalc;
                break;
            case 'btn_task3':
                fn = deduct;
                break;
            case 'btn_task4':
                fn = countAverage;
                break;
            case 'btn_task5':
                fn = toSquare;
                break;
            case 'btn_task6':
                fn = checkINN;
                break;
        }
    } else if (target.type === 'reset') {
        res.innerHTML = '';
        return;
    }

    for (var i = 0; i <inputs.length; i++) {
        args.push(inputs[i].value);
    }

    res.innerHTML = fn.apply(null, args);
};




// task1
function sumNumbers(a, b) {
    if ( !(isNumeric(a) && isNumeric(b)) ) {
        return NaN;
    }
    a = +a;
    b = +b;
    return a+b;

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

// task2
function creditCalc(amount, rate, period) {
    rate = parseFloat(rate);
    period = period * 12;

    if (!isCorrectArgs(amount) || !isCorrectArgs(rate) || !isCorrectArgs(period)) {
        return 'Incorrect arguments!';
    }

    var month_rate = rate/100/12;
    var k = month_rate / (1 - Math.pow( (1 + month_rate), (-period) ));
    var monthPayment = amount * k;

    return Math.round(monthPayment * period  - amount);

    function isCorrectArgs(n) {
        return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
    }
}

// task3
function deduct(a, b) {
    if (!isNumeric(a) || !isNumeric(b)) {
        return 'Incorrect arguments';
    }
    a = +a;
    b = +b;
    return (a > b) ? (a - b) : (b-a);

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

//task4
function countAverage(a, b, c) {
    if (!isNumeric(a) || !isNumeric(b) || !isNumeric(c)) {
        return 'Incorrect value of arguments';
    }
    a = +a;
    b = +b;
    c = +c;
    var avarage = (a + b + c) / 3;
    return parseFloat(avarage.toFixed(2));


    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

// task5
function toSquare(a) {
    if ( isNaN(parseFloat(a)) || !isFinite(a) ) {
        while (true) {
            var number = prompt('Please enter valid number:', '');
            if (number === null) {
                return 'You have not entered a valid number';
            }
            if (!isNaN(parseFloat(number)) && isFinite(number)) {
                a = +number;
                break;
            }
        }
    }

    return a*a;
}

// task6
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