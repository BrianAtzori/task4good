import React from 'react';
import {Divider, Layout, List, ListItem} from '@ui-kitten/components';
import {Task} from '../../utils/interfaces/interfaces';
import TaskActionsButtons from './TaskActionsButtons';

export default function TaskListComponent({
  tasks,
}: {
  tasks: Task[];
  type: 'personal' | 'green' | 'home';
}) {
  const renderTask = ({item}: {item: Task}): React.ReactElement => {
    return (
      <ListItem
        disabled
        key={item.id}
        title={`${item.name}`}
        accessoryRight={
          <TaskActionsButtons taskId={item.id} isCompleted={item.completed} />
        }
      />
    );
  };

  return (
    <Layout>
      <List
        data={tasks}
        renderItem={renderTask}
        ListHeaderComponent={Divider}
        ItemSeparatorComponent={Divider}
        ListFooterComponent={Divider}
        alwaysBounceVertical={false}
      />
    </Layout>
  );
}
