import { shell } from 'electron';
import React, { useState } from 'react';
import { Button, InputText, Container, SuggestionLink } from './styles';
import fs from 'fs';

const tmi = require('tmi.js');

interface AuthenticationProps {
  client: any;
  setClient: React.Dispatch<React.SetStateAction<any>>;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Credentials {
  channelName: string;
  authToken: string;
}

const Authentication: React.FC<AuthenticationProps> = ({
  client,
  setClient,
  isConnected,
  setIsConnected,
}) => {
  const saveCredentials = () => {
    const credentials: Credentials = {
      channelName: channelName,
      authToken: authToken,
    };
    const data = JSON.stringify(credentials);
    fs.writeFileSync('credentials.json', data);
  };

  const loadCredentials = (): Credentials => {
    if (fs.existsSync('credentials.json')) {
      const data = fs.readFileSync('credentials.json');
      const credentials: Credentials = JSON.parse(data.toString());

      return credentials;
    } else {
      return { channelName: '', authToken: '' };
    }
  };

  const loadedCredentials = loadCredentials();
  const [channelName, setChannelName] = useState(loadedCredentials.channelName);
  const [authToken, setAuthToken] = useState(loadedCredentials.authToken);

  const handleChannelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelName(event.target.value);
  };

  const handleAuthTokenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuthToken(event.target.value);
  };

  const openAuthTokenWindow = () => {
    shell.openExternal('https://twitchapps.com/tmi/');
  };

  const handleConnectButton = () => {
    connectTwitchBot(channelName, authToken, channelName);
  };

  const connectTwitchBot = (
    username: string,
    auth: string,
    channel: string
  ) => {
    const newClient = new tmi.Client({
      options: { debug: true },
      identity: {
        username: username,
        password: auth,
      },
      channels: [channel],
    });

    newClient.connect();

    newClient.on('connected', (address: any, port: any) => {
      setIsConnected(true);
      saveCredentials();
    });

    setClient(newClient);
  };

  return (
    <Container>
      <form>
        <label
          htmlFor="channel-name"
          style={{ color: 'white', fontWeight: 'bold' }}
        >
          Channel Name
        </label>
        <InputText
          type="text"
          id="channel-name"
          name="channel-name"
          placeholder="Channel name..."
          value={channelName}
          onChange={handleChannelNameChange}
          style={{ marginBottom: '32px' }}
        ></InputText>

        <label
          htmlFor="auth-token"
          style={{ color: 'white', fontWeight: 'bold' }}
        >
          Auth Token
        </label>
        <InputText
          type="password"
          id="auth-token"
          name="auth-token"
          placeholder="Auth token..."
          value={authToken}
          onChange={handleAuthTokenChange}
        ></InputText>

        <div style={{ margin: '0px auto 48px auto', textAlign: 'center' }}>
          <SuggestionLink href="#" onClick={openAuthTokenWindow}>
            Don't know your auth token?
          </SuggestionLink>
        </div>

        <Button type="button" onClick={handleConnectButton}>
          Connect
        </Button>
      </form>
    </Container>
  );
};

export default Authentication;
