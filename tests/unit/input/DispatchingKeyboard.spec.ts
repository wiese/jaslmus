import Keyboard from "@/input/Keyboard";
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
    const listener = jest.fn();

    dispatchingKeyboard.addListener(listener);

    expect(keyboard1.addListener).toHaveBeenCalledWith(listener);
    expect(keyboard2.addListener).toHaveBeenCalledWith(listener);
  });

  it("dispatches removeListener", () => {
    const keyboard1: Keyboard = getMockKeyboard();
    const keyboard2: Keyboard = getMockKeyboard();
    const dispatchingKeyboard = new DispatchingKeyboard([keyboard1, keyboard2]);
    const listener = jest.fn();

    dispatchingKeyboard.removeListener(listener);

    expect(keyboard1.removeListener).toHaveBeenCalledWith(listener);
    expect(keyboard2.removeListener).toHaveBeenCalledWith(listener);
  });
});
