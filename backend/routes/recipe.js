const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe");
const router = express.Router();

router.post("/add", createRecipe);
router.get("/all", getAllRecipes);
router.get("/:recipeID", getRecipe);
router.patch("/:recipeID", updateRecipe);
router.delete("/:recipeID", deleteRecipe);

module.exports = router;
