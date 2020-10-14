import { Button, TextField } from "@material-ui/core";
import React from "react";

export function Login() {
  // TODO: add formik for validation
  function handleSubmit() {
    console.log("submitted");
  }

  return (
    <form>
      <TextField label="Email" name="email" />
      <TextField label="Password" name="password" />
      <Button>Log in</Button>
    </form>
  );
}
