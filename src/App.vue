<template>
  <h1>{{ $i18n.t("header.title") }}</h1>
  <p>{{ $i18n.t("header.punchline") }}</p>
  <hr />
  <MidiCapability @midiReady="midiReady">
    <div v-if="showMidiOptions">
      <button @click="showMidiOptions = false">{{ $i18n.t("midiOptions.close") }}</button>
      <h2>{{ $i18n.t("midiOptions.title") }}</h2>
      <fieldset>
        <legend>{{ $i18n.t("midiOptions.input.title") }}</legend>
        <SubscriptionHandlingDeviceSelector
          :deviceId="midiOptions.input"
          @deviceChanged="deviceChanged"
        />
        <div v-if="hasKeyboard">
          <h3>{{ $i18n.t("midiOptions.input.preview.title") }}</h3>
          <p>{{ $i18n.t("midiOptions.input.preview.description") }}</p>
          <ShowPlay :keyboard="midiInput" />
        </div>
      </fieldset>
    </div>
    <div v-else-if="showPreferences">
      <button @click="showPreferences = false">{{ $i18n.t("preferences.close") }}</button>
      <h2>{{ $i18n.t("preferences.title") }}</h2>
      <fieldset>
        <legend>{{ $i18n.t("preferences.noteReading.title") }}</legend>
        <fieldset>
          <legend>{{ $i18n.t("preferences.noteReading.noteLimit.title") }}</legend>
          <label for="jaslmus-preferences-noteReading-noteLimit">
            {{ $i18n.t("preferences.noteReading.noteLimit.description") }}
          </label>
          <select
            id="jaslmus-preferences-noteReading-noteLimit"
            v-model="preferences.noteReading.noteLimit"
          >
            <option disabled value="">{{ $i18n.t("preferences.noteReading.noteLimit.placeholder") }}</option>
            <option
              v-for="option in preferencesChoices.noteReading.noteLimit"
              v-bind:value="option"
              v-bind:key="option"
            >
              {{ option }}
            </option>
          </select>
        </fieldset>
      </fieldset>
    </div>
    <div v-else>
      <button @click="showMidiOptions = true">{{ $i18n.t("midiOptions.title") }}</button>
      <button @click="showPreferences = true">{{ $i18n.t("preferences.title") }}</button>
      <hr />
      <div v-if="hasKeyboard">
        <Challenge
          v-if="hasKeyboard"
          :keyboard="midiInput"
          :base-note="preferences.noteReading.baseNote"
          :note-limit="preferences.noteReading.noteLimit"
        />
      </div>
      <div v-else>
        {{ $i18n.t("error.noMidiDevice") }}
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
import WebMidi from "webmidi";

export default {
  name: "App",
  props: {
    preferencesChoices: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    showMidiOptions: false,
    showPreferences: false,
    midiOptions: {
      input: ""
    },
    preferences: {}, // is read from JSON
    midiInput: null
  }),
  components: {
    SubscriptionHandlingDeviceSelector,
    MidiCapability,
    Challenge,
    ShowPlay
  },
  created() {
    this.preferences = preferences;
  },
  computed: {
    hasKeyboard() {
      return !!this.midiInput;
    }
  },
  methods: {
    deviceChanged(current) {
      this.midiOptions.input = current.id;
      this.midiInput = current;
    },
    midiReady() {
      if (this.midiOptions.input) {
        this.midiInput = WebMidi.getInputById(this.midiOptions.input) || null;
      }
      this.showMidiOptions = !this.hasKeyboard;
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
