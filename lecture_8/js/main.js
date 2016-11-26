/**
 * Created by taraska on 10/8/2016.
 */
$(ready())


var page = document.getElementsByClassName('page_wrap')[0];

page.onclick = function (e) {
    var target = e.target;
    if (target.tagName != 'BUTTON') {
        return;
    }

    var form = target.parentNode;
    var inputs = form.getElementsByTagName('input');
    var res = form.nextElementSibling;
    var fn;
    var args = [];

    if (target.type === 'submit') {
        switch (target.id) {
            case 'btn_task1':
                fn = sumNumbers;
                break;
            case 'btn_task2':
                fn = creditCalc;
                break;
            case 'btn_task3':
                fn = deduct;
                break;
            case 'btn_task4':
                fn = countAverage;
                break;
            case 'btn_task5':
                fn = toSquare;
                break;
            case 'btn_task6':
                fn = checkINN;
                break;
        }
    } else if (target.type === 'reset') {
        res.innerHTML = '';
        return;
    }

    for (var i = 0; i <inputs.length; i++) {
        args.push(inputs[i].value);
    }

    res.innerHTML = fn.apply(null, args);
};

