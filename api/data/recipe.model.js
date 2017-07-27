var mongoose = require('mongoose');
var Product = mongoose.model('Product').schema;
var RecipeProduct = mongoose.model('RecipeProduct').schema;

var recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	price: Number,
	products: [RecipeProduct],
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
		type: Date
	},
	updatedAt: {
		type: Date
	},
	deletedAt: {
		type: Date
	},
	publishedAt: {
		type: Date
	}
}, {toJSON: {virtuals: true}})

recipeSchema.virtual('realPrice').get(function() {
	var price = 0;
	for(var i = 0; i < this.products.length; i++){
		price += this.products[i].productPrice;
	}
    return parseFloat(price).toFixed(2);
});


mongoose.model('Recipe', recipeSchema);