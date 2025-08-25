import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDevice } from '@/context/device-context';
import styles from './login.module.scss';
import EmailLogin from './components/EmailLogin';

export default function Login() {

  const { isMobile } = useDevice();
  const { t } = useTranslation();
  const router = useRouter();

  const responseMessage = (response: any) => {
    console.log(jwtDecode(response.credential));
    
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div className='h100 w100 verticalCenter horizontalCenter'>
      <div className='w100'>
        <div className={`${isMobile ? 'p-l-16 p-r-16' : 'flex'}`}>
          <div className={`verticalCenter horizontalCenter ${isMobile ? '' : `${styles.w50p}`}`}>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage as any} />
          </div>
          {isMobile && <div className='p-t-32 p-b-32 horizontalCenter'>{t('login.or')}</div>}
          <EmailLogin/>
        </div>
      </div>
    </div>
  );
}