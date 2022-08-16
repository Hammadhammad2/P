import React from "react";
import LoginForm from "./loginForm";
import AccountIcon from "../../../utils/icons";
import { LoginInitialValues, LoginSchema } from "./helpers";
import { Alert, Avatar, Grid, Paper, Typography } from "@mui/material";
import { LOGIN_SUCCESSFUL } from "./constants";
import { Formik } from "formik";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../graphql/mutations";
import { useState } from "react";
import { _ERROR, _SUCCESS } from "../../../utils/Constants";

const Login = () => {
  const [LoginUser, { data, loading }] = useMutation(LOGIN_USER);
  const [response, setResponse] = useState();
  const changeResponse = () => {
    setTimeout(() => {
      setResponse(null);
      return;
    }, 3000);
  };

  if (data) {
    console.log(data.user.userId);
    localStorage.setItem("token", data.user.token);
    localStorage.setItem("userId", data.user.userId);
    window.location.replace("/addCity");
  }
  const SubmitForm = (data, { resetForm }) => {
    console.log(data);

    LoginUser({
      variables: {
        newSignInUser: data,
      },
    })
      .then((data) => {
        setResponse(LOGIN_SUCCESSFUL);
      })
      .catch((error) => {
        console.log(error.message);
        setResponse(error.message);
      });
    resetForm({});
  };

  return (
    <>
      <Grid align="center">
        <Paper
          elevation={10}
          sx={{ padding: "30px 20px", width: 400, margin: "150px auto" }}
        >
          <Avatar sx={{ backgroundColor: "#1877f2" }}>
            <AccountIcon></AccountIcon>
          </Avatar>
          <h2 sx={{ margin: 0 }}> Sign In</h2>
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
                    <LoginForm loading={loading} {...props} />
                  </>
                );
              }}
            </Formik>
          </div>
          <div>
            <Paper>
              {changeResponse()}
              {response && (
                <Alert
                  elevation={1}
                  sx={{
                    mt: 2,
                  }}
                  severity={response === LOGIN_SUCCESSFUL ? _SUCCESS : _ERROR}
                >
                  {response}
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
