<template>
  <div v-if="loading">
    {{ $i18n.t("midi.loading") }}
  </div>
  <template v-else>
    <div v-if="error">
      <i18n-t keypath="midi.error" :tag="false" for="midi.compatibilityAnchor">
        <a href="https://caniuse.com/midi" target="_blank">
          {{ $t("midi.compatibilityAnchor") }}
        </a>
      </i18n-t>
    </div>
    <slot v-else />
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WebMidi from "webmidi";

export default defineComponent({
  name: "MidiCapability",
  data: () => ({
    loading: true,
    error: false
  }),
  unmounted() {
    WebMidi.disable();
  },
  created() {
    if (!WebMidi.enabled) {
      WebMidi.enable(err => {
        this.error = !!err;
        this.loading = false;
        this.$emit("midiReady");
      }, false);
    }
  },
  emits: ["midiReady"]
});
</script>
