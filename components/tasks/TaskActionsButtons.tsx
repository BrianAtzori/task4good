import React from 'react';
import {Button, Layout} from '@ui-kitten/components';
import EditIcon from '../../style/icons/EditIcon';
import DeleteIcon from '../../style/icons/DeleteIcon';
import {StyleSheet} from 'react-native';
import DoneIcon from '../../style/icons/DoneIcon';
import {deleteTask} from '../../utils/functions/tasks';

export default function TaskActionsButtons({
  isCompleted,
  taskId,
  tasksUpdateAction,
}: {
  isCompleted: boolean;
  taskId: string;
  tasksUpdateAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Layout style={styles.container}>
      {!isCompleted && (
        <>
          <Button style={styles.iconButton} accessoryLeft={<DoneIcon />} />
          <Button style={styles.iconButton} accessoryLeft={<EditIcon />} />
        </>
      )}

      <Button
        style={styles.iconButton}
        onPress={() => {
          deleteTask(taskId);
          tasksUpdateAction(true);
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
