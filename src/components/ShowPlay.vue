<template>
  <AbcNotation :abc="abc" />
  <p ref="notes"></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AbcNotation from "./AbcNotation.vue";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";
import Keyboard, { KeyboardEvent, KeyboardEvents } from "@/input/Keyboard";

export default defineComponent({
  name: "ShowPlay",
  props: {
    keyboard: {
      required: true,
      type: Object as PropType<Keyboard>
    }
  },
  data: () => ({
    abc: ""
  }),
  components: {
    AbcNotation
  },
  unmounted() {
    this.keyboard.removeListener(KeyboardEvents.noteon, this.midiSubscription);
  },
  mounted() {
    this.keyboard.addListener(KeyboardEvents.noteon, this.midiSubscription);
  },
  methods: {
    midiSubscription(keyboardEvent: KeyboardEvent) {
      const pitch = keyboardEvent.midiPitch;
      const abc = TonalAbcNotation.scientificToAbcNotation(
        Midi.midiToNoteName(pitch)
      );
      this.abc = `X:1\nK:C\n${abc}`;
      (this.$refs.notes as HTMLElement).innerHTML += `${pitch} (${abc})<br />`;
    }
  }
});
</script>
