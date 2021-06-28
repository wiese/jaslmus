import VirtualKeyboardEventObserver from "@/input/VirtualKeyboardEventObserver";
import { KeyboardEventNoteon, KeyboardEvents } from "@/input/Keyboard";

describe("VirtualKeyboardEventObserver", () => {
  it("informs listeners on broadcast", () => {
    const keyboardEvent: KeyboardEventNoteon = {
      midiPitch: 60,
      velocity: 1,
      type: KeyboardEvents.noteon
    };
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(KeyboardEvents.noteon, dummyListener1);
    observer.addListener(KeyboardEvents.noteon, dummyListener2);
    observer.broadcast(keyboardEvent);

    expect(dummyListener1).toHaveBeenCalledWith(keyboardEvent);
    expect(dummyListener2).toHaveBeenCalledWith(keyboardEvent);
  });

  it("informs only the listener of the right type about a broadcast", () => {
    const keyboardEvent: KeyboardEventNoteon = {
      midiPitch: 60,
      velocity: 1,
      type: KeyboardEvents.noteon
    };
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(KeyboardEvents.noteon, dummyListener1);
    observer.addListener(KeyboardEvents.noteoff, dummyListener2);
    observer.broadcast(keyboardEvent);

    expect(dummyListener1).toHaveBeenCalledWith(keyboardEvent);
    expect(dummyListener2).not.toHaveBeenCalledWith(keyboardEvent);
  });

  it("does not inform listener on broadcast after it has been removed", () => {
    const keyboardEvent: KeyboardEventNoteon = {
      midiPitch: 125,
      velocity: 0.5,
      type: KeyboardEvents.noteon
    };
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(KeyboardEvents.noteon, dummyListener1);
    observer.addListener(KeyboardEvents.noteon, dummyListener2);
    observer.removeListener(KeyboardEvents.noteon, dummyListener2);
    observer.broadcast(keyboardEvent);

    expect(dummyListener1).toHaveBeenCalledWith(keyboardEvent);
    expect(dummyListener2).not.toHaveBeenCalled();
  });
});
