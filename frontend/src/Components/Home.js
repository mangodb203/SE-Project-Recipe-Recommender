
import MainImage from '../imgs/MainImage.jpg';
import {
    Button
} from "@mui/material";
const Home = () => {
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
                    lineHeight:"1.2",
                    fontFamily: "Times New Roman, Times, serif",
                    marginBottom:"25px"
                }}>Turn your ingredients into delicious recipes</div>
                <Button style={{
                    position: "absolute",
                    height: "50px",
                    width: "200px",
                    background: "#022950",
                    borderRadius: "20px",
                    color: "white",
                    marginBottom:"100px"
                }}>Get Started</Button>
            </div>
        </div>
    );
};

export default Home;