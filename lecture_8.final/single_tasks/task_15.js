/**
 * Есть многострочный текст. Каждая строка является JS выражением.
 * Есть корректные выражения, которые могут быть вычислены. Есть выражения с ошибками.
 * var text =
 * “3+2\n” +
 * “33-11*2\n” +
 * “Math.sqrt(4)+1\n” +
 * “33 aaa 44 bbb\n” +
 * “6 / 2”;
 * Нужно заменить в этом многострочном тексте каждую строку ее вычисленным значением или словом “ERROR”,
 * если интерпретатор JS не может его вычислить.
 */

function task_15(str) {
    var re =/^(.+)$/gim;
    return str.replace(re, function (st, p) {
       try {
           return eval(p);
       } catch (e) {
           return 'ERROR';
       }
    });
}

var text =
"3+2\n" +
"33-11*2\n" +
"Math.sqrt(4)+1\n" +
"33 aaa 44 bbb\n" +
"6 / 2";
// console.log('\n', text);
console.log('\n', text, '\n\n', task_15(text));
