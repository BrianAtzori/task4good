import {Layout, Toggle} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PageTitleComponent from '../components/shared/PageTitleComponent';
import TaskListComponent from '../components/tasks/TaskListComponent';
import {Task} from '../utils/interfaces/interfaces';
import uuid from 'react-native-uuid';

export default function PersonalTasksScreen() {
  const [sampleTasks, setSampleTasks] = useState<Task[]>([
    {
      id: uuid.v4(),
      name: `Porta fuori Iggy`,
      category: 'personal',
      completed: true,
    },
    {
      id: uuid.v4(),
      name: `Scendi il cane`,
      category: 'personal',
      completed: false,
    },
    {
      id: uuid.v4(),
      name: `Fai popo`,
      category: 'green',
      completed: true,
    },
    {
      id: uuid.v4(),
      name: `Fai la bamba`,
      category: 'green',
      completed: true,
    },
    {
      id: uuid.v4(),
      name: `Bevi`,
      category: 'personal',
      completed: true,
    },
  ]);

  const [showOnlyNotCompleted, setShowOnlyNotCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    setSampleTasks(
      sampleTasks.filter(task =>
        showOnlyNotCompleted ? !task.completed : true,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOnlyNotCompleted]);

  return (
    <SafeAreaView>
      <Layout>
        <PageTitleComponent title="personalTasksTitle" />
        <Toggle
          onChange={() => {
            setShowOnlyNotCompleted(!showOnlyNotCompleted);
          }}
          checked={showOnlyNotCompleted}
          style={styles.completedToggle}
        />
        <TaskListComponent type="personal" tasks={sampleTasks} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  completedToggle: {alignSelf: 'flex-end', marginRight: 8},
});
