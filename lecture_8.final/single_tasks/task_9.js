/**
 * Задание 9
 * Есть матрица, записанная в виде строки.
 * Точка с запятой используется как разделитель строк матрицы,
 * а запятая – как разделитель элементов в строке.
 * var matrix = "a,vb,c,d;1,2,3,4;444444444444,4,3,2";
 * Нужно написать подпрограмму, которая проверит,
 * что все строки матрицы содержат одинаковое количество элементов.
 * Количество строк и количество столбцов может быть любым натуральным числом.
 */

// function task_9(matrix) {
//     var rows = matrix.split(/\s*;\s*/);
//     var cellsInRow = 0;
//     for (var i = 0; i < rows.length; i++) {
//         var cells = rows[i].split(/\s*,\s*/);
//         if (cellsInRow === 0) {
//             cellsInRow = cells.length;
//             continue;
//         }
//         if (cells.length != cellsInRow) {
//             return false;
//         }
//     }
//     return true;
// }
function task_9(matrix) {
    var re = /\w+(?:\s*,\s*\w+)+(?:(?:\s*;\s*)|$)+?/g;
    var rowLength;
    while (res = re.exec(matrix)) {
        if (!rowLength) rowLength = res[0].split(/\s*,\s*/).length;
        if (res[0].split(',').length != rowLength) return false;
    }
    return true;
}

var matrix = "a,vb,c,d;1,2,3,4;444444444444,4,3,2";
console.log('\n', matrix, '\n', task_9(matrix));

var matrix = "a, vb, c, d  ;  1 ,2 ,3 ,4  ; 444444444444 , 4 , 3 , 2";
console.log('\n', matrix, '\n', task_9(matrix));

var matrix = "a,vb,c,d; 1,2,3 ,4;444444444444,  4,3,2;12,4";
console.log('\n', matrix, '\n', task_9(matrix));