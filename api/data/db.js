var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/bakecake';
mongoose.Promise = global.Promise;

mongoose.connect(dburl, { useMongoClient: true });

mongoose.connection
	.on('connected', function(){
		console.log('Mongoose connected to '+ dburl);
	})
	.on('disconnected', function(){
		console.log('Mongoose disconnected');
	})
	.on('error', function(err){
		console.log('Mongoose connection error: ' + err);
	});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGINT)');
		process.exit(0);
	});
});

process.on('SIGTERM', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGTERM)');
		process.exit(0);
	});
});

process.once('SIGUSR2', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination (SIGUSR2)');
		process.kill(process.pid,'SIGUSR2');
	});
});

// BRING IN SCHEMAS AND MODELS
require('./product.model.js');
require('./recipeProduct.model.js');
require('./recipe.model.js');