import { Dialog, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import React from "react";

interface SignupProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function Signup(props: SignupProps) {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={() => {
          // This should trigger the createUser mutation
          console.log("submitted");
        }}
      >
        <Form>
          <Field component={TextField} name="name" label="Name" />
          <Field component={TextField} name="email" label="Email" />
          <Field component={TextField} name="password" label="Password" />
          <Field
            component={TextField}
            name="confirmPassword"
            label="Confirm password"
          />
          <Button type="submit">Sign up</Button>
        </Form>
      </Formik>
    </Dialog>
  );
}
