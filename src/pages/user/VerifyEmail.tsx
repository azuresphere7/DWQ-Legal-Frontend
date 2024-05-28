import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import AuthBannerImage from "../../components/form/AuthBannerImage";
import CodeInput from "../../components/custom-input/CodeInput";
import { resendCode, verifyEmail } from "../../redux/actions/user.action";
import { toast } from "react-toastify";
import ButtonLoader from "../../components/shared/ButtonLoader";

export default function VerifyEmailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isVerifying } = useSelector(({ userReducer }) => userReducer);

  const [code, setCode] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isResend, setIsResend] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleVerify = () => {
    setErrorMessage("");

    if (user) {
      const verifyRequest = {
        email: user.email,
        code
      };

      dispatch(verifyEmail(verifyRequest))
        .then((response: any) => {
          if (response.success) {
            setErrorMessage("");
            setIsSuccess(true);
            setTimeout(() => navigate("/"), 1000);
          } else {
            setErrorMessage(response.message);
          }
        })
        .catch((error: any) => toast.error(error.message));
    } else {
      toast.error("User is unauthorized.");
    }
  };

  const handleResendCode = () => {
    if (user) {
      dispatch(resendCode(user.email))
        .then(() => setIsResend(true))
        .catch((error: any) => toast.error(error.message));
    } else {
      toast.error("User is unauthorized.");
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full p-4 bg-secondary">
        <div className="flex flex-col justify-center items-center fade-left-anim anim-500">
          <h1>We sent a verification code to your email</h1>

          <CodeInput
            value={code}
            onChange={setCode}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          {
            isSuccess && (
              <p className="my-2 text-xs text-green-400">Confirmation successful!</p>
            )
          }

          <Button
            variant="contained"
            className="w-80 h-12 my-6 bg-primary font-bold tracking-widest"
            onClick={handleVerify}
            disabled={code.length === 0 || isVerifying}
          >
            {isVerifying ? <ButtonLoader /> : "verify email"}
          </Button>

          {
            isResend ? (
              <div className="flex justify-center items-center mt-4">
                <p className="text-green-400">Verification code resent.</p>
              </div>
            ) : (
              <div className="flex justify-center items-center mt-4">
                <p>Didn&apos;t receive the code? </p>
                <p className="mx-2 underline hover:text-blue-500 active:text-blue-200 cursor-pointer" onClick={handleResendCode}>Resend it</p>
              </div>
            )
          }
        </div>
      </div>

      <AuthBannerImage />
    </main>
  );
}
