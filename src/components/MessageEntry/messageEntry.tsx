import React from 'react';

interface UserState {
  color: string;
  displayName: string;
  mod: boolean;
  subscriber: boolean;
  username: string;
  id: string;
  channel: string;
  messageType: string;
}

interface Message {
  userState: UserState;
  text: string;
}

interface MessageEntryProps {
  message: Message;
}

const MessageEntry: React.FC<MessageEntryProps> = ({ message }) => {
  let defaultColors = [
    '#FF0000',
    '#0000FF',
    '#008000',
    '#B22222',
    '#FF7F50',
    '#9ACD32',
    '#FF4500',
    '#2E8B57',
    '#DAA520',
    '#D2691E',
    '#5F9EA0',
    '#1E90FF',
    '#FF69B4',
    '#8A2BE2',
    '#00FF7F',
  ];

  let randomColorsChosen = new Map<string, Map<string, string>>();

  const resolveColor = (chan: string, name: string, color: string) => {
    if (color !== null) {
      return color;
    }
    if (!randomColorsChosen.has(chan)) {
      randomColorsChosen.set(chan, new Map<string, string>());
    }
    if (randomColorsChosen.get(chan)?.has(name)) {
      color = randomColorsChosen.get(chan)?.get(name)!;
    } else {
      color = defaultColors[Math.floor(Math.random() * defaultColors.length)];
      randomColorsChosen.get(chan)?.set(name, color);
    }
    return color;
  };

  return (
    <div style={{ overflowWrap: 'anywhere' }}>
      <div
        style={{
          display: 'inline-block',
          color: resolveColor(
            message.userState.channel,
            message.userState.username,
            message.userState.color
          ),
          fontWeight: 'bold',
        }}
      >
        <span>{message.userState.displayName + ': '}</span>
      </div>
      <div
        style={{
          display: 'inline',
          fontStyle: message.userState.messageType === 'chat' ? '' : 'italic',
        }}
      >
        <span>{message.text}</span>
      </div>
    </div>
  );
};

export default MessageEntry;
