import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register("username")} />
      <TextField {...register("password")} />
      <button type="submit">Submit</button>
    </form>
  );
};
