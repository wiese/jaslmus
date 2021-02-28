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
        <div v-if="midiInput">
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
      <Challenge
        :keyboards="keyboards"
        :base-note="preferences.noteReading.baseNote"
        :note-limit="preferences.noteReading.noteLimit"
        :speed="preferences.noteReading.speed"
        :accidentals="preferences.noteReading.accidentals"
        @finished="gameFinished"
      />
      <VirtualKeyboard
        :start-octave="2"
        :end-octave="6"
        @noteon="virtualKeyboard.broadcast($event)"
      />
      <div v-if="!midiInput">
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
import WebMidi, { Input } from "webmidi";
import storedData from "@/storedData";
import midiOptionsDefaults from "./midiOptions.defaults.json";
import preferencesDefaults from "./preferences.defaults.json";
import ScoreBoard from "@/components/ScoreBoard.vue";
import GameInfo from "@/types/GameInfo";
import GameResult from "@/types/GameResult";
import WebmidiInputKeyboardAdapter from "@/WebmidiInputKeyboardAdapter";
import Keyboard from "@/types/Keyboard";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import VirtualKeyboardEventObserver from "@/VirtualKeyboardEventObserver";

export default defineComponent({
  name: "App",
  data: () => ({
    showMidiOptions: false,
    showPreferences: false,
    midiInput: null as Keyboard | null,
    virtualKeyboard: new VirtualKeyboardEventObserver()
  }),
  components: {
    SubscriptionHandlingDeviceSelector,
    MidiCapability,
    Challenge,
    ShowPlay,
    Preferences,
    ScoreBoard,
    VirtualKeyboard
  },
  computed: {
    keyboards(): Keyboard[] {
      const keyboards: Keyboard[] = [this.virtualKeyboard];
      if (this.midiInput) {
        keyboards.push(this.midiInput);
      }
      return keyboards;
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
      this.midiInput = this.wrapMidiInput(current);
    },
    midiReady() {
      if (this.midiOptions.input) {
        const webmidiInput = WebMidi.getInputById(this.midiOptions.input);
        this.midiInput = webmidiInput ? this.wrapMidiInput(webmidiInput) : null;
      }
      this.showMidiOptions = !this.midiInput;
    },
    gameFinished(gameInfo: GameInfo) {
      this.games.push({
        name: "noteReading",
        time: new Date().toISOString(),
        preferences: this.preferences.noteReading,
        gameInfo
      } as GameResult);
    },
    wrapMidiInput(input: Input) {
      return new WebmidiInputKeyboardAdapter(input);
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
