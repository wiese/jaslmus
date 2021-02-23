<template>
  <div>
    <h1>{{ $i18n.t("game.noteReading.title") }}</h1>
    <div v-if="gaming">
      <p>{{ $i18n.t("game.noteReading.description") }}</p>
      <AnimatedAbcNotation
        :abc="abc"
        :animationDuration="speed"
        :key="`heat_no_${heat}`"
      />
      <span>{{ challenge.pitch }} ({{ challenge.note }})</span>
      <br />
      <span>{{ heat }}/{{ heats }}</span>
      <br />
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
import AnimatedAbcNotation from "./AnimatedAbcNotation.vue";
import Midi from "@tonaljs/midi";
import TonalAbcNotation from "@tonaljs/abc-notation";
import challengeGenerator, {
  AccidentalsConfiguration,
  Challenge // eslint-disable-line no-unused-vars
} from "@/challengeGenerator";
import { Input, InputEvents } from "webmidi"; // eslint-disable-line no-unused-vars
import { VueI18n } from "vue-i18n"; // eslint-disable-line no-unused-vars
import GameInfo from "@/types/GameInfo"; // eslint-disable-line no-unused-vars

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
      required: true,
      type: Number,
      validator: Number.isInteger
    },
    speed: {
      required: true,
      type: Number,
      validator: Number.isInteger
    },
    accidentals: {
      required: true,
      type: String
    },
    heats: {
      default: 10,
      type: Number
    }
  },
  data: () => ({
    gaming: false,
    finished: false,
    challenge: {} as Challenge,
    mistakes: 0,
    successes: 0,
    timeout: undefined as number | undefined,
    generator: undefined as Generator<Challenge> | undefined,
    heat: 0
  }),
  components: {
    AnimatedAbcNotation
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
    abc(): string {
      return `X:1\nK:C\n${this.challenge.note}`;
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
      this.generator = challengeGenerator(
        this.baseNote,
        this.noteLimit,
        AccidentalsConfiguration[
          this.accidentals as keyof typeof AccidentalsConfiguration
        ]
      );
      this.next();
    },
    finish() {
      window.clearTimeout(this.timeout);
      this.gaming = false;
      this.finished = true;
      this.$emit("finished", {
        heats: this.heats,
        heat: this.heat,
        successes: this.successes,
        mistakes: this.mistakes
      } as GameInfo);
    },
    next() {
      if (!this.generator) {
        throw new Error("Can only run after generator was set up");
      }
      const challenge = this.generator.next();

      if (challenge.done || this.heat >= this.heats) {
        this.finish();
        return;
      }

      this.challenge = challenge.value;

      this.timeout = window.setTimeout(this.noResponse, this.speed);

      this.heat++;
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
      if (pitch === this.challenge.pitch) {
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
  },
  emits: ["finished"]
});
</script>
