import {Text} from '@ui-kitten/components';
import {t} from 'i18next';
import React from 'react';
import {StyleSheet} from 'react-native';

export default function PageTitleComponent({title}: {title: string}) {
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
