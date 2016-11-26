/**
 * Created by taraska on 10/11/2016.
 */
var exchangePoint = (function changeMoney() {
    var exchangeRate;
    return {
        setRate: function (newRate) {
            exchangeRate = newRate;
        },
        getRate: function () {
            if (!exchangeRate) {
                return "Сначала задайте курс";
            }
            return exchangeRate;
        },
        change: function (amount) {
            if (!exchangeRate) {
                return "Не задан курс!";
            }
            return amount * exchangeRate;
        }
    }
})();

var x1 = exchangePoint;
x1.setRate(8);
console.log('x1', x1.change(100));
console.log('x1', x1.change(20));
console.log('x1', x1.getRate());

x1.setRate(26);
console.log('x1', x1.change(100));
console.log('x1', x1.change(20));
console.log('x1', x1.getRate());