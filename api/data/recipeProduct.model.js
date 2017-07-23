var mongoose = require('mongoose');

var recipeProductSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productWeight: Number
}, {toJSON: {virtuals: true}});

recipeProductSchema.virtual('productPrice').get(function() {
    return parseFloat(this.product.price * this.productWeight / this.product.weight).toFixed(2);
});

mongoose.model('RecipeProduct', recipeProductSchema);