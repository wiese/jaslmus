import { Input, InputEventNoteoff, InputEventNoteon } from "webmidi";
import Keyboard, {
  KeyboardEvent,
  KeyboardEvents,
  KeyboardEventTypes,
  KeyboardListener,
  ListenersMap
} from "./Keyboard";

function mapMidiEventToKeyboardEvent(
  event: InputEventNoteon | InputEventNoteoff
): KeyboardEvent {
  return {
    midiPitch: event.note.number,
    velocity: event.velocity
  };
}

/**
 * This keeps one "main listener" on the `input` as long as it necessary and
 * broadcasts its events to all listeners attached. This puts the burden of
 * keeping track of the listeners on us, but allows us to covert the events – which
 * are incompatible between the Keyboard-based listeners and the MIDI-based `input` event bus.
 */
export default class WebmidiInputKeyboardAdapter implements Keyboard {
  private listeners: ListenersMap = {
    [KeyboardEvents.noteon]: [],
    [KeyboardEvents.noteoff]: []
  };
  private readonly dispatcher: (
    midiEvent: InputEventNoteon | InputEventNoteoff
  ) => void;

  constructor(private readonly input: Input) {
    this.dispatcher = (midiEvent: InputEventNoteon | InputEventNoteoff) => {
      this.listeners[midiEvent.type].forEach(listener =>
        listener(mapMidiEventToKeyboardEvent(midiEvent))
      );
    };
  }

  addListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this {
    this.listeners[type].push(listener);
    this.ensureMainListenerAttachement(type);
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
    this.ensureMainListenerCleanup(type);
    return this;
  }

  private ensureMainListenerAttachement(type: keyof KeyboardEventTypes): void {
    if (this.listeners[type].length === 1) {
      this.input.addListener(type, "all", this.dispatcher);
    }
  }

  private ensureMainListenerCleanup(type: keyof KeyboardEventTypes): void {
    if (this.listeners[type].length === 0) {
      this.input.removeListener(type, "all", this.dispatcher);
    }
  }
}
