import VirtualKeyboardEventObserver from "@/VirtualKeyboardEventObserver";

describe("VirtualKeyboardEventObserver", () => {
  it("informs listeners on broadcast", () => {
    const pitch = 125;
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(dummyListener1);
    observer.addListener(dummyListener2);
    observer.broadcast(pitch);

    expect(dummyListener1).toHaveBeenCalledWith(pitch);
    expect(dummyListener2).toHaveBeenCalledWith(pitch);
  });

  it("does not inform listener on broadcast after it has been removed", () => {
    const pitch = 125;
    const dummyListener1 = jest.fn();
    const dummyListener2 = jest.fn();

    const observer = new VirtualKeyboardEventObserver();
    observer.addListener(dummyListener1);
    observer.addListener(dummyListener2);
    observer.removeListener(dummyListener2);
    observer.broadcast(pitch);

    expect(dummyListener1).toHaveBeenCalledWith(pitch);
    expect(dummyListener2).not.toHaveBeenCalled();
  });
});
