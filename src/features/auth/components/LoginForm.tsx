import { SubmitHandler, useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Form } from "components";

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);
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
