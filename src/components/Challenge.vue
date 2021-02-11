<template>
  <div>
    <h1>{{ $i18n.t("game.noteReading.title") }}</h1>
    <div v-if="gaming">
      <p>{{ $i18n.t("game.noteReading.description") }}</p>
      <AbcNotation :abc="abc" />
      <span>{{ targetPitch }} ({{ targetNote }})</span><br />
      <span>
        {{ $i18n.t("game.noteReading.analysis.successes") }} {{ successes }},
        {{ $i18n.t("game.noteReading.analysis.mistakes") }} {{ mistakes }}
      </span>
      <br />
      <button @click="finish()">
        {{ $i18n.t("game.noteReading.stop") }}
      </button>
    </div>
    <div v-else-if="finished">
      {{ $i18n.t("game.noteReading.finished") }}<br />
      {{ $i18n.t("game.noteReading.analysis.successes") }} {{ successes }},
      {{ $i18n.t("game.noteReading.analysis.mistakes") }} {{ mistakes }}
      <br />
      <button @click="reset()">
        {{ $i18n.t("game.noteReading.reset") }}
      </button>
    </div>
    <div v-else>
      <button @click="start()">
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
    },
    speed: {
      required: true,
      type: Number,
      validator: Number.isInteger
    },
    heats: {
      default: 10,
      type: Number
    }
  },
  data: () => ({
    gaming: false,
    finished: false,
    abc: "",
    targetPitch: "",
    mistakes: 0,
    successes: 0,
    timeout: null
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
    },
    targetNote() {
      return this.midiToAbc(this.targetPitch);
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
      this.abc = `X:1\nK:C\n${this.targetNote}`;

      this.timeout = window.setTimeout(this.noResponse, this.speed);
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    start() {
      this.reset();
      this.gaming = true;
      this.createNewChallenge();
    },
    finish() {
      window.clearTimeout(this.timeout);
      this.gaming = false;
      this.finished = true;
    },
    next() {
      if (this.successes + this.mistakes >= this.heats) {
        this.finish();
        return;
      }
      this.createNewChallenge();
    },
    evaluateInput(midiEvent) {
      if (this.gaming) {
        this.evaluateResponse(midiEvent);
      } else {
        if (midiEvent.data[1] === START_ON_KEY) {
          if (this.finished) {
            this.reset();
          } else {
            this.start();
          }
        }
      }
    },
    noResponse() {
      this.mistakes++;
      this.next();
    },
    evaluateResponse(midiEvent) {
      const pitch = midiEvent.data[1];
      if (pitch === this.targetPitch) {
        window.clearTimeout(this.timeout);
        this.successes++;
        this.next();
      } else {
        this.mistakes++;
      }
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
