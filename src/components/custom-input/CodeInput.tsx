import React from "react";
import { TextField } from "@mui/material";
import { ConfirmCodeProps } from "../../types/props";

const ConfirmCode = (props: ConfirmCodeProps) => {
  const { value, onChange, errorMessage, setErrorMessage } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;

    if (!isNaN(Number(newValue)) && newValue.length <= 6) {
      onChange(newValue);
    }
    
    setErrorMessage("");
  };

  return (
    <TextField
      placeholder="______"
      className="w-80 mt-8 [&_input]:text-2xl [&_input]:text-center [&_input]:tracking-[12px] [&_p]:text-center [&_p]:my-2"
      autoComplete="off"
      value={value}
      onChange={handleChange}
      error={errorMessage.length > 0}
      helperText={errorMessage}
    />
  );
};

export default ConfirmCode;
