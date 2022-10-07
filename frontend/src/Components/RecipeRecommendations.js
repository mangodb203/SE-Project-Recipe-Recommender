import * as React from 'react';
import {Typography, CardContent, Card, Box} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const addToCart = () => {}

const RecipeRecommendations = () => {
    const data =  [{
        name: "creamy barley potatoes",
        minutes: 45,
        steps: ['brown ground beef in large pot', 'add chopped onions to ground beef when almost brown and sautee until wilted', 'add all other ingredients', 'add kidney beans if you like beans in your chili', 'cook in slow cooker on high for 2-3 hours or 6-8 hours on low', 'serve with cold clean lettuce and shredded cheese'],
        ingredients: ['ground beef', 'yellow onions', 'diced tomatoes', 'tomato paste', 'tomato soup', 'rotel tomatoes', 'kidney beans', 'water', 'chili powder', 'ground cumin', 'salt', 'lettuce', 'cheddar cheese'],
      timestamps: true,
    },{
        name: "Bacon potatoes",
        minutes: 45,
        steps: ['brown ground beef in large pot', 'add chopped onions to ground beef when almost brown and sautee until wilted', 'add all other ingredients', 'add kidney beans if you like beans in your chili', 'cook in slow cooker on high for 2-3 hours or 6-8 hours on low', 'serve with cold clean lettuce and shredded cheese'],
        ingredients: ['ground beef', 'yellow onions', 'diced tomatoes', 'tomato paste', 'tomato soup', 'rotel tomatoes', 'kidney beans', 'water', 'chili powder', 'ground cumin', 'salt', 'lettuce', 'cheddar cheese'],
      timestamps: true,
    }]

    return <React.Fragment>
       <Typography variant="h4" component="h5" style={{margin : "20px", textAlign: "center"}}>Here are our recommendations:</Typography>
       {    data.map((key) => {
            return (<div style = {{borderBottom: "2px solid", boxShadow:"0 -10px 10px -11px"}}>
            <Accordion key={key}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              > 
                <div>
                <Typography variant="h5" component="h5" style={{ textAlign: "center", color: "#022950" }}>
                {key.name.charAt(0).toUpperCase() + key.name.slice(1)}
                </Typography>
                </div>
                <div className='cart'>
                <Button className='cartButton' onClick={addToCart} > <AddShoppingCartIcon/> </Button>
                </div>
                
              </AccordionSummary>
              <AccordionDetails>
                    <Card className="card-style" >
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
              </AccordionDetails>
            </Accordion>
            </div>);
        })
    }
    </React.Fragment>
}

export default RecipeRecommendations;