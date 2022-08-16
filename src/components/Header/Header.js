import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import { Link } from "react-router-dom";

import "../../App.css";
import { Stack } from "@mui/material";

const pages = ["ADDCITY", "SHOWCITY", "SEEWEATHER"];

const Header = () => {
  const user = localStorage.getItem("token");
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <AppBar position="sticky" elevation={20}>
      <Toolbar sx={{ padding: "0px 40px" }} disableGutters elevation={20}>
        <AirOutlinedIcon
          size="large"
          sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}
        />

        <Typography
          //desktopmode typo
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
            "&:hover": {
              color: "#64b5f6",
            },
          }}
        >
          WEATHER REPORT
        </Typography>

        <Stack
          direction="row"
          flex={2}
          alignItems="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {pages.map((page, index) => (
            <Stack direction="row" alignItems="center">
              <Button
                component={Link}
                to={`/${page}`}
                key={page}
                onClick={handleCloseNavMenu}
                backgroundColor="white"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    backgroundColor: "#fff",
                    boxShadow: 2,
                  },
                }}
              >
                {page}
              </Button>
              {index < pages.length - 1 && (
                <Divider
                  orientation="vertical"
                  sx={{
                    width: "2px",
                    margin: "15px 3px",
                    height: "auto !important",
                  }}
                  flexItem
                />
              )}
            </Stack>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
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
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#64b5f6",
                      boxShadow: 2,
                    },
                  }}
                  to={`/${page}`}
                >
                  {page}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AirOutlinedIcon
          size="large"
          sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
        />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          WEATHER REPORT
        </Typography>
        <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
          {!user && (
            <Button
              component={Link}
              to="/Signup"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                my: 2,
                display: "block",
                fontStyle: "italic",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                width: "85px",
              }}
            >
              SignUp
            </Button>
          )}
          {!user && (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                my: 2,
                ml: 1,
                display: "block",
                fontStyle: "italic",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                width: "85px",
                justifyContent: "space-between",
              }}
            >
              Login
            </Button>
          )}
          {user && (
            <Button
              sx={{
                color: "white",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#1877f2",
                  boxShadow: "none",
                },
              }}
              onClick={handleLogout}
              variant="contained"
            >
              Logout
            </Button>
          )}
        </Box>

        <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
          {!user && (
            <Button
              component={Link}
              to="/Signup"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                my: 2,
                display: "block",
                fontStyle: "italic",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                width: "85px",
              }}
            >
              SignUp
            </Button>
          )}
          {!user && (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                my: 2,
                ml: 1,
                display: "block",
                fontStyle: "italic",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                width: "85px",
                justifyContent: "space-between",
              }}
            >
              Login
            </Button>
          )}
          {user && (
            <Button
              sx={{
                color: "white",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#1877f2",
                  boxShadow: "none",
                },
              }}
              onClick={handleLogout}
              variant="contained"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
