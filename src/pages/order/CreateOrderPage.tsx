import React, { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { MuiChipsInput } from "mui-chips-input";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { orderType } from "../../config/static-data";
import LabelInputWrapper from "../../components/form/LabelnputWrapper";
import SelectInput from "../../components/custom-input/SelectInput";
import ButtonLoader from "../../components/shared/ButtonLoader";
import { OrderInput, OrderSchema } from "../../lib/validations/order.schema";
import { placeOrder } from "../../redux/actions/order.action";
import { ReduxResponse } from "../../types/store";
import { clearFormat, getStateCode } from "../../utils/functions";

export default function CreateOrderPage() {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const { user } = useSelector(({ userReducer }) => userReducer);
  const { isLoading } = useSelector(({ orderReducer }) => orderReducer);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [notify, setNotify] = useState<boolean>(true);
  const [submitData, setSubmitData] = useState<any>(null);

  // Destructure form hooks for the input
  const methods = useForm<OrderInput>({ resolver: zodResolver(OrderSchema) });
  const { register, handleSubmit, reset, formState } = methods;
  const { errors } = formState;

  // Handle confirm dialog
  const handleConfirmDialogOpen = () => setIsConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setIsConfirmDialogOpen(false);

  const submit = () => {
    dispatch(placeOrder(submitData))
      .then((response: ReduxResponse) => {
        handleConfirmDialogClose();

        if (response.success) {
          toast.success(response.message);
          reset();
          navigate("/");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error: Error) => {
        handleConfirmDialogClose();
        toast.error(error.message);
      });
  };

  // Open confirmation dialog when submit
  const onSubmit = (data: OrderInput) => {
    if (user) {
      if (user.state && user.email) {
        setSubmitData({
          ...data,
          email: user.email,
          state: getStateCode(user.state),
          phoneNumber: clearFormat(data.phoneNumber),
          notify
        });

        handleConfirmDialogOpen();
      } else {
        toast.error("User is not an ordering party. Please complete your profile.");
      }
    } else {
      toast.error("Please login to the platform.");
    }
  };

  return (
    <main className="flex justify-center w-full">
      <form className="container flex flex-col w-full pl-8 pr-24 py-16 fade-up-anim anim-500" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl ml-4 mb-8">CREATE AN ORDER</h1>

        <LabelInputWrapper label="Account Code:" className="w-full md:w-1/2">
          <TextField
            variant="standard"
            className="w-full"
            {...register("accountCode")}
            error={errors.accountCode ? true : false}
            helperText={errors.accountCode?.message}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Document Type:" className="w-full md:w-2/5">
          <SelectInput
            variant="standard"
            className="w-full"
            handler={register("type")}
            error={errors.type ? true : false}
            helperText={errors.type?.message}
            options={{
              data: orderType,
              labelKey: "label",
              valueKey: "value"
            }}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Court of Docket:" className="w-full md:w-3/5">
          <TextField
            variant="standard"
            className="w-full"
            {...register("court")}
            error={errors.court ? true : false}
            helperText={errors.court?.message}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Cause Number:" className="w-full md:w-3/5">
          <TextField
            variant="standard"
            className="w-full"
            {...register("causeNumber")}
            error={errors.causeNumber ? true : false}
            helperText={errors.causeNumber?.message}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Plaintiff List" className="w-full mt-4 md:my-0">
          <Controller
            name="plaintiffs"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <MuiChipsInput
                value={value || []}
                variant="standard"
                className="w-full"
                placeholder="Separate emails by pressing Enter"
                onAddChip={(chip: string) => onChange([...(value || []), chip])}
                onDeleteChip={(chip, index) => onChange((value || []).filter((_, i) => i !== index))}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Defendant List" className="w-full mt-4 md:my-0">
          <Controller
            name="defendants"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <MuiChipsInput
                value={value || []}
                variant="standard"
                className="w-full"
                placeholder="Separate emails by pressing Enter"
                onAddChip={(chip: string) => onChange([...(value || []), chip])}
                onDeleteChip={(chip, index) => onChange((value || []).filter((_, i) => i !== index))}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Cell Phone Number:" className="w-full md:w-1/2 mt-6">
          <TextField
            variant="standard"
            className="w-full"
            {...register("phoneNumber")}
            error={errors.phoneNumber ? true : false}
            helperText={errors.phoneNumber?.message}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Carrier Code:" className="w-full md:w-1/3">
          <TextField
            variant="standard"
            className="w-full"
            {...register("phoneCode")}
            error={errors.phoneCode ? true : false}
            helperText={errors.phoneCode?.message}
          />
        </LabelInputWrapper>

        <LabelInputWrapper label="Notify to plaintiffs and defendants?" className="flex-col md:flex-row md:items-center">
          <FormControl>
            <RadioGroup value={notify} onChange={({ target: { value } }) => setNotify(value === "true")} row>
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </LabelInputWrapper>

        <div className="flex">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-48 h-12 mt-12 ml-4 bg-primary text-lg tracking-widest"
          >
            {"submit"}
          </Button>

          <Button
            variant="contained"
            color="error"
            className="w-48 h-12 mt-12 ml-4 bg-red-500 text-lg tracking-widest"
            onClick={() => navigate("/")}
          >
            {"cancel"}
          </Button>
        </div>
      </form>

      <Dialog open={isConfirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle className="text-center">
          <InfoIcon
            sx={{
              fontSize: 128,
              color: "orange"
            }}
          />
        </DialogTitle>

        <DialogContent className="flex flex-col items-center">
          <p className="mx-12 my-4 text-center text-2xl">Are you sure you want to place the order?</p>

          <div className="flex justify-center my-8">
            <Button
              variant="contained"
              color="primary"
              className="w-36 h-12 mx-4 bg-primary text-lg"
              onClick={submit}
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "yes"}
            </Button>

            <Button
              variant="contained"
              color="error"
              className="w-36 h-12 mx-4 bg-red-500 text-lg"
              onClick={handleConfirmDialogClose}
            >
              {"no"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
