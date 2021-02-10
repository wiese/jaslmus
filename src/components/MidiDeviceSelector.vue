<template>
  <div>
    <label for="jaslmus-settings-midi-device">{{ $i18n.t("midiOptions.input.device.title") }}</label>
    <select
      id="jaslmus-settings-midi-device"
      v-model="selected"
      @change="onChange($event)"
    >
      <option disabled value="">{{ $i18n.t("midiOptions.input.device.placeholder") }}</option>
      <option
        v-for="option in inputs"
        v-bind:value="option.id"
        v-bind:key="option.id"
      >
        {{ option.name }} ({{ option.manufacturer }})
      </option>
    </select>
  </div>
</template>

<script>
import WebMidi from "webmidi";

export default {
  name: "MidiDeviceSelector",
  props: {
    preferred: {
      required: false,
      type: Object
    }
  },
  data: () => ({
    selected: "",
    inputs: []
  }),
  created() {
    if (!WebMidi.enabled) {
      throw new Error("WebMidi must be enabled for this component to work!");
    }

    this.inputs = WebMidi.inputs;

    if (this.preferred && WebMidi.getInputById(this.preferred.id)) {
      this.selected = this.preferred.id;
    }
  },
  methods: {
    onChange(event) {
      this.$emit("deviceChanged", WebMidi.getInputById(event.target.value));
    }
  },
  emits: ["deviceChanged"]
};
</script>

<style></style>
