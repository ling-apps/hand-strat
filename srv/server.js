var express = require("express");
var appController = require('./controllers/app');

var app = express();

app.use('/public', express.static(__dirname + '/../public'));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("listening on  " + port)
});
