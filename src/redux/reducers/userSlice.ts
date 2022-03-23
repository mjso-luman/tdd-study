import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type UserType = {
  role: 'admin' | 'general';
};

const initialState: UserType = {
  role: 'general',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateRole: (state, action: PayloadAction<'admin' | 'general'>) => {
      state.role = action.payload;
    },
  },
});

export const { updateRole } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default UserSlice.reducer;
