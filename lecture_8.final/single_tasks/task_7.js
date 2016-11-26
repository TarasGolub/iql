/**
 * Задание 7
 * Выбрать из строки все подстроки,
 * заключенные в круглые или квадратные, или фигурные скобки.
 * Считать, что строка не содержит вложенных скобок.
 */

function task7(str) {
    var re = /\[[^\[\(\{})]+?]|\{[^\[\(\{\])]+?}|\([^\[\(\{}\]]+?\)/g;
    return str.match(re);
}

var str = "Hello [I am] test {Test string}. Java and (javaScript will be returned).";
console.log('\n', str, '\n', task7(str) );

var str = "[I am} not {correct] example. Will (return} noting";
console.log('\n', str, '\n', task7(str) );

var str = "[And what about [including] ]";
console.log('\n', str, '\n', task7(str) );

var str = "[And what about {including in another (one)} ]";
console.log('\n', str, '\n', task7(str) );
