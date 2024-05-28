import React from "react";
import "./NavBar.css";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuItem from "@mui/material/MenuItem";

const pages: { [id: string]: number } = {};

pages["Home"] = 0;
pages["Weather"] = 1;
pages["Restaurants"] = 2;
pages["Rent a car"] = 3;
pages["Hotels"] = 4;
pages["Monuments"] = 5;

const hrefs = [
  "/",
  "/wheather",
  "/restorantSuggest",
  "/rentCar",
  "/hotels",
  "/monuments",
];
const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <img src={require('./icon.png')} style={{ width: '50px', height: '50px' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Travelling App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuItem />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages &&
                Object.entries(pages).map(([key, value]) => (
                  <MenuItem key={key} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{key}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages &&
              Object.entries(pages).map(([key, value]) => (
                <Button
                  key={key}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={hrefs[value]}
                >
                  {key}
                </Button>
              ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
