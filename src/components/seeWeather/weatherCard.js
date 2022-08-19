import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";

const weatherCard = (weather) => {
  console.log(weather);
  return (
    <Stack direction="row" justifyContent="center" sx={{ padding: "20px" }}>
      <Box
        sx={{
          padding: "10px",
          background: "rgba(9, 31, 64,0.8)",
          width: {
            xs: 315,
          },
        }}
        borderRadius="20px"
      >
        <Stack direction="row" spacing={3}>
          <Box
            component="img"
            src={weather.img}
            sx={{
              height: 150,
              ml: {
                xs: -2,
                xl: 6,
              },
            }}
          />
          <Typography
            sx={{
              mt: {
                xs: -2,
              },
              fontSize: {
                xs: "60px",
                xl: "100px",
              },
              fontWeight: "500",
              color: "white",
            }}
          >
            {weather.temp + "\u00b0C"}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "300",
            }}
          >
            Temp_max: {weather.temp_max + "\u00b0C"}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "300",
            }}
          >
            Temp_min: {weather.temp_min + "\u00b0C"}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "300",
            }}
          >
            {"Feels Like: " + weather.feels_like + "\u00b0C"}
          </Typography>
        </Box>

        {/* <Stack direction="row">
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
        </Stack> */}
      </Box>
    </Stack>
  );
};

export default weatherCard;
