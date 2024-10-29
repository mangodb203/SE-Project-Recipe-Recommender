import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
function RecipeCard({ recipe, onBookmark }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        onBookmark(recipe);
    };
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={recipe.image_url}
                alt={recipe.recipe_name}
            />
            <CardContent sx={{ position: 'relative' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {recipe.recipe_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ingredients: {recipe.ingredients_list}
                </Typography>
                <IconButton
                    aria-label="bookmark"
                    onClick={handleBookmark}
                    sx={{ position: 'absolute', top: 8, right: 8, color: 'black' }}
                >
                    {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </CardContent>
        </Card>
    );
}
export default RecipeCard;