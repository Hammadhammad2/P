import React, { useState } from "react";
import SignUpForm from "./SignUpForm";

import AccountIcon from "../../../utils/icons";
import { SignUpInitialValues, SignUpSchema } from "./helper";
import { _SUCCESS, _ERROR, _PRIMARY } from "../../../utils/Constants";
import { Alert, Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { SIGNUP_SUCCESSFUL } from "./constants";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGN_Up_USER } from "../../../graphql/mutations";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const [response, setResponse] = useState();
  var [signUpUser, { loading }] = useMutation(SIGN_Up_USER);

  if (loading) return <CircularProgress />;
  const SubmitForm = (data, { resetForm }) => {
    console.log(data);
    signUpUser({
      variables: {
        newUser: data,
      },
    })
      .then((data) => {
        setResponse(SIGNUP_SUCCESSFUL);
      })
      .catch((error) => {
        console.log(error.message);
        setResponse(error.message);
      });
    resetForm({});
  };

  const changeResponse = () => {
    setTimeout(() => {
      setResponse(null);
      return;
    }, 3000);
  };
  return (
    <Grid align="center">
      <Paper
        elevation={10}
        sx={{ padding: "30px 20px", width: 400, margin: "150px auto" }}
      >
        <Grid>
          <Avatar sx={{ backgroundColor: "#1877f2" }}>
            <AccountIcon />
          </Avatar>
          <h2 sx={{ margin: 0 }}> Sign Up</h2>
          <Typography variant="caption">Create an Account</Typography>
        </Grid>
        <Formik
          initialValues={SignUpInitialValues}
          onSubmit={SubmitForm}
          validationSchema={SignUpSchema}
        >
          {(props) => {
            return (
              <>
                <SignUpForm
                  //loading={loading}
                  {...props}
                />
                <Button
                  component={Link}
                  to="/Login"
                  variant="contained"
                  color={_PRIMARY}
                  fullWidth
                  sx={{
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  lOGIN
                </Button>
              </>
            );
          }}
        </Formik>

        <div>
          <Paper>
            {changeResponse()}
            {response && (
              <Alert
                elevation={1}
                sx={{
                  mt: 2,
                }}
                severity={response === SIGNUP_SUCCESSFUL ? _SUCCESS : _ERROR}
              >
                {response}
              </Alert>
            )}
          </Paper>
        </div>
      </Paper>
    </Grid>
  );
};

export default SignUp;
