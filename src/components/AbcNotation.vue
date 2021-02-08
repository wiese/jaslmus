<template>
  <div ref="notation"></div>
</template>

<script>
import AbcNotation from "abcjs";
import "abcjs/abcjs-midi.css";

export default {
  props: {
    abc: {
      required: true,
      type: String
    }
  },
  watch: {
    abc() {
      AbcNotation.renderAbc(
        this.$refs.notation,
        this.abc,
        {},
        { generateInline: true },
        {}
      );
    }
  }
};
</script>
