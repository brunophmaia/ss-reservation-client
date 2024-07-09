import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import ptTranslation from './locales/pt.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'pt',
    resources: {
        pt: {
            ...ptTranslation
        },
        en: {
            ...enTranslation
        }
    },
    interpolation: {
        escapeValue: false
    }
  })

export default i18n;