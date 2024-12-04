import {createSlice} from '@reduxjs/toolkit';

export interface DrawerState {
  isOpen: boolean;
  mode: 'create' | 'edit' | '';
  objectId?: string;
}

const initialState: DrawerState = {
  isOpen: false,
  mode: '',
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer: state => {
      state.isOpen = !state.isOpen;
    },
    openEdit: (state, action) => {
      state.isOpen = !state.isOpen;
      state.mode = 'edit';
      state.objectId = action.payload.objectId;
    },
    switchMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {toggleDrawer, openEdit, switchMode} = drawerSlice.actions;

export default drawerSlice.reducer;
