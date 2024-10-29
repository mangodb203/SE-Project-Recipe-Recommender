import React, { useState } from 'react';
import axios from 'axios';
import {
  Slider,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton
} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { initialState } from "../reducer";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RecipeCard from './RecipeCard';

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
    ingredients: [],
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = JSON.parse(initialState.user)._id;

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
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Recipe Recommendations
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {['calories', 'fat', 'carbohydrates', 'protein', 'cholesterol', 'sodium', 'fiber'].map((key) => (
            <Grid item xs={12} key={key}>
              <Typography gutterBottom>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
              <Slider
                value={formData[key]}
                onChange={handleSliderChange(key)}
                aria-labelledby={`${key}-slider`}
                valueLabelDisplay="auto"
                min={0}
                max={key === 'calories' ? 1000 : 100}
                step={1}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Select
              multiple
              value={formData.ingredients}
              onChange={handleMultiSelectChange}
              renderValue={(selected) => selected.join(', ')}
              fullWidth
            >
              {['chicken', 'beef', 'pork', 'fish', 'vegetables', 'pasta', 'rice'].map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={formData.ingredients.indexOf(name) > -1} />
                  <Typography>{name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Get Recommendations'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container spacing={2} style={{ marginTop: '2rem' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Nutritional Breakdown
          </Typography>
          <Pie data={nutritionData} />
        </Grid>
        <Grid item xs={12} md={6}>
          {recommendations.length > 0 && (
            <div>
              <Typography variant="h5" gutterBottom>
                Recommendations
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map((recipe, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <RecipeCard recipe={recipe} onBookmark={bookmarkRecipe} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </Grid>
      </Grid>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Recipe;