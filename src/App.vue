<template>
  <h1>Jaslmus</h1>
  <p>Learn to play the piano, all right.</p>
  <hr />
  <MidiCapability>
    <div v-if="showMidiOptions">
      <button @click="showMidiOptions = false">close</button>
      <h2>Midi Options</h2>
      <fieldset>
        <legend>Midi in</legend>
        <SubscriptionHandlingDeviceSelector
          :device="midiOptions.input"
          @deviceChanged="midiOptions.input = $event"
        />
        <div v-if="midiOptions.input">
          <h3>Preview</h3>
          <p>Strike a key to try the device! Notes will be shown here.</p>
          <ShowPlay :keyboard="midiOptions.input" />
        </div>
      </fieldset>
    </div>
    <div v-else>
      <button @click="showMidiOptions = true">Midi Options</button>
      <hr />
      <div v-if="hasKeyboard">
        <Challenge
          v-if="hasKeyboard"
          :keyboard="midiOptions.input"
          :base-note="preferences.noteReading.baseNote"
          :note-limit="preferences.noteReading.noteLimit"
        />
      </div>
      <div v-else>
        Jaslmus needs at least one input device to work. Please configure one.
      </div>
    </div>
  </MidiCapability>
</template>

<script>
import ShowPlay from "./components/ShowPlay";
import Challenge from "./components/Challenge";
import MidiCapability from "./components/MidiCapability";
import SubscriptionHandlingDeviceSelector from "./components/SubscriptionHandlingDeviceSelector";
import preferences from "./preferences.json";

export default {
  name: "App",
  data: () => ({
    showMidiOptions: false,
    midiOptions: {
      input: null
    },
    preferences: {}
  }),
  components: {
    SubscriptionHandlingDeviceSelector,
    MidiCapability,
    Challenge,
    ShowPlay
  },
  created() {
    this.showMidiOptions = !this.hasKeyboard;
    this.preferences = preferences;
  },
  computed: {
    hasKeyboard() {
      return !!this.midiOptions.input;
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
