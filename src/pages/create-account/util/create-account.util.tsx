import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const isNotNullOrEmpty = (value: any): boolean => {
  return !!(value);
}

export const getBirthDateFromStr = (value: string): Date => {
  const dateSplitted = value.split('/');
  return new Date(`${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`);
}

export const getPhoneDigitsFromStr = (value: string): string => {
  const phoneDigits = value.replaceAll('(','')
                           .replaceAll(')','')
                           .replaceAll('-','')
                           .replaceAll(' ','');
  return phoneDigits;
}

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