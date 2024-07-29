import React from "react";
import { AccountValidation } from "../models/account-valitation.model";
import { Account } from "../models/account.model";
import { IMaskInput } from "react-imask";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const checkValidForm = (account: Account): AccountValidation => {
    let accountValidation = new AccountValidation();
  
    if(!account.name) {
      accountValidation.name = true;
    }
  
    if(!account.lastName) {
      accountValidation.lastName = true;
    }
  
    if(!account.birthDate) {
      accountValidation.lastName = true;
    }
  
    if(!account.email) {
      accountValidation.email = true;
    }
  
    if(!account.password) {
      accountValidation.password = true;
    } 
    else {
      if(account.password == account.lastName) {
        accountValidation.passwordMismatch = true;
      }
    }
  
    if(!account.gender) {
      accountValidation.gender = true;
    }
  
    if(!account.phone) {
      accountValidation.phone = true;
    }
  
    if(!account.gender) {
      accountValidation.gender = true;
    }
  
    return accountValidation;
  };

export const PhoneMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function PhoneMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={[{mask: "(00) 0000-0000"},{mask: "(00) 0 0000-0000"}]}
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);
  
export const BirthDateMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function BirthDateMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00/00/0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);