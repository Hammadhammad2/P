import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Paper, Stack } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";
import { box1, box2 } from "../../styles.js";

import Modals from "./modal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../../graphql/queries";
import { DELETE_QUERY } from "../../graphql/mutations.js";

const ShowCity = () => {
  const user = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const { data, loading, error, refetch } = useQuery(GET_ALL_CITIES, {
    variables: {
      userID: user,
    },
  });
  useEffect(() => {}, [data]);

  const [deleteCities, { data: deleteData, error: deleteError }] =
    useMutation(DELETE_QUERY);

  if (deleteData) {
    console.log(deleteData);
  }
  if (deleteError) {
    console.log({ deleteError });
  }

  if (loading) return <h1>loading</h1>;

  if (error) {
    console.log({ error });
  }

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
              {data.cities.length > 0 ? (
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
                      {data.cities.map((city, index) => (
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
                                  deleteCities({
                                    variables: {
                                      cityId: city._id,
                                    },
                                  })
                                    .then((deleteData) => {
                                      console.log(deleteData);
                                      console.log(city._id);
                                      data.cities.filter(
                                        (c) => c._id !== city._id
                                      );
                                      refetch();
                                    })
                                    .catch(({ deleteError }) => {
                                      console.log({ deleteError });
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
              {user && (
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{
                    width: "200px",
                    margin: "50px 0px",
                    color: "white",
                    border: "2px white solid",
                    ml: 5,
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ShowCity;
