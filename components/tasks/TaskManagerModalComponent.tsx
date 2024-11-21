import {Button, Card, Modal} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {toggleDrawer} from '../../redux/features/drawer/drawerSlice';
import {createTask} from '../../utils/functions/tasks';
import uuid from 'react-native-uuid';

export default function TaskManagerModalComponent({isOpen}: {isOpen: boolean}) {
  const dispatch = useDispatch();

  function tempOnClick() {
    createTask({
      id: uuid.v4(),
      name: 'Cane',
      completed: true,
      category: 'personal',
    });

    //TODO: Use Redux to handle global updates, change state handling in task view
  }

  return (
    <Modal
      visible={isOpen}
      backdropStyle={styles.backdrop}
      style={styles.modal}>
      <SafeAreaView style={styles.safeArea}>
        <Card disabled={true}>
          <Button style={styles.addButton} onPress={() => tempOnClick()}>
            Crea Task
          </Button>
          <Button onPress={() => dispatch(toggleDrawer())}>Chiudi</Button>
        </Card>
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
  addButton: {
    marginBottom: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
