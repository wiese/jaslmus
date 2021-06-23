<template>
  <AbcNotation :abc="abc" />
  <p ref="notes"></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import AbcNotation from "./AbcNotation.vue";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";
import Keyboard from "@/input/Keyboard";

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
    this.keyboard.removeListener(this.midiSubscription);
  },
  mounted() {
    this.keyboard.addListener(this.midiSubscription);
  },
  methods: {
    midiSubscription(pitch: number) {
      const abc = TonalAbcNotation.scientificToAbcNotation(
        Midi.midiToNoteName(pitch)
      );
      this.abc = `X:1\nK:C\n${abc}`;
      (this.$refs.notes as HTMLElement).innerHTML += `${pitch} (${abc})<br />`;
    }
  }
});
</script>
