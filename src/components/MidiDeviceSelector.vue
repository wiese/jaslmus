<template>
  <div>
    <label for="jaslmus-settings-midi-device">
      {{ $i18n.t("midiOptions.input.device.title") }}
    </label>
    <select id="jaslmus-settings-midi-device" v-model="selected">
      <option disabled value="">
        {{ $i18n.t("midiOptions.input.device.placeholder") }}
      </option>
      <option
        v-for="option in inputs"
        v-bind:value="option.id"
        v-bind:key="option.id"
      >
        {{ option.name }} ({{ option.manufacturer }})
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WebMidi, { Input } from "webmidi"; // eslint-disable-line no-unused-vars

export default defineComponent({
  name: "MidiDeviceSelector",
  props: {
    preferred: {
      required: false,
      type: String,
      default: ""
    }
  },
  data(): { selected: string; inputs: Input[] } {
    return {
      selected: WebMidi.getInputById(this.preferred) ? this.preferred : "",
      inputs: []
    };
  },
  watch: {
    selected(current, previous) {
      this.$emit(
        "deviceChanged",
        WebMidi.getInputById(current) || null,
        WebMidi.getInputById(previous) || null
      );
    }
  },
  created() {
    if (!WebMidi.enabled) {
      throw new Error("WebMidi must be enabled for this component to work!");
    }

    this.inputs = WebMidi.inputs;
  },
  emits: ["deviceChanged"]
});
</script>

<style></style>
