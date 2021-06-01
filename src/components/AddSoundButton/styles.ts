import styled from 'styled-components';

export const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  border-radius: 12px;

  &:hover {
    background-color: #327535;
  }

  &:active {
    background-color: #1e4720;
  }
`;
