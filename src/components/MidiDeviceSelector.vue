<template>
  <div>
    <label for="jaslmus-settings-midi-device">Select Device:</label>
    <select
      id="jaslmus-settings-midi-device"
      v-model="selected"
      @change="onChange($event)"
    >
      <option disabled value="">Please select one</option>
      <option
        v-for="option in options"
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
  computed: {
    options() {
      const options = [];
      this.inputs.forEach(value => {
        options.push(value);
      });
      return options;
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
