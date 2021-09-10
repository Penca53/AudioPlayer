import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    background: #2d2e30;
  }

  /* width */
  .custom-scroll::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  .custom-scroll::-webkit-scrollbar-track {
    background: #aaa; 
  }
  
  /* Handle */
  .custom-scroll::-webkit-scrollbar-thumb {
    background: #666; 
  }

  /* Handle on hover */
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #444; 
  }
`;
