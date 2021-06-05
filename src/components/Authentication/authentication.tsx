import React, { useState } from 'react'
import { Button, InputText, Container } from './styles'
import fs from 'fs'
import tmi from 'tmi.js'

interface AuthenticationProps {
  client: any;
  setClient: React.Dispatch<React.SetStateAction<any>>;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

const Authentication: React.FC<AuthenticationProps> = ({
  client,
  setClient,
  isConnected,
  setIsConnected
}) => {
  const saveChannelName = () => {
    const data = JSON.stringify(channelName)
    fs.writeFileSync('channelName.json', data)
  }

  const loadChannelName = (): string => {
    if (fs.existsSync('channelName.json')) {
      const data = fs.readFileSync('channelName.json')
      const channelName: string = JSON.parse(data.toString())

      return channelName
    }

    return ''
  }

  const [channelName, setChannelName] = useState(loadChannelName())

  const handleChannelNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelName(event.target.value)
  }

  const handleConnectButton = () => {
    connectTwitchBot(channelName)
  }

  const connectTwitchBot = (channelName: string) => {
    const newClient = new tmi.Client({
      channels: [channelName]
    })

    newClient.connect()

    newClient.on('connected', (address: any, port: any) => {
      setIsConnected(true)
      saveChannelName()
    })

    setClient(newClient)
  }

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

        <Button type="button" onClick={handleConnectButton}>
          Connect
        </Button>
      </form>
    </Container>
  )
}

export default Authentication
