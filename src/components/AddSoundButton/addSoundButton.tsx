import React from 'react';
import { Button } from './styles';
import { Sound } from '../SoundsContainer/soundsContainer';

interface AddSoundButtonProps {
  soundsList: Sound[];
  setSoundsList: React.Dispatch<React.SetStateAction<Sound[]>>;
}

const AddSoundButton: React.FC<AddSoundButtonProps> = ({
  soundsList,
  setSoundsList,
}) => {
  const handleAddSound = () => {
    const newList: Sound[] = [
      ...soundsList,
      { name: '', command: '', filepath: '' },
    ];

    setSoundsList(newList);
  };

  return (
    <form style={{ marginTop: '16px' }}>
      <Button
        type="button"
        name="add_sound"
        id="add_sound"
        onClick={handleAddSound}
        className={'fa fa-plus'}
      ></Button>
    </form>
  );
};

export default AddSoundButton;
