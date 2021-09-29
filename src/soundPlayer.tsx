import { Sound } from './components/SoundsContainer/soundsContainer';
import fs from 'fs';

export const VERSION = '1.1.0';
export const audioPlayer = new Audio();

export const saveData = (soundsList: Sound[]) => {
  const data = JSON.stringify({
    version: VERSION,
    soundsList,
    globalCooldown,
  });
  fs.writeFileSync('save.json', data);
};

export const loadData = (): Sound[] => {
  if (fs.existsSync('save.json')) {
    const data = fs.readFileSync('save.json');
    const obj = JSON.parse(data.toString());

    const version: string = obj.version;

    // Early version
    if (version == undefined) {
      const soundsList: Sound[] = obj;
      return soundsList;
    } else {
      const soundsList: Sound[] = obj.soundsList;
      globalCooldown = obj.globalCooldown;
      return soundsList;
    }
  } else {
    return [];
  }
};

export const DEFAULT_GLOBAL_COOLDOWN = 30;
const VOLUME = 0.25;

export let globalCooldown = DEFAULT_GLOBAL_COOLDOWN;
let lastTime = 0;
let lastCommandTime = 0;

export const playSoundFromCommand = (sound: Sound) => {
  if (Date.now() - lastCommandTime < globalCooldown * 1000) {
    return;
  }

  if (
    sound.lastPlayed === undefined ||
    Date.now() - sound.lastPlayed >= sound.cooldown * 1000
  ) {
    playSound(sound);
    lastCommandTime = Date.now();
  }
};

export const setGlobalCooldown = (cooldown: number) => {
  globalCooldown = cooldown;
};

export const playSound = (sound: Sound) => {
  if (audioPlayer.src !== new URL(sound.filepath).toString()) {
    audioPlayer.src = sound.filepath;
    audioPlayer.volume = VOLUME;
    sound.lastPlayed = Date.now();
  } else {
    audioPlayer.currentTime = lastTime;
  }

  audioPlayer.play();
};

export const stopSound = () => {
  audioPlayer.pause();
  lastTime = audioPlayer.currentTime;
};
