import { shallowMount } from "@vue/test-utils";
import OptionalMidiCapability from "@/components/OptionalMidiCapability.vue";
import WebMidi from "webmidi";

describe("OptionalMidiCapability", () => {
  describe("while loading is going on", () => {
    it("shows the loading message", () => {
      const $i18n = {
        t: jest.fn().mockImplementation(key => key)
      };
      jest.spyOn(WebMidi, "enable").mockImplementation(); // never actually trigger callback, i.e. not loaded

      const wrapper = shallowMount(OptionalMidiCapability, {
        global: {
          mocks: {
            $i18n
          }
        }
      });

      expect($i18n.t).toHaveBeenCalledWith("midi.loading");
      expect(wrapper.text()).toBe("midi.loading");
    });
  });

  describe("when loading is done", () => {
    it("shows the default slot", () => {
      const defaultSlot = "yes!";
      jest.spyOn(WebMidi, "enable").mockImplementation(callback => {
        callback!();
      });

      const wrapper = shallowMount(OptionalMidiCapability, {
        slots: {
          default: defaultSlot
        }
      });

      expect(wrapper.text()).toBe(defaultSlot);
    });

    describe("if there is no error", () => {
      it("emits an event", () => {
        jest.spyOn(WebMidi, "enable").mockImplementation(callback => {
          callback!();
        });

        const wrapper = shallowMount(OptionalMidiCapability);

        expect(wrapper.emitted("midiReady")).toHaveLength(1);
      });
    });

    describe("if there is an error", () => {
      it("does not emit an event", () => {
        jest.spyOn(WebMidi, "enable").mockImplementation(callback => {
          callback!(new Error("no Midi"));
        });

        const wrapper = shallowMount(OptionalMidiCapability);

        expect(wrapper.emitted("midiReady")).toBeUndefined();
      });
    });
  });
});
