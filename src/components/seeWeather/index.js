import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Alert,
  Button,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getweather } from "../../services/seeWeather";
import WeatherCard from "./weatherCard";
import { box1, box2 } from "../../styles.js";
import { useQuery } from "@apollo/client";
import { GET_ALL_CITIES } from "../../graphql/queries";
import CircularProgress from "@mui/material/CircularProgress";
import { _ERROR } from "../../utils/Constants";

const SeeWeather = () => {
  useEffect(() => {
    refetch();
  });
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [response, setResponse] = useState();

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
  if (loading) return <CircularProgress />;
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  const handleChange = (event) => {
    setCity(event.target.value);
    const city = data.cities.find((city) => city._id === event.target.value);
    console.log(city);
    getweather(city)
      .then((res) => {
        const data = res;
        console.log(data);
        setWeather({
          img: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          type: data.weather[0].main,
          temp: (data.main.temp - 273.15).toString().split(".")[0],
        });
        setResponse(null);
      })
      .catch((err) => {
        console.log(err);
        setResponse("No Such City Exists");
      });
  };

  return (
    <Box sx={box1}>
      <Box sx={box2}>
        <Box sx={{ minWidth: 120, margin: "30px" }}>
          <Paper
            elevation={2}
            sx={{
              padding: "20px",
              width: {
                xs: 420,
                sm: 420,
                md: 530,
                lg: 830,
                xl: 930,
              },
              ml: {
                xl: 10,
              },
            }}
          >
            {data.cities.length > 0 ? (
              <Box>
                {data.cities.length > 0 ? (
                  <FormControl fullWidth>
                    <InputLabel size="small">Select City</InputLabel>
                    <Select
                      value={city}
                      label="Select City"
                      size="small"
                      onChange={handleChange}
                    >
                      {data.cities.map((city, index) => (
                        <MenuItem key={index} value={city._id}>
                          {city.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Box sx={{ ml: "50px" }}>
                    <Typography>
                      No Cities Found. Please Add some first
                    </Typography>
                    <Button component={Link} to="/addCity" variant="contained">
                      Add City
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}

            {response && (
              <Alert
                elevation={1}
                sx={{
                  mt: 2,
                }}
                severity={_ERROR}
              >
                {response}
              </Alert>
            )}
          </Paper>
        </Box>
        <div>{weather && <WeatherCard {...weather} />}</div>
        <Box textAlign="center">
          {user && (
            <Button
              sx={{
                width: { xl: "140px" },
                Color: "white",
              }}
              onClick={handleLogout}
              variant="contained"
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SeeWeather;
