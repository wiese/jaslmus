const MIDI_TOP_PITCH = 127;

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function*(baseNote: number, noteLimit: number | null) {
  let upper;
  if (noteLimit === null) {
    upper = MIDI_TOP_PITCH;
  } else {
    upper = baseNote + noteLimit - 1;
  }

  while (true) {
    yield randomIntFromInterval(baseNote, upper);
  }
}
