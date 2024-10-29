// routes/bookmarkRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Food = require('../models/Food');
// Bookmark a recipe
router.post('/bookmark', async (req, res) => {
    try {
        const { userId, recipe } = req.body;

        // Check if the recipe already exists
        let existingRecipe = await Food.findOne({ recipe_name: recipe.recipe_name });

        if (!existingRecipe) {
            // If the recipe doesn't exist, create a new one
            existingRecipe = new Food(recipe);
            await existingRecipe.save();
        }
        // Add the recipe to the user's bookmarks
        const user = await User.findById(userId);
        if (!user.bookmarks.includes(existingRecipe._id)) {
            user.bookmarks.push(existingRecipe._id);
            await user.save();
        }
        res.status(200).json({ message: 'Recipe bookmarked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error bookmarking recipe', error: error.message });
    }
});
// Get all bookmarks for a user
router.get('/bookmarks/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('bookmarks');
        res.status(200).json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookmarks', error: error.message });
    }
});
// Remove a bookmark
router.delete('/bookmark', async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        const user = await User.findById(userId);
        console.log(user, recipeId);
        user.bookmarks = user.bookmarks.filter(bookmark => bookmark.toString() !== recipeId);
        await user.save();
        res.status(200).json({ message: 'Bookmark removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing bookmark', error: error.message });
    }
});
module.exports = router;