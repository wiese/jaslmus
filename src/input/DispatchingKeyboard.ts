import Keyboard, { KeyboardEventTypes, KeyboardListener } from "./Keyboard";

export default class DispatchingKeyboard implements Keyboard {
  constructor(private readonly keyboards: Keyboard[]) {}

  addListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this {
    this.keyboards.forEach(keyboard => keyboard.addListener(type, listener));
    return this;
  }

  removeListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this {
    this.keyboards.forEach(keyboard => keyboard.removeListener(type, listener));
    return this;
  }
}
