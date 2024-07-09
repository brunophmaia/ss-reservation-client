import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'

export default function LoginType() {

  const { t } = useTranslation();

  return (
    <div className='verticalCenter h100 w100'>
      <div className='w100'>
        <div className={'horizontalCenter p-b-16'}>
          <Button variant="contained">{t('player')}</Button>
        </div>
          
        <div className='horizontalCenter p-t-16'>
          <Button variant="contained">SOU PROPRIETÁRIO</Button>
        </div>
      </div>
    </div>
  );
}
