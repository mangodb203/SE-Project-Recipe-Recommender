import salad from '../imgs/salad.jpg'
import chopsuey from '../imgs/chopsuey.jpg'
import burger from '../imgs/burger.jpg'
import pizza from '../imgs/pizza.jpg'
import sushi from '../imgs/sushi.jpg'
import brownies from '../imgs/brownies.jpg'
import mocktail from '../imgs/mocktail.jpg'
import butterChicken from '../imgs/butterchicken.jpg'
import rice from '../imgs/rice.jpg'
import soup from '../imgs/soup.jpg'
import curry from '../imgs/curry.jpg'
import cookies from '../imgs/cookies.jpg'
import './cards.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Recipes = () => {
    const navigate = useNavigate();
    const arrayChunk = (arr, n) => {
        console.log("array: ", arr)
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    };
    const recipes = [
        { name: "Chopsuey", image: chopsuey, code: "8559" },
        { name: "Grilled Burger", image: burger, code: "322548" },
        { name: "Brownies", image: brownies, code: "371961" },
        { name: "Salmon Sushi", image: sushi, code: "337652" },
        { name: "Mocktail", image: mocktail, code: "460104" },
        { name: "Pizza", image: pizza, code: "123710" },
        { name: "Chicken Salad", image: salad, code: "345123" },
        { name: "Butter Chicken", image: butterChicken, code: "227557" },
        { name: "Chocolate Chip Cookies", image: cookies, code: "10117" },
        { name: "Thai Curry", image: curry, code: "81916" },
        { name: "Chinese Fried Rice", image: rice, code: "24774" },
        { name: "Vegetable Soup", image: soup, code: "103153" }];
    
    const getRecipeRecommendations = (recipe) =>{
        console.log(recipe)
        //API call
        navigate("/recommendations")
    }
    return (
        <div>
            <div style={{ margin: "50px auto", flexDirection: "column", overflow: "hidden" }} >
                <Typography variant="h3" component="h5" style={{ textAlign: "center" }}>
                    Which dish do you like?
                </Typography>
                <Typography variant="h6" component="h6" style={{ textAlign: "center", color: "black", margin: "3px 310px" }}>
                    Choose a recipe and we will give 10 recipe recommendations based on your choice.
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {arrayChunk(...Array(recipes), 12).map((row, i) => (
                        <div key={i} className="row mx-auto" style={{ justifyContent: "center" }}>
                            {
                                row.map((col, i) => (
                                    <Card onClick={() => getRecipeRecommendations(recipes[i].code)} className="card" key={i} sx={{ width: "25%", maxHeight: 225 }} style={{ float: "left", margin: "20px 4%", fontSize: "12px" }} >
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={recipes[i].image}
                                            alt={recipes[i].name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" style={{ textAlign: "center", fontSize: "14px" }}>
                                                {recipes[i].name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Recipes;