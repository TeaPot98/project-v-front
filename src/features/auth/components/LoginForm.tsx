import { SubmitHandler, useForm } from "react-hook-form";

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
      <input {...register("username")} />
      <input {...register("password")} />
      <button type="submit">Submit</button>
    </form>
  );
};
