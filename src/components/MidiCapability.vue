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
