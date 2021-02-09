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
      <button @click="start()">{{ $i18n.t("game.noteReading.start") }}</button>
    </div>
  </div>
</template>

<script>
import AbcNotation from "./AbcNotation";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";

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
  methods: {
    createNewChallenge() {
      let upper;
      if (this.noteLimit === null) {
        upper = 127;
      } else {
        upper = this.baseNote + this.noteLimit - 1;
      }

      this.targetPitch = this.randomIntFromInterval(this.baseNote, upper);
      const abc = TonalAbcNotation.scientificToAbcNotation(
        Midi.midiToNoteName(this.targetPitch)
      );
      this.abc = `X:1\nK:C\n${abc}`;
    },
    start() {
      this.gaming = true;
      this.createNewChallenge();
    },
    evaluateInput(midiEvent) {
      if (this.gaming) {
        this.evaluateResponse(midiEvent);
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
    }
  }
};
</script>
