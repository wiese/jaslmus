import { Input, InputEventNoteon } from "webmidi";
import Keyboard, { KeyboardListener } from "./Keyboard";

export default class WebmidiInputKeyboardAdapter implements Keyboard {
  private listeners: KeyboardListener[] = [];
  private readonly dispatcher: (midiEvent: InputEventNoteon) => void;

  constructor(readonly input: Input) {
    this.dispatcher = (midiEvent: InputEventNoteon) => {
      this.listeners.forEach(listener => listener(midiEvent.data[1]));
    };
  }

  addListener(listener: KeyboardListener): this {
    this.listeners.push(listener);
    if (this.listeners.length === 1) {
      this.input.addListener("noteon", "all", this.dispatcher);
    }
    return this;
  }

  removeListener(listener?: KeyboardListener): this {
    if (listener) {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    } else {
      this.listeners = [];
    }
    if (this.listeners.length === 0) {
      this.input.removeListener("noteon", "all", this.dispatcher);
    }
    return this;
  }
}
