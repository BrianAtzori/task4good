import {storage} from '../../db/mmkv';
import {Task} from '../interfaces/interfaces';

function filterTaskList(
  tasksFromDB: Task[],
  options: {
    property: 'completed' | 'category';
    value: true | false | 'personal' | 'green';
  }[],
): Task[] {
  const filteredTasks: Task[] = [];

  for (let i = 0; i < tasksFromDB.length; i++) {
    const shouldIAdd = options.every(option => {
      return tasksFromDB[i][option.property] === option.value;
    });

    if (shouldIAdd) {
      filteredTasks.push(tasksFromDB[i]);
    }
  }

  return filteredTasks;
}

export async function getTasks(
  options?: {
    property: 'completed' | 'category';
    value: true | false | 'personal' | 'green';
  }[],
) {
  if (storage.contains('userTasks')) {
    const tasksFromDB = await JSON.parse(storage.getString('userTasks')!);

    if (options) {
      const filteredTasks = filterTaskList(tasksFromDB, options);
      return filteredTasks;
    } else {
      return tasksFromDB;
    }
  } else {
    storage.set('userTasks', JSON.stringify([]));
  }
}

export async function createTask(newTask: Task): Promise<boolean> {
  try {
    if (storage.contains('userTasks')) {
      const tasksFromDB: Task[] = await JSON.parse(
        storage.getString('userTasks')!,
      );

      tasksFromDB.push(newTask);

      storage.set('userTasks', JSON.stringify(tasksFromDB));
    } else {
      storage.set('userTasks', JSON.stringify([newTask]));
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function editTask(taskId: string, taskChanges: Partial<Task>) {
  try {
    if (storage.contains('userTasks')) {
      const tasksFromDB: Task[] = await JSON.parse(
        storage.getString('userTasks')!,
      );

      const updatedTasks = tasksFromDB.map(item =>
        item.id === taskId ? {...item, ...taskChanges} : item,
      );

      storage.set('userTasks', JSON.stringify(updatedTasks));
    } else {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  try {
    if (storage.contains('userTasks')) {
      const tasksFromDB: Task[] = await JSON.parse(
        storage.getString('userTasks')!,
      );

      const newTaskList = tasksFromDB.filter(task => task.id !== taskId);

      storage.set('userTasks', JSON.stringify(newTaskList));
    } else {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
