var express = require('express');
var router = express.Router();
var languages = require('./data/lang');

/* GET lang_list listing. */
router.get('/', function(req, res, next) {
    var options = "<option value=''>&mdash; choose a language &mdash;</option> \n";
    for (var i = 0; i < languages.length; i++) {
        options += "<option value='" + languages[i].id + "'>" + languages[i].name + "</option>\n";
    }
    res.end(options);
});

module.exports = router;
