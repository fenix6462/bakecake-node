var mongoose = require('mongoose');
var Product = mongoose.model('Product').schema;
var utc = new Date();
utc.setHours( utc.getHours() + 2);

var recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	price: Number,
	products: [{
		product: Product,
		weight: Number
	}],
	photos:[String],
	isDeleted: {
		type: Boolean,
		default: false
	},
	isPublished: {
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

mongoose.model('Recipe', recipeSchema);