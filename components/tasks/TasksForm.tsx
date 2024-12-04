import React, {BaseSyntheticEvent, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {createTask, editTask} from '../../utils/functions/tasks';
import uuid from 'react-native-uuid';
import {updateTasksState} from '../../redux/features/tasks/tasksSlice';
import {Task} from '../../utils/interfaces/interfaces';
import {
  switchMode,
  toggleDrawer,
} from '../../redux/features/drawer/drawerSlice';
import {RootState} from '../../redux/store';

export default function TasksForm({targetTask}: {targetTask?: Task}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const mode = useSelector((state: RootState) => state.drawer.mode);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      name: mode !== 'edit' ? '' : targetTask?.name || '',
      category:
        mode !== 'edit' ? '' : targetTask?.category === 'personal' ? 0 : 1,
    },
  });

  useEffect(() => {
    if (targetTask) {
      reset({
        name: mode !== 'edit' ? '' : targetTask.name,
        category:
          mode !== 'edit' ? '' : targetTask.category === 'personal' ? 0 : 1,
      });
    }
  }, [targetTask, mode, reset]);

  async function onSubmit(
    data: FieldValues,
    event?: BaseSyntheticEvent<object, any, any> | undefined,
  ) {
    event?.preventDefault();
    let result: boolean;

    if (mode !== 'edit') {
      result = await createTask({
        ...(data as Task),
        category: data.category === 0 ? 'personal' : 'green',
        id: uuid.v4(),
        completed: false,
      });
    } else {
      result = await editTask(targetTask?.id!, {
        ...(data as Task),
        category: data.category === 0 ? 'personal' : 'green',
        completed: false,
      });
    }

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
              dispatch(switchMode('create'));
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
        name="name"
        rules={{required: t('fieldErrorMessage')}}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('taskNamePlaceholder')}
            status={errors.name ? 'danger' : 'basic'}
          />
        )}
      />
      {errors.name && <Text status="danger">{errors.name.message}</Text>}

      <Controller
        control={control}
        name="category"
        rules={{required: t('fieldErrorMessage')}}
        render={({field: {onChange, value}}) => (
          <RadioGroup
            selectedIndex={value as any}
            onChange={index => onChange(index)}>
            <Radio>{t('personalCategoryLabel')}</Radio>
            <Radio>{t('greenCategoryLabel')}</Radio>
          </RadioGroup>
        )}
      />
      {errors.category && (
        <Text status="danger">{errors.category.message}</Text>
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
