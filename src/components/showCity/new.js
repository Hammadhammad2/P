import React, { useState } from "react";
import { _SUCCESS, _ERROR } from "../../utils/Constants";
import { Formik, Field, Form } from "formik";
import { SignUpInitialValues, SignUpSchema } from "./helpers";
import {
  Modal,
  Button,
  Box,
  Paper,
  Alert,
  Stack,
  TextField,
} from "@mui/material";
import { Modalstyle } from "./constants";

import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { _PRIMARY } from "../../utils/Constants";
import IconButton from "@mui/material/IconButton";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";

import { addCities } from "../../services/addCity";

import { useNavigate } from "react-router-dom";

const Modals = ({ setCity }) => {
  const user = JSON.parse(localStorage.getItem("profile")).user;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  let [inputField, setInputFields] = useState([
    {
      userId: user ? user._id : "",
      label: "",
      placeId: "",
      lon: "",
      lat: "",
    },
  ]);
  const [response, setResponse] = useState(null);

  const handleInputChange = (event, index, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    console.log(value);
    const list = [...inputField];

    list[index][name] = value;
    setInputFields(list);
  };

  const handleSubmit = () => {
    if (inputField) {
      addCities(inputField)
        .then((res) => {
          console.log(res);
          //setResponse(res);
          navigate("/ShowCity");
        })
        .catch((err) => {
          //setResponse(err);
          console.log(err);
        });
    }

    console.log(inputField);
    setInputFields([
      {
        userId: user ? user._id : "",
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
        userId: user ? user._id : "",
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
          <Formik
            initialValues={SignUpInitialValues}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={SignUpSchema}
          >
            {({ errors, touched, handleBlur, setFieldValue, values }) => (
              <Form>
                {inputField.map((inputField, index) => (
                  <Stack direction="row" spacing={2} key={index} sx={{ mt: 2 }}>
                    <Field
                      as={TextField}
                      id="filled-basic"
                      onBlur={handleBlur}
                      //  label="Enter Place ID"
                      placeholder="Enter Place ID"
                      variant="filled"
                      name="placeId"
                      helperText={touched.placeId ? errors.placeId : ""}
                      error={touched.placeId && Boolean(errors.placeId)}
                      onChange={(event) => {
                        handleInputChange(event, index, setFieldValue);
                      }}
                    />
                    <Field
                      as={TextField}
                      id="filled-basic"
                      // label="Enter City Name"
                      placeholder="Enter City Name"
                      variant="filled"
                      onBlur={handleBlur}
                      name="label"
                      sx={{ mt: "10px" }}
                      helperText={touched.label ? errors.label : ""}
                      error={touched.label && Boolean(errors.label)}
                      onChange={(event) => {
                        handleInputChange(event, index, setFieldValue);
                      }}
                    />
                    <Field
                      as={TextField}
                      id="filled-basic"
                      //   label="Enter LATITUDE"
                      placeholder="Enter LATITUDE"
                      variant="filled"
                      onBlur={handleBlur}
                      name="lat"
                      sx={{ mt: "10px" }}
                      helperText={touched.lat ? errors.lat : ""}
                      error={touched.lat && Boolean(errors.lat)}
                      onChange={(event) => {
                        handleInputChange(event, index, setFieldValue);
                      }}
                    />
                    <Field
                      as={TextField}
                      id="filled-basic"
                      //label="Enter LONGITUDE"
                      placeholder="Enter LONGITUDE"
                      variant="filled"
                      onBlur={handleBlur}
                      name="lon"
                      helperText={touched.lon ? errors.lon : ""}
                      error={touched.lon && Boolean(errors.lon)}
                      sx={{ mt: "10px" }}
                      onChange={(event) => {
                        handleInputChange(event, index, setFieldValue);
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
                <Button
                  type="submit"
                  sx={{ width: "150px", mt: "20px" }}
                  variant="contained"
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
          <div>
            <Paper>
              {response && (
                <Alert
                  elevation={1}
                  sx={{
                    mt: 2,
                  }}
                  severity={
                    response === "CITIES ADDED SUCCESFULLY" ? _SUCCESS : _ERROR
                  }
                >
                  {response}
                </Alert>
              )}
            </Paper>
          </div>

          <Button
            onClick={handleClose}
            sx={{ width: "150px", mt: "20px" }}
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
