import React from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

import { numberTo2Digit } from "../../utils/functions";
import { SelectInputProps } from "../../types/props";

const SelectInput = (props: SelectInputProps) => {
  //  Destructure component props
  const { label, variant, className, handler, error, helperText, options } = props;
  const { data, valueKey, labelKey }: any = options;

  return (
    <FormControl className={className} error={error}>
      <InputLabel id="item-select">{label}</InputLabel>
      <Select
        labelId="item-select"
        label={label}
        variant={variant ? variant : "outlined"}
        defaultValue={valueKey ? data[0][valueKey] : data[0]}
        {...handler}
        MenuProps={{
          PaperProps: {
            style: { maxHeight: 240 },
          },
        }}
      >
        <MenuItem hidden value="">{label}</MenuItem>

        {data.map((option: string, index: number) => (
          <MenuItem key={index} value={valueKey ? option[valueKey] : option}>
            {labelKey ? option[labelKey] : numberTo2Digit(Number(option))}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
