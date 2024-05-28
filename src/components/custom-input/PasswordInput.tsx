import React from "react";
import { TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { PasswordInputProps } from "../../types/props";

const PasswordInput = (props: PasswordInputProps) => {
  const { label, className, handler, error, helperText } = props;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      variant="outlined"
      className={className}
      {...handler}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        )
      }}
      error={error}
      helperText={helperText}
    />
  );
};

export default PasswordInput;
