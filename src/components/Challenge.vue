<template>
  <div>
    <h1>{{ $i18n.t("game.noteReading.title") }}</h1>
    <div v-if="gaming">
      <p>{{ $i18n.t("game.noteReading.description") }}</p>
      <AbcNotation :abc="abc" />
      <span>{{ targetPitch }} ({{ abc }})</span><br />
      <span>
        {{ $i18n.t("game.noteReading.analysis.successes") }} {{ successes }},
        {{ $i18n.t("game.noteReading.analysis.mistakes") }} {{ mistakes }}
      </span>
    </div>
    <div v-else>
      <button @click="start()" title="">
        {{ $i18n.t("game.noteReading.start") }}
      </button>
      <p>
        <sub>{{ startViaKeyHint }}</sub>
      </p>
    </div>
  </div>
</template>

<script>
import AbcNotation from "./AbcNotation";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";

export const START_ON_KEY = 60; // middle C

export default {
  props: {
    keyboard: {
      required: true,
      type: Object
    },
    baseNote: {
      required: true,
      type: Number,
      validator: Number.isInteger
    },
    noteLimit: {
      validator: value => {
        return value === null || Number.isInteger(value);
      }
    }
  },
  data: () => ({
    gaming: false,
    abc: "",
    targetPitch: "",
    mistakes: 0,
    successes: 0
  }),
  components: {
    AbcNotation
  },
  unmounted() {
    this.keyboard.removeListener("noteon", "all", this.evaluateInput);
  },
  mounted() {
    this.keyboard.addListener("noteon", "all", this.evaluateInput);
  },
  computed: {
    startViaKeyHint() {
      return this.$i18n.t("game.noteReading.startViaKeyHint", {
        key: `${START_ON_KEY} (${this.midiToAbc(START_ON_KEY)})`
      });
    }
  },
  methods: {
    createNewChallenge() {
      let upper;
      if (this.noteLimit === null) {
        upper = 127;
      } else {
        upper = this.baseNote + this.noteLimit - 1;
      }

      this.targetPitch = this.randomIntFromInterval(this.baseNote, upper);
      this.abc = `X:1\nK:C\n${this.midiToAbc(this.targetPitch)}`;
    },
    start() {
      this.gaming = true;
      this.createNewChallenge();
    },
    evaluateInput(midiEvent) {
      if (this.gaming) {
        this.evaluateResponse(midiEvent);
      } else if (midiEvent.data[1] === START_ON_KEY) {
        this.start();
      }
    },
    evaluateResponse(midiEvent) {
      const pitch = midiEvent.data[1];
      if (pitch === this.targetPitch) {
        this.successes++;
      } else {
        this.mistakes++;
      }
      this.createNewChallenge();
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    midiToAbc(pitch) {
      return TonalAbcNotation.scientificToAbcNotation(
        Midi.midiToNoteName(pitch)
      );
    }
  }
};
</script>
