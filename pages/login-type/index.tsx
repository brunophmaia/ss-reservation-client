import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'
import styles from './login-type.module.scss'
import Typography from '@mui/material/Typography';
import { useDevice } from '@/context/device-context';

export default function LoginType() {

  const { t } = useTranslation();
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const onClick = () => {
    document.body.className = 'light-theme';
  };

  const { isMobile } = useDevice();

  return (
    <div className={`${'h100 w100'} ${styles.flexColumn}`}>
      <Typography variant='h4' className={`horizontalCenter p-l-32 p-r-32 p-t-32 ${styles.clsTitle}`}>{t('welcomeApp', {appName})}</Typography>
      <div className='h100 verticalCenter horizontalCenter'>
        <div className={`${isMobile ? styles.flexColumn : ''}`}>
            <Button className={isMobile ? 'm-b-8' : 'm-r-8'} variant="contained">{t('player')}</Button>
            <Button className={isMobile ? 'm-t-8' : 'm-l-8'} onClick={onClick} variant="contained">{t('owner')}</Button>
        </div>
      </div>
    </div>
  );
}
