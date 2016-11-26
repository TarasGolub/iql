/**
 * Created by taraska on 10/11/2016.
 */
function changeMoney(rate) {
    var exchangeRate = rate;
    return {
        setRate: function (newRate) {
            exchangeRate = newRate;
        },
        getRate: function () {
            return exchangeRate;
        },
        change: function (amount) {
            return amount * exchangeRate;
        }
    }
}

var x1 = changeMoney(8);
var x2 = changeMoney(25);
console.log('x1', x1.change(100));
console.log('x2', x2.change(100));

x2.setRate(20);
console.log('x1', x1.change(100));
console.log('x2', x2.change(100));
console.log('x1', x1.getRate());
console.log('x2', x2.getRate());