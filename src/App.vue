<template>
  <h1>Jaslmus</h1>
  <p>Learn to play the piano, all right.</p>
  <hr />
  <SubscriptionHandlingDeviceSelector @deviceChanged="device = $event" />
  <hr />
  <ShowPlay :keyboard="device" />
  <hr />
  <Challenge
    v-if="hasKeyboard"
    :keyboard="device"
    :base-note="60"
    :note-limit="3"
  />
</template>

<script>
import SubscriptionHandlingDeviceSelector from "./components/SubscriptionHandlingDeviceSelector";
import ShowPlay from "./components/ShowPlay";
import Challenge from "./components/Challenge";

export default {
  name: "App",
  data: () => ({
    device: {}
  }),
  components: {
    Challenge,
    SubscriptionHandlingDeviceSelector,
    ShowPlay
  },
  computed: {
    hasKeyboard() {
      return this.device.id !== undefined;
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
