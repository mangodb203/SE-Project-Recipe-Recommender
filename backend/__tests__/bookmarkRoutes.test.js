const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bookmarkRoutes = require('../routes/bookmarkRoutes');
const User = require('../models/User');
const Food = require('../models/Food');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', bookmarkRoutes);

describe('Bookmark Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Food.deleteMany({});
  });

  test('POST /api/bookmark should bookmark a recipe', async () => {
    const user = new User({ email: 'test@example.com', password: 'password123' });
    await user.save();

    const recipe = { recipe_name: 'Test Recipe', image_url: 'http://example.com/image.jpg', ingredients_list: ['ingredient1', 'ingredient2'] };

    const response = await request(app)
      .post('/api/bookmark')
      .send({ userId: user._id, recipe });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Recipe bookmarked successfully');

    const updatedUser = await User.findById(user._id).populate('bookmarks');
    expect(updatedUser.bookmarks.length).toBe(1);
    expect(updatedUser.bookmarks[0].recipe_name).toBe('Test Recipe');
  });

  test('GET /api/bookmarks/:userId should return user bookmarks', async () => {
    const user = new User({ email: 'test@example.com', password: 'password123' });
    const food = new Food({ recipe_name: 'Test Recipe', image_url: 'http://example.com/image.jpg', ingredients_list: ['ingredient1', 'ingredient2'] });
    await food.save();
    user.bookmarks.push(food._id);
    await user.save();

    const response = await request(app).get(`/api/bookmarks/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].recipe_name).toBe('Test Recipe');
  });

  test('DELETE /api/bookmark should remove a bookmark', async () => {
    const user = new User({ email: 'test@example.com', password: 'password123' });
    const food = new Food({ recipe_name: 'Test Recipe', image_url: 'http://example.com/image.jpg', ingredients_list: ['ingredient1', 'ingredient2'] });
    await food.save();
    user.bookmarks.push(food._id);
    await user.save();

    const response = await request(app)
      .delete('/api/bookmark')
      .send({ userId: user._id, recipeId: food._id });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bookmark removed successfully');

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.bookmarks.length).toBe(0);
  });
});