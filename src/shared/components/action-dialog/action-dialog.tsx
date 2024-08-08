import { Button, Dialog, DialogActions, DialogContent, DialogTitle  } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ActionDialog({ open, onClose, title, children, onConfirm, confirmEnabled }: any) {

    const { t } = useTranslation();

    return (
        <Dialog className="pop-up-bkg" open={open} onClose={onClose}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions className='p-r-20 p-b-20'>
            <Button variant="contained" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button disabled={!confirmEnabled} variant="contained" onClick={onConfirm}>
            {t('common.confirm')}
            </Button>
          </DialogActions>
        </Dialog>
    );
}