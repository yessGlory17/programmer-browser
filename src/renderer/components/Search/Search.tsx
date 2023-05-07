import styled from 'styled-components';

const Search = styled('input')`
  width: 400px;
  height: 35px;
  background-color: #20222d;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #20222d;
  &:focus {
    outline: none;
    background-color: #121219;
  }
`;

export default Search;
