/**
 * Задание 13
 * Есть текст с множеством предложений. Каждое предложение в конце содержит одну или несколько точек,
 * вопросительных или восклицательных знаков. Для простоты будем считать, что внутри предложений эти
 * символы употребляться не могут.
 * var str = “A a a. Bbb b. Cccc! Ddd ddd… Eee!? Ffff fff ff!.. Gg ggg ggggg???”
 * Нужно получить два массива. Массив предложений и массив знаков препинания,
 * которыми заканчиваются эти предложения. В данном случае ответ будет такой
 * ["A a a",  "Bbb b", "Cccc", "Ddd ddd", "Eee", "Ffff fff ff", "Gg ggg ggggg"]
 * [".", ".", "!", "...", "!?", "!..", "???"]
 */

function task_13(str) {
    var re = /\s*(.+?)([.!?]+)/g;
    var sentence = [], punct = [];

    while (res = re.exec(str)) {
        sentence.push(res[1]);
        punct.push(res[2]);
    }
    return {sentence: sentence, punct: punct};
}
var str = "A a a. Bbb b. Cccc! Ddd ddd... Eee!? Ffff fff ff!.. Gg ggg ggggg???";
console.log('\n', str, '\n', task_13(str));
