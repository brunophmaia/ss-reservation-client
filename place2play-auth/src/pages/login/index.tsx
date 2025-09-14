import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { useDevice } from '@/context/device-context';
import styles from './login.module.scss';
import EmailLogin from './components/EmailLogin';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

export default function Login() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();
  let [loginType, setLoginType] = useState<string|undefined>(undefined);

  const responseMessage = (response: any) => {
    console.log(jwtDecode(response.credential));
    
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };
  const onChangeLoginType = (e: any, value: string) => {
    setLoginType(value);
  };

  return (
    <div className='h100 w100 verticalCenter horizontalCenter'>
      <div className='w100'>
        <div className='horizontalCenter p-b-32' >
          <ToggleButtonGroup
            style={{ backgroundColor: '#ffffff'}}
            value={loginType}
            exclusive
            onChange={onChangeLoginType}
          >
            <ToggleButton value="player">{t('login.player')}</ToggleButton>
            <ToggleButton value="owner">{t('login.owner')}</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className={`${isMobile ? 'p-l-16 p-r-16' : 'flex'}`}>
          <div className={`verticalCenter horizontalCenter ${isMobile ? '' : `${styles.w50p}`}`}>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage as any} />
          </div>
          {isMobile && <div className='p-t-32 p-b-32 horizontalCenter'>{t('login.or')}</div>}
          <EmailLogin loginType={loginType} />
        </div>
      </div>
    </div>
  );
}