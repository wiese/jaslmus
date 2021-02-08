<template>
  <AbcNotation :abc="abc" />
  <p ref="notes"></p>
</template>

<script>
import AbcNotation from "./AbcNotation.vue";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";

export default {
  name: "ShowPlay",
  props: {
    keyboard: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    abc: ""
  }),
  watch: {
    keyboard() {
      this.unsubscribe(); // remove previous subscription
      this.subscribe(this.keyboard);
    }
  },
  components: {
    AbcNotation
  },
  unmounted() {
    this.unsubscribe();
  },
  methods: {
    midiSubscription(midiEvent) {
      const pitch = midiEvent.data[1];
      const abc = TonalAbcNotation.scientificToAbcNotation(
        Midi.midiToNoteName(pitch)
      );
      this.abc = `X:1\nK:C\n${abc}`;
      this.$refs.notes.innerHTML += `${pitch} (${abc})<br />`;
    },
    subscribe(keyboard) {
      keyboard.addListener("noteon", "all", this.midiSubscription);
    },
    unsubscribe() {
      if (this.keyboard.removeListener) {
        this.keyboard.removeListener("noteon", "all", this.midiSubscription);
      }
    }
  }
};
</script>
