import {Button, Card, Layout, Modal, Text} from '@ui-kitten/components';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  switchMode,
  toggleDrawer,
} from '../../redux/features/drawer/drawerSlice';
import {t} from 'i18next';
import CloseIcon from '../../style/icons/CloseIcon';
import TasksForm from './TasksForm';
import {RootState} from '../../redux/store';
import {Task} from '../../utils/interfaces/interfaces';
import {getTasks} from '../../utils/functions/tasks';

export default function TaskManagerModalComponent({
  isOpen,
  title,
}: {
  isOpen: boolean;
  title: string;
}) {
  const dispatch = useDispatch();
  const {mode, objectId: taskId} = useSelector(
    (state: RootState) => state.drawer,
  );
  const tasksChanged = useSelector(
    (state: RootState) => state.tasks.taskChangesWatcher,
  );
  const [targetTask, setTargetTask] = useState<Task | undefined>();

  useEffect(() => {
    async function findSingleTask() {
      await getTasks()
        .then((tasks: Task[]) => {
          return tasks.filter(singleTask => singleTask.id === taskId).at(0);
        })
        .then(task => {
          setTargetTask(task);
        });
    }

    if (mode === 'edit') {
      findSingleTask();
    }
  }, [mode, taskId, tasksChanged]);

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      backdropStyle={styles.backdrop}
      style={styles.modal}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior="padding">
          <Card disabled={true}>
            <Layout style={styles.cardHeader}>
              <Text category="h4">{t(title)}</Text>
              <Button
                style={styles.closeButton}
                onPress={() => {
                  dispatch(switchMode('create'));
                  dispatch(toggleDrawer());
                }}
                appearance="ghost"
                accessoryLeft={<CloseIcon />}
              />
            </Layout>
            <TasksForm targetTask={targetTask} />
          </Card>
        </KeyboardAvoidingView>
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
    backgroundColor: '#fab946',
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
