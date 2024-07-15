import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'
import styles from './login-type.module.scss'
import Typography from '@mui/material/Typography';

export default function LoginType() {

  const { t } = useTranslation();
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const onClick = () => {
    document.body.className = 'light-theme';
  };

  return (
    <div className={`${'h100 w100'} ${styles.flexColumn}`}>
      <Typography variant='h4' className={`horizontalCenter ${styles.clsTitle}`}>{t('welcomeApp', {appName})}</Typography>
      <div className='h100 verticalCenter horizontalCenter'>
        <div>
            <Button variant="contained">{t('player')}</Button>
            <Button onClick={onClick} variant="contained">SOU PROPRIETÁRIO</Button>
        </div>
      </div>
    </div>
  );
}
