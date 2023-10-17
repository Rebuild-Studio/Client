import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koTranslation from './ko.json';

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: koTranslation }
  },
  lng: 'ko',
  fallbackLng: 'ko',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
