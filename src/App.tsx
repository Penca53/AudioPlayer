import React, { useState } from 'react';
import { render } from 'react-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import Main from './components/Main/main';
import Authentication from './components/Authentication/authentication';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <GlobalStyle />
      {isConnected ? (
        <Main client={client} />
      ) : (
        <Authentication
          client={client}
          setClient={setClient}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
        />
      )}
    </>
  );
};

render(<App />, mainElement);
