import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initialState } from "../reducer";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = JSON.parse(initialState.user)._id;

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookmarks/${userId}`);
      setBookmarks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('Failed to fetch bookmarks. Please try again.');
      setLoading(false);
    }
  };

  const removeBookmark = async (recipeId) => {
    try {
      await axios.delete('http://localhost:5000/api/bookmark', { data: { userId, recipeId } });
      setBookmarks(bookmarks.filter(bookmark => bookmark._id !== recipeId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      setError('Failed to remove bookmark. Please try again.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Bookmarks
      </Typography>
      {bookmarks.length === 0 ? (
        <Typography>You haven't bookmarked any recipes yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookmarks.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image_url}
                  alt={recipe.recipe_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.recipe_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingredients: {recipe.ingredients_list.join(', ')}
                  </Typography>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => removeBookmark(recipe._id)}
                    color="secondary"
                  >
                    Remove Bookmark
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BookmarksPage;