import { useState } from 'react';
import { nanoid } from 'nanoid';

import { Form } from './ContactForm.styled';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createContactThunk } from 'redux/thunk/contactsThunk';
import { selectContacts } from 'redux/selector/selectors';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleInputChange = (value, name) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
      return toast.info(`${name} is already in contacts.`);
    } else if (
      contacts.find(el => el.phone.toLowerCase() === number.toLowerCase())
    ) {
      return toast.info(`${number} is already in contacts.`);
    }

    const newContact = {
      id: nanoid(),
      name,
      phone: number,
    };

    dispatch(createContactThunk(newContact));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => {
            handleInputChange(e.target.value, e.target.name);
          }}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => {
            handleInputChange(e.target.value, e.target.name);
          }}
        />
      </label>
      <button type="submit">Add contact</button>
    </Form>
  );
}
