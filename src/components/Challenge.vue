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

<script lang="ts">
import { defineComponent, PropType } from "vue"; // eslint-disable-line no-unused-vars
import AbcNotation from "./AbcNotation.vue";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";
import challengeGenerator from "@/challengeGenerator";
import { Input, InputEvents } from "webmidi"; // eslint-disable-line no-unused-vars
import { VueI18n } from "vue-i18n"; // eslint-disable-line no-unused-vars

export const START_ON_KEY = 60; // middle C

export default defineComponent({
  props: {
    keyboard: {
      required: true,
      type: Object as PropType<Input>
    },
    baseNote: {
      required: true,
      type: Number,
      validator: Number.isInteger
    },
    noteLimit: {
      validator: value => {
        return value === null || Number.isInteger(value);
      },
      type: Number as PropType<number | null>,
      default: null
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
    targetPitch: undefined as number | undefined,
    mistakes: 0,
    successes: 0,
    timeout: undefined as number | undefined,
    generator: undefined as Generator<number> | undefined
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
    startViaKeyHint(): string {
      return (this.$i18n as VueI18n).t("game.noteReading.startViaKeyHint", {
        key: `${START_ON_KEY} (${this.midiToAbc(START_ON_KEY)})`
      });
    },
    targetNote(): string {
      if (this.targetPitch === undefined) {
        throw Error("Need pitch to generate note!");
      }
      return this.midiToAbc(this.targetPitch);
    },
    abc(): string {
      return `X:1\nK:C\n${this.targetNote}`;
    }
  },
  methods: {
    reset() {
      // @ts-ignore The 'this' context… is not assignable to method's 'this' - no idea how to make this work nicely
      Object.assign(this.$data, this.$options.data!.apply(this));
    },
    start() {
      this.reset();
      this.gaming = true;
      this.generator = challengeGenerator(this.baseNote, this.noteLimit);
      this.next();
    },
    finish() {
      window.clearTimeout(this.timeout);
      this.gaming = false;
      this.finished = true;
    },
    next() {
      if (!this.generator) {
        throw new Error("Can only run after generator was set up");
      }
      const challenge = this.generator.next();

      if (challenge.done || this.successes + this.mistakes >= this.heats) {
        this.finish();
        return;
      }

      this.targetPitch = challenge.value;

      this.timeout = window.setTimeout(this.noResponse, this.speed);
    },
    evaluateInput(midiEvent: InputEvents["noteon"]) {
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
    evaluateResponse(midiEvent: InputEvents["noteon"]) {
      const pitch = midiEvent.data[1];
      if (pitch === this.targetPitch) {
        window.clearTimeout(this.timeout);
        this.successes++;
        this.next();
      } else {
        this.mistakes++;
      }
    },
    midiToAbc(pitch: number) {
      return TonalAbcNotation.scientificToAbcNotation(
        Midi.midiToNoteName(pitch)
      );
    }
  }
});
</script>
