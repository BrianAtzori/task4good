import {Button} from '@ui-kitten/components';
import React from 'react';
import AddIcon from '../../style/icons/AddIcon';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {toggleDrawer} from '../../redux/features/drawer/drawerSlice';

export default function AddTaskButton() {
  const dispatch = useDispatch();

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
