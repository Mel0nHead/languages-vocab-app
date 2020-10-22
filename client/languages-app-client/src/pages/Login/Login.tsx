import { Box, Button } from "@material-ui/core";
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

export function Login() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [login] = useLoginMutation();

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return (
    <Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, actions) => {
          const user = await login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          // then should call props.login
        }}
        validationSchema={schema}
      >
        <Form>
          <Field component={TextField} name="email" label="Email" />
          <Field component={TextField} name="password" label="Password" />
          <Button type="submit">Log in</Button>
        </Form>
      </Formik>
      <Button onClick={handleOpenDialog}>Create new account</Button>

      <Signup isOpen={isDialogOpen} handleClose={handleCloseDialog} />
    </Box>
  );
}
