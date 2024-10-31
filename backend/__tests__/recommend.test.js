const axios = require('axios');
const { getRecommendation } = require('../controllers/recommend');

jest.mock('axios');

describe('getRecommendation', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        calories: '100',
        fat: '10',
        carbohydrates: '20',
        protein: '5',
        cholesterol: '15',
        sodium: '200',
        fiber: '3',
        ingredients: ['ingredient1', 'ingredient2']
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('should return recommendations when all inputs are valid', async () => {
    axios.post.mockResolvedValue({ data: { success: true, recommendations: ['recipe1', 'recipe2'] } });

    await getRecommendation(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      recommendations: ['recipe1', 'recipe2']
    });
  });

  test('should return error when inputs are missing', async () => {
    req.body = {};

    await getRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'All fields are required'
    });
  });

  test('should handle Flask API errors', async () => {
    axios.post.mockRejectedValue(new Error('API Error'));

    await getRecommendation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'An error occurred while fetching recommendations'
    });
  });
});