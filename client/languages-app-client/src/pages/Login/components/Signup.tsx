import {
  Dialog,
  Button,
  Divider,
  Box,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import * as yup from "yup";
import { useCreateUserMutation } from "../graphql/useCreateUserMutation";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { InitialLoginValues } from "../Login";
import { useSnackbar } from "notistack";

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

const useStyles = makeStyles((theme) => ({
  closeButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    marginTop: 0,
    textAlign: "center",
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface InitialSignupValues extends InitialLoginValues {
  name: string;
  confirmPassword: string;
}

export function Signup(props: SignupProps) {
  const [createUser] = useCreateUserMutation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(
    values: InitialSignupValues,
    actions: FormikHelpers<InitialSignupValues>
  ) {
    try {
      await createUser({
        variables: {
          email: values.email,
          name: values.name,
          password: values.password,
        },
      });
      enqueueSnackbar("User successfully created.", { variant: "success" });
    } catch (e) {
      enqueueSnackbar(
        "Something went wrong. Please refresh the page and try again.",
        { variant: "error" }
      );
    }
    actions.setSubmitting(false);
    props.handleClose();
  }

  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <Box className={classes.closeButtonWrapper} p={1}>
        <IconButton onClick={props.handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box p={4} pb={6}>
        <h1 className={classes.title}>Signup</h1>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              component={TextField}
              name="name"
              label="Name"
              fullWidth={true}
              variant="filled"
              className={classes.formInput}
            />
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
              fullWidth={true}
              variant="filled"
              className={classes.formInput}
            />
            <Field
              component={TextField}
              name="confirmPassword"
              label="Confirm password"
              fullWidth={true}
              variant="filled"
              className={classes.formInput}
            />
            <Box className={classes.buttonWrapper}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                style={{ width: "100%" }}
              >
                Sign up
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Dialog>
  );
}
