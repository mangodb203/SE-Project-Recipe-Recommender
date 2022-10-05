
import MainImage from '../imgs/MainImage.jpg';
import Italian from '../imgs/Italian.jpg'
import Chinese from '../imgs/chinese.jpg'
import American from '../imgs/American.jpg'
import Mexican from '../imgs/Mexican.jpg'
import Indian from '../imgs/Indian.jpg'
import Japanese from '../imgs/Japanese.jpg'
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
const Home = () => {
    const [italianSelected, setItalianSelected] = useState(false);
    const [americanSelected, setAmericanSelected] = useState(false);
    const [mexicanSelected, setmexicanSelected] = useState(false);
    const [indianSelected, setIndianSelected] = useState(false);
    const [chineseSelected, setChineseSelected] = useState(false);
    const [japaneseSelected, setJapaneseSelected] = useState(false);
    const ref = useRef(null);
    const getStarted = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
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
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + italianSelected} onClick={() => setItalianSelected(!italianSelected)}>
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
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + chineseSelected} onClick={() => setChineseSelected(!chineseSelected)}>
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
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + americanSelected} onClick={() => setAmericanSelected(!americanSelected)}>
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
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + mexicanSelected} onClick={() => setmexicanSelected(!mexicanSelected)}>
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
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + indianSelected} onClick={() => setIndianSelected(!indianSelected)}>
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
                    <Card sx={{ maxWidth: 345 }} style={{ float: "left", margin: "20px 40px" }} className={"card " + japaneseSelected} onClick={() => setJapaneseSelected(!japaneseSelected)}>
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
            </div>
        </div>
    );
};

export default Home;