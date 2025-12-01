import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbState {
  items: BreadcrumbItem[];
  isLoading: boolean;
}

const initialState: BreadcrumbState = {
  items: [],
  isLoading: false,
};

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.items = action.payload;
    },
    addBreadcrumb: (state, action: PayloadAction<BreadcrumbItem>) => {
      state.items.push(action.payload);
    },
    removeBreadcrumb: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    clearBreadcrumbs: (state) => {
      state.items = [];
    },
    setBreadcrumbLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,
  setBreadcrumbLoading,
} = breadcrumbSlice.actions;

export const selectBreadcrumbs = (state: RootState) => state.breadcrumb.items;
export const selectBreadcrumbLoading = (state: RootState) => state.breadcrumb.isLoading;

export default breadcrumbSlice.reducer;
