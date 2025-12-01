import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarExpanded: boolean;
  sidebarActiveItem: string | null;
  sidebarOpenSubmenu: string | null;
  isMobile: boolean;
  isMobileOpen: boolean;

  theme: 'light' | 'dark';
  language: string;

  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
}

const initialState: UIState = {
  // Sidebar state
  sidebarExpanded: true,
  sidebarActiveItem: null,
  sidebarOpenSubmenu: null,
  isMobile: false,
  isMobileOpen: false,

  // Theme and language
  theme: 'light',
  language: 'uz',

  // Notifications
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebarExpanded: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    setSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.sidebarExpanded = action.payload;
    },
    setSidebarActiveItem: (state, action: PayloadAction<string | null>) => {
      state.sidebarActiveItem = action.payload;
    },
    toggleSidebarMobileOpen: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    toggleSidebarSubmenu: (state, action: PayloadAction<string>) => {
      state.sidebarOpenSubmenu =
        state.sidebarOpenSubmenu === action.payload ? null : action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
      }
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id'>>) => {
      const id = Date.now().toString();
      state.notifications.push({
        ...action.payload,
        id,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// Actions
export const {
  toggleSidebarExpanded,
  setSidebarExpanded,
  setSidebarActiveItem,
  toggleSidebarSubmenu,
  toggleSidebarMobileOpen,
  setTheme,
  setIsMobile,
  setLanguage,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

// Selectors
export const selectSidebarExpanded = (state: RootState) => state.ui.sidebarExpanded;
export const selectSidebarActiveItem = (state: RootState) => state.ui.sidebarActiveItem;
export const selectSidebarOpenSubmenu = (state: RootState) => state.ui.sidebarOpenSubmenu;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectLanguage = (state: RootState) => state.ui.language;
export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectIsMobile = (state: RootState) => state.ui.isMobile;
export const selectIsMobileOpen = (state: RootState) => state.ui.isMobileOpen;

export default uiSlice.reducer;
