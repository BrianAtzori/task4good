import React from 'react';

import {Image, SafeAreaView, StyleSheet} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Image
        source={require('./assets/logo_task4good_png.png')}
        style={style.logo}
      />
    </SafeAreaView>
  );
}

export default App;

const style = StyleSheet.create({
  logo: {
    margin: 'auto',
    width: '50%',
    height: '50%',
  },
});
