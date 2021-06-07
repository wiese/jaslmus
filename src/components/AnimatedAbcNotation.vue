<template>
  <AbcNotation
    class="animated-abc-notation"
    :abc="abc"
    ref="abc"
    @rendered="postProcessAbc"
    :style="styleVariables"
  />
</template>

<script>
import { defineComponent } from "vue";
import AbcNotation from "./AbcNotation";

export default defineComponent({
  components: { AbcNotation },
  props: {
    abc: {
      required: true,
      type: String
    },
    animationDuration: {
      required: true,
      type: Number
    }
  },
  data: () => ({
    abcWidth: 0
  }),
  computed: {
    styleVariables() {
      return {
        "--staff-width": this.abcWidth - 100 + "px",
        "--animation-duration": this.animationDuration + "ms"
      };
    }
  },
  methods: {
    postProcessAbc() {
      this.abcWidth = this.$refs.abc.$el.children[0].clientWidth;

      // remove "margins" from staff lines which happen to be part of the lines' path
      this.$refs.abc.$el.querySelectorAll(".abcjs-staff path").forEach(el => {
        const pathDefinition = el
          .getAttribute("d")
          .replace("M 15 ", "M 0 ")
          .replace("L 15 ", "L 0 ");
        el.setAttribute("d", pathDefinition);
      });
    }
  }
});
</script>

<style>
.animated-abc-notation .abcjs-staff {
  transform: scaleX(10);
}

/* that is notes and possibly their ledger lines */
.animated-abc-notation .abcjs-note,
.animated-abc-notation .abcjs-ledger {
  animation-duration: var(--animation-duration);
  animation-timing-function: linear;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: inchacross;
}

@keyframes inchacross {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(var(--staff-width));
  }
}
</style>
