<template>
  <div ref="keyboard"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Instrument, INoteValue as PianoChartNote, Note } from "piano-chart";
import { note } from "@tonaljs/core";
import { KEYS_IN_OCTAVE } from "@/Foundations";
import { KeyboardEvent } from "@/input/Keyboard";

interface Settings {
  keys: number;
}

export default defineComponent({
  props: {
    settings: {
      required: true,
      type: Object as PropType<Settings>
    },
    highlightedNotes: {
      required: false,
      default: []
    },
    simulateVelocity: {
      required: false,
      type: Number,
      default: 1,
      validator(value: number) {
        return value >= 0 && value <= 1;
      }
    }
  },
  computed: {
    octaves(): number {
      return Math.ceil(this.settings.keys / KEYS_IN_OCTAVE);
    },
    startNote(): string {
      const rest = this.settings.keys % KEYS_IN_OCTAVE;
      if (this.octaves > 7 && rest > 0) {
        return "A";
      }
      return "C";
    },
    startOctave(): number {
      return 4 - Math.floor(this.octaves / 2);
    },
    endOctave(): number {
      return 4 + Math.floor(this.octaves / 2);
    }
  },
  watch: {
    settings() {
      this.render();
    }
  },
  data: () => ({
    piano: (null as unknown) as Instrument
  }),
  unmounted() {
    this.piano.destroy();
  },
  mounted() {
    this.render();
  },
  methods: {
    keyPlay(pianoChartNote: PianoChartNote) {
      // .toString() is cleanly implemented on NoteValue, not necessarily on INoteValue - hmm…
      const midiPitch = note(pianoChartNote.toString()).midi;
      // we just swallow keys outside of midi range here - hmm…
      if (midiPitch) {
        const event: KeyboardEvent = {
          midiPitch,
          velocity: this.simulateVelocity
        };
        this.$emit("noteon", event);
      }
    },
    render() {
      this.piano = new Instrument(this.$refs.keyboard as HTMLElement, {
        startOctave: this.startOctave,
        startNote: this.startNote as Note,
        endOctave: this.endOctave,
        highlightedNotes: this.highlightedNotes
      });
      this.piano.create();
      this.piano.addKeyMouseUpListener(this.piano.keyUp);
      this.piano.addKeyMouseDownListener(note => {
        this.piano.keyDown(note);
        this.keyPlay(note);
      });
    }
  },
  emits: ["noteon"]
});
</script>
