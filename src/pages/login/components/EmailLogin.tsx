import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDevice } from '@/context/device-context';
import { Box, Button } from '@mui/material';
import styles from './EmailLogin.module.scss';
import PasswordTextField from '@/shared/components/password-text-field/password-text-field';
import EmailTextField from '@/shared/components/email-text-field/email-text-field';
import { LoginService } from '../service/login.service';
import { Login } from '../models/Login.model';
import { getSnackbar } from '@/context/snackbar-context';
import LoadingButton from '@/shared/components/loading-button/loading-button';

export default function EmailLogin({loginType}: any){

  const { openSnackbar } = getSnackbar();
    const router = useRouter();
    const { isMobile } = useDevice();
    const { t } = useTranslation();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [credentialError, setCredentialError] = useState(false);

    const loginService = new LoginService();
  
    const handleSubmit = (e: any) => {
      e.preventDefault();

      const formInvalid: boolean = !username || !password;

      setCredentialError(formInvalid);

      if(formInvalid) {
        return;
      }

      setShowLoading(true);

      loginService.login(new Login(username, password)).then(() => {
        openSnackbar(t('login.loginSuccess'), 'success');
      })
      .finally(() => {
        setShowLoading(false);
      });;

    };
  
    return (
      <div className={`${isMobile ? '' : styles.w50p}`}>
        <div className={`${isMobile ? '' : styles.w70p}`}>
          <div className='p-b-16'>{t('login.loginWithEmail')}</div>
          <Box component="form" noValidate>
            <div className='flex p-b-16'>
              <EmailTextField
                onInputChange={(value: string) => {setUsername(value)}}
              />
            </div>
            <div className='flex p-t-8'>
              <PasswordTextField
                helperMessage={t('common.enterField', {field: t('common.password')})}
                onInputChange={(value: string) => {setPassword(value)}}
              />
            </div>
            <div className='p-t-32 p-b-16'>
              <div className='flex'>
                <LoadingButton
                  onClick={handleSubmit}
                  text={t('login.login')}
                  showLoading={showLoading}>
                </LoadingButton>
              </div>
              {credentialError && <div className={`p-t-4 ${styles.warning}`}>
                {t('login.inputEmailPswd')}
              </div>}
            </div>
          </Box>
          <div className='p-t-32'><a className={styles.createAnc} onClick={() => router.push(`/create-account?t=${loginType}`)}>{t('login.createAccount')}</a></div>
        </div>
      </div>
    );
  }