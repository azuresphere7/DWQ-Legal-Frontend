import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";

import AuthBannerImage from "../../components/form/AuthBannerImage";
import CodeInput from "../../components/custom-input/CodeInput";
import PasswordInput from "../../components/custom-input/PasswordInput";
import ButtonLoader from "../../components/shared/ButtonLoader";

import { ResetPasswordInput, ResetPasswordSchema } from "../../lib/validations/user.schema";
import { confirmEmail, resetPassword } from "../../redux/actions/user.action";
import { ReduxResponse } from "../../types/store";
import { ResetPasswordActionInput } from "../../types/user";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isConfirmEmail, isVerifying } = useSelector(({ userReducer }) => userReducer);

  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [verificationCodeSent, setVerificationCodeSent] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Destructure form hooks for the input
  const methods = useForm<ResetPasswordInput>({ resolver: zodResolver(ResetPasswordSchema) });
  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;

  const handleSendCode = () => {
    dispatch(confirmEmail(email))
      .then((response: ReduxResponse) => {
        if (response.success) {
          setVerificationCodeSent(true);
          toast.info(response.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error: any) => toast.error(error.message));
  };

  const onSubmit = (data: ResetPasswordInput) => {
    const requestData: ResetPasswordActionInput = {
      email,
      code,
      newPassword: data.password
    };

    dispatch(resetPassword(requestData))
      .then((response: ReduxResponse) => {
        if (response.success) {
          toast.success(response.message);
          navigate("/user/login");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error: any) => toast.error(error.message));
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full p-4 bg-secondary">
        <div className="flex flex-col justify-center items-center fade-left-anim anim-500">
          {
            verificationCodeSent ? (
              <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
                <h1>We sent a verification code to your email</h1>

                <CodeInput
                  value={code}
                  onChange={setCode}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />

                <PasswordInput
                  label="New Password"
                  className="w-full mt-10 mb-2"
                  handler={register("password")}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                />

                <PasswordInput
                  label="Confirm Password"
                  className="w-full my-2"
                  handler={register("confirm")}
                  error={errors.confirm ? true : false}
                  helperText={errors.confirm?.message}
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="w-80 h-12 my-6 bg-primary font-bold tracking-widest"
                  disabled={code.length === 0 || isVerifying}
                >
                  {isVerifying ? <ButtonLoader /> : "reset password"}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center w-full">
                <h1>Please enter your email</h1>

                <TextField
                  label="Email Address"
                  name="email"
                  className="w-full mt-8 mb-2"
                  value={email}
                  onChange={({ target: { value } }) => setEmail(value)}
                />

                <Button
                  variant="contained"
                  className="w-80 h-12 my-6 bg-primary font-bold tracking-widest"
                  onClick={handleSendCode}
                  disabled={email.length === 0 || isConfirmEmail}
                >
                  {isConfirmEmail ? <ButtonLoader /> : "send a code"}
                </Button>
              </div>
            )
          }


          <div className="flex justify-center items-center mt-4">
            <p>Go back to</p>
            <Link to={"/user/login"} className="mx-2 underline hover:text-blue-500">Sign in</Link>
          </div>
        </div>
      </div>

      <AuthBannerImage />
    </main>
  );
}
