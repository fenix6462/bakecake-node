var express = require('express');
var app = express();
var path = require('path');

app.set('port', 3001);

app.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// app.get('/json', function(req, res){
// 	console.log("GET the json");
// 	res
// 		.status(200)
// 		.json({json:'asd'});
// })

// app.get('/file', function(req, res){
// 	console.log("GET the file");
// 	res
// 		.status(200)
// 		.sendFile(path.join(__dirname, 'app.js'));
// })

var server = app.listen(app.get('port'), function(){
	var port = server.address().port;
    console.log('Express server listening on port ' + port);
});