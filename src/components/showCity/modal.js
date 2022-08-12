import React, { useState } from "react";
import { _SUCCESS, _ERROR } from "../../utils/Constants";

import {
  Modal,
  Button,
  Box,
  FormControl,
  TextField,
  Stack,
  Paper,
  Alert,
} from "@mui/material";
import { Modalstyle } from "./constants";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { _PRIMARY } from "../../utils/Constants";
import IconButton from "@mui/material/IconButton";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_CITY } from "../../graphql/mutations";

const Modals = ({ setCity }) => {
  const user = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  var [addCities, { data, loading, error }] = useMutation(ADD_CITY);
  if (error) {
    console.log({ error });
  }

  let [inputField, setInputFields] = useState([
    {
      userId: user ? user : "",
      label: "",
      placeId: "",
      lon: "",
      lat: "",
    },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputField];
    list[index][name] = value;
    setInputFields(list);
  };

  const handleSubmit = () => {
    if (inputField) {
      inputField.map((name, index) => {
        console.log(name, index);
        addCities({
          variables: {
            newCity: name,
          },
        })
          .then((res) => {
            console.log(res);
            navigate("/ShowCity");
            console.log(res);
          })
          .catch(({ error }) => {
            console.log({ error });
            setResponse(error.messsage);
          });
      });
    }
    setInputFields([
      {
        userId: user ? user : "",
        label: "",
        placeId: "",
        lon: "",
        lat: "",
      },
    ]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddFields = () => {
    console.log("data");

    setInputFields([
      ...inputField,
      {
        userId: user ? user : "",
        label: "",
        placeId: "",
        lon: "",
        lat: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputField];

    values.splice(index, 1);
    setInputFields(values);
  };
  return (
    <div>
      <Button fullWidth variant="contained" onClick={handleOpen}>
        ADD MORE CITIES
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={Modalstyle}>
          <div>
            <FormControl onSubmit={handleSubmit}>
              {inputField.map((inputField, index) => (
                <Stack direction="row" spacing={2} key={index} sx={{ mt: 2 }}>
                  <TextField
                    id="filled-basic"
                    label="Enter Place ID"
                    variant="filled"
                    name="placeId"
                    onChange={(event) => {
                      handleInputChange(event, index);
                    }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Enter City Name"
                    variant="filled"
                    name="label"
                    sx={{ mt: "10px" }}
                    onChange={(event) => {
                      handleInputChange(event, index);
                    }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Enter LATITUDE"
                    variant="filled"
                    name="lat"
                    sx={{ mt: "10px" }}
                    onChange={(event) => {
                      handleInputChange(event, index);
                    }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Enter LONGITUDE"
                    variant="filled"
                    name="lon"
                    sx={{ mt: "10px" }}
                    onChange={(event) => {
                      handleInputChange(event, index);
                    }}
                  />

                  <IconButton
                    onClick={() => {
                      handleAddFields();
                    }}
                  >
                    <AddCircleTwoToneIcon
                      sx={{ fontSize: 40, mt: "2px", ml: "20px" }}
                      color={_PRIMARY}
                    />
                  </IconButton>
                  {index > 0 ? (
                    <IconButton
                      onClick={() => {
                        handleRemoveFields(index);
                      }}
                    >
                      <RemoveCircleTwoToneIcon
                        sx={{ fontSize: 40, mt: "2px", ml: "-20px" }}
                        color={_PRIMARY}
                      />
                    </IconButton>
                  ) : (
                    <div></div>
                  )}
                </Stack>
              ))}
            </FormControl>
          </div>
          <div>
            {response && (
              <Alert
                elevation={1}
                sx={{
                  mt: 2,
                }}
                severity={response === "All cities added" ? _SUCCESS : _ERROR}
              >
                {response}
              </Alert>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            sx={{ width: "150px", mt: "20px" }}
            variant="contained"
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            sx={{ width: "150px", mt: "20px", ml: 1 }}
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Modals;
