import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from 'react-imask';
import { useDevice } from "@/context/device-context";
import styles from './CreateAccount.module.scss';
import PasswordTextField from "@/shared/components/password-text-field/password-text-field";
import { Account } from "./models/account.model";
import { AccountValidation } from "./models/account-valitation.model";
import EmailTextField from "@/shared/components/email-text-field/email-text-field";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export default function CreateAccount() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();
  
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const account = new Account(name, lastName, birthDate, gender, email, password, passwordConfirmation, phone);
    checkValidForm(account);
  };

  return (
    <div className='flex'>
      <div className='horizontalCenter'>
        <div className={`p-l-16 p-r-16 ${isMobile ? '' : styles.w25}`}>
          <Typography variant='h4' className="horizontalCenter p-t-32 p-b-32">{t('createAccount.createAccountTitle')}</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <div className="flex p-b-16">
              <TextField 
                className='w100 text-field-override'
                required
                label={t('createAccount.name')}
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}/>
            </div>
            <div className="flex p-b-16">
              <TextField 
                className='w100 text-field-override'
                required
                label={t('createAccount.lastName')}
                variant="outlined"
                value={lastName}
                onChange={e => setLastName(e.target.value)}/>
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
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                />
              </FormControl>
            </div>
            <div className="p-b-16">
              <FormControl  className="text-field-override">
                <FormLabel id="radio-buttons-group-gender">{t('createAccount.gender')}</FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-gender"
                  name="radio-buttons-group-gender"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                >
                  <FormControlLabel required value="M" control={<Radio />} label={t('createAccount.male')} />
                  <FormControlLabel required value="F" control={<Radio />} label={t('createAccount.female')} />
                  <FormControlLabel required value="O" control={<Radio />} label={t('createAccount.other')} />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex p-b-16">
              <EmailTextField
                onInputChange={(value: string) => {setEmail(value)}}/>
            </div>
            <div className="flex p-b-16">
              <PasswordTextField
                id='passwordCreate'
                onInputChange={(value: string) => {setPassword(value)}} >
              </PasswordTextField>
            </div>
            <div className="flex p-b-16">
            <PasswordTextField
                id='passwordConfirmationCreate'
                onInputChange={(value: string) => {setPasswordConfirmation(value)}} >
              </PasswordTextField>
            </div>
            <div className="flex p-b-16">
              <FormControl required className='w100 text-field-override' variant="outlined">
                <InputLabel htmlFor="phone-mask-input">{t('createAccount.phoneNumber')}</InputLabel>
                <OutlinedInput
                  placeholder="(  ) ____ - ____"
                  label={t('createAccount.phoneNumber')}
                  name="textmask"
                  id="phone-mask-input"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  inputComponent={PhoneMask as any}
                />
              </FormControl>
            </div>
            <div className="flex p-t-32 p-b-32">
              <Button type="submit" className='w100' variant="contained">{t('createAccount.createAccountTitle')}</Button>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

const checkValidForm = (account: Account) => {
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

  console.log(account);
};

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