<template>
  <MidiDeviceSelector @deviceChanged="deviceChanged" />
</template>

<script>
import MidiDeviceSelector from "./MidiDeviceSelector";

export default {
  components: {
    MidiDeviceSelector
  },
  data: () => ({
    device: {}
  }),
  unmounted() {
    this.unsubscribe();
  },
  methods: {
    deviceChanged(device) {
      this.unsubscribe(); // remove previous subscription
      this.device = device;
      this.$emit("deviceChanged", this.device);
    },
    unsubscribe() {
      if (this.device.removeListener) {
        this.device.removeListener();
      }
    }
  }
};
</script>
