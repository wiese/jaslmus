<template>
  <div v-if="loading">
    {{ $i18n.t("midi.loading") }}
  </div>
  <template v-else>
    <div v-if="error">
      {{ $i18n.t("midi.error") }}
    </div>
    <slot v-else />
  </template>
</template>

<script>
import WebMidi from "webmidi";

export default {
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
      });
    }
  }
};
</script>
