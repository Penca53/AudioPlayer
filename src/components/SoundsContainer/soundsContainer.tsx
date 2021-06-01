import React, { useEffect, useRef, useState } from 'react';
import { PlaySound } from '../../soundPlayer';
import AddSoundButton from '../AddSoundButton/addSoundButton';
import { Container } from '../Main/styles';
import SoundEntry from '../SoundEntry/soundEntry';
import fs from 'fs';

export interface Sound {
  name: string;
  filepath: string;
  command: string;
}

interface SoundsContainer {
  client: any;
}

export const SoundsContainer: React.FC<SoundsContainer> = ({ client }) => {
  const saveSoundsList = () => {
    const data = JSON.stringify(soundsList);
    fs.writeFileSync('save.json', data);
  };

  const loadSoundsList = (): Sound[] => {
    if (fs.existsSync('save.json')) {
      const data = fs.readFileSync('save.json');
      const list: Sound[] = JSON.parse(data.toString());

      return list;
    } else {
      return [];
    }
  };

  const [soundsList, setSoundsList] = useState<Sound[]>(loadSoundsList());
  const latestSoundsList = useRef(soundsList);

  const [playingIndex, setPlayingIndex] = useState(-1);

  useEffect(() => {
    if (client) {
      client.on(
        'message',
        (channel: string, tags: string, message: string, self: string) => {
          console.log(latestSoundsList.current.length);
          if (!message.startsWith('!')) return;
          const command = message.toLowerCase().substr(1);
          for (let i = 0; i < latestSoundsList.current.length; ++i) {
            if (latestSoundsList.current[i].command === command) {
              PlaySound(latestSoundsList.current[i].filepath);
            }
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    latestSoundsList.current = soundsList;
    saveSoundsList();
  }, [soundsList]);

  return (
    <div
      style={{
        width: '75%',
      }}
    >
      {soundsList.map(
        (s, index) => (
          console.log(index),
          (
            <SoundEntry
              key={index}
              index={index}
              soundsList={soundsList}
              setSoundsList={setSoundsList}
              playingIndex={playingIndex}
              setPlayingIndex={setPlayingIndex}
            />
          )
        )
      )}

      <Container>
        <AddSoundButton soundsList={soundsList} setSoundsList={setSoundsList} />
      </Container>
    </div>
  );
};

export default SoundsContainer;
