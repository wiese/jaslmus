import Keyboard, { KeyboardListener } from "./Keyboard";

export default class VirtualKeyboardEventObserver implements Keyboard {
  private listeners: KeyboardListener[] = [];

  addListener(listener: KeyboardListener): this {
    this.listeners.push(listener);
    return this;
  }

  removeListener(specificListener?: KeyboardListener): this {
    if (specificListener) {
      const index = this.listeners.indexOf(specificListener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    } else {
      this.listeners = [];
    }
    return this;
  }

  broadcast(midiPitch: number): void {
    this.listeners.forEach(listener => listener(midiPitch));
  }
}
