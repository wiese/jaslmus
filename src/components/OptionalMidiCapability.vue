<template>
  <div v-if="loading">
    {{ $i18n.t("midi.loading") }}
  </div>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WebMidi from "webmidi";

export default defineComponent({
  name: "OptionalMidiCapability",
  data: () => ({
    loading: true
  }),
  unmounted() {
    WebMidi.disable();
  },
  created() {
    if (!WebMidi.enabled) {
      WebMidi.enable(error => {
        this.loading = false;
        if (!error) {
          this.$emit("midiReady");
        }
      }, false);
    }
  },
  emits: ["midiReady", "midiError"]
});
</script>
