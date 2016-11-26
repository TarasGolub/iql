$(function () {
    /**
     * TASK 15
     */
    lupa('img');
    function lupa(className) {
        var divImg = $('.' + className); //div with small image
        var smallImg = divImg.find('img'); // small image

        // Creates new div, sets its width and height equal width and height of small image
        var newDiv = $('<div class="img">')
            .width(smallImg.width())
            .height(smallImg.height())
            .append('<img src="images/img1.jpg" alt="sneakers">');

        var largeImg = newDiv.find('img'); // large image
        divImg.after(newDiv); //puts new div with large image after div with small picture

        var koefX = ( largeImg.width() / smallImg.width() ).toFixed(2);
        var koefY = ( largeImg.height() / smallImg.height() ).toFixed(2);

        // Creates pointer - area on the small picture will be shown
        var pointerWidth = Math.round(smallImg.width() / koefX);
        var pointerHeight = Math.round(smallImg.height() / koefY);
        var divPointer = $('<div class="pointer">').width(pointerWidth).height(pointerHeight);

        // hides div with large image and pointer
        divImg.append(divPointer.hide());
        newDiv.hide();


        divImg.hover(
            function () {
                $(this).css('cursor', 'zoom-in');
                divImg.mousemove(function (event) {
                    // calculates position of the pointer
                    var top = event.pageY;
                    var left = event.pageX;
                    var divPos = divImg.position();
                    var pointerTop = top - divPos.top - divPointer.height() / 2;
                    var pointerLeft = left - divPos.left - divPointer.width() / 2;
                    if (pointerTop <= 0) {
                        pointerTop = 0;
                    }
                    if (pointerTop >= divImg.height() - divPointer.height()) {
                        pointerTop = divImg.height() - divPointer.height();
                    }
                    if (pointerLeft <= 0) {
                        pointerLeft = 0;
                    }
                    if (pointerLeft >= divImg.width() - divPointer.width()) {
                        pointerLeft = divImg.width() - divPointer.width();
                    }
                    divPointer.css({
                        top: pointerTop,
                        left: pointerLeft
                    });
                    // position of large image
                    largeImg.css({
                        top: -pointerTop * koefY,
                        left: -pointerLeft * koefX
                    })
                });
            },
            function () {
                divImg.unbind('mousemove');
            }
        );

        divImg.click(function () {
            newDiv.toggle();
            divPointer.toggle();
        });
    }
    /**
     * END OF TASK 15
     */

    /**
     * TASK 14
     */
    $('#btn_task_14').click(function (e) {
        e.preventDefault();
        // Gets number of selects
        var n = $('#numberOfSelects').val();
        $('#numberOfSelects').val('');
        if (n <= 0 || n % 1) {
            while(true) {
                n = +prompt('N should be positive integer \nEnter n: ', '');
                if (n > 0 && !(n % 1)) break;
            }
        }

        // creates blocks for selects and output string
        if ($('.select_block').length !== 0) {
            var reset = prompt('Select boxes already exist. Do you Want new?\n' +
                'Please press cancel if NO','YES');
            if (reset) {
                $('.select_block').remove();
                $('.result_block').remove();
            } else return;
        }
        var selBlock= $('<div class="select_block">');
        var resBlock= $('<div class="result_block">');
        $(this).parent().after(resBlock).after(selBlock);

        // Creates selects and sets 0 as a default selected value
        for (var i = 0; i < n; i++) {
            var select = $('<select>').attr('name', 'mySelect' + i);
            for (var j = 0; j < 10; j++) {
                var opt = $('<option>').val(j).text(j);
                select.append(opt);
            }
            $('option:first', select).prop('selected', true);
            selBlock.append(select);

            // registers change event handler for each select
            select.change(function () {
                // Outputs string with result when one of the selects is changed
                resBlock.html(countSelected());
            })
        }
        // Outputs string with result when all selects are created
        resBlock.html(countSelected());

        function countSelected() {
            var selects = $('select', selBlock);
            var res = {};
            selects.each(function () {
                var opt = $('option', $(this));
                opt.each(function () {
                    var $this = $(this);
                    if ( !$this.prop('selected') ) return;
                    var val = $this.val();
                    if (val in res) {
                        res[val]++;
                    } else {
                        res[val] = 1;
                    }
                });
            });
            var ul = $('<ul>');
            for(var key in res) {
                ul.append( $('<li>').text('Число: ' + key + ' выбрано ' + res[key] + 'раз.') );
            }
            return ul;
        }
    });
    /**
     * END OF TASK 14
     */

    /**
     * TASK 12
     */
    $('#btn_task_12').click(function (e) {
        e.preventDefault();
        // Gets matrix bit
        var n = $('#numMatrix').val();
        $('#numMatrix').val('');
        if (n <= 1 || n % 1) {
            while(true) {
                n = +prompt('N should be positive integer more then 1 \nEnter n: ', '');
                if (n > 1 && !(n % 1)) break;
            }
        }

        // blocks for matrix and result string with sum
        if ($('#tableBlock').length !== 0) {
            var reset = prompt('Table already exists. Do you want new?\nPlease, press cancel if NO','YES');
            if (reset) {
                $('#tableBlock').remove();
                $('.res_block').remove();
            } else return;
        }
        $(this).parent().after( $('<div class="res_block">') ).after('<div id="tableBlock">');

        // creates matrix and drow it
        var matrix = makeMatrix(n);
        $('#tableBlock').html(drawTable(matrix));

        function makeMatrix(n) {
            // prepares empty matrix NxN
            var matrix = [];
            for (var m = 0; m < n; m++) matrix[m] = [];

            var i = 0, j, k, p = n / 2;
            for (k = 1; k <= p; k++) {  // main loop
                for (j = k - 1; j < n - k + 1; j++) { // top, from left to right
                    matrix[k - 1][j] = ++i;
                }
                for (j = k; j < n - k + 1; j++) { // right, from top to bottom
                    matrix[j][n - k] = ++i;
                }
                for (j = n - k - 1; j >= k - 1; --j) { // bottom, from right to left
                    matrix[n - k][j] = ++i;
                }
                for (j = n - k - 1; j >= k; j--) { // left, from bottom to top
                    matrix[j][k - 1] = ++i;
                }
            }
            if (n % 2 == 1) {
                p = Math.floor(p);
                matrix[p][p] = n * n;
            }
            return matrix;
        }

        // the same algorithm as makeMatrix
        // reads values from matrix instead of writing
        function calcSum(matrix, stopI,stopJ) {
            var sum = 0;
            var n = matrix.length;
            var i = 0, j, k, p = n / 2;
            for (k = 1; k <= p; k++) {
                for (j = k - 1; j < n - k + 1; j++, i++) {
                    if (k-1 === stopI && j === stopJ ) return sum;
                    sum += matrix[k-1][j];
                }
                for (j = k; j < n - k + 1; j++, i++) {
                    if (j === stopI && n - k === stopJ ) return sum;
                    sum += matrix[j][n - k];
                }
                for (j = n - k - 1; j >= k - 1; --j, i++) {
                    if (n - k === stopI && j === stopJ ) return sum;
                    sum += matrix[n - k][j];
                }
                for (j = n - k - 1; j >= k; j--, i++) {
                    if (j === stopI && k - 1 === stopJ ) return sum;
                    sum += matrix[j][k - 1];
                }
            }
            if (n % 2 == 1) {
                p = Math.floor(p);
                if (p === stopI && p === stopJ ) return sum;
                sum += matrix[p][p];
            }
            return sum;
        }

        function drawTable(matrix) {
            var table = $('<table>');
            for (var i = 0; i < matrix.length; i++) {
                var row = $('<tr>');
                for (var j = 0; j < matrix.length; j++ ) {
                    var cell = $('<td>');
                    cell.text(matrix[i][j]).attr({'data-x':i, 'data-y':j});
                    row.append(cell);

                    cell.mouseenter(function () {
                        var x = $(this).data('x');
                        var y = $(this).data('y');
                        $('.res_block').html(calcSum(matrix, x, y));
                    }).mouseleave(function () {
                        $('.res_block').html('');
                    }).dblclick(function () {
                        var x = $(this).data('x');
                        var y = $(this).data('y');
                        if (matrix[x][y] > 0) {
                            --matrix[x][y];
                            $(this).text(matrix[x][y]);
                        } else {
                            $(this).css('color', 'red');
                        }
                    });
                }
                table.append(row)
            }
            return table;
        }
    });
    /**
     * END OF TASK 12
     */

    /**
     * TASK 10
     */
    task10();
    function task10() {
        // gets parameters, calculate sum and outputs it
        if (window.location.search.length !== 0) {
            var strParam = window.location.search.slice(1);
            var arrParam = strParam.split('&');
            var sum = 0;
            arrParam.forEach(function (item) {
                sum += +item.split('=')[1];
            });
            $('#btn_task_10').after($('<div class="res_block_10">').text('Сумма = ' + sum));
        }

        // gets number of inputs and creates them
        $('#btn_task_10').click(function (e) {
            e.preventDefault();
            var n = $('#inp_task_10').val();
            $('#inp_task_10').val('');
            if (n <= 0 || n % 1) {
                while(true) {
                    n = +prompt('N should be positive integer \nEnter n: ', '');
                    if (n > 0 && !(n % 1)) break;
                }
            }

            var form = $('#form_task_10');
            if ($('input[type=text]', form).length !== 0) {
                var reset = prompt('Text inputs already exist. Do you want new&\n' +
                    'Please press cancel if NO', 'YES');
                if (reset) {
                    $('input[type=text]', form).remove();
                } else return;
            }
            for (var i = 0; i < n; i++) {
                form.prepend($('<input type="text" name="inp' + i +
                    '" value="'+ Math.round(Math.random()*100 + 0.5 ) + '">'));
            }
        });

        // checks inputs values and outputs alert if some of them are not valid
        $('#form_task_10').submit(function (e) {
            var inputs = $('input[type=text]', $(this));
            if (!checkValues(inputs)){
                e.preventDefault();
            }

            function checkValues(items) {
                var sum = 0;
                if (items.length === 0){
                    alert('No Inputs in the Form');
                    return false;
                }
                var flag = true;
                items.each(function (i) {
                    var val = +$(this).val();
                    if (isNaN(val) ||
                        val -  Math.floor(val) !== 0 ||
                        val < 1) {
                        alert('Input '+ (i+1) + 'is incorrect!');
                        flag = false;
                        return false;
                    }
                    sum += val;
                });
                if (sum % 2 !== 0) {
                    alert('Sum is odd!');
                    return false;
                }
                if (!flag) return false;
                return sum
            }

        });

        // writes new random values
        $('input[type=reset]').click(function (e) {
            if ($('.res_block_10').length) $('.res_block_10').text('');
            var inputs = $('input[type=text]', $(this).parent());
            inputs.each(function () {
                e.preventDefault();
                $(this).val(Math.round(Math.random()*100 + 0.5 ));
            });
        });
    }
    /**
     * END OF TASK 10
     */

    /**
     * TASK 4
     */
        $('#btn_task_4').click(function (e) {
            // gets N and M
            e.preventDefault();
            var n = $('#inp_task_4_1').val();
            var m = $('#inp_task_4_2').val();
            $('#inp_task_4_1').val('');
            $('#inp_task_4_2').val('');
            if (n <= 0 || n % 1) {
                while(true) {
                    n = +prompt('N should be positive integer \nEnter n: ', '');
                    if (n > 0 && !(n % 1)) break;
                }
            }
            if (m <= 0 || m % 1) {
                while(true) {
                    m = +prompt('M should be positive integer \nEnter m: ', '');
                    if (m > 0 && !(m % 1)) break;
                }
            }

            // draws 2 tables
            if ( $('#main_table').length !== 0 ) {
                var reset = prompt('Tables already exist. Do you want new tables?\n' +
                    'Press cancel if you want to continue ','YES');
                if (reset) {
                    $('#main_table').remove();
                    $('#second_table').remove();
                } else {
                    return;
                }
            }
            $('#btn_task_4').parent().after(drawTable('second_table', n, m)).after(drawTable('main_table', n, m));

            // onclick gets index of raw and cell and changes both tables
            $('#main_table').click(function (e) {
                if (e.target.tagName !== 'TD') return;
                var target = $(e.target);
                var tdInd = target.index();
                var trInd = target.parent().index();
                xInc('#main_table', trInd, tdInd, 1);
                xInc('#second_table', trInd, tdInd, 1);
            });

            // on hover increases values in second table and decreases them after
            $('#main_table').find('td').hover(
                function () {
                    var tdInd = $(this).index();
                    var trInd = $(this).parent().index();
                    xInc('#second_table', trInd, tdInd, 1);
                },
                function () {
                    var tdInd = $(this).index();
                    var trInd = $(this).parent().index();
                    xInc('#second_table', trInd, tdInd, -1);
            });

            // changes values of row(trInd) and column(tdInd) of table(secector) on inc.
            function xInc(table, trInd, tdInd, inc) {
                table = $(table);
                var rows = table.find('tr');

                rows.each(function () {
                   if ($(this).index() === trInd) {
                       var cells = $(this).find('td');
                       cells.each(function () {
                           var val = +$(this).text() + inc;
                           $(this).html(val);
                       });
                   } else {
                       var cells = $(this).find('td');
                       cells.each(function () {
                           if ($(this).index() === tdInd) {
                               var val = +$(this).text() + inc;
                               $(this).html(val);
                           }
                       });
                   }
                });

            }

            // draws table N x M
            function drawTable(id, n, m) {
                var table = $('<table id="' + id + '">');
                for (var i = 0; i < n; i ++) {
                    var tr = $('<tr>');
                    for (var j = 0; j < m; j++) {
                        var td = $('<td>').text(0);
                        tr.append(td);
                    }
                    table.append(tr);
                }
                return table;
            }

        });
    /**
     * END OF TASK 4
     */
});