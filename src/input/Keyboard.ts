export interface KeyboardEvent {
  /* The MIDI note number – between 0 and 127 */
  midiPitch: number;
  /* The attack velocity – between 0 and 1 */
  velocity: number;
}

export type KeyboardListener = (keyboardEvent: KeyboardEvent) => void;

export default interface Keyboard {
  addListener(listener: KeyboardListener): this;

  removeListener(listener?: KeyboardListener): this;
}
