import React from 'react';
import * as eva from '@eva-design/eva';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {ApplicationProvider, Button, Layout, Text} from '@ui-kitten/components';

function App(): React.JSX.Element {
  const [counter, setCounter] = React.useState(0);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView>
        <Image
          source={require('./assets/logo_task4good_png.png')}
          style={styles.logo}
        />
        <Layout style={styles.container} level="1">
          <Button onPress={() => setCounter(counter + 1)}>BUTTON</Button>

          <Text style={styles.text}>{`Pressed ${counter} times`}</Text>
        </Layout>
      </SafeAreaView>
    </ApplicationProvider>
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
