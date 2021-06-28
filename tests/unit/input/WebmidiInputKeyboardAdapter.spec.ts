import WebmidiInputKeyboardAdapter from "@/input/WebmidiInputKeyboardAdapter";
import { Input, InputEventNoteon } from "webmidi";
import { KeyboardEvents } from "@/input/Keyboard";

describe("WebmidiInputKeyboardAdapter", () => {
  it("creates listener on webmidi input", () => {
    const webmidiInput = ({
      addListener: jest.fn()
    } as unknown) as Input;
    const adapter = new WebmidiInputKeyboardAdapter(webmidiInput);
    const dummyListener = jest.fn();

    adapter.addListener(KeyboardEvents.noteon, dummyListener);

    expect(webmidiInput.addListener).toHaveBeenCalledWith(
      "noteon",
      "all",
      expect.anything()
    );
  });

  it("maps webmidi InputEvent to KeyboardEvent if listener is called", () => {
    const pitch = 71,
      velocity = 0.5;

    class MockMidiInput {
      private listeners: Array<(event: InputEventNoteon) => any> = [];
      addListener(
        _type: any,
        _channel: any,
        listener: (event: InputEventNoteon) => any
      ) {
        this.listeners.push(listener);
      }
      broadcast(event: InputEventNoteon) {
        this.listeners.forEach(listener => listener(event));
      }
    }
    const dummyListener = jest.fn();
    const mockMidiInput = new MockMidiInput();
    const adapter = new WebmidiInputKeyboardAdapter(
      (mockMidiInput as unknown) as Input
    );

    adapter.addListener(KeyboardEvents.noteon, dummyListener);
    mockMidiInput.broadcast({
      note: {
        number: pitch
      },
      velocity,
      type: "noteon"
    } as InputEventNoteon);

    expect(dummyListener).toHaveBeenCalledWith({
      midiPitch: pitch,
      velocity
    });
  });

  it("performs listener removal from webmidi input upon last listener removal", () => {
    const webmidiInput = ({
      removeListener: jest.fn()
    } as unknown) as Input;
    const adapter = new WebmidiInputKeyboardAdapter(webmidiInput);
    const dummyListener = jest.fn();

    adapter.removeListener(KeyboardEvents.noteon, dummyListener);

    expect(webmidiInput.removeListener).toHaveBeenCalledWith(
      "noteon",
      "all",
      expect.anything()
    );
  });

  it("keeps listener on webmidi input upon remaining listeners after removal", () => {
    const type = KeyboardEvents.noteon;
    const webmidiInput = ({
      addListener: jest.fn(),
      removeListener: jest.fn()
    } as unknown) as Input;
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const adapter = new WebmidiInputKeyboardAdapter(webmidiInput);
    adapter.addListener(type, dummyListener1);
    adapter.addListener(type, dummyListener2);
    adapter.removeListener(type, dummyListener1);

    expect(webmidiInput.removeListener).not.toHaveBeenCalled();
  });
});
