import React from 'react';
import SoundsContainer from '../SoundsContainer/soundsContainer';
import { Container } from './styles';

interface MainProps {
  client: any;
}

const Main: React.FC<MainProps> = ({ client }) => {
  return (
    <Container>
      <SoundsContainer client={client} />
    </Container>
  );
};

export default Main;
