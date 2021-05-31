import { ACCIDENTAL_KEYS, KEYS_IN_OCTAVE, MIDI_TOP_PITCH } from "@/Foundations";

export default function generatePitchOptions(
  baseNote: number,
  noteLimit: number,
  avoidAccidentals: boolean
): number[] {
  const pitches = [];
  let pitch = -1;
  for (let octave = -1; octave <= 9; octave++) {
    for (let note = 0; note < KEYS_IN_OCTAVE; note++) {
      pitch++;

      if (pitch > MIDI_TOP_PITCH || pitches.length >= noteLimit) {
        return pitches;
      }

      if (pitch < baseNote) {
        continue;
      }
      if (avoidAccidentals && ACCIDENTAL_KEYS.includes(note)) {
        continue;
      }

      pitches.push(pitch);
    }
  }
  return pitches;
}
