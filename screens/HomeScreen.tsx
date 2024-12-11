import {SafeAreaView, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Task} from '../utils/interfaces/interfaces';
import {getTasks} from '../utils/functions/tasks';
import {updateTasksState} from '../redux/features/tasks/tasksSlice';
import TaskListComponent from '../components/tasks/TaskListComponent';
import PageTitleComponent from '../components/shared/PageTitleComponent';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const tasksChanged = useSelector(
    (state: RootState) => state.tasks.taskChangesWatcher,
  );
  const [miscTasks, setMiscTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks([{property: 'completed', value: false}]).then(
      (taskList: Task[]) => {
        setMiscTasks(taskList);
        dispatch(updateTasksState(false));
      },
    );
  }, [dispatch, tasksChanged]);

  return (
    <SafeAreaView>
      <Layout style={styles.container}>
        <PageTitleComponent title="homepageTitle" />
        <TaskListComponent tasks={miscTasks} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
    height: '95%',
  },
});
