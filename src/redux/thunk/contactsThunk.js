import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact, getContacts } from 'service/apiContacts';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async () => getContacts()
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => deleteContact(contactId)
);

export const createContactThunk = createAsyncThunk(
  'contacts/addContact',
  async contact => addContact(contact)
);
