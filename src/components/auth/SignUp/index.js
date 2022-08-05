import React, { useCallback, useState } from "react";
import SignUpForm from "./SignUpForm";
import { AuthSignUp } from "../../../services/auth";
import AccountIcon from "../../../utils/icons";
import { SignUpInitialValues, SignUpSchema } from "./helper";
import { _SUCCESS, _ERROR, _PRIMARY } from "../../../utils/Constants";
import { Alert, Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { SIGNUP_SUCCESSFUL } from "./constants";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../graphql/queries";
import { SIGN_Up_USER } from "../../../graphql/mutations";

const paperStyle = { padding: "30px 20px", width: 400, margin: "150px auto" };
const headerStyle = { margin: 0 };
const avatarStyle = { backgroundColor: "#1877f2" };

const SignUp = () => {
  const [response, setResponse] = useState(null);

  // const { loading, error, data } = useQuery(GET_ALL_USERS);

  // data.users.map((users) => {
  //   console.log(users.email);
  //   console.log(users._id);
  // });

  const [signUpUser, { data, loading, error }] = useMutation(SIGN_Up_USER);
  if (loading) return <h1>Loading</h1>;

  if (error) {
    console.log(error.message);
    setResponse(error.message);
  }

  // if (data) {
  //   setResponse(SIGNUP_SUCCESSFUL);
  //   console.log(data.user.email);
  // }

  const SubmitForm = (data) => {
    signUpUser({
      variables: {
        newUser: data,
      },
    });
    // resetForm({});
  };

  // const SubmitForm = useCallback((data, { resetForm }) => {
  //

  //   AuthSignUp(data)
  //     .then((res) => {
  //       console.log(res);
  //       setResponse(SIGNUP_SUCCESSFUL);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //       setResponse(res);
  //     });

  //   resetForm({});
  // }, []);
  return (
    <Grid align="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <AccountIcon />
          </Avatar>
          <h2 style={headerStyle}> Sign UP</h2>
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
                >
                  lOGIN
                </Button>
              </>
            );
          }}
        </Formik>
        <div>
          <Paper>
            {console.log(response)}
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
