import styled from 'styled-components';

export const PlayButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  border-radius: 8px 0px 0px 8px;
  padding: 6px 0px 9px 0px;
  width: 48px;

  &:hover {
    background-color: #327535;
  }

  &:active {
    background-color: #1e4720;
  }
`;

export const FileButton = styled.label`
  background-color: #4caf50;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8em;
  transition-duration: 0.4s;
  width: 40%;
  padding: 8px 0px 8px 0px;

  &:hover {
    background-color: #327535;
  }

  &:active {
    background-color: #1e4720;
  }
`;

export const DeleteButton = styled.button`
  background-color: #ff4f4f;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  border-radius: 0px 8px 8px 0px;
  padding: 6px 0px 9px 0px;
  width: 48px;

  &:hover {
    background-color: #ff0000;
  }

  &:active {
    background-color: #a10000;
  }
`;
