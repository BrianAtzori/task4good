import {Button} from '@ui-kitten/components';
import React from 'react';
import AddIcon from '../../style/icons/AddIcon';
import {StyleSheet} from 'react-native';
// import {createTask} from '../../utils/functions/tasks';
// import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {toggleDrawer} from '../../redux/features/drawer/drawerSlice';

export default function AddTaskButton() {
  const dispatch = useDispatch();

  // function tempOnClick() {
  //   // createTask({
  //   //   id: uuid.v4(),
  //   //   name: 'Cane',
  //   //   completed: true,
  //   //   category: 'personal',
  //   // });
  // }

  return (
    <Button
      onPress={() => dispatch(toggleDrawer())}
      style={styles.iconButton}
      accessoryLeft={<AddIcon />}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    bottom: '10%',
    right: 16,
    borderColor: '1px solid',
  },
});
