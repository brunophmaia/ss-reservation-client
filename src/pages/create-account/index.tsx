import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDevice } from "@/context/device-context";
import styles from './CreateAccount.module.scss';
import PasswordTextField from "@/shared/components/password-text-field/password-text-field";
import { Account } from "./models/account.model";
import EmailTextField from "@/shared/components/email-text-field/email-text-field";
import { BirthDateMask, checkValidForm, PhoneMask } from "./util/create-account.util";

interface FormCreateAcount {
  value: string;
  valid: boolean;
}

const initForm: FormCreateAcount = {
  valid: true,
  value: ''
};

export default function CreateAccount() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();
  
  const [nameForm, setNameForm] = useState<FormCreateAcount>(initForm);
  const [lastNameForm, setLastNameForm] = useState<FormCreateAcount>(initForm);
  const [birthDateForm, setBirthDateForm] = useState<FormCreateAcount>(initForm);
  const [genderForm, setGenderForm] = useState<FormCreateAcount>(initForm);
  const [emailForm, setEmailForm] = useState<FormCreateAcount>(initForm);
  const [passwordForm, setPasswordForm] = useState<FormCreateAcount>(initForm);
  const [passwordConfirmationForm, setPasswordConfirmationForm] = useState<FormCreateAcount>(initForm);
  const [phoneForm, setPhoneForm] = useState<FormCreateAcount>(initForm);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const account = new Account(nameForm.value, lastNameForm.value, birthDateForm.value, genderForm.value, emailForm.value, passwordForm.value, passwordConfirmationForm.value, phoneForm.value);
    const accountValidation = checkValidForm(account);
  };

  return (
    <div className='flex'>
      <div className='horizontalCenter'>
        <div className={`p-l-16 p-r-16 ${isMobile ? '' : styles.w25}`}>
          <Typography variant='h4' className="horizontalCenter p-t-32 p-b-32">{t('createAccount.createAccountTitle')}</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <div className="flex p-b-16">
              <TextField 
                className="w100 text-field-override"
                required
                label={t('createAccount.name')}
                FormHelperTextProps={{ className: styles.marginHelper }}
                helperText={!nameForm.valid ? t('common.enterField', {field: t('createAccount.name')}) : ""}
                error={!nameForm.valid}
                variant="outlined"
                value={nameForm.value}
                onChange={e => setNameForm({value: e.target.value, valid: !!e.target.value})}/>
            </div>
            <div className="flex p-b-16">
              <TextField 
                className='w100 text-field-override'
                required
                label={t('createAccount.lastName')}
                helperText={!lastNameForm.valid ? t('common.enterField', {field: t('createAccount.lastName')}) : ""}
                FormHelperTextProps={{ className: styles.marginHelper }}
                error={!lastNameForm.valid}
                variant="outlined"
                value={lastNameForm.value}
                onChange={e => setLastNameForm({value: e.target.value, valid: !!e.target.value})}/>
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
                  value={birthDateForm.value}
                  onChange={e => setBirthDateForm({value: e.target.value, valid: !!e.target.value})}/>
                  {!birthDateForm.valid && (
                    <FormHelperText className={styles.marginHelper} error>
                      {t('common.enterField', {field: t('createAccount.birthDate')})}
                    </FormHelperText>
                  )}
              </FormControl>
            </div>
            <div className="p-b-16">
              <FormControl  className="text-field-override">
                <FormLabel id="radio-buttons-group-gender">{t('createAccount.gender')}</FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-gender"
                  name="radio-buttons-group-gender"
                  value={genderForm.value}
                  onChange={e => setGenderForm({value: e.target.value, valid: !!e.target.value})}
                >
                  <FormControlLabel required value="M" control={<Radio />} label={t('createAccount.male')} />
                  <FormControlLabel required value="F" control={<Radio />} label={t('createAccount.female')} />
                  <FormControlLabel required value="O" control={<Radio />} label={t('createAccount.other')} />
                </RadioGroup>
                {!genderForm.valid && (
                  <FormHelperText className={styles.marginHelper} error>
                    {t('common.enterField', {field: t('createAccount.gender')})}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flex p-b-16">
              <EmailTextField
                onInputChange={(value: string) => {setEmailForm({value: value, valid: !!value})}}/>
            </div>
            <div className="flex p-b-16">
              <PasswordTextField
                id='passwordCreate'
                onInputChange={(value: string) => {setPasswordForm({value: value, valid: !!value})}}
                helperMessage={t('common.enterField', {field: t('common.password')})} >
              </PasswordTextField>
            </div>
            <div className="flex p-b-16">
            <PasswordTextField
                id='passwordConfirmationCreate'
                onInputChange={(value: string) => {setPasswordConfirmationForm({value: value, valid: !!value})}}
                helperMessage={t('common.enterField', {field: t('createAccount.confirmPassword')})}
                label={t('createAccount.confirmPassword')} >
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
                  value={phoneForm.value}
                  onChange={e => setPhoneForm({value: e.target.value, valid: !!e.target.value})}
                  inputComponent={PhoneMask as any}
                />
                {!phoneForm.valid && (
                  <FormHelperText className={styles.marginHelper} error>
                    {t('common.enterField', {field: t('createAccount.phoneNumber')})}
                  </FormHelperText>
                )}
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

