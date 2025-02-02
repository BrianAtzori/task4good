import {Divider, Layout, List, ListItem} from '@ui-kitten/components';
import React, {useMemo} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {LanguageSwitcher} from '../components/settings/LanguageSwitcher';
import ThemeSwitcher from '../components/settings/ThemeSwitcher';
import PageTitleComponent from '../components/shared/PageTitleComponent';
import {useTranslation} from 'react-i18next';

export default function SettingsScreen() {
  const {t} = useTranslation();

  const languageSwitcher = useMemo(() => <LanguageSwitcher />, []);
  const themeSwitcher = useMemo(() => <ThemeSwitcher />, []);

  const availableSettings = useMemo(
    () => [
      {
        label: t('availableSettingLanguageLabel'),
        description: t('availableSettingLanguageDescription'),
        component: languageSwitcher,
      },
      {
        label: t('availableSettingThemeLabel'),
        description: t('availableSettingThemeDescription'),
        component: themeSwitcher,
      },
    ],
    [languageSwitcher, t, themeSwitcher],
  );

  const renderSetting = ({
    item,
    index,
  }: {
    item: {label: string; description: string; component: React.ReactElement};
    index: number;
  }): React.ReactElement => (
    <ListItem
      disabled
      style={styles.listItemContainer}
      title={`${item.label}`}
      description={`${item.description}`}
      key={index}
      accessoryRight={item.component}
    />
  );

  return (
    <SafeAreaView>
      <Layout>
        <PageTitleComponent title="settingsLabel" />
        <List
          data={availableSettings}
          renderItem={renderSetting}
          ListHeaderComponent={Divider}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={Divider}
          alwaysBounceVertical={false}
        />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    minHeight: 100,
  },
});
