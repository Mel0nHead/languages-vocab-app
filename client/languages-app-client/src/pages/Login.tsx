import { Box, Button, Dialog } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import * as yup from "yup";
import { Signup } from "./Signup";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export function Login() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        onSubmit={() => {
          // call login mutation - if it is successful, set userId and isAuthorised in AuthContext
          console.log("submitted");
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
