import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDevice } from "@/context/device-context";
import styles from './CreateAccount.module.scss';
import PasswordTextField from "@/shared/components/password-text-field/password-text-field";
import EmailTextField from "@/shared/components/email-text-field/email-text-field";
import { BirthDateMask, PhoneMask } from "./util/create-account.util";
import { AccountForm } from "./models/account-valitation.model";

export default function CreateAccount() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();

  let accountForm = new AccountForm();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if(accountForm.validate(e.target.checkValidity())){
      console.log('ok');
    }
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
                helperText={!accountForm.name.valid ? t('common.enterField', {field: t('createAccount.name')}) : ""}
                error={!accountForm.name.valid}
                variant="outlined"
                value={accountForm.name.value}
                onChange={e => accountForm.name.setValue(e.target.value)}/>
            </div>
            <div className="flex p-b-16">
              <TextField 
                className='w100 text-field-override'
                required
                label={t('createAccount.lastName')}
                helperText={!accountForm.lastName.valid ? t('common.enterField', {field: t('createAccount.lastName')}) : ""}
                FormHelperTextProps={{ className: styles.marginHelper }}
                error={!accountForm.lastName.valid}
                variant="outlined"
                value={accountForm.lastName.value}
                onChange={e => accountForm.lastName.setValue(e.target.value)}/>
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
                  value={accountForm.birthDate.value}
                  onChange={e => accountForm.birthDate.setValue(e.target.value)}/>
                  {!accountForm.birthDate.valid && (
                    <FormHelperText className={styles.marginHelper} error>
                      {accountForm.birthDate.showValidBirthDate ? t('createAccount.validBirthDate') : 
                                                                  t('common.enterField', {field: t('createAccount.birthDate')})}
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
                  value={accountForm.gender.value}
                  onChange={e => accountForm.gender.setValue(e.target.value)}
                >
                  <FormControlLabel required value="M" control={<Radio />} label={t('createAccount.male')} />
                  <FormControlLabel required value="F" control={<Radio />} label={t('createAccount.female')} />
                  <FormControlLabel required value="O" control={<Radio />} label={t('createAccount.other')} />
                </RadioGroup>
                {!accountForm.gender.valid && (
                  <FormHelperText className={styles.marginHelper} error>
                    {t('common.enterField', {field: t('createAccount.gender')})}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flex p-b-16">
              <EmailTextField
                showHelper={!accountForm.email.valid}
                onInputChange={(value: string) => {accountForm.email.setValue(value)}}/>
            </div>
            <div className="flex p-b-16">
              <PasswordTextField
                id='passwordCreate'
                showHelper={!accountForm.password.valid}
                onInputChange={(value: string) => {accountForm.password.setValue(value)}}
                helperMessage={accountForm.password.showConditionPswd ? t('createAccount.passwordCondition') :
                                                                        t('common.enterField', {field: t('common.password')})} >
              </PasswordTextField>
            </div>
            <div className="flex p-b-16">
            <PasswordTextField
                id='passwordConfirmationCreate'
                showHelper={!accountForm.passwordConfirmation.valid}
                onInputChange={(value: string) => {accountForm.passwordConfirmation.setValue(value)}}
                helperMessage={accountForm.passwordConfirmation.showMissmatch ? t('createAccount.passwordMissmatch') :
                                                                                t('common.enterField', {field: t('createAccount.confirmPassword')})}
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
                  value={accountForm.phone.value}
                  onChange={e => accountForm.phone.setValue(e.target.value)}
                  inputComponent={PhoneMask as any}
                />
                {!accountForm.phone.valid && (
                  <FormHelperText className={styles.marginHelper} error>
                    {accountForm.phone.showValidPhone ? t('createAccount.validPhone') : 
                                                        t('common.enterField', {field: t('createAccount.phoneNumber')})}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flexColumn p-t-32 p-b-32">
              <div className="flex">
                <Button type="submit" className='w100' variant="contained">{t('createAccount.createAccountTitle')}</Button>
              </div>
              {accountForm.showCheckFields && (
                <FormHelperText className={styles.marginHelper} error>
                  {t('createAccount.checkFields')}
                </FormHelperText>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

