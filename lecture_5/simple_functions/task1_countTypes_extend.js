/**
 * Created by taraska on 10/11/2016.
 */
/**
 * Created by taraska on 10/11/2016.
 */

/**
 * Создайте ф-ию которая получает на вход обьект или массив и возвращает сообщение с количеством
 * строковых/числовых/булевых/других значений в свойствах
 * {a:1, b:2, c:'3', d:true} =>
 */

function countTypes(obj) {
    if ( emptyObject(obj) ) {
        return 'Вы ввели пустой объект';
    }

    var res = {};
    var typeOfArg;

    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        typeOfArg = checkType(obj[key]);

        if (typeOfArg in res) {
            res[typeOfArg]++;
        } else {
            res[typeOfArg] = 1;
        }
    }

    return resToString(res);
    // return res;

    function emptyObject(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    }

    function checkType(arg) {
        var typeArg = typeof(arg);

        if (arg === null) {
            typeArg = 'null';
        } else if (typeArg === 'undefined') {
            typeArg = 'undefined';
        } else if (typeArg === 'object') {
            var toString = {}.toString;
            typeArg = toString.call(arg).slice(8,-1);
        }
        return typeArg;
    }

    function resToString(obj) {
        var resString = '';

        for (var key in obj) {
            if ( !obj.hasOwnProperty(key) ) continue;
            resString += key + ': ' + obj[key] + '\n';
        }
        return resString;
    }
}


console.log('Empty object:\n', countTypes({}) );

console.log('object:\n', countTypes( {
    a:1,
    b:2,
    c:"3",
    d:true,
    e: {},
    f: function () {},
    g: new Date,
    h: null,
    k: undefined,
    l: []
}) );

console.log('Array:\n', countTypes( [
    1,
    3,
    5,
    5,  //numbers: 4
    '4',
    '', //strings: 2
    true,
    false,
    false,
    false,  //bool: 4
    undefined,
    undefined,  // undefined: 2
    null,
    null,
    null, // null: 3
    {},
    {a: 1, b: 2},
    new Object(), //object: 3
    [],
    [1,3,5],
    new Array(),
    [233], // array: 4
    function (){},
    new Function(), //function 2
    new Date() // date: 1
]) );