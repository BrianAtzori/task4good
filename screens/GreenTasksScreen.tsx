import {Layout, Toggle} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {getTasks} from '../utils/functions/tasks';
import {updateTasksState} from '../redux/features/tasks/tasksSlice';
import TaskListComponent from '../components/tasks/TaskListComponent';
import PageTitleComponent from '../components/shared/PageTitleComponent';
import {t} from 'i18next';
import {Task} from '../utils/interfaces/interfaces';

export default function GreenTasksScreen() {
  const dispatch = useDispatch();
  const tasksChanged = useSelector(
    (state: RootState) => state.tasks.taskChangesWatcher,
  );
  const [greenTasks, setGreenTasks] = useState<Task[]>([]);
  const [showOnlyNotCompleted, setShowOnlyNotCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    getTasks([
      {property: 'category', value: 'green'},
      {property: 'completed', value: showOnlyNotCompleted},
    ]).then((taskList: Task[]) => {
      setGreenTasks(taskList);
      dispatch(updateTasksState(false));
    });
  }, [dispatch, showOnlyNotCompleted, tasksChanged]);

  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <PageTitleComponent title="greenTasksTitle" />
        <Toggle
          onChange={() => {
            setShowOnlyNotCompleted(!showOnlyNotCompleted);
          }}
          checked={showOnlyNotCompleted}
          style={styles.completedToggle}>
          {t('tasksOnlyCompleted')}
        </Toggle>
        <TaskListComponent tasks={greenTasks} />
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
