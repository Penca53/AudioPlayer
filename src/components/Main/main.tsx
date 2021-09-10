import React, { createRef, useRef } from 'react';
import MessagesContainer from '../MessagesContainer/messagesContainer';
import Separator from '../Separator/separator';
import SoundsContainer from '../SoundsContainer/soundsContainer';

interface MainProps {
  client: any;
}

const Main: React.FC<MainProps> = ({ client }) => {
  const soundsContainer = useRef<HTMLDivElement>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <SoundsContainer client={client} soundsContainer={soundsContainer} />
      <Separator
        soundsContainer={soundsContainer}
        messagesContainer={messagesContainer}
      />
      <MessagesContainer
        client={client}
        messagesContainer={messagesContainer}
      />
    </div>
  );
};

export default Main;
