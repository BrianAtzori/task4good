import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import it from './it.json';
import fr from './fr.json';
import es from './es.json';

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
  fr: {
    translation: fr,
  },
  es: {translation: es},
};

i18n.use(initReactI18next).init({
  lng: 'it',
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
