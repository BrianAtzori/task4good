import React from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {
  ApplicationProvider,
  Icon,
  // Button,
  IconRegistry,
  // Layout,
  // Text,
} from '@ui-kitten/components';
// import {storage} from './db/mmkv';
// import {useTranslation} from 'react-i18next';
import {ThemeContext} from './style/theme-context';
// import ThemeSwitcher from './components/ThemeSwitcher';
import {lightTheme} from './style/custom-theme-light';
import {darkTheme} from './style/custom-theme-dark';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  darkNavigationTheme,
  lightNavigationTheme,
} from './style/navigationThemes';
import PersonalTasksScreen from './screens/PersonalTasksScreen';
import GreenTasksScreen from './screens/GreenTasksScreen';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const currentNavigationTheme =
    theme === 'dark' ? darkNavigationTheme : lightNavigationTheme;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={currentTheme}>
          <SafeAreaProvider>
            <NavigationContainer theme={currentNavigationTheme}>
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: currentTheme['color-primary-500'],
                  tabBarInactiveTintColor: currentTheme['color-basic-400'],
                  tabBarStyle: {
                    backgroundColor: currentTheme['color-basic-100'],
                  },
                }}>
                {/* //TODO: Tradurre label */}
                <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    title: 'My profile',
                    tabBarIcon: ({size, focused, color}) => {
                      return <Icon fill="#8F9BB3" name="home" />;
                    },
                  }}
                />
                <Tab.Screen
                  name="PersonalTasks"
                  component={PersonalTasksScreen}
                />
                <Tab.Screen name="GreenTasks" component={GreenTasksScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
