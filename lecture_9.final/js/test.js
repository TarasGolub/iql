/**
 * Created by taraska on 10/21/2016.
 */
var str = '17:43\n' +
'21.10.16';

var re = /^(\d{1,2}):(\d{2})(?:.|\n)+(\d{2}).(\d{2}).(\d{2})$/;

var res = str.match(re);

console.log(res);