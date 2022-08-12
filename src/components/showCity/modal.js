import React, { useState } from "react";
import { _SUCCESS, _ERROR } from "../../utils/Constants";

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

  // let [inputField, setInputFields] = useState([
  //   {
  //     userId: user ? user : "",
  //     label: "",
  //     placeId: "",
  //     lon: "",
  //     lat: "",
  //   },
  // ]);

  // const handleInputChange = (event, index) => {
  //   const { name, value } = event.target;
  //   const list = [...inputField];
  //   list[index][name] = value;
  //   setInputFields(list);
  // };

  // const handleSubmit = () => {
  //   if (inputField) {
  //     inputField.map((name, index) => {
  //       console.log(name, index);
  //       addCities({
  //         variables: {
  //           newCity: name,
  //         },
  //       })
  //         .then((res) => {
  //           console.log(res);
  //           navigate("/ShowCity");
  //           console.log(res);
  //         })
  //         .catch(({ error }) => {
  //           console.log({ error });
  //           setResponse(error.messsage);
  //         });
  //     });
  //   }
  //   setInputFields([
  //     {
  //       userId: user ? user : "",
  //       label: "",
  //       placeId: "",
  //       lon: "",
  //       lat: "",
  //     },
  //   ]);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleAddFields = () => {
  //   console.log("data");

  //   setInputFields([
  //     ...inputField,
  //     {
  //       userId: user ? user : "",
  //       label: "",
  //       placeId: "",
  //       lon: "",
  //       lat: "",
  //     },
  //   ]);
  // };

  // const handleRemoveFields = (index) => {
  //   const values = [...inputField];

  //   values.splice(index, 1);
  //   setInputFields(values);
  // };
  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Add More Cities
      </Button>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <Box sx={{ padding: "20px" }}>
          <Formik
            initialValues={{
              cities: [{ placeId: "", label: "", lat: 0, lon: 0, userId: id }],
            }}
            onSubmit={(values) => {
              values.cities.map((name, index) => {
                console.log(values.cities);

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
                handleClose();
              });
            }}
            render={({ errors, touched, values, handleChange, handleBlur }) => (
              <div>
                <Form>
                  <DialogTitle sx={{ padding: "10px 0px" }}>
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
                                    getIn(touched, `cities.${index}.placeId`)
                                      ? getIn(errors, `cities.${index}.placeId`)
                                      : ""
                                  }
                                  error={
                                    getIn(touched, "placeId") &&
                                    Boolean(getIn(errors, "placeId"))
                                  }
                                />
                                <Field
                                  name={`cities.${index}.label`}
                                  as={TextField}
                                  size="small"
                                  label="City Name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <Field
                                  name={`cities.${index}.lat`}
                                  onChange={handleChange}
                                  as={TextField}
                                  size="small"
                                  label="Latitude"
                                  onBlur={handleBlur}
                                />
                                <Field
                                  name={`cities.${index}.lon`}
                                  onChange={handleChange}
                                  as={TextField}
                                  size="small"
                                  label="Longitude"
                                  onBlur={handleBlur}
                                />
                                {index > 0 && (
                                  <div>
                                    <Button
                                      sx={{ fontSize: "22px", padding: "1px" }}
                                      variant="contained"
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    >
                                      -
                                    </Button>
                                  </div>
                                )}

                                <div>
                                  <Button
                                    sx={{ fontSize: "22px", padding: "1px" }}
                                    size="small"
                                    variant="contained"
                                    onClick={() =>
                                      arrayHelpers.insert(index, {
                                        placeId: "",
                                        label: "",
                                        lat: 0,
                                        lon: 0,
                                      })
                                    } // insert an empty string at a position
                                  >
                                    +
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
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </DialogActions>
                </Form>
              </div>
            )}
          />
        </Box>
      </Dialog>

      {/* <Modal open={open} onClose={handleClose}>
        {/* <Box sx={Modalstyle}>
          {inputField.map((inputField, index) => (
            <div>
              <Formik
                initialValues={modalInitialValues}
                onSubmit={handleSubmit}
                onchange={handleInputChange(event, index)}
                validationSchema={modalSchema}
              >
                {(props) => {
                  return (
                    <>
                      <ModalForm {...props} />
                    </>
                  );
                }}
              </Formik>

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
            </div>
          ))}
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
        
      </Modal> */}
    </div>
  );
};

export default Modals;
