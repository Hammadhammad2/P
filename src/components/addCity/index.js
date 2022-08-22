import { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Grow, Typography } from "@mui/material";
import { useDebounce } from "use-debounce";
import { Paper, Button, Alert, Box, Stack, Divider } from "@mui/material";

import { _ERROR } from "../../utils/Constants";
import { Link } from "react-router-dom";
import { getCitiesRequest } from "../../services/addCity";
import { useMutation } from "@apollo/client";
import { ADD_CITY } from "../../graphql/mutations";
import { box1, box2 } from "../../styles.js";
import { paper1, paper2, boxs, b1 } from "./styles";

const City = () => {
  const user = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  const [response, setResponse] = useState();

  const [displayLocations, setDisplayLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [delayValue] = useDebounce(inputValue, 1000);

  var [addCities, { loading }] = useMutation(ADD_CITY);
  if (loading) console.log(loading);

  useEffect(() => {
    getCitiesRequest(delayValue, inputValue)
      .then((search) => {
        var newData = [];
        for (var i = 0; i < search.length; i++) {
          newData.push({
            placeId: search[i].id,
            label: search[i].place_name,
            lon: search[i].geometry.coordinates[0].toString(),
            lat: search[i].geometry.coordinates[1].toString(),
          });
        }
        setDisplayLocations(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delayValue]);

  const dummy = useRef(null);
  useEffect(() => {
    if (dummy) {
      if (dummy.current) dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <Box sx={box1}>
      <Box sx={box2}>
        <Paper sx={paper1} elevation={5}>
          <Autocomplete
            noOptionsText="No Cities Found"
            size="small"
            clearOnBlur={true}
            onChange={(event, newValue) => {
              setResponse(null);
              if (newValue) {
                if (user) {
                  newValue["userId"] = id;
                }

                addCities({
                  variables: {
                    newCity: newValue,
                  },
                })
                  .then((res) => {
                    setLocation((prev) => [...prev, newValue]);
                    //location.push(newValue);
                  })
                  .catch((error) => {
                    setResponse(error.message);
                    console.log({ error });
                  });
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "reset") {
                setInputValue("");
                return;
              } else {
                setInputValue(newInputValue);
                setDisplayLocations([]);
              }
            }}
            id="controllable-states-demo"
            options={displayLocations}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search Location" />
            )}
          />

          {response && (
            <Alert
              elevation={1}
              sx={{
                mt: 2,
              }}
              severity={_ERROR}
            >
              CITY ALREADY EXISTS
            </Alert>
          )}
        </Paper>

        <Paper sx={paper2} elevation={5}>
          <Box sx={boxs}>
            {location.length > 0 && (
              <Stack direction="column" spacing={2}>
                {location.map((loc, index) => (
                  <Grow in timeout={600} key={index}>
                    <Paper
                      variant="outlined"
                      sx={{ padding: "10px" }}
                      className="bg-gray-100"
                    >
                      <Stack direction="row" alignItems="center">
                        <Typography flex={3}> {loc.label}</Typography>
                      </Stack>
                    </Paper>
                  </Grow>
                ))}
                <div ref={dummy} />
              </Stack>
            )}
          </Box>

          <Divider />

          <Stack
            direction="row"
            justifyContent="center"
            elevation={0}
            sx={{ mt: 2 }}
          >
            <Button component={Link} to="/ShowCity" variant="contained" sx={b1}>
              View All Cities
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default City;
