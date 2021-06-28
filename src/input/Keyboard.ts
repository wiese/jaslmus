export interface KeyboardEvent {
  /* The MIDI note number – between 0 and 127 */
  midiPitch: number;
  /* The attack velocity – between 0 and 1 */
  velocity: number;
}

export enum KeyboardEvents {
  "noteon" = "noteon",
  "noteoff" = "noteoff"
}

export interface KeyboardEventTypes {
  [KeyboardEvents.noteon]: KeyboardEventNoteon;
  [KeyboardEvents.noteoff]: KeyboardEventNoteoff;
}

export interface KeyboardEventNoteon extends KeyboardEvent {
  type: KeyboardEvents.noteon;
}

export interface KeyboardEventNoteoff extends KeyboardEvent {
  type: KeyboardEvents.noteoff;
}

export type KeyboardListener = (keyboardEvent: KeyboardEvent) => void;

export type ListenersMap = {
  [key in keyof KeyboardEventTypes]: KeyboardListener[];
};

export default interface Keyboard {
  addListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this;
  removeListener<T extends keyof KeyboardEventTypes>(
    type: T,
    listener: KeyboardListener
  ): this;
}
