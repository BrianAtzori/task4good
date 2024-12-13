import React from 'react';
import {ThemeContext} from '../../style/theme-context';
import {Toggle} from '@ui-kitten/components';

export default function ThemeSwitcher() {
  const {theme, toggleTheme} = React.useContext(ThemeContext);

  return <Toggle onChange={toggleTheme} checked={theme === 'dark'} />;
}
