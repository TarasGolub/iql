/**
 * Created by taraska on 10/11/2016.
 */

/**
 * Создайте ф-ию которая получает на вход обьект или массив и возвращает сообщение с количеством 
 * строковых/числовых/булевых/других значений в свойствах
 * {a:1, b:2, c:'3', d:true} =>
 */

function countTypes(obj) {
    var res = {};
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        var typeOfArg = typeof(obj[key]);
        if (typeOfArg === 'object' || typeOfArg === 'undefined' || typeOfArg === 'function') {
            typeOfArg = 'other';
        }

        if (typeOfArg in res) {
            res[typeOfArg]++;
        } else {
            res[typeOfArg] = 1;
        }
    }

    return res;
}

// console.log( countTypes({a:1, b:2, c:'3', d:true}) );

console.log( countTypes( [
    1,
    3,
    5,
    '4',
    '',
    true,
    false,
    undefined,
    null,
    {},
    [],
    function (){},
    new Date()
]) );