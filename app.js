require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/routes');

app.set('port', 5000);

app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());  

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/api', routes);

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
    console.log('Express server listening on port ' + port);
});