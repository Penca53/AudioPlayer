import { Sound } from '../components/SoundsContainer/soundsContainer';
import fs from 'fs';

export const saveSoundsList = (soundsList: Sound[]) => {
  console.log('Saving ' + soundsList);
  const data = JSON.stringify(soundsList);
  fs.writeFile('save.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data is saved.');
  });
};

export const loadSoundsList = (): Sound[] => {
  if (fs.existsSync('save.json')) {
    const data = fs.readFileSync('save.json');
    const list: Sound[] = JSON.parse(data.toString());

    console.log(list);
    return list;
  } else {
    return [];
  }
};
