var express = require('express');
var router = express.Router();
var languages = require('./data/lang');

/* POST lang_details listing. */
router.post('/', function(req, res, next) {
    var lang = "";
    var langId = req.param('id');
    for (var i = 0; i < languages.length; i++) {
        if (languages[i].id == langId){
            //lang = languages[i];
            lang += "<div></div><div></div><label>Item name:</label>" + languages[i].name + "</div>";
            lang += "<div></div><label>Type:</label>" + languages[i].type + "</div>";
            lang += "<div></div><label>Born:</label>" + languages[i].born + "</div></div>";
            break;
        }
    }
    res.status(200).send(lang);
});

module.exports = router;
