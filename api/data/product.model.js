var mongoose = require('mongoose');

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
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	deletedAt: {
		type: Date
	}
})

mongoose.model('Product', productSchema);