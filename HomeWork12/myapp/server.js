var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
require('./app/route.js')(app);
app.listen(port);

console.log('Server runs!');