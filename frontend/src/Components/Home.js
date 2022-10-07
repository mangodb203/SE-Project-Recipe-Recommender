
import MainImage from '../imgs/MainImage.jpg';
import Italian from '../imgs/Italian.jpg'
import Chinese from '../imgs/chinese.jpg'
import American from '../imgs/American.jpg'
import Mexican from '../imgs/Mexican.jpg'
import Indian from '../imgs/Indian.jpg'
import Japanese from '../imgs/Japanese.jpg'
import Gluten from '../imgs/gluten.jpg'
import Dairy from '../imgs/dairy.jpg'
import Sugar from '../imgs/sugar.jpg'
import './cards.css';
import {
    Button
} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState, useRef } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
const Home = () => {
    const [italianSelected, setItalianSelected] = useState(false);
    const [americanSelected, setAmericanSelected] = useState(false);
    const [mexicanSelected, setMexicanSelected] = useState(false);
    const [indianSelected, setIndianSelected] = useState(false);
    const [chineseSelected, setChineseSelected] = useState(false);
    const [japaneseSelected, setJapaneseSelected] = useState(false);
    const [glutenSelected, setGlutenSelected] = useState(false);
    const [dairySelected, setDairySelected] = useState(false);
    const [sugarSelected, setSugarSelected] = useState(false);
    const [cuisines, setCuisine] = useState([]);
    const addCuisine = (cuisine) =>{
        if(cuisines.indexOf(cuisine) === -1){
            setCuisine(oldArray => [...oldArray, cuisine])
            
            }
        else {
            setCuisine(current => current.filter(element => {return element !== cuisine}))
        }
    }
    console.log(cuisines)
    const ref = useRef(null);
    const dietRef = useRef(null);
    const getStarted = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const goToDieterary = () => {
        dietRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <div>
            <div style={{
                backgroundImage: `url(${MainImage})`,
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "end",

            }}>
                <div style={{
                    fontSize: "35px",
                    width: "350px",
                    height: "250px",
                    color: "#022950",
                    textAlign: "center",
                    lineHeight: "1.2",
                    fontFamily: "Times New Roman, Times, serif",
                    marginBottom: "25px"
                }}>Turn your ingredients into delicious recipes</div>
                <Button className='button-style' onClick={getStarted}>Get Started</Button>

            </div>
            <div>
                <div ref={ref} style={{ margin: "50px 150px", flexDirection: "column", overflow: "hidden" }} >
                    <Typography variant="h3" component="h5" style={{ textAlign: "center" }}>
                        What Cuisines do you Like?
                    </Typography>
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + italianSelected} onClick={() => {setItalianSelected(!italianSelected);addCuisine("italian")}}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={Italian}
                            alt="Italian"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
                                Italian
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + chineseSelected} onClick={() => {setChineseSelected(!chineseSelected);addCuisine("chinese");}}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={Chinese}
                            alt="Chinese"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
                                Chinese
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + americanSelected} onClick={() => {setAmericanSelected(!americanSelected);addCuisine("american");}}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={American}
                            alt="American"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
                                American
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + mexicanSelected} onClick={() => {setMexicanSelected(!mexicanSelected);addCuisine("mexican");}}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={Mexican}
                            alt="Mexican"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
                                Mexican
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + indianSelected} onClick={() => {setIndianSelected(!indianSelected);addCuisine("indian");}}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={Indian}
                            alt="Indian"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
                                Indian
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + japaneseSelected} onClick={() => {setJapaneseSelected(!japaneseSelected);addCuisine("japanese");}}>
                        <CardMedia
                            component="img"
                            height="250"
                            image={Japanese}
                            alt="Japanese"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" style={{ textAlign: "center" }}>
                                Japanese
                            </Typography>
                        </CardContent>
                    </Card>
                    
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                }}><Button className="button-style" onClick={goToDieterary}>Next</Button>
                </div>
                <div style={{ margin: "120px auto" }} ref={dietRef}>


                    <Typography variant="h3" component="h5" style={{ textAlign: "center" }}>
                        Do you have any dietary restrictions?
                    </Typography>
                    <Stack direction="row" spacing={10} style={{ justifyContent: "center", marginTop: "50px" }}>
                        <Avatar className={"card " + glutenSelected} onClick={() => setGlutenSelected(!glutenSelected)} alt="Gluten Free" src={Gluten} sx={{ width: 250, height: 250 }} />
                        <Avatar className={"card " + dairySelected} onClick={() => setDairySelected(!dairySelected)} alt="Dairy Free" src={Dairy} sx={{ width: 250, height: 250 }} />
                        <Avatar className={"card " + sugarSelected} onClick={() => setSugarSelected(!sugarSelected)} alt="sugar" src={Sugar} sx={{ width: 250, height: 250 }} />
                    </Stack>

                </div>
            </div>
        </div>
    );
};

export default Home;