import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Form } from "components";
import api from "api";

export interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const loginMutation = useMutation((credentials: LoginFormInputs) =>
    api.auth.login(credentials)
  );

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Welcome back!</Typography>
      <TextField
        fullWidth
        size="small"
        label="Username"
        {...register("username")}
      />
      <TextField
        fullWidth
        size="small"
        label="Password"
        {...register("password")}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Form>
  );
};
