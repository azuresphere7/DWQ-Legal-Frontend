import { SvgIconProps } from "@mui/material";
import { Order, OrderListType } from "./order";

//  User Authentication
export interface SelectInputProps {
  label?: string;
  variant?: string;
  className?: string;
  handler: any;
  error: boolean;
  helperText: string | undefined;
  options: {
    data: Array<any>;
    valueKey?: string;
    labelKey?: string;
  };
}

export interface PasswordInputProps {
  label: string;
  className: string;
  handler: any;
  error: boolean;
  helperText: string | undefined;
}

export interface AddressAutoCompleteProps {
  label: string;
  className: string;
  value: string;
  onChange: any;
}

export interface ConfirmCodeProps {
  value: string;
  onChange: any;
  errorMessage: string;
  setErrorMessage: any;
}


//  Homepage
export interface BannerProps {
  label: string;
  className?: string;
  src: string;
}


// Profile
export interface ProfileRecordProps {
  icon: React.ElementType<SvgIconProps>;
  content: string;
}

// Order
export interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof OrderListType) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface OrderDetailProps {
  open: boolean;
  onClose: () => void;
  data: OrderListType | undefined;
}