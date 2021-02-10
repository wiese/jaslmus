<template>
  <MidiDeviceSelector :preferred="preferred" @deviceChanged="deviceChanged" />
</template>

<script>
import MidiDeviceSelector from "./MidiDeviceSelector";

export default {
  name: "SubscriptionHandlingDeviceSelector",
  components: {
    MidiDeviceSelector
  },
  props: {
    deviceId: {
      required: false,
      type: String
    }
  },
  data: () => ({
    preferred: ""
  }),
  created() {
    if (this.deviceId) {
      this.preferred = this.deviceId;
    }
  },
  methods: {
    deviceChanged(current, previous) {
      // remove subscriptions from previous device
      if (previous && typeof previous.removeListener === "function") {
        previous.removeListener();
      }

      this.$emit("deviceChanged", current, previous);
    }
  },
  emits: ["deviceChanged"]
};
</script>
