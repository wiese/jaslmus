import Keyboard, {
  KeyboardEventNoteoff,
  KeyboardEventNoteon,
  KeyboardEvents,
  KeyboardEventTypes,
  KeyboardListener,
  ListenersMap
} from "./Keyboard";

export default class VirtualKeyboardEventObserver implements Keyboard {
  private listeners: ListenersMap = {
    [KeyboardEvents.noteon]: [],
    [KeyboardEvents.noteoff]: []
  };

  addListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this {
    this.listeners[type].push(listener);
    return this;
  }

  removeListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this {
    const index = this.listeners[type].indexOf(listener);
    if (index !== -1) {
      this.listeners[type].splice(index, 1);
    }
    return this;
  }

  broadcast(keyboardEvent: KeyboardEventNoteon | KeyboardEventNoteoff): void {
    this.listeners[keyboardEvent.type].forEach(listener =>
      listener(keyboardEvent)
    );
  }
}
