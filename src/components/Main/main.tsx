import React from 'react';
import MessagesContainer from '../MessagesContainer/messagesContainer';
import SoundsContainer from '../SoundsContainer/soundsContainer';

interface MainProps {
  client: any;
}

const Main: React.FC<MainProps> = ({ client }) => {
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
      <SoundsContainer client={client} />
      <hr
        style={{
          marginTop: 16,
          marginBottom: 16,
          width: '90%',
          border: '2px solid #222',
          borderRadius: 5,
        }}
      />
      <MessagesContainer client={client} />
    </div>
  );
};

export default Main;
