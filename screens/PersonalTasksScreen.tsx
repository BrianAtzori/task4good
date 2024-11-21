import {Layout, Toggle} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PageTitleComponent from '../components/shared/PageTitleComponent';
import TaskListComponent from '../components/tasks/TaskListComponent';
import {Task} from '../utils/interfaces/interfaces';
import {t} from 'i18next';
import {getTasks} from '../utils/functions/tasks';

export default function PersonalTasksScreen() {
  const [personalTasks, setPersonalTasks] = useState<Task[]>([]);
  const [tasksChanged, setTasksChanged] = useState<boolean>(false);
  const [showOnlyNotCompleted, setShowOnlyNotCompleted] =
    useState<boolean>(false);

  // useEffect(() => {
  //   getTasks([{property: 'category', value: 'personal'}]).then(
  //     (taskList: Task[]) => {
  //       setPersonalTasks(taskList);
  //     },
  //   );
  // }, [tasksChanged]);

  useEffect(() => {
    getTasks([
      {property: 'category', value: 'personal'},
      {property: 'completed', value: showOnlyNotCompleted},
    ]).then((taskList: Task[]) => {
      setPersonalTasks(taskList);
      setTasksChanged(false);
    });
  }, [showOnlyNotCompleted, tasksChanged]);

  return (
    <SafeAreaView>
      <Layout>
        <PageTitleComponent title="personalTasksTitle" />
        <Toggle
          onChange={() => {
            setShowOnlyNotCompleted(!showOnlyNotCompleted);
          }}
          checked={showOnlyNotCompleted}
          style={styles.completedToggle}>
          {t('tasksOnlyCompleted')}
        </Toggle>
        <TaskListComponent
          type="personal"
          tasks={personalTasks}
          tasksSubscriber={setTasksChanged}
        />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  completedToggle: {alignSelf: 'flex-end', margin: 8},
});
