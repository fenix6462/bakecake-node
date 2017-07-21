var mysql = require('mysql');
var connection = require('./dbconnection.js');

connection.connect(function(err){
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.error('Connected to database');
});

connection.query("CREATE TABLE IF NOT EXISTS products("
		+ "id INT NOT NULL AUTO_INCREMENT," 
		+ "PRIMARY KEY(id),"
		+ "name VARCHAR(255),"
		+ "weight INT(10),"
		+ "price FLOAT,"
		+ "isDeleted TINYINT(1),"
		+ "updatedAt TIMESTAMP,"
		+ "createdAt TIMESTAMP,"
		+ "deletedAt TIMESTAMP"
		+ ")", function(err){
			if(err){
				console.error("Error creating table" + err);
			}
		}
	)

// connection.end(function(){
// 	console.log("Connection ended");
// });