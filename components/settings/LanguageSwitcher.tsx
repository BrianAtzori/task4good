import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {storage} from '../../db/mmkv';
import {useTranslation} from 'react-i18next';

export const LanguageSwitcher = (): React.ReactElement => {
  const languageMap = useMemo(
    () => ({
      Italiano: 'it',
      Espanol: 'es',
      Francais: 'fr',
      English: 'en',
    }),
    [],
  );

  const {i18n, t} = useTranslation();

  const languages = Object.keys(languageMap);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(() => {
    const savedLanguage = storage.getString('selectedLanguage');

    if (savedLanguage) {
      const savedIndex = languages.findIndex(
        lang => (languageMap as any)[lang] === savedLanguage,
      );
      return savedIndex !== -1 ? new IndexPath(savedIndex) : new IndexPath(0);
    }

    return new IndexPath(0);
  });

  const changeLanguage = useCallback(
    (index: IndexPath) => {
      const selectedLanguage = languages[index.row];
      const locale = (languageMap as any)[selectedLanguage];

      i18n.changeLanguage(locale);

      try {
        storage.set('selectedLanguage', locale);
      } catch {
        console.log('Error saving language');
      }
    },
    [i18n, languageMap, languages],
  );

  useEffect(() => {
    const savedLanguage = storage.getString('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <Select
      style={styles.languageSelect}
      selectedIndex={selectedIndex}
      value={languages[selectedIndex.row]}
      placeholder={t('selectOptionLabel')}
      onSelect={index => {
        setSelectedIndex(index as IndexPath);
        changeLanguage(index as IndexPath);
      }}>
      {languages.map((language, idx) => (
        <SelectItem title={language} key={idx} />
      ))}
    </Select>
  );
};

const styles = StyleSheet.create({languageSelect: {minWidth: 200}});
