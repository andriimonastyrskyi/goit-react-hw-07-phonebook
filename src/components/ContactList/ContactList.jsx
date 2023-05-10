import { useDispatch, useSelector } from 'react-redux';

import { Item } from './ContactList.styled';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
} from 'redux/selector/selectors';
import { deleteContactThunk } from 'redux/thunk/contactsThunk';

export function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);

  const normalizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(el =>
    el.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <ul>
      {visibleContacts.map(({ id, name, phone }) => {
        return (
          <Item key={id}>
            <p>
              {name}: {phone}
            </p>
            <button
              type="button"
              onClick={() => {
                dispatch(deleteContactThunk(id));
              }}
              disabled={isLoading}
            >
              Delete
            </button>
          </Item>
        );
      })}
    </ul>
  );
}
