import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  loadData,
  globalCooldown,
  playSoundFromCommand,
  saveData,
  setGlobalCooldown,
} from '../../soundPlayer';
import AddSoundButton from '../AddSoundButton/addSoundButton';
import { Container } from '../Main/styles';
import SoundEntry from '../SoundEntry/soundEntry';

export interface Sound {
  filepath: string;
  command: string;
  cooldown: number;
  lastPlayed: number;
}

interface SoundsContainer {
  soundsContainer: RefObject<HTMLDivElement>;
  client: any;
}

export const SoundsContainer: React.FC<SoundsContainer> = ({
  soundsContainer,
  client,
}) => {
  const savedData = loadData();

  const [soundsList, setSoundsList] = useState<Sound[]>(loadData());
  const [globalCooldownState, setGlobalCooldownState] =
    useState(globalCooldown);

  const latestSoundsList = useRef(soundsList);

  const [playingIndex, setPlayingIndex] = useState(-1);

  useEffect(() => {
    if (client) {
      client.on(
        'message',
        (channel: string, tags: string, message: string, self: string) => {
          if (!message.startsWith('!')) return;
          const command = message.toLowerCase().substr(1);
          for (let i = 0; i < latestSoundsList.current.length; ++i) {
            if (latestSoundsList.current[i].command === command) {
              playSoundFromCommand(latestSoundsList.current[i]);
            }
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    latestSoundsList.current = soundsList;
    setGlobalCooldown(globalCooldownState);
    saveData(soundsList);
  }, [globalCooldownState, soundsList]);

  const handleGlobalCooldownChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGlobalCooldownState(parseInt(event.target.value));
  };

  return (
    <div
      style={{
        width: '85vw',
        flex: '0.75',
        overflowY: 'scroll',
      }}
      className="custom-scroll"
      ref={soundsContainer}
    >
      <form
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label htmlFor="global-cooldown" style={{ fontWeight: 'bold' }}>
          Global cooldown:
        </label>
        <input
          type="number"
          min="0"
          value={globalCooldownState}
          onChange={handleGlobalCooldownChange}
          id="global-cooldown"
          style={{ maxWidth: '64px', textAlign: 'right' }}
        ></input>
      </form>

      {soundsList.map((s, index) => (
        <SoundEntry
          key={index}
          index={index}
          soundsList={soundsList}
          setSoundsList={setSoundsList}
          playingIndex={playingIndex}
          setPlayingIndex={setPlayingIndex}
        />
      ))}

      <Container>
        <AddSoundButton soundsList={soundsList} setSoundsList={setSoundsList} />
      </Container>
    </div>
  );
};

export default SoundsContainer;
