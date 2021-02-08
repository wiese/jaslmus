<template>
  <h1>Jaslmus</h1>
  <p>Learn to play the piano, all right.</p>
  <hr />
  <MidiDeviceSelector @deviceChanged="deviceChanged" />
  <hr />
  <ShowPlay :keyboard="device" />
</template>

<script>
import MidiDeviceSelector from "./components/MidiDeviceSelector.vue";
import ShowPlay from "./components/ShowPlay";

export default {
  name: "App",
  data: () => ({
    device: {}
  }),
  components: {
    MidiDeviceSelector,
    ShowPlay
  },
  unmounted() {
    this.unsubscribe();
  },
  methods: {
    deviceChanged(device) {
      this.unsubscribe(); // remove previous subscription
      this.subscribe(device);
    },
    subscribe(device) {
      this.device = device;
    },
    unsubscribe() {
      if (this.device.removeListener) {
        this.device.removeListener();
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
