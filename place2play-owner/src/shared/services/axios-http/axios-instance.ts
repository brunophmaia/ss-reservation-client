import { getSnackbar } from '@/context/snackbar-context';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const createAxiosInstance = (): AxiosInstance => {

  const { t } = useTranslation();
  const router = useRouter();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
  });

  instance.interceptors.response.use(
    response => response.data,
    error => {

      const { openSnackbar } = getSnackbar();
      
      if(error?.response?.status == 401 || error?.response?.status == 403) {
        
        router.push(process.env.NEXT_PUBLIC_AUTH_URI as string);
        return Promise.reject(error);
      }

      openSnackbar(t(error.response?.data?.message || 'common.anErrorOccurred'), 'error');
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
