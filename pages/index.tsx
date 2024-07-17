import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'
import Typography from '@mui/material/Typography';
import { useDevice } from '@/context/device-context';
import { useRouter } from 'next/navigation';

export default function LoginType() {

  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const router = useRouter();

  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  return (
    <div className={`${'h100 w100'} ${styles.flexColumn}`}>
      <Typography variant='h4' className={`horizontalCenter p-l-32 p-r-32 p-t-32 ${styles.clsTitle}`}>{t('welcomeApp', {appName})}</Typography>
      <div className='h100 verticalCenter horizontalCenter'>
        <div className={`${isMobile ? styles.flexColumn : ''}`}>
            <Button className={isMobile ? 'm-b-8' : 'm-r-8'}
                    variant="contained"
                    onClick={() => router.push('/login?t=player')}>{t('player')}
            </Button>
            <Button className={isMobile ? 'm-t-8' : 'm-l-8'} 
                    variant="contained"
                    onClick={() => router.push('/login?t=owner')}>{t('owner')}
            </Button>
        </div>
      </div>
    </div>
  );
}
