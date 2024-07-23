import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDevice } from '@/context/device-context';
import { Box, Button, TextField } from '@mui/material';
import styles from './EmailLogin.module.scss';
import PasswordTextField from '@/shared/components/password-text-field/password-text-field';

export default function EmailLogin(){

    const router = useRouter();
    const { isMobile } = useDevice();
    const { t } = useTranslation();
  
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [credentialError, setCredentialError] = useState(false);
  
    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
      setEmailError(!e.target.validity.valid);
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      setCredentialError(!e.target.checkValidity());
    };
  
    return (
      <div className={`${isMobile ? '' : styles.w50p}`}>
        <div className={`${isMobile ? '' : styles.w70p}`}>
          <div className='p-b-16'>{t('login.loginWithEmail')}</div>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <div className='flex'>
              <TextField 
                className='w100 text-field-override'
                required
                label={t('common.email')}
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? t('login.validEmail') : ""}
                inputProps={{
                  type: "email",
                }}
                variant="outlined" />
            </div>
            <div className='flex p-t-8'>
              <PasswordTextField/>
            </div>
            <div className='p-t-32 p-b-16'>
              <div className='flex'>
                <Button type="submit" className='w100' variant="contained">{t('login.login')}</Button>
              </div>
              {credentialError && <div className={`p-t-4 ${styles.warning}`}>
                {t('login.inputEmailPswd')}
              </div>}
            </div>
          </Box>
          <div className='p-t-32'><a className={styles.createAnc} onClick={() => router.push('/create-account')}>{t('login.createAccount')}</a></div>
        </div>
      </div>
    );
  }