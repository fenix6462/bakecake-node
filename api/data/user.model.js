var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

mongoose.model('User', userSchema);