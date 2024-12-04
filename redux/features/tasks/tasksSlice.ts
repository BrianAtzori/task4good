import {createSlice} from '@reduxjs/toolkit';

export interface TaskState {
  taskChangesWatcher: boolean;
}

const initialState: TaskState = {
  taskChangesWatcher: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTasksState: (state, action) => {
      state.taskChangesWatcher = action.payload;
    },
  },
});

export const {updateTasksState} = tasksSlice.actions;

export default tasksSlice.reducer;
