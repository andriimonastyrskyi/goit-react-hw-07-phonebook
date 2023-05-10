import { createSlice } from '@reduxjs/toolkit';
import { initialFilterState } from 'redux/initialState/initialState';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    getVisibleContact: (state, { payload }) => (state = payload),
  },
});

export const { getVisibleContact } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
