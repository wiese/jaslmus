<template>
  <h1>Jaslmus</h1>
  <p>Learn to play the piano, all right.</p>
  <hr />
  <MidiDeviceSelector @deviceChanged="deviceChanged" />
  <hr />
  <p ref="notes"></p>
</template>

<script>
import MidiDeviceSelector from "./components/MidiDeviceSelector.vue";

// see http://www.computermusicresource.com/MIDI.Commands.html
const MIDI_COMMAND_ON = 144;

export default {
  name: "App",
  data: () => ({
    device: {}
  }),
  components: {
    MidiDeviceSelector
  },
  unmounted() {
    this.unsubscribe();
  },
  methods: {
    deviceChanged(device) {
      this.unsubscribe(); // remove previous subscription
      this.subscribe(device);
    },
    midiSubscription(midiEvent) {
      if (midiEvent.data[0] === MIDI_COMMAND_ON) {
        this.$refs.notes.innerHTML += midiEvent.data[1] + "<br />";
      }
    },
    subscribe(device) {
      device.onmidimessage = this.midiSubscription;
      this.device = device;
    },
    unsubscribe() {
      if (this.device.onmidimessage) {
        this.device.onmidimessage = null;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
