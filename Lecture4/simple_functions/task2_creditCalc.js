/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция на вход получает сумму кредитаб годовую процентную ставку и количество лет.
 * Необходимо посчитать и вернуть сумму переплат.
 */

/**
 * За основу расчетов берем  классическую банковскую формулу расчета ежемесячного платежа по кредиту
 * при аннуитетной схеме:
 * К = i / [1 - (1+i)^-n] - рассчет коэфицента ежемесячного платежа
 */

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

console.log('Your overpayment: ', creditCalc(100000, 15, 2));
console.log('Your overpayment: ', creditCalc(200000, '15.5%', 2));
console.log('Your overpayment: ', creditCalc('100000', 15.5, 2));
console.log('Your overpayment: ', creditCalc('100000', 15, '1.5'));

console.log('Amount = 0:', creditCalc(0, 15, 2));
console.log('Rate = 0:', creditCalc(200000, 0, 2));
console.log('Period = 0:', creditCalc('100000', 15, 0));
console.log('Not a number args:', creditCalc('dfdf', 15, '2'));
console.log('Not a number args:', creditCalc(null, 15, '2'));
console.log('Not a number args:', creditCalc(NaN, 15, '2'));
console.log('Not a number args:', creditCalc(10000, -15, 'dfd'));