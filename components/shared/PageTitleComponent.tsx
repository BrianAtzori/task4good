import {Text} from '@ui-kitten/components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

export default function PageTitleComponent({title}: {title: string}) {
  const {t} = useTranslation();

  return (
    <Text style={styles.title} category="h1">
      {t(title)}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 16,
  },
});
