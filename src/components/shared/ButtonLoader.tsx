import React from "react";
import { CircularProgress } from "@mui/material";

const ButtonLoader = ({ size = 28 }: { size?: number }) => {
  return <CircularProgress color="inherit" size={size} />;
};

export default ButtonLoader;
