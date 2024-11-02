import MainImage from "../imgs/MainImage.jpg";
import salad from "../imgs/salad.jpg";
import Chinese from "../imgs/chinese.jpg";
import Mexican from "../imgs/Mexican.jpg";
import brownies from "../imgs/brownies.jpg";
import breakfast from "../imgs/breakfast.jpg";
import "./cards.scss";
import { Button } from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GitHubIcon from '@mui/icons-material/GitHub';

const Home = () => {
  const [{ token }, dispatch,] = useStateValue();

  const navigate = useNavigate();
  const landingInfo = [
    { name: "Healthy", image: salad, text: "Whether you like salty, sweet, crunchy or cold there are plenty of healthy options to choose from. Click below to get some healthy recommendations." },
    { name: "Fancy meals", image: Chinese, text: "In a mood to enjoy a fancy restaurent style meal? We have got to covered. Exlpore the various options of mouth watering recipes below." },
    { name: "Quick Bites", image: Mexican, text: "Whether you are short of time or just too lazy, we have plently of quich bite options which whill come in handly. Click below to exlpore more." },
    { name: "Breakfast", image: breakfast, text: "Want to start your day with some wholesome breakfast recipes? Visit our recipes to get best breakfast recommendations" },
    { name: "Desserts", image: brownies, text: "Nothing can ever go wrong with something sweet. We have got recipes for you which will be satisfying for your sweeth tooth. Explore the various options below" },
  ];
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${MainImage})`,
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",

        }}
        data-testid="main-image-container-banner"
      >
        <div
          style={{
            fontSize: "35px",
            width: "350px",
            height: "250px",
            color: "#022950",
            textAlign: "center",
            lineHeight: "1.2",
            fontFamily: "Times New Roman, Times, serif",
            marginBottom: "25px",
          }}
        >
          Get recommendations for your favorite dishes
        </div>
        <Button className="button-style" style={{
          position: "absolute",
          top: "60%",
          left: "57%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          backgroundColor: "#022950",
          color: "white",
          border: "none",
          cursor: "pointer",

        }} onClick={() => { token ? navigate("/bookmarks") : navigate("/login") }}>
          Bookmarks
        </Button>
        <Button className="button-style" style={{
          position: "absolute",
          top: "60%",
          left: "42%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          padding: "10px 20px",
          borderRadius: "10px",
          backgroundColor: "#022950",
          color: "white",
          border: "none",
          cursor: "pointer",

        }} onClick={() => { token ? navigate("/recipes") : navigate("/login") }}>
          Get Started
        </Button>

      </div>

      <div
        style={{
          margin: "50px auto",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography variant="h3" component="h5" style={{ textAlign: "center" }}>
          What we offer
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          style={{ textAlign: "center", color: "black", margin: "3px 310px" }}
        >
          Delicious meal options as per your Nutritional needs and taste
        </Typography>
        <div display="flex" flexDirection="column" justifyContent="space-between">
          <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "200px", marginTop: "200px" }}>
            {landingInfo.map((key) => {
              return (

                <div class="card-container">
                  <div class="left"></div>
                  <div class="right"></div>
                  <div class="card" >
                    <div class="front">
                      <div class="cover"
                        style={{ backgroundImage: `url(${key.image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></div>
                      <h3 class="name">{key.name}</h3>
                    </div>
                    <div class="back" style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ marginTop: "15px", marginLeft: "10px", marginBottom: "1px" }}>
                        <Typography
                          variant="subtitle2"
                          component="subtitle2"
                          style={{ textAlign: "left", color: "white" }}
                        >
                          {key.text}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>);
            })}

          </div>

        </div>
      </div>
      <footer style={{
        backgroundColor: "#022950",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
      }}>
        <Typography variant="body1">
          This project is made by Group 2
        </Typography>
        <Button
          startIcon={<GitHubIcon />}
          href="https://github.com/mangodb203/SE-Project-Recipe-Recommender"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", marginTop: "10px" }}
        >
          View on GitHub
        </Button>
      </footer>
    </div>
  );
};

export default Home;