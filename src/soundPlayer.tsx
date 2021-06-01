export const audioPlayer = new Audio();
const VOLUME = 0.25;

let lastTime = 0;

export const PlaySound = (filepath: string) => {
  if (audioPlayer.src !== new URL(filepath).toString()) {
    audioPlayer.src = filepath;
    audioPlayer.volume = VOLUME;
  } else {
    audioPlayer.currentTime = lastTime;
  }

  audioPlayer.play();
};

export const StopSound = () => {
  audioPlayer.pause();
  lastTime = audioPlayer.currentTime;
};
