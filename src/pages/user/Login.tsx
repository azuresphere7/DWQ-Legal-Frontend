import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Checkbox } from "@mui/material";

import ButtonLoader from "../../components/shared/ButtonLoader";
import AuthBannerImage from "../../components/form/AuthBannerImage";
import { LoginUserInput, LoginUserSchema } from "../../lib/validations/user.schema";
import { loginUser } from "../../redux/actions/user.action";
import { ReduxResponse } from "../../types/store";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const { isLoading } = useSelector(({ userReducer }) => userReducer);

  // Destructure form hooks for the input
  const methods = useForm<LoginUserInput>({ resolver: zodResolver(LoginUserSchema) });
  const { register, handleSubmit, reset, formState } = methods;
  const { errors } = formState;

  const [isRemember, setIsRemember] = React.useState(false);

  // Handle login form submit
  function onSubmit(data: LoginUserInput) {
    dispatch(loginUser(data))
      .then((response: ReduxResponse) => {
        if (response.success) {
          reset();
          navigate("/");
        } else {
          toast.error(response.message);
        }
      })
      .catch(() => toast.error("Internal Server Error!"));
  }

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full p-4 bg-secondary">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center fade-left-anim anim-500"
        >
          <h1 className="text-4xl mb-8">SIGN IN</h1>

          <TextField
            label="Username"
            variant="outlined"
            className="w-80 my-2"
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className="w-80 my-2"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />

          <div className="flex justify-between items-center w-80 my-2 text-sm">
            <Link
              to={"/user/forgot-password"}
              className="hover:text-blue-500"
            >
              Forgot password?
            </Link>
            <div className="flex items-center">
              <Checkbox value={isRemember} onChange={() => setIsRemember(!isRemember)} />
              Remember me
            </div>
          </div>

          <Button
            type="submit"
            variant="contained"
            className="w-80 h-12 my-8 bg-primary font-bold tracking-widest"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "login"}
          </Button>

          <div className="flex justify-center items-center">
            <p>Don&apos;t have an account?</p>
            <Link to={"/user/register"} className="mx-2 underline hover:text-blue-500">Sign up</Link>
          </div>

          <div className="flex justify-center items-center my-2">
            <p>Go back to </p>
            <Link to={"/"} className="mx-2 underline hover:text-blue-500">Homepage</Link>
          </div>
        </form>
      </div>

      <AuthBannerImage />
    </main>
  );
}
