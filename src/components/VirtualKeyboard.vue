<template>
  <div ref="keyboard"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Instrument, INoteValue as PianoChartNote } from "piano-chart";
import { note } from "@tonaljs/core";

export default defineComponent({
  props: {
    startOctave: Number,
    endOctave: Number,
    highlightedNotes: {
      required: false,
      default: []
    }
  },
  data: () => ({
    piano: (null as unknown) as Instrument
  }),
  unmounted() {
    this.piano.destroy();
  },
  mounted() {
    this.piano = new Instrument(this.$refs.keyboard as HTMLElement, {
      startOctave: this.startOctave,
      endOctave: this.endOctave,
      highlightedNotes: this.highlightedNotes
    });
    this.piano.create();
    this.piano.addKeyMouseUpListener(this.piano.keyUp);
    this.piano.addKeyMouseDownListener(note => {
      this.piano.keyDown(note);
      this.keyPlay(note);
    });
  },
  methods: {
    keyPlay(pianoChartNote: PianoChartNote) {
      const midiPitch = note(pianoChartNote.toString()).midi;
      // we just swallow keys outside of midi range here - hmm…
      if (midiPitch) {
        this.$emit("noteon", midiPitch);
      }
    }
  },
  emits: ["noteon"]
});
</script>
