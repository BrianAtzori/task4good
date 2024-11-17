import {useState} from 'react';
import {Task} from '../interfaces/interfaces';
import {storage} from '../../db/mmkv';

export default async function useGetTasks(options?: {
  property: 'completed' | 'category' | 'top5';
  value: 'true' | 'false';
}) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  function filterTaskList(tasksFromDB: Task[]): Task[] {
    const filteredTasks: Task[] = [];

    console.log(tasksFromDB);

    //TODO: Filtering

    console.log(filteredTasks);

    return filteredTasks;
  }

  if (storage.contains('userTasks')) {
    const tasksFromDB = JSON.parse(storage.getString('userTasks')!);

    if (options) {
      const filteredTasks = filterTaskList(tasksFromDB);
      setTaskList(filteredTasks);
    } else {
      setTaskList(tasksFromDB);
    }
  } else {
    storage.set('userTasks', JSON.stringify(taskList));
  }

  return taskList;
}
