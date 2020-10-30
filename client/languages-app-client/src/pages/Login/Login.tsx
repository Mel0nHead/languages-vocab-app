import { Box, Button, Divider, makeStyles, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import * as yup from "yup";
import { Signup } from "./components/Signup";
import { useLoginMutation } from "./graphql/useLoginMutation";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

interface LoginProps {
  handleLogin: (userId: string, token: string) => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 450,
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  form: { width: "100%" },
  divider: {
    margin: theme.spacing(2, 0),
  },
  loginButton: { width: "100%" },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

export interface InitialLoginValues {
  email: string;
  password: string;
}

export function Login(props: LoginProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [login, { loading, error }] = useLoginMutation();
  const classes = useStyles();

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  async function handleSubmit(
    values: InitialLoginValues,
    actions: FormikHelpers<InitialLoginValues>
  ) {
    actions.setSubmitting(false);
    const { data } = await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    setLoginError(data?.login?.token ? false : true);
    if (data?.login?.token && data.login.userId) {
      props.handleLogin(data.login.userId, data.login.token);
    }
  }

  return (
    <Paper className={classes.paper} variant="outlined">
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className={classes.form}>
          <Field
            component={TextField}
            name="email"
            label="Email"
            fullWidth={true}
            variant="filled"
            className={classes.formInput}
          />
          <Field
            component={TextField}
            name="password"
            label="Password"
            variant="filled"
            fullWidth={true}
            className={classes.formInput}
          />
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.loginButton}
            >
              Log in
            </Button>
          </Box>

          {loading && <b>Loading...</b>}

          {loginError && (
            <Alert className={classes.alert} severity="error">
              Incorrect email and/or password.
            </Alert>
          )}

          {error && (
            <Alert className={classes.alert} severity="error">
              {error.message}
            </Alert>
          )}

          <Divider className={classes.divider} />
        </Form>
      </Formik>
      <Button onClick={handleOpenDialog} variant="contained" color="secondary">
        Create new account
      </Button>

      <Signup isOpen={isDialogOpen} handleClose={handleCloseDialog} />
    </Paper>
  );
}
