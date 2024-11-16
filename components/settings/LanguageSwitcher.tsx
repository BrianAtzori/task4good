import React from 'react';
import {StyleSheet} from 'react-native';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {t} from 'i18next';

const languageMap = {
  Italiano: 'it',
  Espanol: 'en',
  Francais: 'fr',
  English: 'eng',
};

export const LanguageSwitcher = (): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0),
  );

  const languages = Object.keys(languageMap);

  return (
    <Select
      style={styles.languageSelect}
      selectedIndex={selectedIndex}
      value={languages[selectedIndex.row]}
      placeholder={t('selectOptionLabel')}
      onSelect={index => {
        setSelectedIndex(index as IndexPath);
      }}>
      {languages.map((language, idx) => (
        <SelectItem title={language} key={idx} />
      ))}
    </Select>
  );
};

const styles = StyleSheet.create({languageSelect: {minWidth: 200}});
