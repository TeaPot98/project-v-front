import { SubmitHandler, useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { Form } from "components";
import { UserRole, userRoles } from "utils";

export interface SignUpFormInputs {
  name: string;
  surname: string;
  username: string;
  password: string;
  role: `${UserRole}`;
}

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<SignUpFormInputs>();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    console.log(data);
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
