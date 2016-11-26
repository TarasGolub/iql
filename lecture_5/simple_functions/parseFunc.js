/**
 * Created by taraska on 10/12/2016.
 */
var str = 'function sum(a,b) {return a+b;}';
var str1 = 'function sum() {return 7;}';
var str2 = 'function () {return 10;}';

function parseFunc(str) {
    var args = str.match(/\((.*?)\)/)[1];
    console.log(args);
    var toDo = str.match(/{(.*)}/)[1];
    console.log(toDo);
    return new Function(args, toDo);
}

var fn = parseFunc(str);
console.log(fn(10,40));

var fn1 = parseFunc(str1);
console.log(fn1());

var fn2 = parseFunc(str2);
console.log(fn2());
