/**
 * Created by taraska on 10/8/2016.
 */
$(document).ready(function() {

    $('.page_wrap').on("click", function (e) {
        var target = $(e.target);
        if ( !target.is('button') ) {
            return;
        }

        var form = target.parent('form');
        var inputs = form.find('.input');
        var res = form.next();
        var fn;
        var args = [];
        if (target.attr('type') === 'submit') {
            switch (target.attr('id')) {
                case 'btn_task1':
                    fn = task1;
                    break;
                case 'btn_task2':
                    fn = task15UI;
                    break;
                case 'btn_task3':
                    fn = task14;
                    break;
                case 'btn_task4':
                    fn = task11;
                    break;
                case 'btn_task5':
                    fn = task9;
                    break;
                case 'btn_task6':
                    fn = task8;
                    break;
            }
        } else if (target.attr('type') === 'reset') {
            res.html('');
            return;
        }

        for (var i = 0; i < inputs.length; i++) {
            args.push(inputs[i].value);
        }

        res.html( fn.apply(null, args) );
    });

    function task1(str) {
        if (isEmpty(str)) return 'Input string should be at least 8 chars';
        return str.slice(0, 3) + str.slice(3).replace(/\w(?=.{4,})/g, '*');
    }

    function task15UI(inp) {
        if (isEmpty(inp)) return 'Is empty';
        try {
            inp = inp.replace(/.*=\s*/, '');
            var str = eval(inp);
        } catch (e) {
            return 'Looks like invalid input string';
        }

        return (function task15(str) {
            var re = /^(.+)$/gim;
            return str.replace(re, function (st, p) {
                try {
                    return eval(p) + '<br>';
                } catch (e) {
                    return 'ERROR' + '<br>';
                }
            });
        })(str);
    }

    function task14(str) {
        if (isEmpty(str)) return 'Is Empty!';
        var re = /(\b\d+\b)/g;
        return str.replace(re, function (str, p) {
            return '0x' + (+p).toString(16).toUpperCase();
        });
    }

    function task11(str) {
        if (isEmpty(str) ) return 'Is empty';
        str = str.replace(/^(['"])(.*)\1\s*$/,'$2');
        if(/^(.)\1*$/.test(str)) return 'NOT OK';
        return /^(.)\1*(.)(\2|\1)*$/.test(str) ? 'OK' : 'NOT OK';
    }

    function task9(matrix) {
        if (isEmpty(matrix)) return 'Empty matrix';
        matrix = matrix.replace(/^.*=?(['"])(.*)\1;?\s*/, '$2');
        console.log(matrix);
        var re = /\w+(?:\s*,\s*\w+)+(?:(?:\s*;\s*)|$)+?/g;
        var rowLength;
        while (res = re.exec(matrix)) {
            if (!rowLength) rowLength = res[0].split(/\s*,\s*/).length;
            if (res[0].split(',').length != rowLength) return 'NO! НЕ все строки матрицы содержат одинаковое количество элементов ';
        }
        return 'YES! Похоже, это правильная матрица!';
    }

    function task8(strInp, strExc) {
        if (isEmpty(strInp)) return 'Input string is empty';
        if (isEmpty(strExc)) return strInp;
        strInp = strInp.replace(/^.*=?(['"])(.*)\1;?\s*/, '$2');
        strExc = strExc.replace(/^.*=?(['"])(.*)\1;?\s*/, '$2');
        
        strExc = strExc.replace(/(.)(?=.*?\1)/g, ''); //оставляет уникальные значения в строке
        strExc = '[' + strExc.replace(/([[\]{}()\\/+*?^.,;:!-])/g, '\\$1') + ']'; // экранирует спецсимволы
        var regExp = new RegExp(strExc, 'g'); // создает РВ
        return strInp.replace(regExp, '');
    }

    function isEmpty(str) {
        if (!str || str.length === 0) return true;
        return false;
    }
});

