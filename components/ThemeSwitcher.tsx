import React from 'react';
import {ThemeContext} from '../style/theme-context';
import {Button} from '@ui-kitten/components';

export default function ThemeSwitcher() {
  const themeContext = React.useContext(ThemeContext);

  return <Button onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>;
}
