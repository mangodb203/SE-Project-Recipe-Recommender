const Recipe = require("../models/Recipe");
const Recommendation = require("../models/Recommendation");
const fetch = require("node-fetch");
const axios = require("axios");

exports.getRecommendation = async (req, res) => {
 try {
    // Extract data from request body
    const {
      calories,
      fat,
      carbohydrates,
      protein,
      cholesterol,
      sodium,
      fiber,
      ingredients
    } = req.body;

    // Validate input
    if (!calories || !fat || !carbohydrates || !protein || !cholesterol || !sodium || !fiber || !ingredients) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Prepare data for Flask API
    const recipeData = {
      calories: parseFloat(calories),
      fat: parseFloat(fat),
      carbohydrates: parseFloat(carbohydrates),
      protein: parseFloat(protein),
      cholesterol: parseFloat(cholesterol),
      sodium: parseFloat(sodium),
      fiber: parseFloat(fiber),
      ingredients
    };

    // Make a POST request to the Flask API
    const response = await axios.post('http://localhost:8000/recommend', recipeData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the request was successful
    if (response.data.success) {
      // Send the recommendations back to the client
      res.json({
        success: true,
        recommendations: response.data.recommendations
      });
    } else {
      // If the Flask API returns an error
      res.status(400).json({
        success: false,
        error: response.data.error
      });
    }
  } catch (error) {
    console.error('Error calling Flask API:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred while fetching recommendations' 
    });
  }
};
