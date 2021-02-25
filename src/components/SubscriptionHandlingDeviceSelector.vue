<template>
  <MidiDeviceSelector :preferred="preferred" @deviceChanged="deviceChanged" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MidiDeviceSelector from "./MidiDeviceSelector.vue";
import { Input } from "webmidi";

export default defineComponent({
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
    deviceChanged(current: Input, previous: Input | null) {
      // remove subscriptions from previous device
      if (previous && typeof previous.removeListener === "function") {
        previous.removeListener();
      }

      this.$emit("deviceChanged", current, previous);
    }
  },
  emits: ["deviceChanged"]
});
</script>
