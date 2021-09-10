import { Sound } from './components/SoundsContainer/soundsContainer';

export const audioPlayer = new Audio();
const VOLUME = 0.25;

let lastTime = 0;

export const playSoundFromCommand = (sound: Sound) => {
  if (
    sound.lastPlayed === undefined ||
    Date.now() - sound.lastPlayed >= sound.cooldown * 1000
  ) {
    playSound(sound);
  }
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
