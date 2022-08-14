import React, { useState } from "react";
import { _SUCCESS, _ERROR } from "../../utils/Constants";
import * as Yup from "yup";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  Button,
  Box,
  TextField,
  Stack,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import { Formik, Form, Field, FieldArray, getIn } from "formik";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_CITY } from "../../graphql/mutations";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

const Modals = ({ setCity }) => {
  const user = localStorage.getItem("userId");
  // const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  // const handleClose = () => setOpen(false);
  var [addCities, { data, loading, error }] = useMutation(ADD_CITY);
  const [open, setOpen] = useState(false);
  if (loading) return <h1>loading</h1>;
  if (error) {
    console.log({ error });
  }
  if (data) {
    console.log(data);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CitySchema = Yup.object().shape({
    cities: Yup.array().of(
      Yup.object().shape({
        placeId: Yup.string().required("Required"),
        label: Yup.string().required("Required"),
        lat: Yup.string().required("Required"),
        lon: Yup.string().required("Required"),
      })
    ),
  });

  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Add More Cities
      </Button>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <Box sx={{ padding: "20px" }}>
          <Formik
            initialValues={{
              cities: [{ placeId: "", label: "", lat: "", lon: "" }],
            }}
            validationSchema={CitySchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(id);
              console.log(values.cities);

              // values.cities.map((city, index) =>
              //   addCities({
              //     variables: {
              //       newCity: city,
              //     },
              //   })
              //     .then((res) => {
              //       console.log(res);
              //       navigate("/ShowCity");
              //       console.log(res);
              //     })
              //     .catch(({ error }) => {
              //       console.log({ error });
              //       setResponse(error.messsage);
              //     })
              // );

              setSubmitting(true)
              
            }}
          >
            {({
              errors,
              touched,
              values,
              isSubmitting,
              handleChange,
              handleBlur,
            }) => (
              <div>
                <Form>
                  <DialogTitle sx={{ padding: "0px 0px 10px 0px" }}>
                    {"Enter Details"}
                  </DialogTitle>
                  <FieldArray
                    name="cities"
                    render={(arrayHelpers) => (
                      <div>
                        {values.cities && values.cities.length > 0 ? (
                          values.cities.map((friend, index) => (
                            <div key={index}>
                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{ marginBottom: "15px" }}
                              >
                                <Field
                                  name={`cities.${index}.placeId`}
                                  id="placeId"
                                  as={TextField}
                                  size="small"
                                  label="Place Id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  helperText={
                                    getIn(touched, `cities[${index}].placeId`)
                                      ? getIn(
                                          errors,
                                          `cities[${index}].placeId`
                                        )
                                      : ""
                                  }
                                  error={
                                    getIn(
                                      touched,
                                      `cities[${index}].placeId`
                                    ) &&
                                    Boolean(
                                      getIn(errors, `cities[${index}].placeId`)
                                    )
                                  }
                                />
                                <Field
                                  name={`cities.${index}.label`}
                                  as={TextField}
                                  size="small"
                                  label="City Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  helperText={
                                    getIn(touched, `cities[${index}].label`)
                                      ? getIn(errors, `cities[${index}].label`)
                                      : ""
                                  }
                                  error={
                                    getIn(touched, `cities[${index}].label`) &&
                                    Boolean(
                                      getIn(errors, `cities[${index}].label`)
                                    )
                                  }
                                />
                                <Field
                                  name={`cities.${index}.lat`}
                                  onChange={handleChange}
                                  as={TextField}
                                  size="small"
                                  label="Latitude"
                                  onBlur={handleBlur}
                                  helperText={
                                    getIn(touched, `cities[${index}].lat`)
                                      ? getIn(errors, `cities[${index}].lat`)
                                      : ""
                                  }
                                  error={
                                    getIn(touched, `cities[${index}].lat`) &&
                                    Boolean(
                                      getIn(errors, `cities[${index}].lat`)
                                    )
                                  }
                                />
                                <Field
                                  name={`cities.${index}.lon`}
                                  onChange={handleChange}
                                  as={TextField}
                                  size="small"
                                  label="Longitude"
                                  onBlur={handleBlur}
                                  helperText={
                                    getIn(touched, `cities[${index}].lon`)
                                      ? getIn(errors, `cities[${index}].lon`)
                                      : ""
                                  }
                                  error={
                                    getIn(touched, `cities[${index}].lon`) &&
                                    Boolean(
                                      getIn(errors, `cities[${index}].lon`)
                                    )
                                  }
                                />
                                {/* {index > 0 && ( */}
                                <div>
                                  <Button
                                    sx={{ height: "40px" }}
                                    disabled={index > 0 ? false : true}
                                    variant={
                                      index > 0 ? "outlined" : "contained"
                                    }
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    <RemoveIcon />
                                  </Button>
                                </div>
                                {/* )} */}

                                <div>
                                  <Button
                                    sx={{ height: "40px" }}
                                    variant="contained"
                                    onClick={() =>
                                      arrayHelpers.insert(index, {
                                        placeId: "",
                                        label: "",
                                        lat: "",
                                        lon: "",
                                      })
                                    } // insert an empty string at a position
                                  >
                                    <AddIcon />
                                  </Button>
                                </div>
                              </Stack>
                            </div>
                          ))
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => arrayHelpers.push("")}
                          >
                            {/* show this when user has removed all friends from the list */}
                            Add a city
                          </Button>
                        )}
                      </div>
                    )}
                  />
                  <Divider sx={{ margin: "20px 0px" }} />
                  <DialogActions sx={{ padding: "0px" }}>
                    <Button variant="outlined" onClick={handleClose}>
                      Close
                    </Button>
                    <LoadingButton
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                      type="submit"
                    >
                      {isSubmitting ? "Adding..." : " Add Cities"}
                    </LoadingButton>
                    {/* <Button variant="contained" type="submit">
                      Add Cities
                    </Button> */}
                  </DialogActions>
                </Form>
              </div>
            )}
          </Formik>
        </Box>
      </Dialog>
    </div>
  );
};

export default Modals;
