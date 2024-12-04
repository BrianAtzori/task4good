import React from 'react';
import {Button, Layout} from '@ui-kitten/components';
import EditIcon from '../../style/icons/EditIcon';
import DeleteIcon from '../../style/icons/DeleteIcon';
import {StyleSheet} from 'react-native';
import DoneIcon from '../../style/icons/DoneIcon';
import {deleteTask, editTask} from '../../utils/functions/tasks';
import {useDispatch} from 'react-redux';
import {updateTasksState} from '../../redux/features/tasks/tasksSlice';
import {openEdit} from '../../redux/features/drawer/drawerSlice';

export default function TaskActionsButtons({
  isCompleted,
  taskId,
}: {
  isCompleted: boolean;
  taskId: string;
}) {
  const dispatch = useDispatch();

  return (
    <Layout style={styles.container}>
      {!isCompleted && (
        <>
          <Button
            style={styles.iconButton}
            accessoryLeft={<DoneIcon />}
            onPress={() => {
              editTask(taskId, {completed: true});
              dispatch(updateTasksState(true));
            }}
          />
          <Button
            style={styles.iconButton}
            onPress={() => {
              dispatch(openEdit({objectId: taskId}));
            }}
            accessoryLeft={<EditIcon />}
          />
        </>
      )}

      <Button
        style={styles.iconButton}
        onPress={() => {
          deleteTask(taskId);
          dispatch(updateTasksState(true));
        }}
        accessoryLeft={<DeleteIcon />}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {},
});
