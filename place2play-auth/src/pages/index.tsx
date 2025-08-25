import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import Typography from '@mui/material/Typography';
import { useDevice } from '@/context/device-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserInfo } from '@/shared/models/user-info.model';
import { HomeService } from './home/service/home.service';

export default function LoginType() {

  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const router = useRouter();

  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const homeService = new HomeService();

  useEffect(() => {
      homeService.getUserInfo().then((user: UserInfo) => {
          //TODO: change to redirect param
          router.push('http://localhost:3001');
      }).catch(() => {
          router.push('/login');
      });
  }, []);

  return (
    <div className={`${'h100 w100'} ${styles.flexColumn}`}>
      <Typography variant='h4' className={`horizontalCenter p-l-32 p-r-32 p-t-32 ${styles.clsTitle}`}>{t('home.welcomeApp', {appName})}</Typography>
      <div className='h100 verticalCenter horizontalCenter'>
        <div className={`${isMobile ? styles.flexColumn : ''}`}>
            <Typography variant='h6'>{t('home.redirecting')}...</Typography>
        </div>
      </div>
    </div>
  );
}
