import styled from 'styled-components';
export const Form = styled.form`
  flex-direction: column;
  padding: 40px 0px;
  margin-bottom: 30px;

  & label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  & button {
    border: none;
    padding: 7px 7px;
    border-radius: 8px;
    background-color: green;
    color: #fff;
  }
`;
