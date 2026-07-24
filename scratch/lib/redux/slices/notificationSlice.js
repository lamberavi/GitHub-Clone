import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [
      {
        id: 'notif_1',
        title: 'Welcome to Antigravity GitHub Clone!',
        message: 'Your workspace has been initialized successfully.',
        type: 'system',
        isRead: false,
        date: new Date().toISOString()
      },
      {
        id: 'notif_2',
        title: 'Repository Starred',
        message: 'github-clone-react was starred by user ravil.',
        type: 'star',
        isRead: false,
        date: new Date().toISOString()
      }
    ],
    unreadCount: 2,
    loading: false
  },
  reducers: {
    setNotifications: (state, action) => {
      state.items = action.payload.notifications;
      state.unreadCount = action.payload.unreadCount;
    },
    markAsRead: (state, action) => {
      const target = state.items.find(n => n.id === action.payload || n._id === action.payload);
      if (target && !target.isRead) {
        target.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(n => { n.isRead = true; });
      state.unreadCount = 0;
    }
  }
});

export const { setNotifications, markAsRead, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
