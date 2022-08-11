import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { useDebounce } from "use-debounce";
import { Paper, Button, Alert, Box, Stack, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { _ERROR } from "../../utils/Constants";
import { Link } from "react-router-dom";
import { getCitiesRequest } from "../../services/addCity";
import { useMutation } from "@apollo/client";
import { ADD_CITY } from "../../graphql/mutations";
import { box1, box2 } from "../../styles.js";

const City = () => {
  const user = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  const [resposne, setResponse] = useState();

  const [displayLocations, setDisplayLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [delayValue] = useDebounce(inputValue, 1000);

  var [addCities, { data, loading, error }] = useMutation(ADD_CITY);
  if (loading) console.log(loading);

  // if (error) {
  //   console.log({ error });
  // }

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const changeResponse = () => {
    setTimeout(() => {
      setResponse(null);
      return;
    }, 3000);
  };
  useEffect(() => {
    getCitiesRequest(delayValue, inputValue)
      .then((search) => {
        var newData = [];
        for (var i = 0; i < search.length; i++) {
          newData.push({
            placeId: search[i].id,
            label: search[i].place_name,
            lon: search[i].geometry.coordinates[0],
            lat: search[i].geometry.coordinates[1],
          });
        }
        setDisplayLocations(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [delayValue]);

  return (
    <Box sx={box1}>
      <Box sx={box2}>
        <Paper
          sx={{
            padding: "20px",
            marginBottom: "20px",
          }}
          elevation={5}
        >
          <Autocomplete
            noOptionsText="No Cities Found"
            size="small"
            clearOnBlur={true}
            onChange={(event, newValue) => {
              if (newValue) {
                if (user) {
                  newValue["userId"] = id;
                }
                console.log(newValue);
                addCities({
                  variables: {
                    newCity: newValue,
                  },
                })
                  .then((res) => {
                    location.push(newValue);
                  })
                  .catch(({ err }) => {
                    console.log({ err });
                    setResponse({ error });
                  });
              }
              // setLocation(newValue);

              // if (newValue) {
              //   if (user) {
              //     console.log(user);
              //     newValue["userId"] = user._id;
              //   }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              setDisplayLocations([]);
            }}
            id="controllable-states-demo"
            options={displayLocations}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Search Location" />
            )}
          />
          {resposne && (
            <Box>
              {changeResponse()}
              <Alert
                elevation={1}
                sx={{
                  mt: 2,
                }}
                severity={_ERROR}
              >
                CITY ALREADY EXISTS
              </Alert>
            </Box>
          )}
        </Paper>
        <Paper
          sx={{
            padding: "20px",
          }}
          elevation={5}
        >
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
              overflow: "hidden",
              overflowY: "scroll",
              borderColor: "secondary.main",
            }}
          >
            {location.length > 0 ? (
              <TableContainer component={Box} elevation={6}>
                <Table
                  sx={{ minWidth: 500, fontSize: "10px" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          border: 1,
                          fontSize: "20pt",
                          backgroundColor: "primary",
                        }}
                        component="th"
                      >
                        City Names
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {location.map((loc, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            mt: 2,
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            border: 0,
                            mt: 2,
                            backgroundColor: "#eeeeee",
                          }}
                        >
                          {loc.label}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <h4
                style={{
                  color: "#ef5350",
                  font: "Monospace",
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                No Cities Added
              </h4>
            )}
          </Box>
          <Divider />
          <Paper elevation={0} sx={{ mt: 2, mr: 2, ml: 2 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Button component={Link} to="/ShowCity" variant="contained">
                View All Cities
              </Button>
              {user && (
                <Button
                  sx={{ width: "140px" }}
                  onClick={handleLogout}
                  variant="contained"
                >
                  Logout
                </Button>
              )}
            </Stack>
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
};

export default City;
