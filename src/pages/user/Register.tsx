import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField
} from "@mui/material";

import { RegisterUserInput, RegisterUserSchema } from "../../lib/validations/user.schema";
import { monthDropDown, yearDropDown, paymentImageURLs } from "../../config/static-data";
import SelectInput from "../../components/custom-input/SelectInput";
import PasswordInput from "../../components/custom-input/PasswordInput";
import AuthBannerImage from "../../components/form/AuthBannerImage";
import ButtonLoader from "../../components/shared/ButtonLoader";
import { ReduxResponse } from "../../types/store";
import { registerUser } from "../../redux/actions/user.action";
import { clearFormat } from "../../utils/functions";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const { isLoading } = useSelector(({ userReducer }) => userReducer);

  // Destructure form hooks for the input
  const methods = useForm<RegisterUserInput>({ resolver: zodResolver(RegisterUserSchema) });
  const { register, handleSubmit, reset, formState } = methods;
  const { errors } = formState;

  // Handle register form submit
  function onSubmit(data: RegisterUserInput) {
    const registerData: RegisterUserInput = {
      ...data,
      creditNumber: clearFormat(data.creditNumber)
    };

    dispatch(registerUser(registerData))
      .then((response: ReduxResponse) => {
        if (response.success) {
          toast.success(response.message);
          reset();
          navigate("/user/verify");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error: any) => toast.error(error.message));
  }

  return (
    <main className="flex flex-row-reverse justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center w-full h-full md:p-4 bg-secondary">
        <div className="w-auto h-full p-8 overflow-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center fade-right-anim anim-500"
          >
            <h1 className="text-4xl mb-8">SIGN UP</h1>

            <div className="flex flex-wrap w-full md:w-[544px]">
              <TextField
                label="First Name"
                variant="outlined"
                className="w-full md:w-44 my-2"
                {...register("firstName")}
                error={errors.firstName ? true : false}
                helperText={errors.firstName?.message}
              />

              <TextField
                label="Middle Name"
                variant="outlined"
                className="w-full md:w-40 md:mx-4 my-2"
                {...register("middleName")}
                error={errors.middleName ? true : false}
                helperText={errors.middleName?.message}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                className="w-full md:w-44 my-2"
                {...register("lastName")}
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
              />

              <TextField
                label="Firm Name"
                variant="outlined"
                className="w-full md:w-[304px] md:mr-2 my-2"
                {...register("firmName")}
                error={errors.firmName ? true : false}
                helperText={errors.firmName?.message}
              />

              <TextField
                label="Domain"
                variant="outlined"
                className="w-full md:w-56 md:ml-2 my-2"
                {...register("firmDomain")}
                error={errors.firmDomain ? true : false}
                helperText={errors.firmDomain?.message}
              />

              <TextField
                label="Email"
                variant="outlined"
                className="w-full md:w-96 my-2"
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />

              <TextField
                label="Address 1"
                variant="outlined"
                className="w-full my-2"
                {...register("address1")}
                error={errors.address1 ? true : false}
                helperText={errors.address1?.message}
              />

              <TextField
                label="Address 2"
                variant="outlined"
                className="w-full my-2"
                {...register("address2")}
                error={errors.address2 ? true : false}
                helperText={errors.address2?.message}
              />

              <TextField
                label="City"
                variant="outlined"
                className="w-full md:w-64 my-2"
                {...register("city")}
                error={errors.city ? true : false}
                helperText={errors.city?.message}
              />

              <TextField
                label="State"
                variant="outlined"
                className="w-28 md:w-32 md:mx-4 my-2"
                {...register("state")}
                error={errors.state ? true : false}
                helperText={errors.state?.message}
              />

              <TextField
                label="Zip Code"
                variant="outlined"
                className="w-44 md:w-32 ml-4 md:ml-0 my-2"
                {...register("zip")}
                error={errors.zip ? true : false}
                helperText={errors.zip?.message}
              />

              <div className="flex flex-wrap w-full my-6">
                <h1 className="w-full mb-3">Payment Methods</h1>

                <div className="flex my-2">
                  {
                    paymentImageURLs.map((src: string, index: number) => (
                      <img key={index} src={src} alt="method_image" width={48} height={30} className="mx-1" />
                    ))
                  }
                </div>

                <TextField
                  label="Credit Card Number"
                  variant="outlined"
                  className="w-full my-2"
                  {...register("creditNumber")}
                  error={errors.creditNumber ? true : false}
                  helperText={errors.creditNumber?.message}
                />

                <div className="flex items-center w-full">
                  <h1 className="text-gray-400">Expiration Date</h1>

                  <SelectInput
                    label="MM"
                    className="w-20 mx-4 my-2"
                    handler={register("expireMonth")}
                    error={errors.expireMonth ? true : false}
                    helperText={errors.expireMonth?.message}
                    options={{ data: monthDropDown }}
                  />

                  <SelectInput
                    label="YYYY"
                    className="w-24 my-2"
                    handler={register("expireYear")}
                    error={errors.expireYear ? true : false}
                    helperText={errors.expireYear?.message}
                    options={{ data: yearDropDown }}
                  />
                </div>

                <TextField
                  label="Zip Code"
                  variant="outlined"
                  className="w-28 my-2"
                  {...register("creditZip")}
                  error={errors.creditZip ? true : false}
                  helperText={errors.creditZip?.message}
                />

                <PasswordInput
                  label="CVV"
                  className="w-44 md:w-40 ml-4 my-2"
                  handler={register("creditCode")}
                  error={errors.creditCode ? true : false}
                  helperText={errors.creditCode?.message}
                />

                <TextField
                  label="Card Owner Name"
                  variant="outlined"
                  className="w-full md:w-60 md:ml-4 my-2"
                  {...register("creditOwner")}
                  error={errors.creditOwner ? true : false}
                  helperText={errors.creditOwner?.message}
                />
              </div>

              <PasswordInput
                label="Password"
                className="w-full my-2"
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

              <p className="my-8 text-gray-400">※ Credit card informations are not required for the account creation. You can set it when you take an order.</p>
            </div>


            <Button
              type="submit"
              variant="contained"
              className="w-80 h-12 my-8 bg-primary font-bold tracking-widest"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "register"}
            </Button>

            <div className="flex items-center">
              <p>Already have an account?</p>
              <Link to={"/user/login"} className="mx-2 underline hover:text-blue-500">Sign in</Link>
            </div>

            <div className="flex items-center my-2">
              <p>Go back to </p>
              <Link to={"/"} className="mx-2 underline hover:text-blue-500">Homepage</Link>
            </div>
          </form>
        </div>
      </div>

      <AuthBannerImage />
    </main>
  );
}
