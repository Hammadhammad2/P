import React from "react";
import { Box } from "@mui/system";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { box1, box2 } from "../../styles.js";

import Modals from "./modal";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../../graphql/queries";
import { DELETE_QUERY } from "../../graphql/mutations.js";

const ShowCity = () => {
  const user = localStorage.getItem("userId");

  const { data, loading, error, refetch } = useQuery(GET_ALL_CITIES, {
    variables: {
      userID: user,
    },
  });

  const [deleteCities] = useMutation(DELETE_QUERY);

  if (loading) return <CircularProgress />;

  if (error) {
    console.log({ error });
  }

  const deleteCurrentCity = (event, city) => {
    deleteCities({
      variables: {
        cityId: city._id,
      },
    })
      .then((deleteData) => {
        console.log(deleteData);
        console.log(city._id);
        data.cities.filter((c) => c._id !== city._id);
        refetch();
      })
      .catch(({ deleteError }) => {
        console.log({ deleteError });
      });
  };

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
                overflow: "auto",
                overflowY: "scroll",
              }}
            >
              {data.cities.length > 0 ? (
                <Paper
                  sx={{
                    padding: "10px",
                    marginBottom: "16px",
                    position: "sticky",
                    top: "0px",
                    zIndex: 9,
                    boxShadow: 6,
                  }}
                  variant="outlined"
                >
                  <Stack direction="row" alignItems="center">
                    <Typography
                      sx={{ fontWeight: 600, color: "#0d6efd" }}
                      flex={3}
                    >
                      City Name
                    </Typography>

                    <Typography
                      sx={{ fontWeight: 600, color: "#0d6efd" }}
                      flex={1}
                    >
                      Action
                    </Typography>
                  </Stack>
                </Paper>
              ) : (
                <Paper variant="outlined" sx={{ padding: "10px" }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#0d6efd",
                      textAlign: "center",
                    }}
                  >
                    No Cities Found
                  </Typography>
                </Paper>
              )}
              {data.cities.length > 0 && (
                <Stack direction="column" spacing={2} elevation={20}>
                  {data.cities.map((city, index) => (
                    <Paper
                      className="bg-gray-100"
                      variant="outlined"
                      sx={{ padding: "10px" }}
                    >
                      <Stack direction="row" alignItems="center">
                        <Typography flex={3}>{city.label}</Typography>
                        <Button
                          flex={1}
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            display: { xs: "none" },
                            width: {
                              xs: 100,
                              sm: 100,
                              md: 150,
                              lg: 200,
                              xl: 200,
                            },
                          }}
                          onClick={(event) => deleteCurrentCity(event, city)}
                        >
                          Delete
                        </Button>

                        <DeleteIcon
                          flex={1}
                          variant="contained"
                          color="primary"
                          fullWidth
                          fontSize="large"
                          sx={{
                            display: { xs: "flex" },
                          }}
                          onClick={(event) => deleteCurrentCity(event, city)}
                        />
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Box>
          </Paper>
          <Stack
            sx={{ padding: "4px", mt: 2 }}
            direction="row"
            justifyContent="center"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Button
              sx={{
                border: "2px white solid",
                color: "white",
                width: "180px",
                "&:hover": {
                  color: "#fff",
                },
              }}
              component={Link}
              to="/SeeWeather"
              variant="outlined"
            >
              Show Weather
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ShowCity;
