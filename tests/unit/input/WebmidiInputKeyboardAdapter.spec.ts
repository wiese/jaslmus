import WebmidiInputKeyboardAdapter from "@/input/WebmidiInputKeyboardAdapter";
import { Input, InputEventNoteon } from "webmidi";

describe("WebmidiInputKeyboardAdapter", () => {
  it("creates listener on webmidi input", () => {
    const webmidiInput = ({
      addListener: jest.fn()
    } as unknown) as Input;
    const adapter = new WebmidiInputKeyboardAdapter(webmidiInput);
    const dummyListener = jest.fn();

    adapter.addListener(dummyListener);

    expect(webmidiInput.addListener).toHaveBeenCalledWith(
      "noteon",
      "all",
      expect.anything()
    );
  });

  it("maps webmidi InputEvent to pitch if listener is called", () => {
    const pitch = 71;

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

    adapter.addListener(dummyListener);
    mockMidiInput.broadcast(({
      data: [144, pitch, 35]
    } as unknown) as InputEventNoteon);

    expect(dummyListener).toHaveBeenCalledWith(pitch);
  });

  it("performs listener removal from webmidi input upon last listener removal", () => {
    const webmidiInput = ({
      removeListener: jest.fn()
    } as unknown) as Input;
    const adapter = new WebmidiInputKeyboardAdapter(webmidiInput);
    const dummyListener = jest.fn();

    adapter.removeListener(dummyListener);

    expect(webmidiInput.removeListener).toHaveBeenCalledWith(
      "noteon",
      "all",
      expect.anything()
    );
  });

  it("keeps listener on webmidi input upon remaining listeners after removal", () => {
    const webmidiInput = ({
      addListener: jest.fn(),
      removeListener: jest.fn()
    } as unknown) as Input;
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const adapter = new WebmidiInputKeyboardAdapter(webmidiInput);
    adapter.addListener(dummyListener1);
    adapter.addListener(dummyListener2);
    adapter.removeListener(dummyListener1);

    expect(webmidiInput.removeListener).not.toHaveBeenCalled();
  });
});
