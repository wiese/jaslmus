import TonalAbcNotation from "@tonaljs/abc-notation";
import Midi from "@tonaljs/midi";
import { KEYS_IN_OCTAVE } from "@/Foundations";

const MIDI_TOP_PITCH = 127;

// get this from a 3rd party. that'd be great
const accidentalKeys = [1, 3, 6, 8, 10];

export enum AccidentalsConfiguration {
  "no" = "no",
  "sharps" = "sharps",
  "flats" = "flats",
  "random" = "random"
}

export function generatePitchOptions(
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
      if (avoidAccidentals && accidentalKeys.includes(note)) {
        continue;
      }

      pitches.push(pitch);
    }
  }
  return pitches;
}

function getRandomValueFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function repetitionIsAvoidable(noteLimit: number): boolean {
  return noteLimit !== 1;
}

function midiToAbc(pitch: number, sharps: boolean) {
  return TonalAbcNotation.scientificToAbcNotation(
    Midi.midiToNoteName(pitch, { sharps })
  );
}

export class Challenge {
  constructor(readonly note: string, readonly pitch: number) {}
}

export default function*(
  baseNote: number,
  noteLimit: number,
  accidentals: AccidentalsConfiguration
) {
  const validPitches = generatePitchOptions(
    baseNote,
    noteLimit,
    accidentals === "no"
  );

  let previous: Challenge | null = null;
  while (true) {
    let pitch: number;
    do {
      pitch = getRandomValueFromArray(validPitches);
    } while (
      previous &&
      pitch === previous.pitch &&
      repetitionIsAvoidable(noteLimit)
    );

    const note = midiToAbc(
      pitch,
      accidentals === "sharps" ||
        (accidentals === "random" && Math.random() < 0.5)
    );

    const challenge: Challenge = new Challenge(note, pitch);

    previous = challenge;

    yield challenge;
  }
}
