import MainImage from "../imgs/MainImage.jpg";
import salad from "../imgs/salad.jpg";
import Chinese from "../imgs/chinese.jpg";
import Mexican from "../imgs/Mexican.jpg";
import brownies from "../imgs/brownies.jpg";
import breakfast from "../imgs/breakfast.jpg";
import "./cards.scss";
import { Button } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import ReactCardFlipper from "react-card-flipper";

const Home = () => {
    const [{token},dispatch,] = useStateValue();
    const [flip, setFlip] = React.useState(0);
  const navigate = useNavigate();
  const landingInfo = [
    { name: "Healthy", image: salad },
    { name: "Fancy meals", image: Chinese },
    { name: "Quick Bites", image: Mexican },
    { name: "Breakfast", image: breakfast },
    { name: "Desserts", image: brownies },
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
        <Button className="button-style" onClick={() => {token ? navigate("/recipes") : navigate("/login")}}>
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
          Delicious meal options as per your likings. Select a recipe and we
          will show you other similar recipes that you can order. Recipe
          recommendations ranging from different categories. Order a fancy meal
          or just grab a quick bite.
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" , marginLeft:"200px", marginTop:"200px"}}>
          {landingInfo.map((key) => {
            return (
              <div class="card-container">
  <div class="left"></div>
  <div class="right"></div>
  <div class="card">
    <div class="front">
      <div class="cover"
      style={{backgroundImage:`url(${key.image})`, backgroundRepeat:"no-repeat",backgroundSize:"cover" }}></div>
      <h3 class="name">{key.name}</h3>
      </div>
    <div class="back">
      
    </div>
  </div>
</div>
      
              // <Card
              //   key={key.name}
              //   sx={{ width: "17%", maxHeight: 225 }}
              //   style={{ float: "left", margin: "20px auto", fontSize: "12px" }}
              // >
              //   <CardMedia
              //     component="img"
              //     height="180"
              //     image={key.image}
              //     alt={key.name}
              //   />
              //   <CardContent>
              //     <Typography
              //       gutterBottom
              //       variant="h6"
              //       style={{ textAlign: "center", fontSize: "14px" }}
              //     >
              //       {key.name}
              //     </Typography>
              //   </CardContent>
              // </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
