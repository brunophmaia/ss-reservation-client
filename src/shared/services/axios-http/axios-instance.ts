import { getSnackbar } from '@/context/snackbar-context';
import axios, { AxiosInstance } from 'axios';
import { useTranslation } from 'react-i18next';

const createAxiosInstance = (): AxiosInstance => {

  const { t } = useTranslation();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
  });

  instance.interceptors.response.use(
    response => response.data,
    error => {
      const { openSnackbar } = getSnackbar();
      openSnackbar(t(error.response?.data?.message || 'common.anErrorOccurred'), 'error');
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
