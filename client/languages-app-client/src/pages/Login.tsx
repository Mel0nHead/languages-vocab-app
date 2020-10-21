import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

export function Login() {

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={() => {
      console.log('submitted')
    }}>
      <Form>
        <Field component={TextField} name='email' label='Email' />
       <Field component={TextField} name='password' label='Password' />
      <Button type='submit'>Log in</Button></Form>
    </Formik>
  );
}
