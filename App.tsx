import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {
  ApplicationProvider,
  Button,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {storage} from './db/mmkv';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from './style/theme-context';
import ThemeSwitcher from './components/ThemeSwitcher';
import {lightTheme} from './style/custom-theme-light';
import {darkTheme} from './style/custom-theme-dark';

// @ui-kitten/eva-icons

function App(): React.JSX.Element {
  const [theme, setTheme] = React.useState('light');

  const [counter, setCounter] = useState(0);

  const [sampleState, setSampleState] = useState({
    username: '',
    age: 0,
    isMmkvFastAsf: false,
  });

  const {t} = useTranslation();

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

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={currentTheme}>
          <SafeAreaView>
            <Image
              source={require('./assets/logo_task4good_png.png')}
              style={styles.logo}
            />
            <Layout style={styles.container} level="1">
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
              <Text style={styles.text}>{`Language is set to ${t(
                'lang',
              )}`}</Text>
              <ThemeSwitcher />
            </Layout>
          </SafeAreaView>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

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
