import VirtualKeyboardEventObserver from "@/input/VirtualKeyboardEventObserver";
import { KeyboardEvent } from "@/input/Keyboard";

describe("VirtualKeyboardEventObserver", () => {
  it("informs listeners on broadcast", () => {
    const keyboardEvent: KeyboardEvent = {
      midiPitch: 60,
      velocity: 1
    };
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(dummyListener1);
    observer.addListener(dummyListener2);
    observer.broadcast(keyboardEvent);

    expect(dummyListener1).toHaveBeenCalledWith(keyboardEvent);
    expect(dummyListener2).toHaveBeenCalledWith(keyboardEvent);
  });

  it("does not inform listener on broadcast after it has been removed", () => {
    const keyboardEvent: KeyboardEvent = {
      midiPitch: 125,
      velocity: 0.5
    };
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(dummyListener1);
    observer.addListener(dummyListener2);
    observer.removeListener(dummyListener2);
    observer.broadcast(keyboardEvent);

    expect(dummyListener1).toHaveBeenCalledWith(keyboardEvent);
    expect(dummyListener2).not.toHaveBeenCalled();
  });
});
