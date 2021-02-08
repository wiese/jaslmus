<template>
  <div v-if="hasProblem">
    <p>Problem loading MIDI devices</p>
  </div>
  <div v-else>
    <label for="jaslmus-settings-midi-device">Select Device:</label>
    <select id="jaslmus-settings-midi-device" v-model="selected" @change="onChange($event)">
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
    hasProblem: false,
    selected: "",
    inputs: []
  }),
  created() {
    this.loadMidiDevices();
  },
  methods: {
    loadMidiDevices() {
      WebMidi.enable(err => {
        if (err) {
          this.hasProblem = true;
          return;
        }
        this.inputs = WebMidi.inputs;
      });
    },
    onChange(event) {
      this.$emit("deviceChanged", WebMidi.getInputById(event.target.value));
    }
  }
};
</script>

<style></style>
