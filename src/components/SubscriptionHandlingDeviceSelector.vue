<template>
  <MidiDeviceSelector :preferred="device" @deviceChanged="deviceChanged" />
</template>

<script>
import MidiDeviceSelector from "./MidiDeviceSelector";

export default {
  name: "SubscriptionHandlingDeviceSelector",
  components: {
    MidiDeviceSelector
  },
  props: {
    device: {
      required: false,
      type: Object
    }
  },
  methods: {
    deviceChanged(device) {
      // remove subscriptions from previous device
      if (this.device && this.device.removeListener) {
        this.device.removeListener();
      }

      this.$emit("deviceChanged", device);
    }
  },
  emits: ["deviceChanged"]
};
</script>
