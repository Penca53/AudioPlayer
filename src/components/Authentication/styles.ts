import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #1e4720;
  }
`;

export const InputText = styled.input`
   {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

export const SuggestionLink = styled.a`
   {
    color: white;
    font-size: 14px;
  }
`;

export const Container = styled.div`
   {
    margin-top: 64px;
    border-radius: 5px;
    background-color: #222224;
    padding: 20px;
  }
`;
