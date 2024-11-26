import React, {BaseSyntheticEvent} from 'react';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {Button, Input, Layout, Radio, RadioGroup} from '@ui-kitten/components';
import {t} from 'i18next';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {createTask} from '../../utils/functions/tasks';
import uuid from 'react-native-uuid';
import {updateTasksState} from '../../redux/features/tasks/tasksSlice';
import {Task} from '../../utils/interfaces/interfaces';

export default function TasksForm() {
  const {control, handleSubmit} = useForm();

  const dispatch = useDispatch();

  function onSubmit(
    data: FieldValues,
    event?: BaseSyntheticEvent<object, any, any> | undefined,
  ) {
    event?.preventDefault();

    createTask({
      id: uuid.v4(),
      completed: false,
      ...(data as Partial<Task>),
    });

    dispatch(updateTasksState(true));
  }

  //TODO: Validation handling

  return (
    <Layout level="2" style={styles.formContainer}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('taskNamePlaceholder')}
          />
        )}
        name="name"
        rules={{required: true}}
        defaultValue="" //TODO: In editing is the task value
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <RadioGroup selectedIndex={value} onChange={onChange}>
            <Radio>Option 1</Radio>
            <Radio>Option 2</Radio>
            <Radio>Option 3</Radio>
          </RadioGroup>
        )}
        name="category"
        rules={{required: true}}
        defaultValue="" //TODO: In editing is the task value
      />
      <Button onPress={handleSubmit(onSubmit)}>{t('saveTaskLabel')}</Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formContainer: {padding: 8, gap: 16, borderRadius: 16},
});
