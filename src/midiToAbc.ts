import TonalAbcNotation from "@tonaljs/abc-notation";
import Midi from "@tonaljs/midi";

export default function midiToAbc(pitch: number, sharps: boolean = false) {
  return TonalAbcNotation.scientificToAbcNotation(
    Midi.midiToNoteName(pitch, { sharps })
  );
}
