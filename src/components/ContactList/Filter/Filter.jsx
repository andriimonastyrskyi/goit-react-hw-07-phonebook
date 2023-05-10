import { useDispatch, useSelector } from 'react-redux';
import { Label } from './Filter.styled';
import { getVisibleContact } from 'redux/filterSlice/filterSlice';

export function Filter() {
  const filter = useSelector(state => state.filterValue);
  const dispatch = useDispatch();

  return (
    <>
      <Label>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={e => dispatch(getVisibleContact(e.target.value))}
        />
      </Label>
    </>
  );
}
