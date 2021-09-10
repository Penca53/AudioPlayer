import React, { useEffect, useState, useRef, RefObject } from 'react';
import MessageEntry from '../MessageEntry/messageEntry';

interface MessagesContainerProps {
  client: any;
  messagesContainer: RefObject<HTMLDivElement>;
}

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

export const MAX_MESSAGES_COUNT = 100;

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  client,
  messagesContainer,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (client) {
      client.on(
        'message',
        (channel: string, userstate: any, text: string, self: boolean) => {
          const userState: UserState = {
            color: userstate['color'],
            displayName: userstate['display-name'],
            mod: userstate['mod'],
            subscriber: userstate['subscriber'],
            username: userstate['username'],
            id: userstate['id'],
            channel: channel,
            messageType: userstate['message-type'],
          };

          const message: Message = {
            userState: userState,
            text: text,
          };

          setMessages((messages) => {
            while (messages.length >= MAX_MESSAGES_COUNT) {
              messages.shift();
            }
            return [...messages, message];
          });
        }
      );
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        width: '85vw',
        flex: '0.25',
        overflowY: 'scroll',
        borderRadius: 4,
        backgroundColor: '#333333',
      }}
      className="custom-scroll"
      ref={messagesContainer}
    >
      {messages.map((msg, index) => (
        <MessageEntry key={index} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;
