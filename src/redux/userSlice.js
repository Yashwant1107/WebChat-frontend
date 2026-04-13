import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    authUser: null,
    isCheckingAuth: true,
    otherUser: null,
    selectedChatUser: null,
    onlineUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.isCheckingAuth = false;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
      state.isCheckingAuth = false;
      state.otherUser = null;
      state.selectedChatUser = null;
    },
    setAuthLoading: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
      setOtherUser: (state, action) => {
        state.otherUser = action.payload;
      },
      setSelectedChatUser: (state, action) => {
        state.selectedChatUser = action.payload;
      },
      setOnlineUsers: (state, action) => {
        state.onlineUsers = action.payload;
      }
    }
});

export const { setAuthUser, clearAuthUser, setAuthLoading, setOtherUser ,setSelectedChatUser, setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;
