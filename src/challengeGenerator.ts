import generatePitchOptions from "@/generatePitchOptions";
import midiToAbc from "@/midiToAbc";

export enum AccidentalsConfiguration {
  "no" = "no",
  "sharps" = "sharps",
  "flats" = "flats",
  "random" = "random"
}

function getRandomValueFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function repetitionIsAvoidable(noteLimit: number): boolean {
  return noteLimit !== 1;
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
