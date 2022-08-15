import React from "react";

import { Form, Field } from "formik";
import {
  _SMALL,
  _OUTLINE,
  _PASSWORD,
  _EMAIL,
  _SUBMIT,
  _PRIMARY,
  _CONTAINED,
  _NAME,
  _PHONENO,
  _CONFIRMPASSWORD,
} from "../../../utils/Constants";
import {
  EMAIL,
  PASSWORD,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  NAME,
  ENTER_NAME,
  PHONENO,
  ENTER_PHONENO,
  CONFIRMPASSWORD,
  ENTER_CONFIRMPASSWORD,
} from "./constants";
import { Grid, TextField, Button, Divider } from "@mui/material";

const SignUpForm = (props) => {
  const { touched, errors, values, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Grid container direction={"column"} spacing={3}>
        <Grid item>
          <Field
            as={TextField}
            label={NAME}
            name={_NAME}
            size={_SMALL}
            type={_NAME}
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            fullWidth
            placeholder={ENTER_NAME}
            value={values.name}
          />
        </Grid>
        <Grid item>
          <Field
            as={TextField}
            fullWidth
            id="textfield-login-email"
            size={_SMALL}
            variant={_OUTLINE}
            type={_EMAIL}
            label={EMAIL}
            name={_EMAIL}
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            placeholder={ENTER_EMAIL}
            value={values.email}
          />
        </Grid>
        <Grid item>
          <Field
            as={TextField}
            fullWidth
            size={_SMALL}
            label={PHONENO}
            name={_PHONENO}
            type={_PHONENO}
            helperText={touched.phoneno ? errors.phoneno : ""}
            error={touched.phoneno && Boolean(errors.phoneno)}
            placeholder={ENTER_PHONENO}
            value={values.phoneno}
          />
        </Grid>
        <Grid item>
          <Field
            as={TextField}
            fullWidth
            size={_SMALL}
            variant={_OUTLINE}
            label={PASSWORD}
            name={_PASSWORD}
            type={_PASSWORD}
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            placeholder={ENTER_PASSWORD}
            value={values.password}
          />
        </Grid>
        <Grid item>
          <Field
            as={TextField}
            fullWidth
            size={_SMALL}
            label={CONFIRMPASSWORD}
            name={_CONFIRMPASSWORD}
            type={_PASSWORD}
            helperText={touched.confirmpassword ? errors.confirmpassword : ""}
            error={touched.confirmpassword && Boolean(errors.confirmpassword)}
            placeholder={ENTER_CONFIRMPASSWORD}
            value={values.confirmpassword}
          />
        </Grid>
        <Grid item>
          <Button
            type={_SUBMIT}
            variant={_CONTAINED}
            color={_PRIMARY}
            fullWidth
          >
            SIGNUP
          </Button>
          <Divider sx={{ margin: "15px" }} orientation="horizontal">
            OR
          </Divider>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SignUpForm;
