import { shallowMount } from "@vue/test-utils";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import { Instrument, INoteValue } from "piano-chart";

const mockKeyboard: Partial<Instrument> = {
  create: jest.fn(),
  addKeyMouseDownListener: jest.fn(),
  addKeyMouseUpListener: jest.fn(),
  keyUp: jest.fn(),
  keyDown: jest.fn(),
  destroy: jest.fn()
};

jest.mock("piano-chart", () => {
  return {
    Instrument: jest.fn().mockImplementation(() => mockKeyboard)
  };
});

describe("VirtualKeyboard.vue", () => {
  it("creates and sets up the 3rd party keyboard on mount", () => {
    const wrapper = shallowMount(VirtualKeyboard, {
      props: { settings: { keys: 49 } }
    });
    expect(Instrument).toHaveBeenCalledWith(wrapper.vm.$refs.keyboard, {
      endOctave: expect.any(Number),
      highlightedNotes: expect.any(Array),
      startNote: expect.any(String),
      startOctave: expect.any(Number)
    });
    expect(mockKeyboard.create).toHaveBeenCalled();
    // feeds the keyup information back into the keyboard so it can visualize it
    expect(mockKeyboard.addKeyMouseUpListener).toHaveBeenCalledWith(
      mockKeyboard.keyUp
    );
    expect(mockKeyboard.addKeyMouseDownListener).toHaveBeenCalled();
  });

  it("emits key down events", async () => {
    const wrapper = shallowMount(VirtualKeyboard, {
      props: { settings: { keys: 49 } }
    });

    expect(mockKeyboard.addKeyMouseDownListener).toHaveBeenCalled();
    const keyMouseDownListener = (mockKeyboard.addKeyMouseDownListener as jest.Mock)
      .mock.calls[0][0];

    const note: INoteValue = {
      note: "C",
      octave: 4
    };
    note.toString = () => "C4";
    keyMouseDownListener(note);

    await wrapper.vm.$nextTick();

    // feeds the keydown information back into the keyboard so it can visualize it (down) and emits it (up)
    expect(mockKeyboard.keyDown).toHaveBeenCalledWith(note);
    expect(wrapper.emitted("noteon")).toHaveLength(1);
    expect(wrapper.emitted("noteon")![0]).toStrictEqual([60]);
  });

  it("destroys 3rd party keyboard on unmount", () => {
    const wrapper = shallowMount(VirtualKeyboard, {
      props: { settings: { keys: 49 } }
    });
    wrapper.unmount();
    expect(mockKeyboard.destroy).toHaveBeenCalled();
  });

  describe("configures piano-chart based on 'keys' setting", () => {
    it.each([
      [49, 5],
      [88, 8]
    ])(
      "'keys' setting determines the number of octaves (%i => %i)",
      (keys, octaves) => {
        const wrapper = shallowMount(VirtualKeyboard, {
          props: { settings: { keys } }
        });
        expect(wrapper.vm.octaves).toBe(octaves);
      }
    );

    it.each([
      [49, "C"],
      [88, "A"]
    ])(
      "'keys' setting determines the start note (%i => %s)",
      (keys, startNote) => {
        const wrapper = shallowMount(VirtualKeyboard, {
          props: { settings: { keys } }
        });
        expect(wrapper.vm.startNote).toBe(startNote);
      }
    );

    it.each([
      [49, 2, 6],
      [88, 0, 8]
    ])(
      "'keys' setting determines start and end octave (%i => %i, %i)",
      (keys, startOctave, endOctave) => {
        const wrapper = shallowMount(VirtualKeyboard, {
          props: { settings: { keys } }
        });
        expect(wrapper.vm.startOctave).toBe(startOctave);
        expect(wrapper.vm.endOctave).toBe(endOctave);
      }
    );
  });
});
