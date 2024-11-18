export interface Task {
  id: string;
  name: string;
  completed: boolean;
  category: 'green' | 'personal';
}
