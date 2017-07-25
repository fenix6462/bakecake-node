var mongoose = require('mongoose');
var utc = new Date();
utc.setHours( utc.getHours() + 2);

var productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: utc
	},
	updatedAt: {
		type: Date,
		default: utc
	},
	deletedAt: {
		type: Date
	}
})

mongoose.model('Product', productSchema);