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
                  sm: 80,
                  xs: 70,
                },
              }}
            >
              Weather Report
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xl: 40,
                  lg: 25,
                  md: 20,
                  sm: 30,
                  xs: 30,
                },
              }}
              align="center"
            >
              Best &amp; free website for weather report
            </Typography>

            <Stack
              sx={{ padding: "4px", mt: 2 }}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              {!user && (
                <Button
                  sx={{
                    backgroundColor: "white",
                    border: "2px white solid",
                    hover: "golden",
                    marginLeft: "30px",
                    width: "180px",
                  }}
                  component={Link}
                  to="/Signup"
                  variant="outlined"
                >
                  Sign Up
                </Button>
              )}
              {!user && (
                <Button
                  sx={{
                    backgroundColor: "white",

                    width: "180px",
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
                    backgroundColor: "white",
                    color: "#1877f2",
                    "&:hover": {
                      color: "#fff",
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
