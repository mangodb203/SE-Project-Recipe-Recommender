import { Restaurant } from "@mui/icons-material";

import {
    AppBar,
    IconButton,
    Button,
    Toolbar,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div>
            <AppBar position="sticky" style={{ background: "#022950" }}>
                <Toolbar >
                    <Button style={{textTransform: "capitalize"}} onClick={() => navigate("/")}>
                    <IconButton>
                        <Restaurant fontSize="large" style={{ color: "white" }} />
                    </IconButton>
                    <Typography style={{
                        flexGrow: 1,
                        color: "white"
                    }} variant="h5">
                        The CookBook
                    </Typography>
                    </Button>
                </Toolbar> 
            </AppBar>
        </div>

    );
};

export default NavBar;