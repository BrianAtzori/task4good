import React, {BaseSyntheticEvent, useState} from 'react';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {
  Button,
  Card,
  Divider,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';
import {t} from 'i18next';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {createTask} from '../../utils/functions/tasks';
import uuid from 'react-native-uuid';
import {updateTasksState} from '../../redux/features/tasks/tasksSlice';
import {Task} from '../../utils/interfaces/interfaces';
import {toggleDrawer} from '../../redux/features/drawer/drawerSlice';

export default function TasksForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  async function onSubmit(
    data: FieldValues,
    event?: BaseSyntheticEvent<object, any, any> | undefined,
  ) {
    event?.preventDefault();

    const result = await createTask({
      ...(data as Task),
      category: data.category === 0 ? 'personal' : 'green',
      id: uuid.v4(),
      completed: false,
    });

    if (result) {
      dispatch(updateTasksState(true));
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  }

  if (showError) {
    return (
      <Card status="danger" disabled>
        <Layout style={styles.cardLayout}>
          <Text style={styles.message} status="danger">
            {t('errorMessage')}
          </Text>
          <Button
            onPress={() => {
              setShowError(false);
              reset();
            }}>
            {t('retryLabel')}
          </Button>
        </Layout>
      </Card>
    );
  }

  if (showSuccess) {
    return (
      <Card status="success" disabled>
        <Layout style={styles.cardLayout}>
          <Text style={styles.message} status="success">
            {t('successMessage')}
          </Text>
          <Button
            onPress={() => {
              setShowSuccess(false);
              reset();
            }}>
            {t('createAgain')}
          </Button>
          <Button
            onPress={() => {
              dispatch(toggleDrawer());
            }}>
            {t('closeLabel')}
          </Button>
        </Layout>
      </Card>
    );
  }

  return (
    <Layout style={styles.formContainer}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('taskNamePlaceholder')}
            status={errors.name ? 'danger' : 'basic'}
          />
        )}
        name="name"
        rules={{required: t('fieldErrorMessage')}}
        defaultValue="" //TODO: In editing is the task value
      />
      {errors.name && <Text status="danger">{errors.name.message as any}</Text>}
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <RadioGroup selectedIndex={value} onChange={onChange}>
            <Radio>{t('personalCategoryLabel')}</Radio>
            <Radio>{t('greenCategoryLabel')}</Radio>
          </RadioGroup>
        )}
        name="category"
        rules={{required: t('fieldErrorMessage')}}
        defaultValue="" //TODO: In editing is the task value
      />
      {errors.category && (
        <Text status="danger">{errors.category.message as any}</Text>
      )}
      <Divider />
      <Button onPress={handleSubmit(onSubmit)}>{t('saveTaskLabel')}</Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formContainer: {padding: 8, gap: 16, borderRadius: 16},
  cardLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
