<template>
  <div v-if="loading">
    Loading MIDI capability…
  </div>
  <template v-else>
    <div v-if="error">
      Problem loading MIDI capability. Please check browser permissions.
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
    this.ensureMidiEnabled()
      .catch(() => {
        this.loading = false;
        this.error = true;
      })
      .then(() => {
        this.loading = false;
      });
  },
  methods: {
    ensureMidiEnabled() {
      if (WebMidi.enabled) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        WebMidi.enable(err => {
          if (err) {
            reject();
            return;
          }
          resolve();
        });
      });
    }
  }
};
</script>
