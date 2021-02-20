const MIDI_TOP_PITCH = 127;

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function repetitionIsAvoidable(noteLimit: number): boolean {
  return noteLimit !== 1;
}

export default function*(baseNote: number, noteLimit: number) {
  let upper;
  if (noteLimit === 0) {
    upper = MIDI_TOP_PITCH;
  } else {
    upper = baseNote + noteLimit - 1;
  }

  let previousPitch: number | null = null;
  let pitch: number;
  while (true) {
    do {
      pitch = randomIntFromInterval(baseNote, upper);
    } while (pitch === previousPitch && repetitionIsAvoidable(noteLimit));

    previousPitch = pitch;

    yield pitch;
  }
}