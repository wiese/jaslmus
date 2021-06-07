<template>
  <div ref="notation"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AbcNotation from "abcjs";
import "abcjs/abcjs-audio.css";

export default defineComponent({
  props: {
    abc: {
      required: true,
      type: String
    }
  },
  watch: {
    abc() {
      this.render();
    }
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      if (this.abc === "") {
        return;
      }
      AbcNotation.renderAbc(this.$refs.notation as HTMLElement, this.abc, {
        add_classes: true
      });
      this.$emit("rendered");
    }
  },
  emits: ["rendered"]
});
</script>
