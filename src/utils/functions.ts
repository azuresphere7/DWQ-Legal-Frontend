import { AxiosError } from "axios";
import { AxiosErrorType } from "./enums";
import { orderType, stateInfo } from "../config/static-data";
import { StateTitle } from "../types/user";

//  Remove non-digit characters from the phone number
export function isValidPhoneNumber(input: string): boolean {
  const phoneNumber = input.replace(/\D/g, "");

  //  Validate the phone number format
  const phoneRegex = /^(?:\+?1\s?)?(?:\(\d{3}\)|\d{3})(?:[-.\s]?)\d{3}(?:[-.\s]?)\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

export function formatPhoneNumber(value: string) {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[2] + ") " + match[3] + "-" + match[4];
  } else {
    return null;
  }
}

export function clearFormat(value: string): string {
  const replacedNumber: string = value.replace(/\D/g, "");

  //  Add US country code by default if not added
  return replacedNumber.length <= 10 ? "1" + replacedNumber : replacedNumber;
}

//  Remove non-digit characters from the credit card number
export function isValidCreditCardNumber(input: string): boolean {
  const cleanedNumber = input.replace(/\D/g, "");

  //  Check if the number is empty or doesn"t contain only digits
  if (!cleanedNumber || !/^\d+$/.test(cleanedNumber)) {
    return false;
  }

  //  Use the Luhn algorithm to validate the credit card number
  let sum = 0;
  let double = false;

  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber[i], 10);

    if (double) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
}

// Check if the state name is valid
export function isValidState(value: string) {
  if (stateInfo.findIndex((state: StateTitle) => state.name === value) > -1) {
    return true;
  } else {
    return false;
  }
}

// Check if the payment info is valid
export function isValidPaymentInfo(user: any) {
  const { creditNumber, expireMonth, expireYear, creditZip, creditCode, creditOwner } = user;

  if (creditNumber && creditZip && creditCode && creditOwner && expireMonth && expireYear) {
    return true;
  } else {
    return false;
  }
}

// Get state name with 2 characters
export function getStateCode(value: string) {
  const index: number = stateInfo.findIndex((state: StateTitle) => state.name === value);
  return stateInfo[index].abbreviation;
}

// Return all numbers with 2 digits
export function numberTo2Digit(value: number) {
  return value < 10 ? `0${value}` : value;
}

// Return hide credit card number except last 4 digits
export function formatCreditCardNumber(input: string) {
  const numericInput = input.replace(/\D/g, "");
  const formattedInput = numericInput.match(/.{1,4}/g);
  const formattedNumber = formattedInput ? formattedInput.join(" ") : "";

  let encryptedNumber: string = "";

  for (let i = 0; i < formattedNumber.length; i++) {
    if (i < formattedNumber.length - 4 && formattedNumber[i] !== " ") {
      encryptedNumber += "•";
    } else {
      encryptedNumber += formattedNumber[i];
    }
  }

  return encryptedNumber;
}

// Find key from order data with headcell id
export function findOrderRecordValue(id: string, data: any) {
  const column = data[id];

  if (typeof column === "object") {
    return column.join(", ");
  } else if (id === "type") {
    return orderType.map(type => type.value === column && type.label);
  } else {
    return column;
  }
}

// Throw Error when Axios returns an error
export function handleAxiosError(error: AxiosError) {
  console.log(error);

  switch (error.code) {
  case AxiosErrorType.BAD_RESPONSE: {
    throw error.response?.data;
  }
  default: {
    throw error;
  }
  }
}