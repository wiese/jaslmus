<template>
  <h1>{{ $i18n.t("header.title") }}</h1>
  <p>{{ $i18n.t("header.punchline") }}</p>
  <hr />
  <MidiCapability @midiReady="midiReady">
    <div v-if="showMidiOptions">
      <button @click="showMidiOptions = false">
        {{ $i18n.t("midiOptions.close") }}
      </button>
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
      <button @click="showPreferences = false">
        {{ $i18n.t("preferences.close") }}
      </button>
      <Preferences :preferences="preferences" @updated="preferences = $event" />
    </div>
    <div v-else>
      <button @click="showMidiOptions = true">
        {{ $i18n.t("midiOptions.title") }}
      </button>
      <button @click="showPreferences = true">
        {{ $i18n.t("preferences.title") }}
      </button>
      <hr />
      <ScoreBoard :games="games" />
      <hr />
      <div v-if="hasKeyboard">
        <Challenge
          v-if="hasKeyboard"
          :keyboard="midiInput"
          :base-note="preferences.noteReading.baseNote"
          :note-limit="preferences.noteReading.noteLimit"
          :speed="preferences.noteReading.speed"
          :accidentals="preferences.noteReading.accidentals"
          @finished="gameFinished"
        />
      </div>
      <div v-else>
        {{ $i18n.t("error.noMidiDevice") }}
      </div>
    </div>
  </MidiCapability>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowPlay from "./components/ShowPlay.vue";
import Challenge from "./components/Challenge.vue";
import MidiCapability from "./components/MidiCapability.vue";
import SubscriptionHandlingDeviceSelector from "./components/SubscriptionHandlingDeviceSelector.vue";
import Preferences from "@/components/Preferences.vue";
import WebMidi, { Input } from "webmidi"; // eslint-disable-line no-unused-vars
import storedData from "@/storedData";
import midiOptionsDefaults from "./midiOptions.defaults.json";
import preferencesDefaults from "./preferences.defaults.json";
import ScoreBoard from "@/components/ScoreBoard.vue";
import GameInfo from "@/types/GameInfo"; // eslint-disable-line no-unused-vars
import GameResult from "@/types/GameResult"; // eslint-disable-line no-unused-vars

export default defineComponent({
  name: "App",
  data: () => ({
    showMidiOptions: false,
    showPreferences: false,
    midiInput: null as Input | null
  }),
  components: {
    SubscriptionHandlingDeviceSelector,
    MidiCapability,
    Challenge,
    ShowPlay,
    Preferences,
    ScoreBoard
  },
  computed: {
    hasKeyboard(): boolean {
      return !!this.midiInput;
    }
  },
  setup() {
    return {
      midiOptions: storedData(
        "midiOptions",
        midiOptionsDefaults.version.toString(),
        midiOptionsDefaults.defaults
      ),
      preferences: storedData(
        "preferences",
        preferencesDefaults.version.toString(),
        preferencesDefaults.defaults
      ),
      games: storedData("games", "1", [] as GameResult[])
    };
  },
  methods: {
    deviceChanged(current: Input) {
      this.midiOptions.input = current.id;
      this.midiInput = current;
    },
    midiReady() {
      if (this.midiOptions.input) {
        this.midiInput = WebMidi.getInputById(this.midiOptions.input) || null;
      }
      this.showMidiOptions = !this.hasKeyboard;
    },
    gameFinished(gameInfo: GameInfo) {
      this.games.push({
        name: "noteReading",
        time: new Date().toISOString(),
        preferences: this.preferences.noteReading,
        gameInfo
      } as GameResult);
    }
  }
});
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
