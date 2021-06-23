import Keyboard, { KeyboardListener } from "./Keyboard";

export default class DispatchingKeyboard implements Keyboard {
  constructor(private readonly keyboards: Keyboard[]) {}

  addListener(listener: KeyboardListener): this {
    this.keyboards.forEach(keyboard => keyboard.addListener(listener));
    return this;
  }

  removeListener(listener?: KeyboardListener): this {
    this.keyboards.forEach(keyboard => keyboard.removeListener(listener));
    return this;
  }
}
