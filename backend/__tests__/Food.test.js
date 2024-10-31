const mongoose = require('mongoose');
const Food = require('../models/Food');
require('dotenv').config();

describe('Food Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save food successfully', async () => {
    const foodData = {
      recipe_name: 'Test Recipe',
      image_url: 'http://example.com/image.jpg',
      ingredients_list: ['ingredient1', 'ingredient2']
    };
    const validFood = new Food(foodData);
    const savedFood = await validFood.save();
    
    expect(savedFood._id).toBeDefined();
    expect(savedFood.recipe_name).toBe(foodData.recipe_name);
    expect(savedFood.image_url).toBe(foodData.image_url);
    expect(savedFood.ingredients_list).toEqual(expect.arrayContaining(foodData.ingredients_list));
  });

  it('should retrieve food successfully', async () => {
    const foodData = {
      recipe_name: 'Retrieve Test Recipe',
      image_url: 'http://example.com/retrieve.jpg',
      ingredients_list: ['ingredient3', 'ingredient4']
    };
    const food = new Food(foodData);
    const savedFood = await food.save();
    expect(savedFood).toBeDefined();
    expect(savedFood._id).toBeDefined();

    const retrievedFood = await Food.findById(savedFood._id);
    expect(retrievedFood).toBeDefined();
    expect(retrievedFood.recipe_name).toBe(foodData.recipe_name);
    expect(retrievedFood.image_url).toBe(foodData.image_url);
    expect(retrievedFood.ingredients_list).toEqual(expect.arrayContaining(foodData.ingredients_list));
  });
});