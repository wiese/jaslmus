<template>
  <div>
    <span>{{ $i18n.t("scoreBoard.games") }} {{ games.length }}</span>
    &mdash;
    <span>
      {{ $i18n.t("scoreBoard.virtuosicScore") }}
      <span v-if="games.length"> {{ Math.round(virtuosicScore * 100) }}% </span>
      <span v-else>
        {{ $i18n.t("scoreBoard.noVirtuosicScore") }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import GameResult from "@/types/GameResult";

export default defineComponent({
  props: {
    games: {
      required: true,
      type: Array as PropType<GameResult[]>
    }
  },
  computed: {
    virtuosicScore(): number {
      let successes = 0,
        heats = 0;
      this.games.forEach(game => {
        successes += Math.max(
          game.gameInfo.successes - game.gameInfo.mistakes,
          1
        );
        heats += game.gameInfo.heats;
      });
      if (heats === 0) {
        return 0;
      }
      return successes / heats;
    }
  }
});
</script>
