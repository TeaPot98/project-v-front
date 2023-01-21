import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Form } from "components";
import api from "api";

export interface ChangePasswordFormInputs {
  username: string;
  password: string;
  newPassword: string;
}

interface SignUpFormProps {
  onSubmit?: () => void;
}

export const ChangePasswordForm = ({ onSubmit: customOnSubmit }: SignUpFormProps) => {
  const { register, handleSubmit } = useForm<ChangePasswordFormInputs>();

  const signUpMutation = useMutation({
    mutationFn: (credentials: ChangePasswordFormInputs) => api.auth.changePassword(credentials),
    onSuccess: customOnSubmit,
  });

  const onSubmit: SubmitHandler<ChangePasswordFormInputs> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Change password</Typography>
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
        type="password"
        {...register("password")}
      />
      <TextField
        fullWidth
        size="small"
        label="New Password"
        type="password"
        {...register("newPassword")}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Form>
  );
};
