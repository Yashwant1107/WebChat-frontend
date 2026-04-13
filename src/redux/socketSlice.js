import {createSlice} from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    io: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.io = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;