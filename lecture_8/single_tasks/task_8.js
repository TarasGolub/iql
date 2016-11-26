function task8(strInp, strExc) {
    strExc = strExc.replace(/(.)(?=.*?\1)/g, ''); //оставляет уникальные значения в строке
    strExc = '[' + strExc.replace(/([[\]{}()\\/+*?^.,;:!-])/g, '\\$1') + ']'; // экранирует спецсимволы
    var regExp = new RegExp(strExc, 'g'); // создает РВ
    return strInp.replace(regExp, '');
}

var str1 = "[A-Z]{}()\\/+*?^.,;:!abcde абвгд 12345";
var str2 = "[A-Za]{}(aaa)\\/+*?^....,;:!";

console.log('result1: ', task8(str1, str2) );
