import {Button, Card, Modal} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {toggleDrawer} from '../../redux/features/drawer/drawerSlice';

export default function TaskManagerModalComponent({isOpen}: {isOpen: boolean}) {
  const dispatch = useDispatch();

  return (
    <Modal
      visible={isOpen}
      backdropStyle={styles.backdrop}
      style={styles.modal}>
      <SafeAreaView style={styles.safeArea}>
        <Card disabled={true}>
          <Text>Questo è il contenuto del dialog!</Text>
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
