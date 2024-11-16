import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {storage} from '../db/mmkv';

function HomeScreen() {
  const [counter, setCounter] = useState(0);

  const [sampleState, setSampleState] = useState({
    username: '',
    age: 0,
    isMmkvFastAsf: false,
  });

  function writeData() {
    storage.set('user.name', 'Marc');
    storage.set('user.age', 21);
    storage.set('is-mmkv-fast-asf', true);
  }

  function readDataSetState() {
    const username = storage.getString('user.name');
    const age = storage.getNumber('user.age');
    const isMmkvFastAsf = storage.getBoolean('is-mmkv-fast-asf');

    setSampleState({username, age, isMmkvFastAsf});
  }

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
          <Button
            onPress={() => {
              writeData();
            }}>
            Set Data
          </Button>
          <Button
            onPress={() => {
              readDataSetState();
            }}>
            Read Data
          </Button>
          <Text
            style={
              styles.text
            }>{`State is: ${sampleState.username}, ${sampleState.age}, ${sampleState.isMmkvFastAsf}`}</Text>
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
