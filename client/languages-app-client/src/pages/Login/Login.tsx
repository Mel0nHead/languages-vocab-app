import { Button, Divider, Paper } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
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
  handleLogin: (userId: string) => void;
}

export function Login(props: LoginProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [login, { loading, error }] = useLoginMutation();

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return (
    <Paper style={{ maxWidth: 450, margin: "0 auto", padding: "20px" }}>
      <h1>Log In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, actions) => {
          const { data } = await login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          setLoginError(data?.login?.id ? false : true);
          if (data?.login?.id) {
            props.handleLogin(data.login.id);
          }
          actions.setSubmitting(false);
        }}
        validationSchema={schema}
      >
        <Form>
          <Field
            component={TextField}
            name="email"
            label="Email"
            fullWidth={true}
          />
          <Field
            component={TextField}
            name="password"
            label="Password"
            fullWidth={true}
          />
          <Button type="submit">Log in</Button>
          {loading && <b>Loading...</b>}
          {loginError && <b>Incorrect email and/or password.</b>}
          {error && <b>{error.message}</b>}
          <Divider />
        </Form>
      </Formik>
      <Button onClick={handleOpenDialog}>Create new account</Button>

      <Signup isOpen={isDialogOpen} handleClose={handleCloseDialog} />
    </Paper>
  );
}
