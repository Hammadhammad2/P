import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Paper, Stack, Typography } from "@mui/material";
import bgimage from "../../assets/img/image.jpg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Logout from "../Logout";
import { Link, useLocation } from "react-router-dom";
import { box1, box2 } from "../../styles.js";
import { getCities, deleteCities } from "../../services/seeCitites";
import Modals from "./modal";

const ShowCity = () => {
  const [cities, setCities] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile")).user;

  const location = useLocation();

  useEffect(() => {
    getCities(user)
      .then((res) => {
        const cities = res.reverse();
        setCities(cities);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [location]);

  return (
    <>
      <Box sx={box1}>
        <Box sx={box2}>
          <Modals />
          <Paper elevation={20} sx={{ padding: "20px", mt: "30px" }}>
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
                overflow: "hidden",
              }}
            >
              {cities.length > 0 ? (
                <TableContainer component={Paper} elevation={6}>
                  <Table
                    sx={{ minWidth: 500, fontSize: "10px" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ border: 1 }} component="th">
                          City Name
                        </TableCell>
                        <TableCell sx={{ border: 1 }} component="th">
                          Options
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cities.map((city, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{city.label}</TableCell>

                          <TableCell>
                            {
                              <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                  deleteCities(city._id)
                                    .then((res) => {
                                      console.log(res);
                                      console.log(city._id);
                                      setCities(
                                        cities.filter((c) => c._id !== city._id)
                                      );
                                    })
                                    .catch((res) => {
                                      console.log(res);
                                    });
                                }}
                              >
                                Delete
                              </Button>
                            }
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h5
                  style={{
                    color: "#158FFA",
                    textAlign: "center",
                    bgcolor: "black",
                    font: "40px Open Sans bold",
                    border: " 1px solid #158FFA",
                  }}
                >
                  No Cities Added
                </h5>
              )}
            </Box>
          </Paper>
          <Stack direction="row" justifyContent="center" spacing={3}>
            <Box>
              <Button
                component={Link}
                to="/SeeWeather"
                variant="outlined"
                sx={{
                  width: "200px",
                  margin: "50px 0px",
                  color: "white",
                  border: "2px white solid",
                }}
              >
                Show Weather
              </Button>
            </Box>
            {user && <Logout />}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ShowCity;
