import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {ThemeContext} from './style/theme-context';
import {lightTheme} from './style/custom-theme-light';
import {darkTheme} from './style/custom-theme-dark';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  darkNavigationTheme,
  lightNavigationTheme,
} from './style/navigationThemes';
import PersonalTasksScreen from './screens/PersonalTasksScreen';
import GreenTasksScreen from './screens/GreenTasksScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import SettingsIcon from './style/icons/SettingsIcon';
import HomeIcon from './style/icons/HomeIcon';
import GreenTaskIcon from './style/icons/GreenTasksIcon';
import PersonalTaskIcon from './style/icons/PersonalTaskIcon';
import AddTaskButton from './components/tasks/AddTaskButton';
import {useSelector} from 'react-redux';
import type {RootState} from './redux/store';
import TaskManagerModalComponent from './components/tasks/TaskManagerModalComponent';
import {storage} from './db/mmkv';
import i18n from './lang/i18n';
import {I18nextProvider, useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [theme, setTheme] = React.useState(
    storage.getString('appTheme') || 'light',
  );

  const {t} = useTranslation();

  const toggleTheme = React.useCallback(() => {
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      storage.set('appTheme', nextTheme);
      return nextTheme;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  const currentNavigationTheme =
    theme === 'dark' ? darkNavigationTheme : lightNavigationTheme;

  useEffect(() => {
    const savedLanguage = storage.getString('selectedLanguage') || 'it';

    i18n.changeLanguage(savedLanguage);
  }, []);

  const renderHomeIcon = ({color}: {color: string}) => (
    <HomeIcon fill={color} />
  );

  const renderPersonalTasksIcon = ({color}: {color: string}) => (
    <PersonalTaskIcon fill={color} />
  );

  const renderGreenTasksIcon = ({color}: {color: string}) => (
    <GreenTaskIcon fill={color} />
  );

  const renderSettingsIcon = ({color}: {color: string}) => (
    <SettingsIcon fill={color} />
  );

  const {isOpen: isDrawerOpen, mode} = useSelector(
    (state: RootState) => state.drawer,
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <I18nextProvider i18n={i18n}>
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <ApplicationProvider {...eva} theme={currentTheme}>
            <SafeAreaProvider>
              <NavigationContainer theme={currentNavigationTheme}>
                <Tab.Navigator
                  screenOptions={() => ({
                    lazy: false,
                    headerShown: false,
                    tabBarActiveTintColor: currentTheme['color-primary-500'],
                    tabBarInactiveTintColor: currentTheme['color-basic-400'],
                    tabBarStyle: {
                      backgroundColor: currentTheme['color-basic-100'],
                    },
                  })}>
                  <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      tabBarIcon: renderHomeIcon,
                      lazy: false,
                      animation: 'fade',
                    }}
                  />
                  <Tab.Screen
                    name="PersonalTasks"
                    component={PersonalTasksScreen}
                    options={{
                      tabBarIcon: renderPersonalTasksIcon,
                      tabBarLabel: t('personalTasksLabel'),
                      lazy: false,
                      animation: 'fade',
                    }}
                  />
                  <Tab.Screen
                    name="GreenTasks"
                    component={GreenTasksScreen}
                    options={{
                      tabBarIcon: renderGreenTasksIcon,
                      tabBarLabel: t('greenTasksLabel'),
                      lazy: false,
                      animation: 'fade',
                    }}
                  />
                  <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                      tabBarIcon: renderSettingsIcon,
                      tabBarLabel: t('settingsLabel'),
                      lazy: false,
                      animation: 'fade',
                    }}
                  />
                </Tab.Navigator>
              </NavigationContainer>
              <AddTaskButton />
              <TaskManagerModalComponent
                isOpen={isDrawerOpen}
                title={mode !== 'edit' ? 'createNewTaskTitle' : 'editTaskTitle'}
              />
            </SafeAreaProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </I18nextProvider>
    </>
  );
}

export default App;
