import React from "react";
import LoginForm from "./loginForm";
import AccountIcon from "../../../utils/icons";
import { LoginInitialValues, LoginSchema } from "./helpers";
import { Alert, Avatar, Grid, Paper, Typography } from "@mui/material";
import { LOGIN_SUCCESSFUL } from "./constants";
import { Formik } from "formik";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../graphql/mutations";

const paperStyle = { padding: "30px 20px", width: 400, margin: "150px auto" };
const headerStyle = { margin: 0 };
const avatarStyle = { backgroundColor: "#1877f2" };

const Login = () => {
  const [LoginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  if (data) {
    console.log(data.user.token);
    localStorage.setItem("token", data.user.token);
    window.location.replace("/addCity");
  }
  const SubmitForm = (data, { resetForm }) => {
    console.log(data);
    LoginUser({
      variables: {
        newSignInUser: data,
      },
    });
    resetForm({});
  };

  return (
    <>
      <Grid align="center">
        <Paper elevation={10} style={paperStyle}>
          <Avatar style={avatarStyle}>
            <AccountIcon></AccountIcon>
          </Avatar>
          <h2 style={headerStyle}> Sign In</h2>
          <Typography variant="caption">Sign In to your Account</Typography>

          {/* login form start */}
          <div>
            <Formik
              initialValues={LoginInitialValues}
              onSubmit={SubmitForm}
              validationSchema={LoginSchema}
            >
              {(props) => {
                return (
                  <>
                    <LoginForm {...props} />
                  </>
                );
              }}
            </Formik>
          </div>
          <div>
            <Paper>
              {data && (
                <Alert
                  elevation={1}
                  sx={{
                    mt: 2,
                  }}
                  variant="outlined"
                  severity="success"
                >
                  {LOGIN_SUCCESSFUL}
                </Alert>
              )}

              {error && (
                <Alert
                  elevation={1}
                  sx={{
                    mt: 2,
                  }}
                  severity="error"
                >
                  {error.message}
                </Alert>
              )}
            </Paper>
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
