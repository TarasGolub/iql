/**
 * Created by taraska on 10/7/2016.
 */

/**
 * Функция получает на вход число и возвращает его квадрат.
 * Если передано не число, то она запрашивает правильное значение у пользователя.
 */

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

// console.log('toSquare(1): ', toSquare(1));
// console.log('toSquare("3"): ', toSquare('3'));
// console.log('toSquare("sa"): ', toSquare('sa'));