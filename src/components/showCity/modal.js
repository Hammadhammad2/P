import React, { useState } from "react";
import { _ERROR } from "../../utils/Constants";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { CitySchema } from "./helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Box, TextField, Stack, Alert, Divider } from "@mui/material";
import { Formik, Form, Field, FieldArray, getIn } from "formik";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CITY } from "../../graphql/mutations";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import { GET_ALL_CITIES } from "../../graphql/queries";
import { stack1 } from "./styles";

const Modals = () => {
  const id = localStorage.getItem("userId");
  const [response, setResponse] = useState(null);

  const { error: e, refetch } = useQuery(GET_ALL_CITIES, {
    variables: {
      userID: id,
    },
  });

  var [addCities, { data, loading, error }] = useMutation(ADD_CITY);

  const [open, setOpen] = useState(false);
  const changeResponse = () => {
    setTimeout(() => {
      setResponse(null);
      return;
    }, 3000);
  };

  if (e) {
    console.log(e);
  }
  if (loading) return <CircularProgress />;
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
    refetch();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Add More Cities
      </Button>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Formik
            initialValues={{
              cities: [
                { placeId: "", label: "", lat: "", lon: "", userId: id },
              ],
            }}
            validationSchema={CitySchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(id);
              values.cities.map((city, index) => {
                addCities({
                  variables: {
                    newCity: city,
                  },
                })
                  .then((res) => {
                    refetch();
                    console.log(res);
                  })
                  .catch((error) => {
                    console.log({ error });
                    setResponse(error.messsage);
                  });
                return index;
              });

              setSubmitting(false);
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
                                sx={{
                                  display: {
                                    xs: "none",
                                    sm: "flex",
                                    md: "flex",
                                    lg: "flex",
                                    xl: "flex",
                                    marginBottom: "15px",
                                  },
                                }}
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

                                <div>
                                  <Button
                                    sx={{ height: "40px" }}
                                    disabled={index > 0 ? false : true}
                                    variant={
                                      index > 0 ? "outlined" : "contained"
                                    }
                                    onClick={() => arrayHelpers.remove(index)}
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
                                        userId: id,
                                      })
                                    }
                                  >
                                    <AddIcon />
                                  </Button>
                                </div>
                              </Stack>
                              <Stack direction="column" spacing={1} sx={stack1}>
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

                                <Stack direction="row" spacing={2}>
                                  <Button
                                    sx={{ height: "40px" }}
                                    disabled={index > 0 ? false : true}
                                    variant={
                                      index > 0 ? "outlined" : "contained"
                                    }
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <RemoveIcon />
                                  </Button>

                                  {/* )} */}

                                  <Button
                                    sx={{ height: "40px" }}
                                    variant="contained"
                                    onClick={() =>
                                      arrayHelpers.insert(index, {
                                        placeId: "",
                                        label: "",
                                        lat: "",
                                        lon: "",
                                        userId: id,
                                      })
                                    }
                                  >
                                    <AddIcon />
                                  </Button>
                                </Stack>
                              </Stack>
                            </div>
                          ))
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => arrayHelpers.push("")}
                          ></Button>
                        )}
                      </div>
                    )}
                  />
                  <Divider sx={{ margin: "20px 0px" }} />
                  {response && (
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
