import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { box1, box2 } from "../../styles.js";

const Home = () => {
  const user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Box sx={box1}>
      <Box sx={box2}>
        <div className="d-flex justify-content-center align-items-center h-100 w-992px">
          <div className="text-white">
            <Typography
              sx={{
                fontSize: {
                  xl: 100,
                  lg: 90,
                  md: 86,
                  sm: 68,
                  xs: 43,
                },
              }}
            >
              Weather Report
            </Typography>
            <Typography
              sx={{
                ml: {
                  md: -25,
                  sm: -20,
                  xl: 3,
                },
                fontSize: {
                  xl: 40,
                  lg: 25,
                  md: 20,
                  sm: 20,
                  xs: 18,
                },
              }}
              align="center"
            >
              Best &amp; free website for weather report
            </Typography>

            <Stack sx={{ padding: "4px", mt: 2 }} direction="row" spacing={2}>
              {!user && (
                <Button
                  sx={{
                    ml: {
                      xs: -1,
                      xl: 3,
                      lg: 3,
                    },
                    background: "white",
                    border: "2px white solid",
                    "&:hover": {
                      color: "#fff",
                      border: "2px white solid",
                    },
                    marginLeft: "30px",
                    width: {
                      xs: "140px",
                      xl: "180px",
                    },
                  }}
                  component={Link}
                  to="/Signup"
                  variant="outlined"
                >
                  Sign Up
                </Button>
              )}
              <Divider orientation="vertical" />
              {!user && (
                <Button
                  sx={{
                    background: "white",
                    "&:hover": {
                      color: "#fff",
                      border: "2px white solid",
                    },
                    width: {
                      xs: "140px",
                      xl: "180px",
                    },
                  }}
                  component={Link}
                  to="/login"
                  variant="outlined"
                >
                  Sign In
                </Button>
              )}
              {user && (
                <Button
                  sx={{
                    border: "2px  #1877f2 solid",
                    background: "white",
                    color: "#1877f2",
                    "&:hover": {
                      color: "#fff",
                    },
                    width: {
                      xs: "140px",
                      xl: "180px",
                    },
                  }}
                  onClick={handleLogout}
                  variant="contained"
                >
                  Logout
                </Button>
              )}
            </Stack>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Home;
