import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { contactInitialState } from 'redux/initialState/initialState';
import {
  createContactThunk,
  deleteContactThunk,
  getContactsThunk,
} from 'redux/thunk/contactsThunk';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { error }) => {
  state.isLoading = false;
  state.error = error;
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: contactInitialState,

  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = [...payload];
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(task => task.id === payload.id);
        state.items.splice(index, 1);
      })
      .addCase(createContactThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addMatcher(
        isAnyOf(
          getContactsThunk.pending,
          deleteContactThunk.pending,
          createContactThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          getContactsThunk.rejected,
          deleteContactThunk.rejected,
          createContactThunk.rejected
        ),
        handleRejected
      );
  },
});

export const contactReducer = contactSlice.reducer;
