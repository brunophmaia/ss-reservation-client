import { FormControl, FormControlLabel, FormLabel, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from 'react-imask';
import { useDevice } from "@/context/device-context";
import styles from './CreateAccount.module.scss';
import PasswordTextField from "@/shared/components/password-text-field/password-text-field";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function CreateAccount() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();

  return (
    <div className='flex'>
      <div className='horizontalCenter'>
        <div className={`p-l-16 p-r-16 ${isMobile ? '' : styles.w25}`}>
          <Typography variant='h4' className="horizontalCenter p-t-32 p-b-32">{t('createAccount.createAccountTitle')}</Typography>
          <div className="flex p-b-16">
            <TextField 
              className='w100 text-field-override'
              required
              label={t('createAccount.name')}
              variant="outlined" />
          </div>
          <div className="flex p-b-16">
            <TextField 
              className='w100 text-field-override'
              required
              label={t('createAccount.lastName')}
              variant="outlined" />
          </div>
          <div className="flex p-b-16">
            <FormControl required className='w100 text-field-override' variant="outlined">
              <InputLabel htmlFor="birthDate-mask-input">{t('createAccount.birthDate')}</InputLabel>
              <OutlinedInput
                placeholder="dd/mm/yyyy"
                label={t('createAccount.birthDate')}
                name="textmask"
                id="birthDate-mask-input"
                inputComponent={BirthDateMask as any}
              />
            </FormControl>
          </div>
          <div className="p-b-16">
            <FormControl required className="text-field-override">
              <FormLabel id="radio-buttons-group-gender">{t('createAccount.gender')}</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons-group-gender"
                name="radio-buttons-group-gender"
              >
                <FormControlLabel value="male" control={<Radio />} label={t('createAccount.male')} />
                <FormControlLabel value="female" control={<Radio />} label={t('createAccount.female')} />
                <FormControlLabel value="other" control={<Radio />} label={t('createAccount.other')} />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex p-b-16">
            <TextField 
              className='w100 text-field-override'
              required
              label={t('common.email')}
              variant="outlined" />
          </div>
          <div className="flex p-b-16">
            <PasswordTextField/>
          </div>
          <div className="flex p-b-16">
            <PasswordTextField/>
          </div>
          <div className="flex p-b-16">
            <FormControl required className='w100 text-field-override' variant="outlined">
              <InputLabel htmlFor="phone-mask-input">{t('createAccount.phoneNumber')}</InputLabel>
              <OutlinedInput
                placeholder="(  ) ____ - ____"
                label={t('createAccount.phoneNumber')}
                name="textmask"
                id="phone-mask-input"
                inputComponent={PhoneMask as any}
              />
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

const PhoneMask = React.forwardRef<HTMLInputElement, CustomProps>(
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

const BirthDateMask = React.forwardRef<HTMLInputElement, CustomProps>(
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