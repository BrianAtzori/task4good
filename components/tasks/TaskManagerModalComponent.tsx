import {Button, Card, Layout, Modal, Text} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {toggleDrawer} from '../../redux/features/drawer/drawerSlice';
import {t} from 'i18next';
import CloseIcon from '../../style/icons/CloseIcon';
import TasksForm from './TasksForm';

export default function TaskManagerModalComponent({
  isOpen,
  title = 'createNewTaskTitle',
}: {
  isOpen: boolean;
  title: string;
}) {
  const dispatch = useDispatch();

  // function tempOnClick() {
  //   createTask({
  //     id: uuid.v4(),
  //     name: 'Cane',
  //     completed: false,
  //     category: 'personal',
  //   });
  //   dispatch(updateTasksState(true));
  // }

  //TODO: Translations

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      backdropStyle={styles.backdrop}
      style={styles.modal}>
      <SafeAreaView style={styles.safeArea}>
        <Card disabled={true}>
          <Layout style={styles.cardHeader}>
            <Text category="h4">{t(title)}</Text>
            <Button
              style={styles.closeButton}
              onPress={() => dispatch(toggleDrawer())}
              appearance="ghost"
              accessoryLeft={<CloseIcon />}
            />
          </Layout>
          <TasksForm />
        </Card>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    marginHorizontal: 0,
    position: 'absolute',
    bottom: 0,
    borderRadius: 16,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  closeButton: {
    marginLeft: 'auto',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
