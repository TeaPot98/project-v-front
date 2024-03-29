import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { UserRole } from "models/user";
import { userRoles } from "utils";
import { Form } from "components";
import api from "api";

export interface SignUpFormInputs {
  name: string;
  surname: string;
  username: string;
  password: string;
  role: UserRole;
}

interface SignUpFormProps {
  onSubmit?: () => void;
}

export const SignUpForm = ({ onSubmit: customOnSubmit }: SignUpFormProps) => {
  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpFormInputs) => api.auth.signUp(credentials),
    onSuccess: customOnSubmit,
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Add new user</Typography>
      <TextField fullWidth size="small" label="Name" {...register("name")} />
      <TextField
        fullWidth
        size="small"
        label="Surname"
        {...register("surname")}
      />
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
      <FormControl>
        <InputLabel id="user-role">Role</InputLabel>
        <Select
          fullWidth
          size="small"
          labelId="user-role"
          label="Role"
          defaultValue="user"
          {...register("role")}
        >
          {userRoles.map(({ key, label }) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};
