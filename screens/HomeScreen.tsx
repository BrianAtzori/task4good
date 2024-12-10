import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';

function HomeScreen() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <SafeAreaView>
        <Layout style={styles.container} level="1">
          <Image
            source={require('../assets/logo_task4good_png.png')}
            style={styles.logo}
          />
          <Button onPress={() => setCounter(counter + 1)}>Count</Button>
          <Text style={styles.text}>{`Pressed ${counter} times`}</Text>
        </Layout>
      </SafeAreaView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    margin: 'auto',
    width: '50%',
    height: '50%',
  },
  container: {
    width: '100%',
    margin: 'auto',
    padding: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    marginHorizontal: 8,
  },
});
