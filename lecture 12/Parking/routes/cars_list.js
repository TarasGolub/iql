var express = require('express');
var router = express.Router();
var cars = require('./data/cars');

/* GET cars_list listing. */
router.get('/', function(req, res, next) {
    var table = "<table id='parking_table'> \n";
    table += "<tr>" +
        "<th class='number'>Номер</th>" +
        "<th class='brand'>Марка</th>" +
        "<th class='owner'>Владелец</th>" +
        "<th class='phone'>Телефон</th>" +
        "<th class='arrival'>Заезд</th>" +
        "<th class='exit'>Выезд</th>" +
        "<th class='th_for_btn'></th>" +
            "</tr>";

    for (var i = 0; i < cars.length; i++) {
        table += "<tr><td>" + cars[i].number + "</trtd>" +
            "<td>" + cars[i].brand + "</td>" +
            "<td>" + cars[i].owner + "</td>" +
            "<td>" + cars[i].phone + "</td>" +
            "<td>" + setDate(cars[i].arrival) + "</td>" +
            "<td>" + "</td>" +
            "<td>" + "</td></tr>" ;
    }
    table += "</table>";
    res.end(table);

    function setDate(date) {
        var min = date.getMinutes();
        min = min < 10 ? ('0' + min) : min;
        var day = date.getDate();
        day = day < 10 ? ('0' + day) : day;
        var month = date.getMonth() + 1;
        month = month < 10 ? ('0' + month) : '' + month;
        var year = date.getFullYear() + '';
        year = year.slice(2);
        return date.getHours() + ':' + min + '<br>' + day + '.' + month + '.' + year;
    }

});

module.exports = router;