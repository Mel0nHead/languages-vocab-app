import { Dialog, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import * as yup from "yup";
import { useCreateUserMutation } from "../graphql/useCreateUserMutation";

interface SignupProps {
  isOpen: boolean;
  handleClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required().min(10),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords don't match")
    .required("Confirm Password is required"),
});

export function Signup(props: SignupProps) {
  const [createUser] = useCreateUserMutation();

  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <h1>Signup</h1>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, actions) => {
          createUser({
            variables: {
              email: values.email,
              name: values.name,
              password: values.password,
            },
          });
          actions.setSubmitting(false);
          props.handleClose();
        }}
      >
        <Form>
          <Field
            component={TextField}
            name="name"
            label="Name"
            fullWidth={true}
          />
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
          <Field
            component={TextField}
            name="confirmPassword"
            label="Confirm password"
            fullWidth={true}
          />
          <Button type="submit">Sign up</Button>
        </Form>
      </Formik>
    </Dialog>
  );
}
