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
      this.hasProblem = typeof window.navigator.requestMIDIAccess !== "function";
      if (this.hasProblem) {
        return;
      }
      window.navigator.requestMIDIAccess().then(midi => {
        this.inputs = midi.inputs;
      });
    },
    onChange(event) {
      this.$emit("deviceChanged", this.inputs.get(event.target.value));
    }
  }
};
</script>

<style></style>
