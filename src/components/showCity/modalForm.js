import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Form, Field } from "formik";
import {
  _SMALL,
  _OUTLINE,
  _SUBMIT,
  _SECONDARY,
  _PRIMARY,
  _CONTAINED,
} from "../../utils/Constants.js";
import {
  LABEL,
  ENTER_PLACEID,
  PLACEID,
  ENTER_LABEL,
  LAT,
  ENTER_LAT,
  LON,
  ENTER_LON,
} from "./constants";
import { TextField, Button, Divider, Link, Stack } from "@mui/material";
import { _LABEL, _LAT, _LON, _PLACEID } from "../../utils/Constants";

const ModalForm = (props) => {
  const { touched, errors, loading, values, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} id="login-submit">
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Field
          as={TextField}
          fullWidth
          id="textfield-PLACEID"
          size={_SMALL}
          variant={_OUTLINE}
          type={_PLACEID}
          label={PLACEID}
          name={_PLACEID}
          value={values.placeId}
          helperText={touched.placeId ? errors.placeId : ""}
          error={touched.placeId && Boolean(errors.placeId)}
          placeholder={ENTER_PLACEID}
        />
        <Field
          as={TextField}
          fullWidth
          id="textfield-LABEL"
          size={_SMALL}
          variant={_OUTLINE}
          type={_LABEL}
          label={LABEL}
          name={_LABEL}
          value={values.label}
          helperText={touched.label ? errors.label : ""}
          error={touched.label && Boolean(errors.label)}
          placeholder={ENTER_LABEL}
        />

        <Field
          as={TextField}
          fullWidth
          id="textfield-LAT"
          size={_SMALL}
          variant={_OUTLINE}
          type={_LAT}
          label={LAT}
          name={_LAT}
          value={values.lat}
          helperText={touched.lat ? errors.lat : ""}
          error={touched.lat && Boolean(errors.lat)}
          placeholder={ENTER_LAT}
        />

        <Field
          as={TextField}
          fullWidth
          id="textfield-LON"
          size={_SMALL}
          variant={_OUTLINE}
          type={_LON}
          label={LON}
          name={_LON}
          value={values.lon}
          helperText={touched.lon ? errors.lon : ""}
          error={touched.lon && Boolean(errors.lon)}
          placeholder={ENTER_LON}
        />
      </Stack>

      <Divider sx={{ margin: "15px" }} orientation="horizontal">
        OR
      </Divider>
      <Button
        component={Link}
        to="/Signup"
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign up
      </Button>
    </Form>
  );
};

export default ModalForm;
