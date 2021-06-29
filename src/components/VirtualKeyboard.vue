<template>
  <div ref="keyboard"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Instrument, INoteValue as PianoChartNote, Note } from "piano-chart";
import { note } from "@tonaljs/core";
import { KEYS_IN_OCTAVE } from "@/Foundations";
import {
  KeyboardEventNoteoff,
  KeyboardEventNoteon,
  KeyboardEvents
} from "@/input/Keyboard";

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
    noteon(pianoChartNote: PianoChartNote) {
      // .toString() is cleanly implemented on NoteValue, not necessarily on INoteValue - hmm…
      const midiPitch = note(pianoChartNote.toString()).midi;
      // we just swallow keys outside of midi range here - hmm…
      if (midiPitch) {
        const event: KeyboardEventNoteon = {
          type: KeyboardEvents.noteon,
          midiPitch,
          velocity: this.simulateVelocity
        };
        this.$emit("noteon", event);
      }
    },
    noteoff(pianoChartNote: PianoChartNote) {
      // .toString() is cleanly implemented on NoteValue, not necessarily on INoteValue - hmm…
      const midiPitch = note(pianoChartNote.toString()).midi;
      // we just swallow keys outside of midi range here - hmm…
      if (midiPitch) {
        const event: KeyboardEventNoteoff = {
          type: KeyboardEvents.noteoff,
          midiPitch,
          velocity: this.simulateVelocity
        };
        this.$emit("noteoff", event);
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
      this.piano.addKeyMouseUpListener(note => {
        this.piano.keyUp(note); // unintuitively feed the information back into the keyboard so it can visualize it
        this.noteoff(note);
      });
      this.piano.addKeyMouseDownListener(note => {
        this.piano.keyDown(note);
        this.noteon(note);
      });
    }
  },
  emits: ["noteon", "noteoff"]
});
</script>
