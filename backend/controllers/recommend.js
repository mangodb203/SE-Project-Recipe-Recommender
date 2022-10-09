const Recipe = require("../models/Recipe");
const Recommendation = require("../models/Recommendation");
const fetch = require("node-fetch");

exports.getRecommendation = async (req, res) => {
  const { recipeID } = req.params;

  //Try finding in cache first
  try {
    const recommendations = await Recommendation.findOne({
      recipe: recipeID,
    }).populate("recipe recommendations");

    if (recommendations) {
      return res.send(recommendations);
    }
  } catch (err) {
    console.log(err);
  }

  //If not in cache, then request from AI service
  try {
    const recipe = await Recipe.findOne({ _id: recipeID });

    if (!recipe) {
      return res.status(400).send({ error: "No recipe found" });
    }

    const res = await fetch(`${process.env.AI_URL}/recipe/${recipe.name}`);
    const recommendations = res.json();

    const recommendationsWithIDs = await Promise.all(
      recommendations.map(async (recommendation) => {
        const recipeFound = await Recipe.findOne({ name: recommendation });
        return recipeFound?._id.toString();
      })
    );

    const recommendationsCache = new Recommendation({
      recipe: recipeID,
      recommendations: recommendationsWithIDs,
    });

    await recommendationsCache.save();

    return res.send(recommendationsCache);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: "Check logs for error" });
  }
};
