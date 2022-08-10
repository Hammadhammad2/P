import React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Box, Button, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { box1, box2 } from "./styles";

const Home = () => {
  const user = localStorage.getItem("token");
  console.log(user);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Box sx={box1}>
      <Box sx={box2}>
        <div className="d-flex justify-content-center align-items-center h-100 w-992px">
          <div className="text-white">
            <h1 style={{ fontSize: "6rem" }}>Weather Report</h1>
            <h5 style={{ fontSize: "2rem", marginLeft: "10px" }}>
              Best &amp; free website for weather report
            </h5>
            <Stack
              sx={{ padding: "4px", mt: 2 }}
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              {!user && (
                <Button
                  sx={{
                    color: "white",
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
                    color: "white",
                    border: "2px white solid",
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
                    color: "white",
                    border: "2px white solid",
                    hieght: "10px",
                  }}
                  onClick={handleLogout}
                  variant="outlined"
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
