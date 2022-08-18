import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";

const weatherCard = (weather) => {
  return (
    <Stack direction="row" justifyContent="center" sx={{ padding: "20px" }}>
      <Paper
        elevation={20}
        sx={{
          width: {
            xs: "400px",
            sm: "400px",
            md: 500,
            lg: "500px",
            xl: "500px",
          },
          marginTop: "10px",
          background: "blue",

          padding: "30px",
          borderRadius: "25px",
          borderColor: "error.main",
        }}
      >
        <Stack direction="row">
          <Box
            flex={10}
            component="img"
            src={weather.img}
            sx={{
              maxHeight: {
                xl: "200px",
                sm: 150,
                xs: 130,
              },
              maxWidth: {
                xl: "200px",
                sm: 150,
                xs: 130,
              },
              verticalAlign: "middle",
              paddingRight: "20px",
            }}
          />
          <Stack direction="column" flex={1} justifyContent="center">
            {console.log(weather)}
            <Typography
              sx={{
                fontSize: "90px",
                fontWeight: "500",
                color: "white",
              }}
            >
              {weather.temp + "\u00b0C"}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "300",
              }}
            >
              {weather.type}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "300",
              }}
            >
              {"Wind Speed: " + weather.windSpeed + " m/s"}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "300",
              }}
            >
              {"Humidity: " + weather.humidity + "%"}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default weatherCard;
