import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { box1, box2 } from "../../styles.js";
import { button1, typo1, typo2, logoutb } from "./styles.js";

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
            <Typography sx={typo1}>Weather Report</Typography>
            <Typography sx={typo2} align="center">
              Best &amp; free website for weather report
            </Typography>

            <Stack sx={{ padding: "4px", mt: 2 }} direction="row" spacing={2}>
              {!user && (
                <Button
                  sx={button1}
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
                  sx={button1}
                  component={Link}
                  to="/login"
                  variant="outlined"
                >
                  Sign In
                </Button>
              )}
              {user && (
                <Button sx={logoutb} onClick={handleLogout} variant="contained">
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
