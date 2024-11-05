import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import it from './it.json';
import fr from './fr.json';
import sp from './sp.json';

const resources = {
  en,
  it,
  fr,
  sp,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'it',
});

export default {i18n};
