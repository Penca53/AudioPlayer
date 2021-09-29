import React from 'react';
import { audioPlayer, playSound, stopSound } from '../../soundPlayer';
import { Sound } from '../SoundsContainer/soundsContainer';
import { PlayButton, DeleteButton, FileButton } from './styles';

interface SoundEntryProps {
  index: number;
  soundsList: Sound[];
  setSoundsList: React.Dispatch<React.SetStateAction<Sound[]>>;
  playingIndex: number;
  setPlayingIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SoundEntry: React.FC<SoundEntryProps> = ({
  index,
  soundsList,
  setSoundsList,
  playingIndex,
  setPlayingIndex,
}) => {
  const handleCommandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = soundsList.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          command: event.target.value,
        };

        return updatedItem;
      }

      return item;
    });

    setSoundsList(newList);
  };

  const handleFilepathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files[0].path) {
        const newFilepath = event.target.files[0].path.toString();
        const newList = soundsList.map((item, i) => {
          if (i === index) {
            const updatedItem = {
              ...item,
              filepath: newFilepath,
            };

            return updatedItem;
          }

          return item;
        });

        setSoundsList(newList);
      }
    }
  };

  const handleCooldownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = soundsList.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          cooldown: parseInt(event.target.value),
        };

        return updatedItem;
      }

      return item;
    });

    setSoundsList(newList);
  };

  const handlePlaySound = () => {
    if (playingIndex !== index) {
      playSound(soundsList[index]);
      setPlayingIndex(index);
    } else {
      stopSound();
      setPlayingIndex(-1);
    }
  };

  const handleRemoveSound = () => {
    const newList = soundsList.filter((item, i) => i !== index);

    setSoundsList(newList);
  };

  const getTrimmedFilepath = (filepath: string, maxChars: number) => {
    const filenameStart = filepath.lastIndexOf('\\') + 1;
    const l = filepath.length - filenameStart;

    if (l <= maxChars) {
      const result = filepath.substr(filenameStart);
      return result;
    } else {
      const right = Math.floor((maxChars - 3) / 2);
      const left = maxChars - 3 - right;

      const result =
        filepath.substr(filenameStart, left) +
        '...' +
        filepath.substr(filepath.length - right);
      return result;
    }
  };

  if (audioPlayer) {
    audioPlayer.onended = () => {
      setPlayingIndex(-1);
    };
  }

  return (
    <form
      style={{
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PlayButton
        type="button"
        name="play_sound"
        id="play_sound"
        onClickCapture={handlePlaySound}
        className={playingIndex !== index ? 'fa fa-play' : 'fa fa-pause'}
      ></PlayButton>

      <input
        type="text"
        value={soundsList[index].command}
        placeholder="Command name"
        style={{ padding: '8px', width: '24%', border: '0px' }}
        onChange={handleCommandChange}
      ></input>

      <FileButton>
        <input
          type="file"
          name="file_sound"
          id="file_sound"
          style={{
            display: 'none',
          }}
          onChange={(e) => handleFilepathChange(e)}
        ></input>
        {!soundsList[index].filepath
          ? 'Choose sound...'
          : getTrimmedFilepath(soundsList[index].filepath, 40)}
      </FileButton>

      <input
        type="number"
        min="0"
        value={soundsList[index].cooldown}
        placeholder="Cooldown..."
        style={{ padding: '8px', width: '24%', border: '0px' }}
        onChange={handleCooldownChange}
      ></input>

      <DeleteButton
        type="button"
        name="remove_sound"
        id="remove_sound"
        onClick={handleRemoveSound}
        className={'fa fa-close'}
      ></DeleteButton>
    </form>
  );
};

export default SoundEntry;
