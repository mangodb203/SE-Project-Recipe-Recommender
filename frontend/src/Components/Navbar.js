import { Restaurant } from "@mui/icons-material";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <div>
      <AppBar position="sticky" style={{ background: "#022950" }}>
        <Toolbar>
          <IconButton>
            <Restaurant fontSize="large" style={{ color: "white" }} />
          </IconButton>
          <Typography
            style={{
              flexGrow: 1,
              color: "white",
            }}
            variant="h5"
          >
            The CookBook
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
