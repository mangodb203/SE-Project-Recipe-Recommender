import * as React from 'react';
import {Typography, CardContent, Card, Box} from '@mui/material';

const RecipeRecommendations = () => {
    const data =  [{
        name: "creamy barley potatoes",
        minutes: 45,
        steps: ['brown ground beef in large pot', 'add chopped onions to ground beef when almost brown and sautee until wilted', 'add all other ingredients', 'add kidney beans if you like beans in your chili', 'cook in slow cooker on high for 2-3 hours or 6-8 hours on low', 'serve with cold clean lettuce and shredded cheese'],
        ingredients: ['ground beef', 'yellow onions', 'diced tomatoes', 'tomato paste', 'tomato soup', 'rotel tomatoes', 'kidney beans', 'water', 'chili powder', 'ground cumin', 'salt', 'lettuce', 'cheddar cheese'],
      timestamps: true,
    },{
        name: "creamy barley potatoes",
        minutes: 45,
        steps: ['brown ground beef in large pot', 'add chopped onions to ground beef when almost brown and sautee until wilted', 'add all other ingredients', 'add kidney beans if you like beans in your chili', 'cook in slow cooker on high for 2-3 hours or 6-8 hours on low', 'serve with cold clean lettuce and shredded cheese'],
        ingredients: ['ground beef', 'yellow onions', 'diced tomatoes', 'tomato paste', 'tomato soup', 'rotel tomatoes', 'kidney beans', 'water', 'chili powder', 'ground cumin', 'salt', 'lettuce', 'cheddar cheese'],
      timestamps: true,
    }]
    return <React.Fragment>
    {
        data.map((key) => {
            return <Card className="card-style" key={key}>
            <Typography component="div" variant="h5" style={{margin:"10px 15px 2px 15px", color:"#022950"}}>
                    {key.name.charAt(0).toUpperCase() + key.name.slice(1)}
                    </Typography>
            <div sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:"50%", float:"left" }}>
                <CardContent sx={{ flex: '1 0 auto' }}> 
                <Typography component="div" variant="h6" >
                Cooking time
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    {key.minutes + " mins"}          
                    </Typography>   
                    <Typography component="div" variant="h6">
                    Ingredients
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    {key.ingredients.join(', ')}          
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width:"50%"}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                
                    <Typography component="div" variant="h6">
                        Recipe
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    {key.steps.map((data)=>{
                        return <li>{data}</li>
                    })}
                    </Typography>
                </CardContent>
            </Box>
            </div>
            
        </Card>
        })
    }
    </React.Fragment>
}

export default RecipeRecommendations;