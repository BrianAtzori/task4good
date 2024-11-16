import React, {useState} from 'react';
import {ThemeContext} from '../../style/theme-context';
import {Toggle} from '@ui-kitten/components';

export default function ThemeSwitcher() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const themeContext = React.useContext(ThemeContext);

  function onThemeSwitchChange() {
    themeContext.toggleTheme();
    setIsChecked(!isChecked);
  }

  return <Toggle onChange={onThemeSwitchChange} checked={isChecked} />;
}
