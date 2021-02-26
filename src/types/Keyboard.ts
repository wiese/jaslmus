type KeyboardListener = (midiPitch: number) => void;

export default interface Keyboard {
  addListener(listener: KeyboardListener): this;

  removeListener(listener?: KeyboardListener): this;
}
