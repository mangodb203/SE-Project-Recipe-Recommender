// models/Food.js
const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
    recipe_name: String,
    image_url: String,
    ingredients_list: [String]
});
module.exports = mongoose.model('Food', FoodSchema);