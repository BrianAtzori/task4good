import {Layout, Text} from '@ui-kitten/components';
import {t} from 'i18next';
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

export default function EmptyTasks() {
  return (
    <Layout style={styles.emptyTasksLayout}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/logo_task4good_png.png')}
        resizeMode="cover"
      />
      <Text style={styles.emptyTasksText}>{t('emptyTasksListMessage')}</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  emptyTasksLayout: {
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
  },
  emptyTasksText: {
    zIndex: 1,
    position: 'absolute',
    top: 72,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  imageBackground: {
    width: 400,
    height: 400,
    opacity: 0.1,
    alignSelf: 'center',
    zIndex: 0,
  },
});
