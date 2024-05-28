export interface StateTitle {
  name: string;
  abbreviation: string;
}

export interface TextInputType {
  value: string;
  pattern?: RegExp;
  errorMessage?: string;
  helperText: string;
}

export interface SelectInputType {
  value: string | number | boolean;
  pattern?: RegExp;
  errorMessage?: string;
  helperText: string;
}

export interface AddressDataType {
  label: string;
  year: number;
}

export interface VerifyEmailInput {
  email: string;
  code: string;
}

export interface ResetPasswordActionInput {
  email: string;
  code: string;
  newPassword: string;
}