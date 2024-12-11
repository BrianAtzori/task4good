import {Layout, Toggle} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PageTitleComponent from '../components/shared/PageTitleComponent';
import TaskListComponent from '../components/tasks/TaskListComponent';
import {Task} from '../utils/interfaces/interfaces';
import {t} from 'i18next';
import {getTasks} from '../utils/functions/tasks';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {updateTasksState} from '../redux/features/tasks/tasksSlice';

export default function PersonalTasksScreen() {
  const dispatch = useDispatch();
  const tasksChanged = useSelector(
    (state: RootState) => state.tasks.taskChangesWatcher,
  );
  const [personalTasks, setPersonalTasks] = useState<Task[]>([]);
  const [showOnlyNotCompleted, setShowOnlyNotCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    getTasks([
      {property: 'category', value: 'personal'},
      {property: 'completed', value: showOnlyNotCompleted},
    ]).then((taskList: Task[]) => {
      setPersonalTasks(taskList);
      dispatch(updateTasksState(false));
    });
  }, [dispatch, showOnlyNotCompleted, tasksChanged]);

  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <PageTitleComponent title="personalTasksTitle" />
        <Toggle
          onChange={() => {
            setShowOnlyNotCompleted(!showOnlyNotCompleted);
          }}
          checked={showOnlyNotCompleted}
          style={styles.completedToggle}>
          {t('tasksOnlyCompleted')}
        </Toggle>
        <TaskListComponent tasks={personalTasks} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    height: '90%',
  },
  completedToggle: {alignSelf: 'flex-end', margin: 8},
});
