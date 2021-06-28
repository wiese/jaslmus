import Keyboard, { KeyboardEvents } from "@/input/Keyboard";
import DispatchingKeyboard from "@/input/DispatchingKeyboard";

function getMockKeyboard(): Keyboard {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
}

describe("DispatchingKeyboard", () => {
  it("dispatches addListener", () => {
    const keyboard1: Keyboard = getMockKeyboard();
    const keyboard2: Keyboard = getMockKeyboard();
    const dispatchingKeyboard = new DispatchingKeyboard([keyboard1, keyboard2]);
    const type = KeyboardEvents.noteon;
    const listener = jest.fn();

    dispatchingKeyboard.addListener(type, listener);

    expect(keyboard1.addListener).toHaveBeenCalledWith(type, listener);
    expect(keyboard2.addListener).toHaveBeenCalledWith(type, listener);
  });

  it("dispatches removeListener", () => {
    const keyboard1: Keyboard = getMockKeyboard();
    const keyboard2: Keyboard = getMockKeyboard();
    const dispatchingKeyboard = new DispatchingKeyboard([keyboard1, keyboard2]);
    const type = KeyboardEvents.noteon;
    const listener = jest.fn();

    dispatchingKeyboard.removeListener(type, listener);

    expect(keyboard1.removeListener).toHaveBeenCalledWith(type, listener);
    expect(keyboard2.removeListener).toHaveBeenCalledWith(type, listener);
  });
});
