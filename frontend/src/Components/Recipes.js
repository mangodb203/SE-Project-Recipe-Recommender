import React, { useState } from 'react';
import axios from 'axios';
import {
  Slider,
  Button,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Checkbox,
  Box,
  Paper,

} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { initialState } from "../reducer";
import RecipeCard from './RecipeCard';
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function Recipe() {
  const [formData, setFormData] = useState({
    calories: 500,
    fat: 20,
    carbohydrates: 50,
    protein: 30,
    cholesterol: 100,
    sodium: 500,
    fiber: 10,
    ingredients: ['chicken'],
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const jsonUser = typeof(initialState.user)=='string' ? JSON.parse(initialState.user) : initialState.user;

  const userId = jsonUser._id;
  const navigate = useNavigate();

  const handleSliderChange = (name) => (event, newValue) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handleMultiSelectChange = (event) => {
    setFormData({ ...formData, ingredients: event.target.value });
  };

  const bookmarkRecipe = async (recipe) => {
    try {
      await axios.post('http://localhost:5000/api/bookmark', { userId, recipe });
      // Update UI or state to reflect the new bookmark
    } catch (error) {
      console.error('Error bookmarking recipe:', error);
    }
  };

  const undoBookmark = async (recipe) => {
    try {
      await axios.delete('http://localhost:5000/api/bookmark', { data: { userId, recipeId: recipe._id } });
      // Update UI or state to reflect the removed bookmark
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.ingredients.length === 0) {
      setError('Please select at least one ingredient.');
      setLoading(false);
      return;
    }


    try {
      const response = await axios.post('http://localhost:5000/recommend', {
        calories: formData.calories,
        fat: formData.fat,
        carbohydrates: formData.carbohydrates,
        protein: formData.protein,
        cholesterol: formData.cholesterol,
        sodium: formData.sodium,
        fiber: formData.fiber,
        ingredients: formData.ingredients.join(','), // Join ingredients into a comma-separated string
      });

      if (response.data.success) {
        setRecommendations(response.data.recommendations);
      } else {
        setError(response.data.error || 'Failed to fetch recommendations.');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nutritionData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [formData.protein, formData.carbohydrates, formData.fat],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 4, mb: 4 }}>
        Recipe Recommendations
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>Nutritional Preferences</Typography>
              {['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber'].map((key) => (
                <Box key={key} sx={{ mb: 2 }}>
                  <Typography gutterBottom>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                  <Slider
                    value={formData[key]}
                    data-testid={`${key}-slider`}
                    onChange={handleSliderChange(key)}
                    aria-labelledby={`${key}-slider`}
                    valueLabelDisplay="auto"
                    min={0}
                    max={key === 'calories' ? 1000 : 100}
                    step={1}
                  />
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>Ingredients</Typography>
              <Select
                multiple
                value={formData.ingredients}
                onChange={handleMultiSelectChange}
                renderValue={(selected) => selected.join(', ')}
                fullWidth
                sx={{ mb: 2 }}
              >
                {['chicken', 'beef', 'pork', 'fish', 'vegetables', 'pasta', 'rice'].map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox data-testid={`${name}-checkbox`}
                     checked={formData.ingredients.indexOf(name) > -1} />
                    <Typography>{name}</Typography>
                  </MenuItem>
                ))}
              </Select>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                size="large"
                sx={{ mt: 2 }}
                data-testid="submit-button"
              >
                {loading ? <CircularProgress size={24} /> : 'Get Recommendations'}
              </Button>
              <Typography variant="h6" gutterBottom align="center" sx={{ mt: 3 }}>
                Nutritional Breakdown
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie data={nutritionData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {recommendations.length > 0 && (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center">Results</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom align="center">
                Recommended Recipes
              </Typography>
              <Grid container spacing={4}>
                {recommendations.map((recipe, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <RecipeCard recipe={recipe} onBookmark={bookmarkRecipe} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        onClick={() => navigate('/bookmarks')}
      >
        View your bookmarks
      </Button>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Recipe;